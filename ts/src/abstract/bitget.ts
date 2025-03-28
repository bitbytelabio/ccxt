// -------------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -------------------------------------------------------------------------------

import { implicitReturnType } from '../base/types.js';
import { Exchange as _Exchange } from '../base/Exchange.js';

interface Exchange {
    publicSpotGetNoticeQueryAllNotices (params?: {}): Promise<implicitReturnType>;
    publicSpotGetPublicTime (params?: {}): Promise<implicitReturnType>;
    publicSpotGetPublicCurrencies (params?: {}): Promise<implicitReturnType>;
    publicSpotGetPublicProducts (params?: {}): Promise<implicitReturnType>;
    publicSpotGetPublicProduct (params?: {}): Promise<implicitReturnType>;
    publicSpotGetMarketTicker (params?: {}): Promise<implicitReturnType>;
    publicSpotGetMarketTickers (params?: {}): Promise<implicitReturnType>;
    publicSpotGetMarketFills (params?: {}): Promise<implicitReturnType>;
    publicSpotGetMarketFillsHistory (params?: {}): Promise<implicitReturnType>;
    publicSpotGetMarketCandles (params?: {}): Promise<implicitReturnType>;
    publicSpotGetMarketDepth (params?: {}): Promise<implicitReturnType>;
    publicSpotGetMarketSpotVipLevel (params?: {}): Promise<implicitReturnType>;
    publicSpotGetMarketHistoryCandles (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketContracts (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketDepth (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketTicker (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketTickers (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketContractVipLevel (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketFills (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketFillsHistory (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketCandles (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketIndex (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketFundingTime (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketHistoryFundRate (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketCurrentFundRate (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketOpenInterest (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketMarkPrice (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketSymbolLeverage (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketQueryPositionLever (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketOpenLimit (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketHistoryCandles (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketHistoryIndexCandles (params?: {}): Promise<implicitReturnType>;
    publicMixGetMarketHistoryMarkCandles (params?: {}): Promise<implicitReturnType>;
    publicMarginGetCrossPublicInterestRateAndLimit (params?: {}): Promise<implicitReturnType>;
    publicMarginGetIsolatedPublicInterestRateAndLimit (params?: {}): Promise<implicitReturnType>;
    publicMarginGetCrossPublicTierData (params?: {}): Promise<implicitReturnType>;
    publicMarginGetIsolatedPublicTierData (params?: {}): Promise<implicitReturnType>;
    publicMarginGetPublicCurrencies (params?: {}): Promise<implicitReturnType>;
    publicMarginGetCrossAccountAssets (params?: {}): Promise<implicitReturnType>;
    publicMarginGetIsolatedAccountAssets (params?: {}): Promise<implicitReturnType>;
    privateSpotGetWalletDepositAddress (params?: {}): Promise<implicitReturnType>;
    privateSpotGetWalletWithdrawalList (params?: {}): Promise<implicitReturnType>;
    privateSpotGetWalletDepositList (params?: {}): Promise<implicitReturnType>;
    privateSpotGetAccountGetInfo (params?: {}): Promise<implicitReturnType>;
    privateSpotGetAccountAssets (params?: {}): Promise<implicitReturnType>;
    privateSpotGetAccountAssetsLite (params?: {}): Promise<implicitReturnType>;
    privateSpotGetAccountTransferRecords (params?: {}): Promise<implicitReturnType>;
    privateSpotPostWalletTransfer (params?: {}): Promise<implicitReturnType>;
    privateSpotPostWalletTransferV2 (params?: {}): Promise<implicitReturnType>;
    privateSpotPostWalletSubTransfer (params?: {}): Promise<implicitReturnType>;
    privateSpotPostWalletWithdrawal (params?: {}): Promise<implicitReturnType>;
    privateSpotPostWalletWithdrawalV2 (params?: {}): Promise<implicitReturnType>;
    privateSpotPostWalletWithdrawalInner (params?: {}): Promise<implicitReturnType>;
    privateSpotPostWalletWithdrawalInnerV2 (params?: {}): Promise<implicitReturnType>;
    privateSpotPostAccountSubAccountSpotAssets (params?: {}): Promise<implicitReturnType>;
    privateSpotPostAccountBills (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTradeOrders (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTradeBatchOrders (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTradeCancelOrder (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTradeCancelOrderV2 (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTradeCancelSymbolOrder (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTradeCancelBatchOrders (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTradeCancelBatchOrdersV2 (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTradeOrderInfo (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTradeOpenOrders (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTradeHistory (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTradeFills (params?: {}): Promise<implicitReturnType>;
    privateSpotPostPlanPlacePlan (params?: {}): Promise<implicitReturnType>;
    privateSpotPostPlanModifyPlan (params?: {}): Promise<implicitReturnType>;
    privateSpotPostPlanCancelPlan (params?: {}): Promise<implicitReturnType>;
    privateSpotPostPlanCurrentPlan (params?: {}): Promise<implicitReturnType>;
    privateSpotPostPlanHistoryPlan (params?: {}): Promise<implicitReturnType>;
    privateSpotPostPlanBatchCancelPlan (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceOrderOrderCurrentList (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceOrderOrderHistoryList (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceOrderCloseTrackingOrder (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceOrderUpdateTpsl (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceOrderFollowerEndOrder (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceOrderSpotInfoList (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceConfigGetTraderSettings (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceConfigGetFollowerSettings (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceUserMyTraders (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceConfigSetFollowerConfig (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceUserMyFollowers (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceConfigSetProductCode (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceUserRemoveTrader (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceProfitTotalProfitInfo (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceProfitTotalProfitList (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceProfitProfitHisList (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceProfitProfitHisDetailList (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceProfitWaitProfitDetailList (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTraceUserGetTraderInfo (params?: {}): Promise<implicitReturnType>;
    privateMixGetAccountAccount (params?: {}): Promise<implicitReturnType>;
    privateMixGetAccountAccounts (params?: {}): Promise<implicitReturnType>;
    privateMixGetPositionSinglePosition (params?: {}): Promise<implicitReturnType>;
    privateMixGetPositionSinglePositionV2 (params?: {}): Promise<implicitReturnType>;
    privateMixGetPositionAllPosition (params?: {}): Promise<implicitReturnType>;
    privateMixGetPositionAllPositionV2 (params?: {}): Promise<implicitReturnType>;
    privateMixGetAccountAccountBill (params?: {}): Promise<implicitReturnType>;
    privateMixGetAccountAccountBusinessBill (params?: {}): Promise<implicitReturnType>;
    privateMixGetOrderCurrent (params?: {}): Promise<implicitReturnType>;
    privateMixGetOrderMarginCoinCurrent (params?: {}): Promise<implicitReturnType>;
    privateMixGetOrderHistory (params?: {}): Promise<implicitReturnType>;
    privateMixGetOrderHistoryProductType (params?: {}): Promise<implicitReturnType>;
    privateMixGetOrderDetail (params?: {}): Promise<implicitReturnType>;
    privateMixGetOrderFills (params?: {}): Promise<implicitReturnType>;
    privateMixGetOrderAllFills (params?: {}): Promise<implicitReturnType>;
    privateMixGetPlanCurrentPlan (params?: {}): Promise<implicitReturnType>;
    privateMixGetPlanHistoryPlan (params?: {}): Promise<implicitReturnType>;
    privateMixGetTraceCurrentTrack (params?: {}): Promise<implicitReturnType>;
    privateMixGetTraceFollowerOrder (params?: {}): Promise<implicitReturnType>;
    privateMixGetTraceFollowerHistoryOrders (params?: {}): Promise<implicitReturnType>;
    privateMixGetTraceHistoryTrack (params?: {}): Promise<implicitReturnType>;
    privateMixGetTraceSummary (params?: {}): Promise<implicitReturnType>;
    privateMixGetTraceProfitSettleTokenIdGroup (params?: {}): Promise<implicitReturnType>;
    privateMixGetTraceProfitDateGroupList (params?: {}): Promise<implicitReturnType>;
    privateMixGetTradeProfitDateList (params?: {}): Promise<implicitReturnType>;
    privateMixGetTraceWaitProfitDateList (params?: {}): Promise<implicitReturnType>;
    privateMixGetTraceTraderSymbols (params?: {}): Promise<implicitReturnType>;
    privateMixGetTraceTraderList (params?: {}): Promise<implicitReturnType>;
    privateMixGetTraceTraderDetail (params?: {}): Promise<implicitReturnType>;
    privateMixGetTraceQueryTraceConfig (params?: {}): Promise<implicitReturnType>;
    privateMixPostAccountSubAccountContractAssets (params?: {}): Promise<implicitReturnType>;
    privateMixPostAccountOpenCount (params?: {}): Promise<implicitReturnType>;
    privateMixPostAccountSetLeverage (params?: {}): Promise<implicitReturnType>;
    privateMixPostAccountSetMargin (params?: {}): Promise<implicitReturnType>;
    privateMixPostAccountSetMarginMode (params?: {}): Promise<implicitReturnType>;
    privateMixPostAccountSetPositionMode (params?: {}): Promise<implicitReturnType>;
    privateMixPostOrderPlaceOrder (params?: {}): Promise<implicitReturnType>;
    privateMixPostOrderBatchOrders (params?: {}): Promise<implicitReturnType>;
    privateMixPostOrderCancelOrder (params?: {}): Promise<implicitReturnType>;
    privateMixPostOrderCancelBatchOrders (params?: {}): Promise<implicitReturnType>;
    privateMixPostOrderModifyOrder (params?: {}): Promise<implicitReturnType>;
    privateMixPostOrderCancelSymbolOrders (params?: {}): Promise<implicitReturnType>;
    privateMixPostOrderCancelAllOrders (params?: {}): Promise<implicitReturnType>;
    privateMixPostOrderCloseAllPositions (params?: {}): Promise<implicitReturnType>;
    privateMixPostPlanPlacePlan (params?: {}): Promise<implicitReturnType>;
    privateMixPostPlanModifyPlan (params?: {}): Promise<implicitReturnType>;
    privateMixPostPlanModifyPlanPreset (params?: {}): Promise<implicitReturnType>;
    privateMixPostPlanPlaceTPSL (params?: {}): Promise<implicitReturnType>;
    privateMixPostPlanPlaceTrailStop (params?: {}): Promise<implicitReturnType>;
    privateMixPostPlanPlacePositionsTPSL (params?: {}): Promise<implicitReturnType>;
    privateMixPostPlanModifyTPSLPlan (params?: {}): Promise<implicitReturnType>;
    privateMixPostPlanCancelPlan (params?: {}): Promise<implicitReturnType>;
    privateMixPostPlanCancelSymbolPlan (params?: {}): Promise<implicitReturnType>;
    privateMixPostPlanCancelAllPlan (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceCloseTrackOrder (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceModifyTPSL (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceSetUpCopySymbols (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceFollowerSetBatchTraceConfig (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceFollowerCloseByTrackingNo (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceFollowerCloseByAll (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceFollowerSetTpsl (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceCancelCopyTrader (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceTraderUpdateConfig (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceMyTraderList (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceMyFollowerList (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceRemoveFollower (params?: {}): Promise<implicitReturnType>;
    privateMixPostTracePublicGetFollowerConfig (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceReportOrderHistoryList (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceReportOrderCurrentList (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceQueryTraderTpslRatioConfig (params?: {}): Promise<implicitReturnType>;
    privateMixPostTraceTraderUpdateTpslRatioConfig (params?: {}): Promise<implicitReturnType>;
    privateUserGetFeeQuery (params?: {}): Promise<implicitReturnType>;
    privateUserGetSubVirtualList (params?: {}): Promise<implicitReturnType>;
    privateUserGetSubVirtualApiList (params?: {}): Promise<implicitReturnType>;
    privateUserGetTaxSpotRecord (params?: {}): Promise<implicitReturnType>;
    privateUserGetTaxFutureRecord (params?: {}): Promise<implicitReturnType>;
    privateUserGetTaxMarginRecord (params?: {}): Promise<implicitReturnType>;
    privateUserGetTaxP2pRecord (params?: {}): Promise<implicitReturnType>;
    privateUserPostSubVirtualCreate (params?: {}): Promise<implicitReturnType>;
    privateUserPostSubVirtualModify (params?: {}): Promise<implicitReturnType>;
    privateUserPostSubVirtualApiBatchCreate (params?: {}): Promise<implicitReturnType>;
    privateUserPostSubVirtualApiCreate (params?: {}): Promise<implicitReturnType>;
    privateUserPostSubVirtualApiModify (params?: {}): Promise<implicitReturnType>;
    privateP2pGetMerchantMerchantList (params?: {}): Promise<implicitReturnType>;
    privateP2pGetMerchantMerchantInfo (params?: {}): Promise<implicitReturnType>;
    privateP2pGetMerchantAdvList (params?: {}): Promise<implicitReturnType>;
    privateP2pGetMerchantOrderList (params?: {}): Promise<implicitReturnType>;
    privateBrokerGetAccountInfo (params?: {}): Promise<implicitReturnType>;
    privateBrokerGetAccountSubList (params?: {}): Promise<implicitReturnType>;
    privateBrokerGetAccountSubEmail (params?: {}): Promise<implicitReturnType>;
    privateBrokerGetAccountSubSpotAssets (params?: {}): Promise<implicitReturnType>;
    privateBrokerGetAccountSubFutureAssets (params?: {}): Promise<implicitReturnType>;
    privateBrokerGetAccountSubApiList (params?: {}): Promise<implicitReturnType>;
    privateBrokerPostAccountSubCreate (params?: {}): Promise<implicitReturnType>;
    privateBrokerPostAccountSubModify (params?: {}): Promise<implicitReturnType>;
    privateBrokerPostAccountSubModifyEmail (params?: {}): Promise<implicitReturnType>;
    privateBrokerPostAccountSubAddress (params?: {}): Promise<implicitReturnType>;
    privateBrokerPostAccountSubWithdrawal (params?: {}): Promise<implicitReturnType>;
    privateBrokerPostAccountSubAutoTransfer (params?: {}): Promise<implicitReturnType>;
    privateBrokerPostAccountSubApiCreate (params?: {}): Promise<implicitReturnType>;
    privateBrokerPostAccountSubApiModify (params?: {}): Promise<implicitReturnType>;
    privateMarginGetCrossAccountRiskRate (params?: {}): Promise<implicitReturnType>;
    privateMarginGetCrossAccountMaxTransferOutAmount (params?: {}): Promise<implicitReturnType>;
    privateMarginGetIsolatedAccountMaxTransferOutAmount (params?: {}): Promise<implicitReturnType>;
    privateMarginGetIsolatedOrderOpenOrders (params?: {}): Promise<implicitReturnType>;
    privateMarginGetIsolatedOrderHistory (params?: {}): Promise<implicitReturnType>;
    privateMarginGetIsolatedOrderFills (params?: {}): Promise<implicitReturnType>;
    privateMarginGetIsolatedLoanList (params?: {}): Promise<implicitReturnType>;
    privateMarginGetIsolatedRepayList (params?: {}): Promise<implicitReturnType>;
    privateMarginGetIsolatedInterestList (params?: {}): Promise<implicitReturnType>;
    privateMarginGetIsolatedLiquidationList (params?: {}): Promise<implicitReturnType>;
    privateMarginGetIsolatedFinList (params?: {}): Promise<implicitReturnType>;
    privateMarginGetCrossOrderOpenOrders (params?: {}): Promise<implicitReturnType>;
    privateMarginGetCrossOrderHistory (params?: {}): Promise<implicitReturnType>;
    privateMarginGetCrossOrderFills (params?: {}): Promise<implicitReturnType>;
    privateMarginGetCrossLoanList (params?: {}): Promise<implicitReturnType>;
    privateMarginGetCrossRepayList (params?: {}): Promise<implicitReturnType>;
    privateMarginGetCrossInterestList (params?: {}): Promise<implicitReturnType>;
    privateMarginGetCrossLiquidationList (params?: {}): Promise<implicitReturnType>;
    privateMarginGetCrossFinList (params?: {}): Promise<implicitReturnType>;
    privateMarginPostCrossAccountBorrow (params?: {}): Promise<implicitReturnType>;
    privateMarginPostIsolatedAccountBorrow (params?: {}): Promise<implicitReturnType>;
    privateMarginPostCrossAccountRepay (params?: {}): Promise<implicitReturnType>;
    privateMarginPostIsolatedAccountRepay (params?: {}): Promise<implicitReturnType>;
    privateMarginPostIsolatedAccountRiskRate (params?: {}): Promise<implicitReturnType>;
    privateMarginPostCrossAccountMaxBorrowableAmount (params?: {}): Promise<implicitReturnType>;
    privateMarginPostIsolatedAccountMaxBorrowableAmount (params?: {}): Promise<implicitReturnType>;
    privateMarginPostIsolatedOrderPlaceOrder (params?: {}): Promise<implicitReturnType>;
    privateMarginPostIsolatedOrderBatchPlaceOrder (params?: {}): Promise<implicitReturnType>;
    privateMarginPostIsolatedOrderCancelOrder (params?: {}): Promise<implicitReturnType>;
    privateMarginPostIsolatedOrderBatchCancelOrder (params?: {}): Promise<implicitReturnType>;
    privateMarginPostCrossOrderPlaceOrder (params?: {}): Promise<implicitReturnType>;
    privateMarginPostCrossOrderBatchPlaceOrder (params?: {}): Promise<implicitReturnType>;
    privateMarginPostCrossOrderCancelOrder (params?: {}): Promise<implicitReturnType>;
    privateMarginPostCrossOrderBatchCancelOrder (params?: {}): Promise<implicitReturnType>;
}
abstract class Exchange extends _Exchange {}

export default Exchange
