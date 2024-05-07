import { Controller, Get } from '@nestjs/common';

import { AppService } from '@backend/app/app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
