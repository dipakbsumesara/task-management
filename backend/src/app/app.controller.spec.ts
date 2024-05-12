import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '@backend/app/app.controller';
import { AppService } from '@backend/app/app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
    appController = new AppController(appService);
  });

  it('should return "Hello API"', () => {
    expect(appController.getData()).toEqual({ message: 'Hello API' });
  });
});

