import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { Role } from '../../auth/roles.enum';

@Controller('drugs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DrugsController {
  constructor(private readonly drugsService: DrugsService) {}

  @Post()
  @Roles(Role.MANUFACTURER)
  async createBatch(
    @Body('batchId') batchId: string,
    @Body('name') name: string,
    @Body('manufacturer') manufacturer: string,
    @Body('mfgDate') mfgDate: string,
    @Body('expDate') expDate: string,
  ) {
    return this.drugsService.createBatch(batchId, name, manufacturer, mfgDate, expDate);
  }

  @Get(':id')
  // Open to all authenticated users for MVP
  async getBatch(@Param('id') id: string) {
    return this.drugsService.getBatch(id);
  }

  @Get(':id/qr')
  async getBatchQR(@Param('id') id: string) {
    // Generate simple mock QR data response for frontend to consume
    return { qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}` };
  }
}
