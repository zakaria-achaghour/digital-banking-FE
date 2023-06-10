export interface AccountDetail {
    accountId: string;
    balance: number,
    currentPage: number,
    totalPages: number,
    pageSize: number,
    accountOperationDTOS: AccountOperation[];
}
export interface AccountOperation {
    id: string;
    operationDate: Date;
    amount: number;
    type: string;
    description: string;
}