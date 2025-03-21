import Exchange from './abstract/exmo.js';
import { Int, OrderSide, OrderType } from './base/types.js';
/**
 * @class exmo
 * @extends Exchange
 */
export default class exmo extends Exchange {
    describe(): any;
    modifyMarginHelper(symbol: string, amount: any, type: any, params?: {}): Promise<{
        info: any;
        type: any;
        amount: any;
        code: any;
        symbol: any;
        total: any;
        status: string;
    }>;
    parseMarginModification(data: any, market?: any): {
        info: any;
        type: any;
        amount: any;
        code: any;
        symbol: any;
        total: any;
        status: string;
    };
    reduceMargin(symbol: string, amount: any, params?: {}): Promise<{
        info: any;
        type: any;
        amount: any;
        code: any;
        symbol: any;
        total: any;
        status: string;
    }>;
    addMargin(symbol: string, amount: any, params?: {}): Promise<{
        info: any;
        type: any;
        amount: any;
        code: any;
        symbol: any;
        total: any;
        status: string;
    }>;
    fetchTradingFees(params?: {}): Promise<any>;
    fetchPrivateTradingFees(params?: {}): Promise<{}>;
    fetchPublicTradingFees(params?: {}): Promise<{}>;
    parseFixedFloatValue(input: any): number;
    fetchTransactionFees(codes?: any, params?: {}): Promise<{}>;
    fetchDepositWithdrawFees(codes?: string[], params?: {}): Promise<any>;
    parseDepositWithdrawFee(fee: any, currency?: any): any;
    fetchCurrencies(params?: {}): Promise<{}>;
    fetchMarkets(params?: {}): Promise<any[]>;
    fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").OHLCV[]>;
    parseOHLCV(ohlcv: any, market?: any): number[];
    parseBalance(response: any): import("./base/types.js").Balances;
    fetchBalance(params?: {}): Promise<import("./base/types.js").Balances>;
    fetchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<import("./base/types.js").OrderBook>;
    fetchOrderBooks(symbols?: string[], limit?: Int, params?: {}): Promise<{}>;
    parseTicker(ticker: any, market?: any): import("./base/types.js").Ticker;
    fetchTickers(symbols?: string[], params?: {}): Promise<any>;
    fetchTicker(symbol: string, params?: {}): Promise<import("./base/types.js").Ticker>;
    parseTrade(trade: any, market?: any): import("./base/types.js").Trade;
    fetchTrades(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchMyTrades(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<any>;
    createOrder(symbol: string, type: OrderType, side: OrderSide, amount: any, price?: any, params?: {}): Promise<{
        id: string;
        info: any;
        timestamp: number;
        datetime: string;
        lastTradeTimestamp: any;
        status: string;
        symbol: any;
        type: string;
        side: string;
        price: any;
        cost: any;
        amount: any;
        remaining: any;
        filled: number;
        fee: any;
        trades: any;
        clientOrderId: any;
        average: any;
    }>;
    cancelOrder(id: string, symbol?: string, params?: {}): Promise<any>;
    fetchOrder(id: string, symbol?: string, params?: {}): Promise<any>;
    fetchOrderTrades(id: string, symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchOpenOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<any>;
    parseOrder(order: any, market?: any): import("./base/types.js").Order;
    fetchCanceledOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Order[]>;
    fetchDepositAddress(code: string, params?: {}): Promise<{
        currency: string;
        address: any;
        tag: any;
        network: any;
        info: any;
    }>;
    getMarketFromTrades(trades: any): any;
    withdraw(code: string, amount: any, address: any, tag?: any, params?: {}): Promise<{
        info: any;
        id: string;
        txid: string;
        type: string;
        currency: any;
        network: string;
        amount: string;
        status: string;
        timestamp: number;
        datetime: string;
        address: any;
        addressFrom: any;
        addressTo: any;
        tag: any;
        tagFrom: any;
        tagTo: any;
        updated: number;
        comment: any;
        fee: {
            currency: any;
            cost: any;
            rate: any;
        };
    }>;
    parseTransactionStatus(status: any): string;
    parseTransaction(transaction: any, currency?: any): {
        info: any;
        id: string;
        txid: string;
        type: string;
        currency: any;
        network: string;
        amount: string;
        status: string;
        timestamp: number;
        datetime: string;
        address: any;
        addressFrom: any;
        addressTo: any;
        tag: any;
        tagFrom: any;
        tagTo: any;
        updated: number;
        comment: any;
        fee: {
            currency: any;
            cost: any;
            rate: any;
        };
    };
    fetchTransactions(code?: string, since?: Int, limit?: Int, params?: {}): Promise<any>;
    fetchWithdrawals(code?: string, since?: Int, limit?: Int, params?: {}): Promise<any>;
    fetchWithdrawal(id: string, code?: string, params?: {}): Promise<{
        info: any;
        id: string;
        txid: string;
        type: string;
        currency: any;
        network: string;
        amount: string;
        status: string;
        timestamp: number;
        datetime: string;
        address: any;
        addressFrom: any;
        addressTo: any;
        tag: any;
        tagFrom: any;
        tagTo: any;
        updated: number;
        comment: any;
        fee: {
            currency: any;
            cost: any;
            rate: any;
        };
    }>;
    fetchDeposit(id?: any, code?: string, params?: {}): Promise<{
        info: any;
        id: string;
        txid: string;
        type: string;
        currency: any;
        network: string;
        amount: string;
        status: string;
        timestamp: number;
        datetime: string;
        address: any;
        addressFrom: any;
        addressTo: any;
        tag: any;
        tagFrom: any;
        tagTo: any;
        updated: number;
        comment: any;
        fee: {
            currency: any;
            cost: any;
            rate: any;
        };
    }>;
    fetchDeposits(code?: string, since?: Int, limit?: Int, params?: {}): Promise<any>;
    sign(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: string;
        method: string;
        body: any;
        headers: any;
    };
    nonce(): number;
    handleErrors(httpCode: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): any;
}
