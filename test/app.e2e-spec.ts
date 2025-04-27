import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const currentMem = process.memoryUsage().heapUsed;
    console.log(currentMem);
    request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
      
    if(global.window.gc){
        gc!();
    }
    const lastMem = process.memoryUsage().heapUsed;
    console.log(`mem = ${(currentMem - lastMem) / 1024 / 1024} MB`)
    expect(currentMem- lastMem).toBeLessThan(1);
  });
});
