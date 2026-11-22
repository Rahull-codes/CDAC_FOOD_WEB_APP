export interface Order {
    oid: number;
    odate: string;
    deldate: string | null;
    total_amount: number;
}