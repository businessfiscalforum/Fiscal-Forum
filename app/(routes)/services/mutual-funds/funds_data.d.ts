export interface FundItem {
    amc?: string;
    code?: string;
    name?: string;
    type?: string;
    category?: string;
    navName?: string;
    minAmount?: string;
    launch?: string;
    isin?: string;
    score?: number;
}

export const FUNDS_DB: FundItem[];
