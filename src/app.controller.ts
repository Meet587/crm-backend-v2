import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get a simple hello message' })
  @ApiResponse({ status: 200, description: 'Returns a greeting message' })
  getHello(): string {
    return this.appService.getHello();
  }
}
