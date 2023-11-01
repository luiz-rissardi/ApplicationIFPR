

export interface Account {
    userName: string;
    typeAccount: number;
}

export interface AccountSeller extends Account {
    productIdAnexed: number;
}

