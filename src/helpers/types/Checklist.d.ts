import { Date, Integer } from "neo4j-driver";

type Checklist = {
    date: Date, 
    conductor: string, 
    route: string, 
    issuedCoupons: Integer, 
    returnedCoupons: Integer, 
    receipts: number, 
    cashier: string
};

export type { Checklist };