import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';

@Info({ title: 'AuditContract', description: 'Smart contract for querying asset history' })
export class AuditContract extends Contract {
    constructor() {
        super('AuditContract');
    }

    @Transaction(false)
    @Returns('string')
    public async GetAssetHistory(ctx: Context, assetId: string): Promise<string> {
        const resultsIterator = await ctx.stub.getHistoryForKey(assetId);
        const results = [];
        
        while (true) {
            const res = await resultsIterator.next();
            
            if (res.value && res.value.value.toString()) {
                const jsonRes: any = {};
                jsonRes.txId = res.value.txId;
                jsonRes.timestamp = res.value.timestamp;
                jsonRes.isDelete = res.value.isDelete;
                try {
                    jsonRes.record = JSON.parse(Buffer.from(res.value.value).toString('utf8'));
                } catch (err) {
                    jsonRes.record = Buffer.from(res.value.value).toString('utf8');
                }
                results.push(jsonRes);
            }
            if (res.done) {
                await resultsIterator.close();
                return JSON.stringify(results);
            }
        }
    }
}
