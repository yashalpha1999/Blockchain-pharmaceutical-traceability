import { Injectable, BadRequestException } from '@nestjs/common';
import { FabricService } from '../../fabric/fabric.service';

@Injectable()
export class ShipmentsService {
  constructor(private fabricService: FabricService) {}

  async transferOwnership(batchId: string, newOwner: string, newStatus: string) {
    try {
      const contract = this.fabricService.getContract();
      const result = await contract.submitTransaction('ShipmentContract:TransferOwnership', batchId, newOwner, newStatus);
      return JSON.parse(new TextDecoder().decode(result));
    } catch (error) {
      throw new BadRequestException(`Failed to transfer ownership: ${error.message}`);
    }
  }
}
