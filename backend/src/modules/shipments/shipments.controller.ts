import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { Role } from '../../auth/roles.enum';

@Controller('shipments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post('transfer')
  @Roles(Role.DISTRIBUTOR, Role.PHARMACY)
  async transferOwnership(
    @Body('batchId') batchId: string,
    @Body('newOwner') newOwner: string,
    @Body('newStatus') newStatus: string,
  ) {
    return this.shipmentsService.transferOwnership(batchId, newOwner, newStatus);
  }
}
