import { Integer } from "neo4j-driver";

type Route = {
    number: Integer,
    name: string
};

export type { Route };