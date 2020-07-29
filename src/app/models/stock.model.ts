export interface SymbolModel
{
    Name: string;
    Symbol: string;
}

export interface StockModel
{
    Ask: number;
    AskSize: number;
    BasePrice: number;
    Bid: number;
    BidSize: number;
    LastPrice: number;
    Name: string;
    Symbol: string;
    UpdateId: number;
}
