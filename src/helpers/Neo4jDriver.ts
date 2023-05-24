import neo4j, { Driver, QueryResult, Session, Node } from 'neo4j-driver';
import { Dict } from 'neo4j-driver-core/types/record';
import { Cashier, Checklist, ChiefCashier, Conductor, Route, Emploee, DisbursementCashOrder } from "./types";

const driver: Driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', '12345678')
);

export async function getEmploees() {
    const session: Session = driver.session();
    let result: QueryResult<Dict>;

    try {
        result = await session.run(`
            MATCH (chiefcashier:ChiefCashier)
            RETURN {name: chiefcashier.name, position: chiefcashier.position} as Emploee
            UNION ALL
            MATCH (cashier:Cashier)
            RETURN {name: cashier.name, position: cashier.position} as Emploee
            UNION ALL
            MATCH (conductor:Conductor)
            RETURN {name: conductor.name, position: conductor.position} as Emploee
        `);
    } finally {
        await session.close();
    }

    return result.records
        .map(item => item.get('Emploee'))
        .map(props => {
            let node = props;

            let prop: Emploee = {
                name: node.name,
                position: node.position
            };

            return prop;
        });
}

export async function getChiefCashiers() {
    const session: Session = driver.session();
    let result: QueryResult<Dict>;

    try {
        result = await session.run(`
            MATCH (chiefCashier:ChiefCashier) 
            RETURN chiefCashier 
        `);
    } finally {
        await session.close();
    }
    
    return result.records.map(item => item
        .get('chiefCashier'))
        .map(props => {
            let node = (props as Node).properties;

            let prop: ChiefCashier = {
                name: node.name,
                position: node.position
            };

            return prop;
        });
}

export async function deleteChiefCashiers({name, position}: ChiefCashier) {
    const session: Session = driver.session();
    try {
         await session.run(`
            MATCH (chiefCashier:ChiefCashier) 
            WHERE chiefCashier.name = ${name} AND chiefCashier.position = ${position}
            RETURN chiefCashier 
        `);
    } finally {
        await session.close();
    }
}

export async function getCashiers() {
    const session: Session = driver.session();
    let result: QueryResult<Dict>;

    try {
        result = await session.run(`
            MATCH (cashier:Cashier) 
            RETURN cashier
        `);
    } finally {
        await session.close();
    }

    return result.records
        .map(item => item.get('cashier'))
        .map(props => {
            let node = (props as Node).properties;

            let prop: Cashier = {
                name: node.name,
                position: node.position
            };

            return prop;
        });
}

export async function getConductors() {
    const session: Session = driver.session();
    let result: QueryResult<Dict>;

    try {
        result = await session.run(`
            MATCH (conductor:Conductor)
            RETURN conductor
        `);
    } finally {
        await session.close();
    }

    return result.records
        .map(item => item.get('conductor'))
        .map(props => {
            let node = (props as Node).properties;

            let prop: Conductor = {
                name: node.name,
                position: node.position
            };

            return prop;
        });
}

export async function getRoutes() {
    const session: Session = driver.session();
    let result: QueryResult<Dict>;

    try {
        result = await session.run(` 
            MATCH (route: Route) 
            RETURN route 
        `);
    } finally {
        await session.close();
    }

    return result.records
        .map(item => item.get('route'))
        .map(props => {
            let node = (props as Node).properties;

            let prop: Route = {
                number: node.number,
                name: node.name,
            };

            return prop;
        });
}

export async function getChecklists() {
    const session: Session = driver.session();
    let result: QueryResult<Dict>;

    try {
        result = await session.run(` 
            MATCH (checklist:Checklist)
            MATCH (route:Route)<-[:Route]-(checklist)
            MATCH (conductor:Conductor)<-[:Conductor]-(checklist)
            MATCH (cashier:Cashier)<-[:Transfer]-(checklist)
            RETURN 
            {
                Date: checklist.date, 
                Conductor: conductor.name, 
                Route: route.name, 
                Issued_coupons: checklist.issuedCoupons, 
                Returned_coupons: checklist.returnedCoupons, 
                Receipts: checklist.receipts, 
                Casher: cashier.name
            } as Checklist
        `);
    } finally {
        await session.close();
    }

    return result.records
        .map(item => item.get('Checklist'))
        .map(props => {
            let node = props

            let prop: Checklist = {
                date: node["Date"],
                conductor: node["Conductor"],
                route: node["Route"],
                issuedCoupons: node["Issued_coupons"],
                returnedCoupons: node["Returned_coupons"],
                receipts: node["Receipts"],
                cashier: node["Casher"]
            };

            return prop;
        });
}

export async function getInternalDisbursementCashOrders() {
    const session: Session = driver.session();
    let result: QueryResult<Dict>;

    try {
        result = await session.run(` 
            MATCH p=(cashier:Cashier)<-[:Cashier]-(dco:DisbursementCashOrder)-[:Transfer]->(chiefCashier:ChiefCashier) 
            RETURN 
            {
                Date: dco.date, 
                Sum: dco.sum,
                Basis: dco.basis,
                Sender: cashier.name,
                Receiver: chiefCashier.name,
                DestinationCode: dco.destinationCode,
                AnalyticalAccountingCode: dco.analyticalAccountingCode,
                CorrespondingAccount: dco.correspondingAccount,
                EDRPOU: dco.EDRPOU
            } as DisbursementCashOrder
        `);
    } finally {
        await session.close();
    }

    return result.records
        .map(item => item.get('DisbursementCashOrder'))
        .map(props => {
            let node = props

            let prop: DisbursementCashOrder = {
                date: node["Date"],
                sum: node["Sum"],
                basis: node["Basis"],
                sender: node["Sender"],
                receiver: node["Receiver"],
                destinationCode: node["DestinationCode"],
                analyticalAccountingCode: node["AnalyticalAccountingCode"],
                correspondingAccount: node["CorrespondingAccount"],
                EDRPOU: node["EDRPOU"]
            };

            return prop;
        });
}

export async function getExternalDisbursementCashOrders() {
    const session: Session = driver.session();
    let result: QueryResult<Dict>;

    try {
        result = await session.run(` 
            MATCH p=(chiefCashier:ChiefCashier)<-[:ChiefCashier]-(dco:DisbursementCashOrder)-[:Transfer]->(collector:Collector) 
            RETURN 
            {
                Date: dco.date, 
                Sum: dco.sum,
                Basis: dco.basis,
                Sender: chiefCashier.name,
                Receiver: collector.name,
                DestinationCode: dco.destinationCode,
                AnalyticalAccountingCode: dco.analyticalAccountingCode,
                CorrespondingAccount: dco.correspondingAccount,
                EDRPOU: dco.EDRPOU
            } as DisbursementCashOrder
        `);
    } finally {
        await session.close();
    }

    return result.records
        .map(item => item.get('DisbursementCashOrder'))
        .map(props => {
            let node = props

            let prop: DisbursementCashOrder = {
                date: node["Date"],
                sum: node["Sum"],
                basis: node["Basis"],
                sender: node["Sender"],
                receiver: node["Receiver"],
                destinationCode: node["DestinationCode"],
                analyticalAccountingCode: node["AnalyticalAccountingCode"],
                correspondingAccount: node["CorrespondingAccount"],
                EDRPOU: node["EDRPOU"]
            };
            
            return prop;
        });
}

export async function customRequest(request: string) {
    const session = driver.session();
    const txc = session.beginTransaction();

    try {
        await txc.run(request);
        await txc.commit();
    } finally {
        await session.close();
    }
}