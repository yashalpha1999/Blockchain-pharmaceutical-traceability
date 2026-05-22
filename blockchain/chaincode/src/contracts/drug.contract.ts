import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';

@Info({ title: 'DrugContract', description: 'Smart contract for tracing pharmaceutical drugs' })
export class DrugContract extends Contract {
    
    constructor() {
        super('DrugContract');
    }

    @Transaction()
    public async CreateBatch(
        ctx: Context,
        batchId: string,
        name: string,
        manufacturer: string,
        mfgDate: string,
        expDate: string
    ): Promise<void> {
        const exists = await this.BatchExists(ctx, batchId);
        if (exists) {
            throw new Error(`The batch ${batchId} already exists`);
        }

        const batch = {
            docType: 'drugBatch',
            batchId,
            name,
            manufacturer,
            mfgDate,
            expDate,
            currentOwner: manufacturer,
            status: 'CREATED',
            timestamp: new Date().toISOString(),
        };

        await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
    }

    @Transaction(false)
    @Returns('string')
    public async QueryBatch(ctx: Context, batchId: string): Promise<string> {
        const batchJSON = await ctx.stub.getState(batchId);
        if (!batchJSON || batchJSON.length === 0) {
            throw new Error(`The batch ${batchId} does not exist`);
        }
        return batchJSON.toString();
    }

    @Transaction(false)
    @Returns('boolean')
    public async BatchExists(ctx: Context, batchId: string): Promise<boolean> {
        const batchJSON = await ctx.stub.getState(batchId);
        return batchJSON && batchJSON.length > 0;
    }
}
