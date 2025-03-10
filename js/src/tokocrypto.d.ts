import Exchange from './abstract/tokocrypto.js';
import { Int, OrderSide, OrderType } from './base/types.js';
/**
 * @class tokocrypto
 * @extends Exchange
 */
export default class tokocrypto extends Exchange {
    describe(): any;
    nonce(): number;
    fetchTime(params?: {}): Promise<number>;
    fetchMarkets(params?: {}): Promise<any[]>;
    fetchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<import("./base/types.js").OrderBook>;
    parseTrade(trade: any, market?: any): import("./base/types.js").Trade;
    fetchTrades(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Trade[]>;
    parseTicker(ticker: any, market?: any): import("./base/types.js").Ticker;
    fetchTickers(symbols?: string[], params?: {}): Promise<import("./base/types.js").Dictionary<import("./base/types.js").Ticker>>;
    fetchTicker(symbol: string, params?: {}): Promise<import("./base/types.js").Ticker>;
    fetchBidsAsks(symbols?: string[], params?: {}): Promise<import("./base/types.js").Dictionary<import("./base/types.js").Ticker>>;
    parseOHLCV(ohlcv: any, market?: any): number[];
    fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").OHLCV[]>;
    fetchBalance(params?: {}): Promise<import("./base/types.js").Balances>;
    parseBalance(response: any, type?: any, marginMode?: any): import("./base/types.js").Balances;
    parseOrderStatus(status: any): string;
    parseOrder(order: any, market?: any): import("./base/types.js").Order;
    createOrder(symbol: string, type: OrderType, side: OrderSide, amount: any, price?: any, params?: {}): Promise<import("./base/types.js").Order>;
    fetchOrder(id: string, symbol?: string, params?: {}): Promise<import("./base/types.js").Order>;
    fetchOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Order[]>;
    fetchOpenOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Order[]>;
    fetchClosedOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Order[]>;
    cancelOrder(id: string, symbol?: string, params?: {}): Promise<import("./base/types.js").Order>;
    fetchMyTrades(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchDepositAddress(code: string, params?: {}): Promise<{
        currency: string;
        address: string;
        tag: string;
        network: string;
        info: any;
    }>;
    fetchDeposits(code?: string, since?: Int, limit?: Int, params?: {}): Promise<any>;
    fetchWithdrawals(code?: string, since?: Int, limit?: Int, params?: {}): Promise<any>;
    parseTransactionStatusByType(status: any, type?: any): string;
    parseTransaction(transaction: any, currency?: any): {
        info: any;
        id: string;
        txid: string;
        type: string;
        currency: any;
        network: string;
        amount: number;
        status: string;
        timestamp: any;
        datetime: string;
        address: string;
        addressFrom: any;
        addressTo: string;
        tag: string;
        tagFrom: any;
        tagTo: string;
        updated: number;
        comment: any;
        internal: boolean;
        fee: {
            currency: any;
            cost: any;
            rate: any;
        };
    };
    withdraw(code: string, amount: any, address: any, tag?: any, params?: {}): Promise<{
        info: any;
        id: string;
        txid: string;
        type: string;
        currency: any;
        network: string;
        amount: number;
        status: string;
        timestamp: any;
        datetime: string;
        address: string;
        addressFrom: any;
        addressTo: string;
        tag: string;
        tagFrom: any;
        tagTo: string;
        updated: number;
        comment: any;
        internal: boolean;
        fee: {
            currency: any;
            cost: any;
            rate: any;
        };
    }>;
    sign(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: any;
        method: string;
        body: any;
        headers: any;
    };
    handleErrors(code: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): any;
    calculateRateLimiterCost(api: any, method: any, path: any, params: any, config?: {}): any;
}
