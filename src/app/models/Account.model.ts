export interface AccountDetail {
    accountId: string;
    balance: number,
    createdAt: Date,
    status: string,
    overDraft: number,
    accountOperation: AccountOperation[];
}
export interface AccountOperation {
    id: string;
    operationDate: Date;
    amount: number;
    type: string;
    description: string;
}