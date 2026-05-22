import { Injectable, BadRequestException } from '@nestjs/common';
import { FabricService } from '../../fabric/fabric.service';

@Injectable()
export class PrescriptionsService {
  constructor(private fabricService: FabricService) {}

  async issuePrescription(prescriptionId: string, doctorId: string, patientRef: string, drugList: any[], quantity: number, expiryDate: string) {
    try {
      const contract = this.fabricService.getContract();
      const result = await contract.submitTransaction(
        'PrescriptionContract:IssuePrescription',
        prescriptionId,
        doctorId,
        patientRef,
        JSON.stringify(drugList),
        quantity.toString(),
        expiryDate
      );
      return JSON.parse(new TextDecoder().decode(result));
    } catch (error) {
      throw new BadRequestException(`Failed to issue prescription: ${error.message}`);
    }
  }

  async dispensePrescription(prescriptionId: string, pharmacyId: string) {
    try {
      const contract = this.fabricService.getContract();
      const result = await contract.submitTransaction('PrescriptionContract:DispensePrescription', prescriptionId, pharmacyId);
      return JSON.parse(new TextDecoder().decode(result));
    } catch (error) {
      throw new BadRequestException(`Failed to dispense prescription: ${error.message}`);
    }
  }

  async getPrescription(prescriptionId: string) {
    try {
      const contract = this.fabricService.getContract();
      const result = await contract.evaluateTransaction('PrescriptionContract:QueryPrescription', prescriptionId);
      return JSON.parse(new TextDecoder().decode(result));
    } catch (error) {
      throw new BadRequestException(`Failed to query prescription: ${error.message}`);
    }
  }
}
