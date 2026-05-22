import { Injectable, BadRequestException } from '@nestjs/common';
import { FabricService } from '../../fabric/fabric.service';

@Injectable()
export class AuditService {
  constructor(private fabricService: FabricService) {}

  async getAssetHistory(assetId: string) {
    try {
      const contract = this.fabricService.getContract();
      const result = await contract.evaluateTransaction('AuditContract:GetAssetHistory', assetId);
      return JSON.parse(new TextDecoder().decode(result));
    } catch (error) {
      throw new BadRequestException(`Failed to get audit history: ${error.message}`);
    }
  }
}
