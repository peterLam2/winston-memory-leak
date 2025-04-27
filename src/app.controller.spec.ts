import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {

      const currentMem = process.memoryUsage().heapUsed;
      console.log(currentMem);

      for (let i = 0; i < 100000; i ++){
        expect(appController.getHello()).toBe('Hello World!');
      }

      if (global.gc) {
        console.log('gced');
        gc!();
      }
      const lastMem = process.memoryUsage().heapUsed;
      console.log(`mem = ${(currentMem - lastMem) / 1024 / 1024} MB`)
      expect((currentMem - lastMem)/ 1024 / 1024).toBeLessThan(15);
    });
  });
});
