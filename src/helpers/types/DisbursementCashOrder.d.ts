import { Date } from "neo4j-driver";

type DisbursementCashOrder = {
    date: Date,
    sum: number,
    basis: string,
    sender: string,
    receiver: string,
    destinationCode: string,
    analyticalAccountingCode: string,
    correspondingAccount: string,
    EDRPOU: string
};

export type { DisbursementCashOrder };