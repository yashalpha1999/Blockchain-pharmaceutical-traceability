import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';

@Info({ title: 'PrescriptionContract', description: 'Smart contract for managing prescriptions' })
export class PrescriptionContract extends Contract {
    constructor() {
        super('PrescriptionContract');
    }

    @Transaction()
    public async IssuePrescription(
        ctx: Context,
        prescriptionId: string,
        doctorId: string,
        patientRef: string,
        drugList: string, // JSON stringified array of drugs
        quantity: number,
        expiryDate: string
    ): Promise<void> {
        const exists = await this.PrescriptionExists(ctx, prescriptionId);
        if (exists) {
            throw new Error(`The prescription ${prescriptionId} already exists`);
        }

        const prescription = {
            docType: 'prescription',
            prescriptionId,
            doctorId,
            patientRef,
            drugList,
            quantity,
            issueDate: new Date().toISOString(),
            expiryDate,
            dispensedStatus: false,
            dispensedBy: ''
        };

        await ctx.stub.putState(prescriptionId, Buffer.from(JSON.stringify(prescription)));
    }

    @Transaction()
    public async DispensePrescription(
        ctx: Context,
        prescriptionId: string,
        pharmacyId: string
    ): Promise<void> {
        const prescriptionJSON = await ctx.stub.getState(prescriptionId);
        if (!prescriptionJSON || prescriptionJSON.length === 0) {
            throw new Error(`The prescription ${prescriptionId} does not exist`);
        }

        const prescription = JSON.parse(prescriptionJSON.toString());

        if (prescription.dispensedStatus) {
            throw new Error(`Prescription ${prescriptionId} has already been dispensed`);
        }

        // Check expiry
        if (new Date(prescription.expiryDate) < new Date()) {
            throw new Error(`Prescription ${prescriptionId} is expired`);
        }

        prescription.dispensedStatus = true;
        prescription.dispensedBy = pharmacyId;

        await ctx.stub.putState(prescriptionId, Buffer.from(JSON.stringify(prescription)));
    }

    @Transaction(false)
    @Returns('boolean')
    public async PrescriptionExists(ctx: Context, prescriptionId: string): Promise<boolean> {
        const prescriptionJSON = await ctx.stub.getState(prescriptionId);
        return prescriptionJSON && prescriptionJSON.length > 0;
    }
    
    @Transaction(false)
    @Returns('string')
    public async QueryPrescription(ctx: Context, prescriptionId: string): Promise<string> {
        const prescriptionJSON = await ctx.stub.getState(prescriptionId);
        if (!prescriptionJSON || prescriptionJSON.length === 0) {
            throw new Error(`The prescription ${prescriptionId} does not exist`);
        }
        return prescriptionJSON.toString();
    }
}
