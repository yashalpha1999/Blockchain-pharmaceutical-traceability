import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { Role } from '../../auth/roles.enum';

@Controller('prescriptions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @Roles(Role.DOCTOR)
  async issuePrescription(
    @Request() req: any,
    @Body('prescriptionId') prescriptionId: string,
    @Body('patientRef') patientRef: string,
    @Body('drugList') drugList: any[],
    @Body('quantity') quantity: number,
    @Body('expiryDate') expiryDate: string,
  ) {
    const doctorId = req.user.userId;
    return this.prescriptionsService.issuePrescription(prescriptionId, doctorId, patientRef, drugList, quantity, expiryDate);
  }

  @Post(':id/dispense')
  @Roles(Role.PHARMACY)
  async dispensePrescription(
    @Request() req: any,
    @Param('id') id: string,
  ) {
    const pharmacyId = req.user.userId;
    return this.prescriptionsService.dispensePrescription(id, pharmacyId);
  }

  @Get(':id')
  async getPrescription(@Param('id') id: string) {
    return this.prescriptionsService.getPrescription(id);
  }
}
