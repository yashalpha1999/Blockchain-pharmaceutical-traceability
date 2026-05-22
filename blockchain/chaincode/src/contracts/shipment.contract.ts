import { Context, Contract, Info, Transaction } from 'fabric-contract-api';

@Info({ title: 'ShipmentContract', description: 'Smart contract for handling shipments and transfers' })
export class ShipmentContract extends Contract {
    constructor() {
        super('ShipmentContract');
    }

    @Transaction()
    public async TransferOwnership(
        ctx: Context,
        batchId: string,
        newOwner: string,
        newStatus: string
    ): Promise<void> {
        const batchJSON = await ctx.stub.getState(batchId);
        if (!batchJSON || batchJSON.length === 0) {
            throw new Error(`The batch ${batchId} does not exist`);
        }

        const batch = JSON.parse(batchJSON.toString());

        // Update ownership and status
        batch.currentOwner = newOwner;
        batch.status = newStatus;
        batch.timestamp = new Date().toISOString();

        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
    }
}
