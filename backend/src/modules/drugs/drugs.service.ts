import { Injectable, BadRequestException } from '@nestjs/common';
import { FabricService } from '../../fabric/fabric.service';

@Injectable()
export class DrugsService {
  constructor(private fabricService: FabricService) {}

  async createBatch(batchId: string, name: string, manufacturer: string, mfgDate: string, expDate: string) {
    try {
      const contract = this.fabricService.getContract();
      const result = await contract.submitTransaction('DrugContract:CreateBatch', batchId, name, manufacturer, mfgDate, expDate);
      return JSON.parse(new TextDecoder().decode(result));
    } catch (error) {
      throw new BadRequestException(`Failed to create batch: ${error.message}`);
    }
  }

  async getBatch(batchId: string) {
    try {
      const contract = this.fabricService.getContract();
      const result = await contract.evaluateTransaction('DrugContract:QueryBatch', batchId);
      return JSON.parse(new TextDecoder().decode(result));
    } catch (error) {
      throw new BadRequestException(`Failed to query batch: ${error.message}`);
    }
  }
}
