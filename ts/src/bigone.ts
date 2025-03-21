
//  ---------------------------------------------------------------------------

import Exchange from './abstract/bigone.js';
import { ExchangeError, ArgumentsRequired, AuthenticationError, InsufficientFunds, PermissionDenied, BadRequest, BadSymbol, RateLimitExceeded, InvalidOrder } from './base/errors.js';
import { TICK_SIZE } from './base/functions/number.js';
import { jwt } from './base/functions/rsa.js';
import { sha256 } from './static_dependencies/noble-hashes/sha256.js';
import { Int, OrderSide, OrderType } from './base/types.js';
import { Precise } from './base/Precise.js';

//  ---------------------------------------------------------------------------

/**
 * @class bigone
 * @extends Exchange
 */
export default class bigone extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'bigone',
            'name': 'BigONE',
            'countries': [ 'CN' ],
            'version': 'v3',
            'rateLimit': 1200, // 500 request per 10 minutes
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': undefined, // has but unimplemented
                'swap': undefined, // has but unimplemented
                'future': undefined, // has but unimplemented
                'option': undefined,
                'cancelAllOrders': true,
                'cancelOrder': true,
                'createOrder': true,
                'createStopLimitOrder': true,
                'createStopMarketOrder': true,
                'createStopOrder': true,
                'fetchBalance': true,
                'fetchClosedOrders': true,
                'fetchCurrencies': true,
                'fetchDepositAddress': true,
                'fetchDeposits': true,
                'fetchMarkets': true,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrders': true,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFee': false,
                'fetchTradingFees': false,
                'fetchTransactionFees': false,
                'fetchWithdrawals': true,
                'transfer': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': 'min1',
                '5m': 'min5',
                '15m': 'min15',
                '30m': 'min30',
                '1h': 'hour1',
                '3h': 'hour3',
                '4h': 'hour4',
                '6h': 'hour6',
                '12h': 'hour12',
                '1d': 'day1',
                '1w': 'week1',
                '1M': 'month1',
            },
            'hostname': 'big.one', // or 'bigone.com'
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/69354403-1d532180-0c91-11ea-88ed-44c06cefdf87.jpg',
                'api': {
                    'public': 'https://{hostname}/api/v3',
                    'private': 'https://{hostname}/api/v3/viewer',
                    'webExchange': 'https://{hostname}/api/',
                },
                'www': 'https://big.one',
                'doc': 'https://open.big.one/docs/api.html',
                'fees': 'https://bigone.zendesk.com/hc/en-us/articles/115001933374-BigONE-Fee-Policy',
                'referral': 'https://b1.run/users/new?code=D3LLBVFT',
            },
            'api': {
                'public': {
                    'get': [
                        'ping',
                        'asset_pairs',
                        'asset_pairs/{asset_pair_name}/depth',
                        'asset_pairs/{asset_pair_name}/trades',
                        'asset_pairs/{asset_pair_name}/ticker',
                        'asset_pairs/{asset_pair_name}/candles',
                        'asset_pairs/tickers',
                    ],
                },
                'private': {
                    'get': [
                        'accounts',
                        'fund/accounts',
                        'assets/{asset_symbol}/address',
                        'orders',
                        'orders/{id}',
                        'orders/multi',
                        'trades',
                        'withdrawals',
                        'deposits',
                    ],
                    'post': [
                        'orders',
                        'orders/{id}/cancel',
                        'orders/cancel',
                        'withdrawals',
                        'transfer',
                    ],
                },
                'webExchange': {
                    'get': [
                        'uc/v2/assets',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': this.parseNumber ('0.001'),
                    'taker': this.parseNumber ('0.001'),
                },
                'funding': {
                    'withdraw': {},
                },
            },
            'options': {
                'accountsByType': {
                    'spot': 'SPOT',
                    'funding': 'FUND',
                    'future': 'CONTRACT',
                    'swap': 'CONTRACT',
                },
                'transfer': {
                    'fillResponseFromRequest': true,
                },
                'exchangeMillisecondsCorrection': -100,
                'fetchCurrencies': {
                    'webApiEnable': true, // fetches from WEB
                    'webApiRetries': 5,
                    'webApiMuteFailure': true,
                },
                'defaultNetwork': 'ERC20',
                'defaultNetworks': {
                    'USDT': 'TRC20',
                },
                'networks': {
                    'ABBC': 'ABBC',
                    'ACALA': 'Acala',
                    'AETERNITY': 'Aeternity',
                    'ALGORAND': 'Algorand',
                    'APTOS': 'Aptos',
                    'ARWEAVE': 'Arweave',
                    'ASTAR': 'Astar',
                    'AVALANCHE_C': 'Avax',
                    'AVALANCHE_X': 'AvaxChain',
                    'BEAM': 'Beam',
                    'BEP20': 'BinanceSmartChain',
                    'BITCI': 'BitciChain',
                    'BTC': 'Bitcoin',
                    'BCH': 'BitcoinCash',
                    'BITCOINDIAMON': 'BitcoinDiamond',
                    'BITCOINGOLD': 'BitcoinGold',
                    'BSV': 'BitcoinSV',
                    'BUTTRUSTSYSTEM': 'BitTrustSystem',
                    'BYTOM_V2': 'BytomV2',
                    'CELO': 'Celo',
                    'CHAINX_V2': 'ChainxV2',
                    'NERVOS': 'CKB',
                    'CLASSZZ': 'Classzz',
                    'CLASSZZ_V2': 'ClasszzV2',
                    'CLOVER': 'Clover',
                    'COSMOS': 'Cosmos',
                    'CRC20': 'CRO',
                    'DASH': 'Dash',
                    'INTERNETCOMPUTER': 'Dfinity',
                    'DOGECOIN': 'Dogecoin',
                    'ECASH': 'ECash',
                    'EOS': 'EOS',
                    'ETH': 'Ethereum',
                    'ETC': 'EthereumClassic',
                    'ETHW': 'EthereumPow',
                    'FANTOM': 'Fantom',
                    'FILECOIN': 'Filecoin',
                    'FUSION': 'Fusion',
                    'GRIN': 'Grin',
                    'GXSHARES': 'Gxshares',
                    'HARMONY': 'Harmony',
                    'HRC20': 'Hecochain',
                    'HEDERA': 'Hedera',
                    'HELIUM': 'Helium',
                    'HORIZEN': 'Horizen',
                    'IOST': 'IOST',
                    'IRIS': 'IRIS',
                    'KLAYTN': 'Klaytn',
                    'KUSAMA': 'Kusama',
                    'LAMDEN': 'Lamden',
                    'LBRY': 'Lbry',
                    'LIBONOMY': 'Libonomy',
                    'LTC': 'Litecoin',
                    'MOBILECOIN': 'Mobilecoin',
                    'MONERO': 'Monero',
                    'MOONBEAM': 'Moonbeam',
                    'NEAR': 'Near',
                    'NEO': 'Neo',
                    'NEON3': 'NeoN3',
                    'BITSHARES_OLD': 'Bitshares',
                    'BITSHARES_NEW': 'NewBitshares',
                    'OASIS': 'Oasis',
                    'OKC': 'Okexchain',
                    'ONTOLOGY': 'Ontology',
                    'OPTIMISM': 'Optimism',
                    'PARALLELFINANCE': 'Parallel',
                    'PLCULTIMA': 'Plcu',
                    'PLCULTIMA2': 'Plcu2',
                    'POLKADOT': 'Polkadot',
                    'POLYGON': 'Polygon',
                    'QTUM': 'Qtum',
                    'REI': 'REI',
                    'RIPPLE': 'Ripple',
                    'SONGBIRD': 'SGB',
                    'SHIDEN': 'Shiden',
                    'SIACLASSIC': 'Sia',
                    'SIACOIN': 'SiaCore',
                    'SOLANA': 'Solana',
                    'STELLAR': 'Stellar',
                    'SUPERBITCOIN': 'SuperBitcoin',
                    'TERA': 'Tera',
                    'TERRACLASSIC': 'Terra',
                    'TERRA': 'Terra2',
                    'TEZOS': 'Tezos',
                    'TRC20': 'Tron',
                    'UCACOIN': 'Ucacoin',
                    'VANILLACASH': 'Vcash',
                    'VECHAIN': 'Vechain',
                    'VSYSTEMS': 'VSystems',
                    'WAX': 'WAX',
                    'WAYFCOIN': 'Wayfcoin',
                    'ZCASH': 'Zcash',
                    'ZEEPIN': 'Zeepin',
                    // undetermined: XinFin, YAS, Ycash
                },
                'networksById': {
                    'ABBC': 'ABBC',
                    'Acala': 'ACALA',
                    'Aeternity': 'AETERNITY',
                    'Algorand': 'ALGORAND',
                    'Aptos': 'APTOS',
                    'Arweave': 'ARWEAVE',
                    'Astar': 'ASTAR',
                    'Avax': 'AVALANCHE_C',
                    'AvaxChain': 'AVALANCHE_X',
                    'Beam': 'BEAM',
                    'BinanceSmartChain': 'BEP20',
                    'BitciChain': 'BITCI',
                    'Bitcoin': 'BTC',
                    'BitcoinCash': 'BCH',
                    'BitcoinDiamond': 'BITCOINDIAMON',
                    'BitcoinGold': 'BITCOINGOLD',
                    'BitcoinSV': 'BSV',
                    'BitTrustSystem': 'BUTTRUSTSYSTEM',
                    'BytomV2': 'BYTOM_V2',
                    'Celo': 'CELO',
                    'ChainxV2': 'CHAINX_V2',
                    'CKB': 'NERVOS',
                    'Classzz': 'CLASSZZ',
                    'ClasszzV2': 'CLASSZZ_V2',
                    'Clover': 'CLOVER',
                    'Cosmos': 'COSMOS',
                    'CRO': 'CRC20',
                    'Dash': 'DASH',
                    'Dfinity': 'INTERNETCOMPUTER',
                    'Dogecoin': 'DOGECOIN',
                    'ECash': 'ECASH',
                    'EOS': 'EOS',
                    'Ethereum': 'ETH',
                    'EthereumClassic': 'ETC',
                    'EthereumPow': 'ETHW',
                    'Fantom': 'FANTOM',
                    'Filecoin': 'FILECOIN',
                    'Fusion': 'FUSION',
                    'Grin': 'GRIN',
                    'Gxshares': 'GXSHARES',
                    'Harmony': 'HARMONY',
                    'Hecochain': 'HRC20',
                    'Hedera': 'HEDERA',
                    'Helium': 'HELIUM',
                    'Horizen': 'HORIZEN',
                    'IOST': 'IOST',
                    'IRIS': 'IRIS',
                    'Klaytn': 'KLAYTN',
                    'Kusama': 'KUSAMA',
                    'Lamden': 'LAMDEN',
                    'Lbry': 'LBRY',
                    'Libonomy': 'LIBONOMY',
                    'Litecoin': 'LTC',
                    'Mobilecoin': 'MOBILECOIN',
                    'Monero': 'MONERO',
                    'Moonbeam': 'MOONBEAM',
                    'Near': 'NEAR',
                    'Neo': 'NEO',
                    'NeoN3': 'NEON3',
                    'Bitshares': 'BITSHARES_OLD',
                    'NewBitshares': 'BITSHARES_NEW',
                    'Oasis': 'OASIS',
                    'Okexchain': 'OKC',
                    'Ontology': 'ONTOLOGY',
                    'Optimism': 'OPTIMISM',
                    'Parallel': 'PARALLELFINANCE',
                    'Plcu': 'PLCULTIMA',
                    'Plcu2': 'PLCULTIMA2',
                    'Polkadot': 'POLKADOT',
                    'Polygon': 'POLYGON',
                    'Qtum': 'QTUM',
                    'REI': 'REI',
                    'Ripple': 'RIPPLE',
                    'SGB': 'SONGBIRD',
                    'Shiden': 'SHIDEN',
                    'Sia': 'SIACLASSIC',
                    'SiaCore': 'SIACOIN',
                    'Solana': 'SOLANA',
                    'Stellar': 'STELLAR',
                    'SuperBitcoin': 'SUPERBITCOIN',
                    'Tera': 'TERA',
                    'Terra': 'TERRACLASSIC',
                    'Terra2': 'TERRA',
                    'Tezos': 'TEZOS',
                    'Tron': 'TRC20',
                    'Ucacoin': 'UCACOIN',
                    'Vcash': 'VANILLACASH',
                    'Vechain': 'VECHAIN',
                    'VSystems': 'VSYSTEMS',
                    'WAX': 'WAX',
                    'Wayfcoin': 'WAYFCOIN',
                    'Zcash': 'ZCASH',
                    'Zeepin': 'ZEEPIN',
                },
            },
            'precisionMode': TICK_SIZE,
            'exceptions': {
                'exact': {
                    '10001': BadRequest, // syntax error
                    '10005': ExchangeError, // internal error
                    "Amount's scale must greater than AssetPair's base scale": InvalidOrder,
                    "Price mulit with amount should larger than AssetPair's min_quote_value": InvalidOrder,
                    '10007': BadRequest, // parameter error, {"code":10007,"message":"Amount's scale must greater than AssetPair's base scale"}
                    '10011': ExchangeError, // system error
                    '10013': BadSymbol, // {"code":10013,"message":"Resource not found"}
                    '10014': InsufficientFunds, // {"code":10014,"message":"Insufficient funds"}
                    '10403': PermissionDenied, // permission denied
                    '10429': RateLimitExceeded, // too many requests
                    '40004': AuthenticationError, // {"code":40004,"message":"invalid jwt"}
                    '40103': AuthenticationError, // invalid otp code
                    '40104': AuthenticationError, // invalid asset pin code
                    '40301': PermissionDenied, // {"code":40301,"message":"Permission denied withdrawal create"}
                    '40302': ExchangeError, // already requested
                    '40601': ExchangeError, // resource is locked
                    '40602': ExchangeError, // resource is depleted
                    '40603': InsufficientFunds, // insufficient resource
                    '40604': InvalidOrder, // {"code":40604,"message":"Price exceed the maximum order price"}
                    '40605': InvalidOrder, // {"code":40605,"message":"Price less than the minimum order price"}
                    '40120': InvalidOrder, // Order is in trading
                    '40121': InvalidOrder, // Order is already cancelled or filled
                    '60100': BadSymbol, // {"code":60100,"message":"Asset pair is suspended"}
                },
                'broad': {
                },
            },
            'commonCurrencies': {
                'CRE': 'Cybereits',
                'FXT': 'FXTTOKEN',
                'FREE': 'FreeRossDAO',
                'MBN': 'Mobilian Coin',
                'ONE': 'BigONE Token',
            },
        });
    }

    async fetchCurrencies (params = {}) {
        /**
         * @method
         * @name bigone#fetchCurrencies
         * @description fetches all available currencies on an exchange
         * @param {dict} [params] extra parameters specific to the aax api endpoint
         * @returns {dict} an associative dictionary of currencies
         */
        // we use undocumented link (possible, less informative alternative is : https://big.one/api/uc/v3/assets/accounts)
        const data = await this.fetchWebEndpoint ('fetchCurrencies', 'webExchangeGetUcV2Assets', true);
        if (data === undefined) {
            return undefined;
        }
        //
        // {
        //     code: "0",
        //     message: "",
        //     data: [
        //       {
        //         name: "TetherUS",
        //         symbol: "USDT",
        //         contract_address: "31",
        //         is_deposit_enabled: true,
        //         is_withdrawal_enabled: true,
        //         is_stub: false,
        //         withdrawal_fee: "5.0",
        //         is_fiat: false,
        //         is_memo_required: false,
        //         logo: {
        //           default: "https://assets.peatio.com/assets/v1/color/normal/usdt.png",
        //           white: "https://assets.peatio.com/assets/v1/white/normal/usdt.png",
        //         },
        //         info_link: null,
        //         scale: "12",
        //         default_gateway: ..., // one object from "gateways"
        //         gateways: [
        //           {
        //             uuid: "f0fa5a85-7f65-428a-b7b7-13aad55c2837",
        //             name: "Mixin",
        //             kind: "CHAIN",
        //             required_confirmations: "0",
        //           },
        //           {
        //             uuid: "b75446c6-1446-4c8d-b3d1-39f385b0a926",
        //             name: "Ethereum",
        //             kind: "CHAIN",
        //             required_confirmations: "18",
        //           },
        //           {
        //             uuid: "fe9b1b0b-e55c-4017-b5ce-16f524df5fc0",
        //             name: "Tron",
        //             kind: "CHAIN",
        //             required_confirmations: "1",
        //           },
        //          ...
        //         ],
        //         payments: [],
        //         uuid: "17082d1c-0195-4fb6-8779-2cdbcb9eeb3c",
        //         binding_gateways: [
        //           {
        //             guid: "07efc37f-d1ec-4bc9-8339-a745256ea2ba",
        //             contract_address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        //             is_deposit_enabled: true,
        //             display_name: "Ethereum(ERC20)",
        //             gateway_name: "Ethereum",
        //             min_withdrawal_amount: "0.000001",
        //             min_internal_withdrawal_amount: "0.00000001",
        //             withdrawal_fee: "14",
        //             is_withdrawal_enabled: true,
        //             min_deposit_amount: "0.000001",
        //             is_memo_required: false,
        //             withdrawal_scale: "2",
        //             gateway: {
        //               uuid: "b75446c6-1446-4c8d-b3d1-39f385b0a926",
        //               name: "Ethereum",
        //               kind: "CHAIN",
        //               required_confirmations: "18",
        //             },
        //             scale: "12",
        //          },
        //          {
        //             guid: "b80a4d13-cac7-4319-842d-b33c3bfab8ec",
        //             contract_address: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        //             is_deposit_enabled: true,
        //             display_name: "Tron(TRC20)",
        //             gateway_name: "Tron",
        //             min_withdrawal_amount: "0.000001",
        //             min_internal_withdrawal_amount: "0.00000001",
        //             withdrawal_fee: "1",
        //             is_withdrawal_enabled: true,
        //             min_deposit_amount: "0.000001",
        //             is_memo_required: false,
        //             withdrawal_scale: "6",
        //             gateway: {
        //               uuid: "fe9b1b0b-e55c-4017-b5ce-16f524df5fc0",
        //               name: "Tron",
        //               kind: "CHAIN",
        //               required_confirmations: "1",
        //             },
        //             scale: "12",
        //           },
        //           ...
        //         ],
        //       },
        //       ...
        //     ],
        // }
        //
        const currenciesData = this.safeValue (data, 'data', []);
        const result = {};
        for (let i = 0; i < currenciesData.length; i++) {
            const currency = currenciesData[i];
            const id = this.safeString (currency, 'symbol');
            const code = this.safeCurrencyCode (id);
            const name = this.safeString (currency, 'name');
            const type = this.safeValue (currency, 'is_fiat') ? 'fiat' : 'crypto';
            const networks = {};
            const chains = this.safeValue (currency, 'binding_gateways', []);
            let currencyMaxPrecision = this.parsePrecision (this.safeString2 (currency, 'withdrawal_scale', 'scale'));
            let currencyDepositEnabled = undefined;
            let currencyWithdrawEnabled = undefined;
            for (let j = 0; j < chains.length; j++) {
                const chain = chains[j];
                const networkId = this.safeString (chain, 'gateway_name');
                const networkCode = this.networkIdToCode (networkId);
                const deposit = this.safeValue (chain, 'is_deposit_enabled');
                const withdraw = this.safeValue (chain, 'is_withdrawal_enabled');
                const isActive = (deposit && withdraw);
                const minDepositAmount = this.safeString (chain, 'min_deposit_amount');
                const minWithdrawalAmount = this.safeString (chain, 'min_withdrawal_amount');
                const withdrawalFee = this.safeString (chain, 'withdrawal_fee');
                const precision = this.parsePrecision (this.safeString2 (chain, 'withdrawal_scale', 'scale'));
                networks[networkCode] = {
                    'id': networkId,
                    'network': networkCode,
                    'type': type,
                    'margin': undefined,
                    'deposit': deposit,
                    'withdraw': withdraw,
                    'active': isActive,
                    'fee': this.parseNumber (withdrawalFee),
                    'precision': this.parseNumber (precision),
                    'limits': {
                        'deposit': {
                            'min': minDepositAmount,
                            'max': undefined,
                        },
                        'withdraw': {
                            'min': minWithdrawalAmount,
                            'max': undefined,
                        },
                    },
                    'info': chain,
                };
                // fill global values
                currencyDepositEnabled = (currencyDepositEnabled === undefined) || deposit ? deposit : currencyDepositEnabled;
                currencyWithdrawEnabled = (currencyWithdrawEnabled === undefined) || withdraw ? withdraw : currencyWithdrawEnabled;
                currencyMaxPrecision = (currencyMaxPrecision === undefined) || Precise.stringGt (currencyMaxPrecision, precision) ? precision : currencyMaxPrecision;
            }
            result[code] = {
                'id': id,
                'code': code,
                'info': currency,
                'name': name,
                'active': undefined,
                'deposit': currencyDepositEnabled,
                'withdraw': currencyWithdrawEnabled,
                'fee': undefined,
                'precision': this.parseNumber (currencyMaxPrecision),
                'limits': {
                    'amount': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'withdraw': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
                'networks': networks,
            };
        }
        return result;
    }

    async fetchMarkets (params = {}) {
        /**
         * @method
         * @name bigone#fetchMarkets
         * @description retrieves data on all markets for bigone
         * @param {object} [params] extra parameters specific to the exchange api endpoint
         * @returns {object[]} an array of objects representing market data
         */
        const response = await this.publicGetAssetPairs (params);
        //
        //     {
        //         "code":0,
        //         "data":[
        //             {
        //                 "id":"01e48809-b42f-4a38-96b1-c4c547365db1",
        //                 "name":"PCX-BTC",
        //                 "quote_scale":7,
        //                 "quote_asset":{
        //                     "id":"0df9c3c3-255a-46d7-ab82-dedae169fba9",
        //                     "symbol":"BTC",
        //                     "name":"Bitcoin",
        //                 },
        //                 "base_asset":{
        //                     "id":"405484f7-4b03-4378-a9c1-2bd718ecab51",
        //                     "symbol":"PCX",
        //                     "name":"ChainX",
        //                 },
        //                 "base_scale":3,
        //                 "min_quote_value":"0.0001",
        //                 "max_quote_value":"35"
        //             },
        //         ]
        //     }
        //
        const markets = this.safeValue (response, 'data', []);
        const result = [];
        for (let i = 0; i < markets.length; i++) {
            const market = markets[i];
            const id = this.safeString (market, 'name');
            const uuid = this.safeString (market, 'id');
            const baseAsset = this.safeValue (market, 'base_asset', {});
            const quoteAsset = this.safeValue (market, 'quote_asset', {});
            const baseId = this.safeString (baseAsset, 'symbol');
            const quoteId = this.safeString (quoteAsset, 'symbol');
            const base = this.safeCurrencyCode (baseId);
            const quote = this.safeCurrencyCode (quoteId);
            const entry = {
                'id': id,
                'uuid': uuid,
                'symbol': base + '/' + quote,
                'base': base,
                'quote': quote,
                'settle': undefined,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': undefined,
                'type': 'spot',
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'active': true,
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': this.parseNumber (this.parsePrecision (this.safeString (market, 'base_scale'))),
                    'price': this.parseNumber (this.parsePrecision (this.safeString (market, 'quote_scale'))),
                },
                'limits': {
                    'leverage': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'amount': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'price': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'cost': {
                        'min': this.safeNumber (market, 'min_quote_value'),
                        'max': this.safeNumber (market, 'max_quote_value'),
                    },
                },
                'info': market,
            };
            result.push (entry);
        }
        return result;
    }

    async loadMarkets (reload = false, params = {}) {
        const markets = await super.loadMarkets (reload, params);
        let marketsByUuid = this.safeValue (this.options, 'marketsByUuid');
        if ((marketsByUuid === undefined) || reload) {
            marketsByUuid = {};
            for (let i = 0; i < this.symbols.length; i++) {
                const symbol = this.symbols[i];
                const market = this.markets[symbol];
                const uuid = this.safeString (market, 'uuid');
                marketsByUuid[uuid] = market;
            }
            this.options['marketsByUuid'] = marketsByUuid;
        }
        return markets;
    }

    parseTicker (ticker, market = undefined) {
        //
        //     {
        //         "asset_pair_name":"ETH-BTC",
        //         "bid":{"price":"0.021593","order_count":1,"quantity":"0.20936"},
        //         "ask":{"price":"0.021613","order_count":1,"quantity":"2.87064"},
        //         "open":"0.021795",
        //         "high":"0.021795",
        //         "low":"0.021471",
        //         "close":"0.021613",
        //         "volume":"117078.90431",
        //         "daily_change":"-0.000182"
        //     }
        //
        const marketId = this.safeString (ticker, 'asset_pair_name');
        const symbol = this.safeSymbol (marketId, market, '-');
        const timestamp = undefined;
        const close = this.safeString (ticker, 'close');
        const bid = this.safeValue (ticker, 'bid', {});
        const ask = this.safeValue (ticker, 'ask', {});
        return this.safeTicker ({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeString (ticker, 'high'),
            'low': this.safeString (ticker, 'low'),
            'bid': this.safeString (bid, 'price'),
            'bidVolume': this.safeString (bid, 'quantity'),
            'ask': this.safeString (ask, 'price'),
            'askVolume': this.safeString (ask, 'quantity'),
            'vwap': undefined,
            'open': this.safeString (ticker, 'open'),
            'close': close,
            'last': close,
            'previousClose': undefined,
            'change': this.safeString (ticker, 'daily_change'),
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeString (ticker, 'volume'),
            'quoteVolume': undefined,
            'info': ticker,
        }, market);
    }

    async fetchTicker (symbol: string, params = {}) {
        /**
         * @method
         * @name bigone#fetchTicker
         * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
         * @param {string} symbol unified symbol of the market to fetch the ticker for
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'asset_pair_name': market['id'],
        };
        const response = await this.publicGetAssetPairsAssetPairNameTicker (this.extend (request, params));
        //
        //     {
        //         "code":0,
        //         "data":{
        //             "asset_pair_name":"ETH-BTC",
        //             "bid":{"price":"0.021593","order_count":1,"quantity":"0.20936"},
        //             "ask":{"price":"0.021613","order_count":1,"quantity":"2.87064"},
        //             "open":"0.021795",
        //             "high":"0.021795",
        //             "low":"0.021471",
        //             "close":"0.021613",
        //             "volume":"117078.90431",
        //             "daily_change":"-0.000182"
        //         }
        //     }
        //
        const ticker = this.safeValue (response, 'data', {});
        return this.parseTicker (ticker, market);
    }

    async fetchTickers (symbols: string[] = undefined, params = {}) {
        /**
         * @method
         * @name bigone#fetchTickers
         * @description fetches price tickers for multiple markets, statistical calculations with the information calculated over the past 24 hours each market
         * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets ();
        const request = {};
        symbols = this.marketSymbols (symbols);
        if (symbols !== undefined) {
            const ids = this.marketIds (symbols);
            request['pair_names'] = ids.join (',');
        }
        const response = await this.publicGetAssetPairsTickers (this.extend (request, params));
        //
        //     {
        //         "code":0,
        //         "data":[
        //             {
        //                 "asset_pair_name":"PCX-BTC",
        //                 "bid":{"price":"0.000234","order_count":1,"quantity":"0.518"},
        //                 "ask":{"price":"0.0002348","order_count":1,"quantity":"2.348"},
        //                 "open":"0.0002343",
        //                 "high":"0.0002348",
        //                 "low":"0.0002162",
        //                 "close":"0.0002348",
        //                 "volume":"12887.016",
        //                 "daily_change":"0.0000005"
        //             },
        //             {
        //                 "asset_pair_name":"GXC-USDT",
        //                 "bid":{"price":"0.5054","order_count":1,"quantity":"40.53"},
        //                 "ask":{"price":"0.5055","order_count":1,"quantity":"38.53"},
        //                 "open":"0.5262",
        //                 "high":"0.5323",
        //                 "low":"0.5055",
        //                 "close":"0.5055",
        //                 "volume":"603963.05",
        //                 "daily_change":"-0.0207"
        //             }
        //         ]
        //     }
        //
        const tickers = this.safeValue (response, 'data', []);
        const result = {};
        for (let i = 0; i < tickers.length; i++) {
            const ticker = this.parseTicker (tickers[i]);
            const symbol = ticker['symbol'];
            result[symbol] = ticker;
        }
        return this.filterByArray (result, 'symbol', symbols);
    }

    async fetchTime (params = {}) {
        /**
         * @method
         * @name bigone#fetchTime
         * @description fetches the current integer timestamp in milliseconds from the exchange server
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {int} the current integer timestamp in milliseconds from the exchange server
         */
        const response = await this.publicGetPing (params);
        //
        //     {
        //         "data": {
        //             "timestamp": 1527665262168391000
        //         }
        //     }
        //
        const data = this.safeValue (response, 'data', {});
        const timestamp = this.safeInteger (data, 'Timestamp');
        return this.parseToInt (timestamp / 1000000);
    }

    async fetchOrderBook (symbol: string, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name bigone#fetchOrderBook
         * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @param {string} symbol unified symbol of the market to fetch the order book for
         * @param {int} [limit] the maximum amount of order book entries to return
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'asset_pair_name': market['id'],
        };
        if (limit !== undefined) {
            request['limit'] = limit; // default 50, max 200
        }
        const response = await this.publicGetAssetPairsAssetPairNameDepth (this.extend (request, params));
        //
        //     {
        //         "code":0,
        //         "data": {
        //             "asset_pair_name": "EOS-BTC",
        //             "bids": [
        //                 { "price": "42", "order_count": 4, "quantity": "23.33363711" }
        //             ],
        //             "asks": [
        //                 { "price": "45", "order_count": 2, "quantity": "4193.3283464" }
        //             ]
        //         }
        //     }
        //
        const orderbook = this.safeValue (response, 'data', {});
        return this.parseOrderBook (orderbook, market['symbol'], undefined, 'bids', 'asks', 'price', 'quantity');
    }

    parseTrade (trade, market = undefined) {
        //
        // fetchTrades (public)
        //
        //     {
        //         "id": 38199941,
        //         "price": "3378.67",
        //         "amount": "0.019812",
        //         "taker_side": "ASK",
        //         "created_at": "2019-01-29T06:05:56Z"
        //     }
        //
        // fetchMyTrades (private)
        //
        //     {
        //         "id": 10854280,
        //         "asset_pair_name": "XIN-USDT",
        //         "price": "70",
        //         "amount": "1",
        //         "taker_side": "ASK",
        //         "maker_order_id": 58284908,
        //         "taker_order_id": 58284909,
        //         "maker_fee": "0.0008",
        //         "taker_fee": "0.07",
        //         "side": "SELF_TRADING",
        //         "inserted_at": "2019-04-16T12:00:01Z"
        //     },
        //
        //     {
        //         "id": 10854263,
        //         "asset_pair_name": "XIN-USDT",
        //         "price": "75.7",
        //         "amount": "12.743149",
        //         "taker_side": "BID",
        //         "maker_order_id": null,
        //         "taker_order_id": 58284888,
        //         "maker_fee": null,
        //         "taker_fee": "0.0025486298",
        //         "side": "BID",
        //         "inserted_at": "2019-04-15T06:20:57Z"
        //     }
        //
        const timestamp = this.parse8601 (this.safeString2 (trade, 'created_at', 'inserted_at'));
        const priceString = this.safeString (trade, 'price');
        const amountString = this.safeString (trade, 'amount');
        const marketId = this.safeString (trade, 'asset_pair_name');
        market = this.safeMarket (marketId, market, '-');
        let side = this.safeString (trade, 'side');
        const takerSide = this.safeString (trade, 'taker_side');
        let takerOrMaker = undefined;
        if ((takerSide !== undefined) && (side !== undefined) && (side !== 'SELF_TRADING')) {
            takerOrMaker = (takerSide === side) ? 'taker' : 'maker';
        }
        if (side === undefined) {
            // taker side is not related to buy/sell side
            // the following code is probably a mistake
            side = (takerSide === 'ASK') ? 'sell' : 'buy';
        } else {
            if (side === 'BID') {
                side = 'buy';
            } else if (side === 'ASK') {
                side = 'sell';
            }
        }
        const makerOrderId = this.safeString (trade, 'maker_order_id');
        const takerOrderId = this.safeString (trade, 'taker_order_id');
        let orderId = undefined;
        if (makerOrderId !== undefined) {
            if (takerOrderId !== undefined) {
                orderId = [ makerOrderId, takerOrderId ];
            } else {
                orderId = makerOrderId;
            }
        } else if (takerOrderId !== undefined) {
            orderId = takerOrderId;
        }
        const id = this.safeString (trade, 'id');
        const result = {
            'id': id,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': market['symbol'],
            'order': orderId,
            'type': 'limit',
            'side': side,
            'takerOrMaker': takerOrMaker,
            'price': priceString,
            'amount': amountString,
            'cost': undefined,
            'info': trade,
        };
        let makerCurrencyCode = undefined;
        let takerCurrencyCode = undefined;
        if (takerOrMaker !== undefined) {
            if (side === 'buy') {
                if (takerOrMaker === 'maker') {
                    makerCurrencyCode = market['base'];
                    takerCurrencyCode = market['quote'];
                } else {
                    makerCurrencyCode = market['quote'];
                    takerCurrencyCode = market['base'];
                }
            } else {
                if (takerOrMaker === 'maker') {
                    makerCurrencyCode = market['quote'];
                    takerCurrencyCode = market['base'];
                } else {
                    makerCurrencyCode = market['base'];
                    takerCurrencyCode = market['quote'];
                }
            }
        } else if (side === 'SELF_TRADING') {
            if (takerSide === 'BID') {
                makerCurrencyCode = market['quote'];
                takerCurrencyCode = market['base'];
            } else if (takerSide === 'ASK') {
                makerCurrencyCode = market['base'];
                takerCurrencyCode = market['quote'];
            }
        }
        const makerFeeCost = this.safeString (trade, 'maker_fee');
        const takerFeeCost = this.safeString (trade, 'taker_fee');
        if (makerFeeCost !== undefined) {
            if (takerFeeCost !== undefined) {
                result['fees'] = [
                    { 'cost': makerFeeCost, 'currency': makerCurrencyCode },
                    { 'cost': takerFeeCost, 'currency': takerCurrencyCode },
                ];
            } else {
                result['fee'] = { 'cost': makerFeeCost, 'currency': makerCurrencyCode };
            }
        } else if (takerFeeCost !== undefined) {
            result['fee'] = { 'cost': takerFeeCost, 'currency': takerCurrencyCode };
        } else {
            result['fee'] = undefined;
        }
        return this.safeTrade (result as any, market);
    }

    async fetchTrades (symbol: string, since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name bigone#fetchTrades
         * @description get the list of most recent trades for a particular symbol
         * @param {string} symbol unified symbol of the market to fetch trades for
         * @param {int} [since] timestamp in ms of the earliest trade to fetch
         * @param {int} [limit] the maximum amount of trades to fetch
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/en/latest/manual.html?#public-trades}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'asset_pair_name': market['id'],
        };
        const response = await this.publicGetAssetPairsAssetPairNameTrades (this.extend (request, params));
        //
        //     {
        //         "code": 0,
        //         "data": [
        //             {
        //                 "id": 38199941,
        //                 "price": "3378.67",
        //                 "amount": "0.019812",
        //                 "taker_side": "ASK",
        //                 "created_at": "2019-01-29T06:05:56Z"
        //             },
        //             {
        //                 "id": 38199934,
        //                 "price": "3376.14",
        //                 "amount": "0.019384",
        //                 "taker_side": "ASK",
        //                 "created_at": "2019-01-29T06:05:40Z"
        //             }
        //         ]
        //     }
        //
        const trades = this.safeValue (response, 'data', []);
        return this.parseTrades (trades, market, since, limit);
    }

    parseOHLCV (ohlcv, market = undefined) {
        //
        //     {
        //         close: '0.021562',
        //         high: '0.021563',
        //         low: '0.02156',
        //         open: '0.021563',
        //         time: '2019-11-21T07:54:00Z',
        //         volume: '59.84376'
        //     }
        //
        return [
            this.parse8601 (this.safeString (ohlcv, 'time')),
            this.safeNumber (ohlcv, 'open'),
            this.safeNumber (ohlcv, 'high'),
            this.safeNumber (ohlcv, 'low'),
            this.safeNumber (ohlcv, 'close'),
            this.safeNumber (ohlcv, 'volume'),
        ];
    }

    async fetchOHLCV (symbol: string, timeframe = '1m', since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name bigone#fetchOHLCV
         * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int} [since] timestamp in ms of the earliest candle to fetch
         * @param {int} [limit] the maximum amount of candles to fetch
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        if (limit === undefined) {
            limit = 100; // default 100, max 500
        }
        const request = {
            'asset_pair_name': market['id'],
            'period': this.safeString (this.timeframes, timeframe, timeframe),
            'limit': limit,
        };
        if (since !== undefined) {
            // const start = this.parseToInt (since / 1000);
            const duration = this.parseTimeframe (timeframe);
            const end = this.sum (since, limit * duration * 1000);
            request['time'] = this.iso8601 (end);
        }
        const response = await this.publicGetAssetPairsAssetPairNameCandles (this.extend (request, params));
        //
        //     {
        //         code: 0,
        //         data: [
        //             {
        //                 close: '0.021656',
        //                 high: '0.021658',
        //                 low: '0.021652',
        //                 open: '0.021652',
        //                 time: '2019-11-21T09:30:00Z',
        //                 volume: '53.08664'
        //             },
        //             {
        //                 close: '0.021652',
        //                 high: '0.021656',
        //                 low: '0.021652',
        //                 open: '0.021656',
        //                 time: '2019-11-21T09:29:00Z',
        //                 volume: '88.39861'
        //             },
        //         ]
        //     }
        //
        const data = this.safeValue (response, 'data', []);
        return this.parseOHLCVs (data, market, timeframe, since, limit);
    }

    parseBalance (response) {
        const result = {
            'info': response,
            'timestamp': undefined,
            'datetime': undefined,
        };
        const balances = this.safeValue (response, 'data', []);
        for (let i = 0; i < balances.length; i++) {
            const balance = balances[i];
            const symbol = this.safeString (balance, 'asset_symbol');
            const code = this.safeCurrencyCode (symbol);
            const account = this.account ();
            account['total'] = this.safeString (balance, 'balance');
            account['used'] = this.safeString (balance, 'locked_balance');
            result[code] = account;
        }
        return this.safeBalance (result);
    }

    async fetchBalance (params = {}) {
        /**
         * @method
         * @name bigone#fetchBalance
         * @description query for balance and get the amount of funds available for trading or funds locked in orders
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object} a [balance structure]{@link https://docs.ccxt.com/en/latest/manual.html?#balance-structure}
         */
        await this.loadMarkets ();
        const type = this.safeString (params, 'type', '');
        params = this.omit (params, 'type');
        let response = undefined;
        if (type === 'funding' || type === 'fund') {
            response = await this.privateGetFundAccounts (params);
        } else {
            response = await this.privateGetAccounts (params);
        }
        //
        //     {
        //         "code":0,
        //         "data":[
        //             {"asset_symbol":"NKC","balance":"0","locked_balance":"0"},
        //             {"asset_symbol":"UBTC","balance":"0","locked_balance":"0"},
        //             {"asset_symbol":"READ","balance":"0","locked_balance":"0"},
        //         ],
        //     }
        //
        return this.parseBalance (response);
    }

    parseOrder (order, market = undefined) {
        //
        //    {
        //        "id": 10,
        //        "asset_pair_name": "EOS-BTC",
        //        "price": "10.00",
        //        "amount": "10.00",
        //        "filled_amount": "9.0",
        //        "avg_deal_price": "12.0",
        //        "side": "ASK",
        //        "state": "FILLED",
        //        "created_at":"2019-01-29T06:05:56Z",
        //        "updated_at":"2019-01-29T06:05:56Z",
        //    }
        //
        const id = this.safeString (order, 'id');
        const marketId = this.safeString (order, 'asset_pair_name');
        const symbol = this.safeSymbol (marketId, market, '-');
        const timestamp = this.parse8601 (this.safeString (order, 'created_at'));
        const price = this.safeString (order, 'price');
        const amount = this.safeString (order, 'amount');
        const average = this.safeString (order, 'avg_deal_price');
        const filled = this.safeString (order, 'filled_amount');
        const status = this.parseOrderStatus (this.safeString (order, 'state'));
        let side = this.safeString (order, 'side');
        if (side === 'BID') {
            side = 'buy';
        } else {
            side = 'sell';
        }
        const lastTradeTimestamp = this.parse8601 (this.safeString (order, 'updated_at'));
        return this.safeOrder ({
            'info': order,
            'id': id,
            'clientOrderId': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'lastTradeTimestamp': lastTradeTimestamp,
            'symbol': symbol,
            'type': undefined,
            'timeInForce': undefined,
            'postOnly': undefined,
            'side': side,
            'price': price,
            'stopPrice': undefined,
            'triggerPrice': undefined,
            'amount': amount,
            'cost': undefined,
            'average': average,
            'filled': filled,
            'remaining': undefined,
            'status': status,
            'fee': undefined,
            'trades': undefined,
        }, market);
    }

    async createOrder (symbol: string, type: OrderType, side: OrderSide, amount, price = undefined, params = {}) {
        /**
         * @method
         * @name bigone#createOrder
         * @description create a trade order
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of currency you want to trade in units of base currency
         * @param {float} price the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const requestSide = (side === 'buy') ? 'BID' : 'ASK';
        const uppercaseType = type.toUpperCase ();
        const request = {
            'asset_pair_name': market['id'], // asset pair name BTC-USDT, required
            'side': requestSide, // order side one of "ASK"/"BID", required
            'amount': this.amountToPrecision (symbol, amount), // order amount, string, required
            // 'price': this.priceToPrecision (symbol, price), // order price, string, required
            'type': uppercaseType,
            // 'operator': 'GTE', // stop orders only, GTE greater than and equal, LTE less than and equal
            // 'immediate_or_cancel': false, // limit orders only, must be false when post_only is true
            // 'post_only': false, // limit orders only, must be false when immediate_or_cancel is true
        };
        if (uppercaseType === 'LIMIT') {
            request['price'] = this.priceToPrecision (symbol, price);
        } else {
            const isStopLimit = (uppercaseType === 'STOP_LIMIT');
            const isStopMarket = (uppercaseType === 'STOP_MARKET');
            if (isStopLimit || isStopMarket) {
                const stopPrice = this.safeNumber2 (params, 'stop_price', 'stopPrice');
                if (stopPrice === undefined) {
                    throw new ArgumentsRequired (this.id + ' createOrder() requires a stop_price parameter');
                }
                request['stop_price'] = this.priceToPrecision (symbol, stopPrice);
                params = this.omit (params, [ 'stop_price', 'stopPrice' ]);
            }
            if (isStopLimit) {
                request['price'] = this.priceToPrecision (symbol, price);
            }
        }
        const response = await this.privatePostOrders (this.extend (request, params));
        //
        //    {
        //        "id": 10,
        //        "asset_pair_name": "EOS-BTC",
        //        "price": "10.00",
        //        "amount": "10.00",
        //        "filled_amount": "9.0",
        //        "avg_deal_price": "12.0",
        //        "side": "ASK",
        //        "state": "FILLED",
        //        "created_at":"2019-01-29T06:05:56Z",
        //        "updated_at":"2019-01-29T06:05:56Z"
        //    }
        //
        const order = this.safeValue (response, 'data');
        return this.parseOrder (order, market);
    }

    async cancelOrder (id: string, symbol: string = undefined, params = {}) {
        /**
         * @method
         * @name bigone#cancelOrder
         * @description cancels an open order
         * @param {string} id order id
         * @param {string} symbol Not used by bigone cancelOrder ()
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        const request = { 'id': id };
        const response = await this.privatePostOrdersIdCancel (this.extend (request, params));
        //    {
        //        "id": 10,
        //        "asset_pair_name": "EOS-BTC",
        //        "price": "10.00",
        //        "amount": "10.00",
        //        "filled_amount": "9.0",
        //        "avg_deal_price": "12.0",
        //        "side": "ASK",
        //        "state": "CANCELLED",
        //        "created_at":"2019-01-29T06:05:56Z",
        //        "updated_at":"2019-01-29T06:05:56Z"
        //    }
        const order = this.safeValue (response, 'data');
        return this.parseOrder (order);
    }

    async cancelAllOrders (symbol: string = undefined, params = {}) {
        /**
         * @method
         * @name bigone#cancelAllOrders
         * @description cancel all open orders
         * @param {string} symbol unified market symbol, only orders in the market of this symbol are cancelled when symbol is not undefined
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'asset_pair_name': market['id'],
        };
        const response = await this.privatePostOrdersCancel (this.extend (request, params));
        //
        //     {
        //         "code":0,
        //         "data": {
        //             "cancelled":[
        //                 58272370,
        //                 58272377
        //             ],
        //             "failed": []
        //         }
        //     }
        //
        return response;
    }

    async fetchOrder (id: string, symbol: string = undefined, params = {}) {
        /**
         * @method
         * @name bigone#fetchOrder
         * @description fetches information on an order made by the user
         * @param {string} symbol not used by bigone fetchOrder
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        const request = { 'id': id };
        const response = await this.privateGetOrdersId (this.extend (request, params));
        const order = this.safeValue (response, 'data', {});
        return this.parseOrder (order);
    }

    async fetchOrders (symbol: string = undefined, since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name bigone#fetchOrders
         * @description fetches information on multiple orders made by the user
         * @param {string} symbol unified market symbol of the market orders were made in
         * @param {int} [since] the earliest time in ms to fetch orders for
         * @param {int} [limit] the maximum number of  orde structures to retrieve
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchOrders() requires a symbol argument');
        }
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'asset_pair_name': market['id'],
            // 'page_token': 'dxzef', // request page after this page token
            // 'side': 'ASK', // 'ASK' or 'BID', optional
            // 'state': 'FILLED', // 'CANCELLED', 'FILLED', 'PENDING'
            // 'limit' 20, // default 20, max 200
        };
        if (limit !== undefined) {
            request['limit'] = limit; // default 20, max 200
        }
        const response = await this.privateGetOrders (this.extend (request, params));
        //
        //    {
        //        "code":0,
        //        "data": [
        //             {
        //                 "id": 10,
        //                 "asset_pair_name": "ETH-BTC",
        //                 "price": "10.00",
        //                 "amount": "10.00",
        //                 "filled_amount": "9.0",
        //                 "avg_deal_price": "12.0",
        //                 "side": "ASK",
        //                 "state": "FILLED",
        //                 "created_at":"2019-01-29T06:05:56Z",
        //                 "updated_at":"2019-01-29T06:05:56Z",
        //             },
        //         ],
        //        "page_token":"dxzef",
        //    }
        //
        const orders = this.safeValue (response, 'data', []);
        return this.parseOrders (orders, market, since, limit);
    }

    async fetchMyTrades (symbol: string = undefined, since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name bigone#fetchMyTrades
         * @description fetch all trades made by the user
         * @param {string} symbol unified market symbol
         * @param {int} [since] the earliest time in ms to fetch trades for
         * @param {int} [limit] the maximum number of trades structures to retrieve
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
         */
        await this.loadMarkets ();
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchMyTrades() requires a symbol argument');
        }
        const market = this.market (symbol);
        const request = {
            'asset_pair_name': market['id'],
            // 'page_token': 'dxzef', // request page after this page token
        };
        if (limit !== undefined) {
            request['limit'] = limit; // default 20, max 200
        }
        const response = await this.privateGetTrades (this.extend (request, params));
        //
        //     {
        //         "code": 0,
        //         "data": [
        //             {
        //                 "id": 10854280,
        //                 "asset_pair_name": "XIN-USDT",
        //                 "price": "70",
        //                 "amount": "1",
        //                 "taker_side": "ASK",
        //                 "maker_order_id": 58284908,
        //                 "taker_order_id": 58284909,
        //                 "maker_fee": "0.0008",
        //                 "taker_fee": "0.07",
        //                 "side": "SELF_TRADING",
        //                 "inserted_at": "2019-04-16T12:00:01Z"
        //             },
        //             {
        //                 "id": 10854263,
        //                 "asset_pair_name": "XIN-USDT",
        //                 "price": "75.7",
        //                 "amount": "12.743149",
        //                 "taker_side": "BID",
        //                 "maker_order_id": null,
        //                 "taker_order_id": 58284888,
        //                 "maker_fee": null,
        //                 "taker_fee": "0.0025486298",
        //                 "side": "BID",
        //                 "inserted_at": "2019-04-15T06:20:57Z"
        //             }
        //         ],
        //         "page_token":"dxfv"
        //     }
        //
        const trades = this.safeValue (response, 'data', []);
        return this.parseTrades (trades, market, since, limit);
    }

    parseOrderStatus (status) {
        const statuses = {
            'PENDING': 'open',
            'FILLED': 'closed',
            'CANCELLED': 'canceled',
        };
        return this.safeString (statuses, status);
    }

    async fetchOpenOrders (symbol: string = undefined, since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name bigone#fetchOpenOrders
         * @description fetch all unfilled currently open orders
         * @param {string} symbol unified market symbol
         * @param {int} [since] the earliest time in ms to fetch open orders for
         * @param {int} [limit] the maximum number of  open orders structures to retrieve
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const request = {
            'state': 'PENDING',
        };
        return await this.fetchOrders (symbol, since, limit, this.extend (request, params));
    }

    async fetchClosedOrders (symbol: string = undefined, since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name bigone#fetchClosedOrders
         * @description fetches information on multiple closed orders made by the user
         * @param {string} symbol unified market symbol of the market orders were made in
         * @param {int} [since] the earliest time in ms to fetch orders for
         * @param {int} [limit] the maximum number of  orde structures to retrieve
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const request = {
            'state': 'FILLED',
        };
        return await this.fetchOrders (symbol, since, limit, this.extend (request, params));
    }

    nonce () {
        const exchangeTimeCorrection = this.safeInteger (this.options, 'exchangeMillisecondsCorrection', 0) * 1000000;
        return this.sum (this.microseconds () * 1000, exchangeTimeCorrection);
    }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        const query = this.omit (params, this.extractParams (path));
        const baseUrl = this.implodeHostname (this.urls['api'][api]);
        let url = baseUrl + '/' + this.implodeParams (path, params);
        headers = {};
        if (api === 'public' || api === 'webExchange') {
            if (Object.keys (query).length) {
                url += '?' + this.urlencode (query);
            }
        } else {
            this.checkRequiredCredentials ();
            const nonce = this.nonce ().toString ();
            const request = {
                'type': 'OpenAPIV2',
                'sub': this.apiKey,
                'nonce': nonce,
                // 'recv_window': '30', // default 30
            };
            const token = jwt (request, this.encode (this.secret), sha256);
            headers['Authorization'] = 'Bearer ' + token;
            if (method === 'GET') {
                if (Object.keys (query).length) {
                    url += '?' + this.urlencode (query);
                }
            } else if (method === 'POST') {
                headers['Content-Type'] = 'application/json';
                body = this.json (query);
            }
        }
        headers['User-Agent'] = 'ccxt/' + this.id + '-' + this.version;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }

    async fetchDepositAddress (code: string, params = {}) {
        /**
         * @method
         * @name bigone#fetchDepositAddress
         * @description fetch the deposit address for a currency associated with this account
         * @param {string} code unified currency code
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object} an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}
         */
        await this.loadMarkets ();
        const currency = this.currency (code);
        const request = {
            'asset_symbol': currency['id'],
        };
        const [ networkCode, paramsOmitted ] = this.handleNetworkCodeAndParams (params);
        const response = await this.privateGetAssetsAssetSymbolAddress (this.extend (request, paramsOmitted));
        //
        // the actual response format is not the same as the documented one
        // the data key contains an array in the actual response
        //
        //     {
        //         "code":0,
        //         "message":"",
        //         "data":[
        //             {
        //                 "id":5521878,
        //                 "chain":"Bitcoin",
        //                 "value":"1GbmyKoikhpiQVZ1C9sbF17mTyvBjeobVe",
        //                 "memo":""
        //             }
        //         ]
        //     }
        //
        const data = this.safeValue (response, 'data', []);
        const dataLength = data.length;
        if (dataLength < 1) {
            throw new ExchangeError (this.id + ' fetchDepositAddress() returned empty address response');
        }
        const chainsIndexedById = this.indexBy (data, 'chain');
        const selectedNetworkId = this.selectNetworkIdFromRawNetworks (code, networkCode, chainsIndexedById);
        const addressObject = this.safeValue (chainsIndexedById, selectedNetworkId, {});
        const address = this.safeString (addressObject, 'value');
        const tag = this.safeString (addressObject, 'memo');
        this.checkAddress (address);
        return {
            'currency': code,
            'address': address,
            'tag': tag,
            'network': this.networkIdToCode (selectedNetworkId),
            'info': response,
        };
    }

    parseTransactionStatus (status) {
        const statuses = {
            // what are other statuses here?
            'WITHHOLD': 'ok', // deposits
            'UNCONFIRMED': 'pending',
            'CONFIRMED': 'ok', // withdrawals
            'COMPLETED': 'ok',
            'PENDING': 'pending',
        };
        return this.safeString (statuses, status, status);
    }

    parseTransaction (transaction, currency = undefined) {
        //
        // fetchDeposits
        //
        //     {
        //         "amount": "25.0",
        //         "asset_symbol": "BTS"
        //         "confirms": 100,
        //         "id": 5,
        //         "inserted_at": "2018-02-16T11:39:58.000Z",
        //         "is_internal": false,
        //         "kind": "default",
        //         "memo": "",
        //         "state": "WITHHOLD",
        //         "txid": "72e03037d144dae3d32b68b5045462b1049a0755",
        //         "updated_at": "2018-11-09T10:20:09.000Z",
        //     }
        //
        // fetchWithdrawals
        //
        //     {
        //         "amount": "5",
        //         "asset_symbol": "ETH",
        //         "completed_at": "2018-03-15T16:13:45.610463Z",
        //         "customer_id": "10",
        //         "id": 10,
        //         "inserted_at": "2018-03-15T16:13:45.610463Z",
        //         "is_internal": true,
        //         "note": "2018-03-15T16:13:45.610463Z",
        //         "state": "CONFIRMED",
        //         "target_address": "0x4643bb6b393ac20a6175c713175734a72517c63d6f7"
        //         "txid": "0x4643bb6b393ac20a6175c713175734a72517c63d6f73a3ca90a15356f2e967da0",
        //     }
        //
        // withdraw
        //
        //     {
        //         "id":1077391,
        //         "customer_id":1082679,
        //         "amount":"21.9000000000000000",
        //         "txid":"",
        //         "is_internal":false,
        //         "kind":"on_chain",
        //         "state":"PENDING",
        //         "inserted_at":"2020-06-03T00:50:57+00:00",
        //         "updated_at":"2020-06-03T00:50:57+00:00",
        //         "memo":"",
        //         "target_address":"rDYtYT3dBeuw376rvHqoZBKW3UmvguoBAf",
        //         "fee":"0.1000000000000000",
        //         "asset_symbol":"XRP"
        //     }
        //
        const currencyId = this.safeString (transaction, 'asset_symbol');
        const code = this.safeCurrencyCode (currencyId);
        const id = this.safeInteger (transaction, 'id');
        const amount = this.safeNumber (transaction, 'amount');
        const status = this.parseTransactionStatus (this.safeString (transaction, 'state'));
        const timestamp = this.parse8601 (this.safeString (transaction, 'inserted_at'));
        const updated = this.parse8601 (this.safeString2 (transaction, 'updated_at', 'completed_at'));
        const txid = this.safeString (transaction, 'txid');
        const address = this.safeString (transaction, 'target_address');
        const tag = this.safeString (transaction, 'memo');
        const type = ('customer_id' in transaction) ? 'deposit' : 'withdrawal';
        return {
            'info': transaction,
            'id': id,
            'txid': txid,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'network': undefined,
            'addressFrom': undefined,
            'address': undefined,
            'addressTo': address,
            'tagFrom': undefined,
            'tag': tag,
            'tagTo': undefined,
            'type': type,
            'amount': amount,
            'currency': code,
            'status': status,
            'updated': updated,
            'fee': undefined,
        };
    }

    async fetchDeposits (code: string = undefined, since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name bigone#fetchDeposits
         * @description fetch all deposits made to an account
         * @param {string} code unified currency code
         * @param {int} [since] the earliest time in ms to fetch deposits for
         * @param {int} [limit] the maximum number of deposits structures to retrieve
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        await this.loadMarkets ();
        const request = {
            // 'page_token': 'dxzef', // request page after this page token
            // 'limit': 50, // optional, default 50
            // 'kind': 'string', // optional - air_drop, big_holder_dividend, default, eosc_to_eos, internal, equally_airdrop, referral_mining, one_holder_dividend, single_customer, snapshotted_airdrop, trade_mining
            // 'asset_symbol': 'BTC', // optional
        };
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency (code);
            request['asset_symbol'] = currency['id'];
        }
        if (limit !== undefined) {
            request['limit'] = limit; // default 50
        }
        const response = await this.privateGetDeposits (this.extend (request, params));
        //
        //     {
        //         "code": 0,
        //         "page_token": "NQ==",
        //         "data": [
        //             {
        //                 "id": 5,
        //                 "amount": "25.0",
        //                 "confirms": 100,
        //                 "txid": "72e03037d144dae3d32b68b5045462b1049a0755",
        //                 "is_internal": false,
        //                 "inserted_at": "2018-02-16T11:39:58.000Z",
        //                 "updated_at": "2018-11-09T10:20:09.000Z",
        //                 "kind": "default",
        //                 "memo": "",
        //                 "state": "WITHHOLD",
        //                 "asset_symbol": "BTS"
        //             }
        //         ]
        //     }
        //
        const deposits = this.safeValue (response, 'data', []);
        return this.parseTransactions (deposits, currency, since, limit);
    }

    async fetchWithdrawals (code: string = undefined, since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name bigone#fetchWithdrawals
         * @description fetch all withdrawals made from an account
         * @param {string} code unified currency code
         * @param {int} [since] the earliest time in ms to fetch withdrawals for
         * @param {int} [limit] the maximum number of withdrawals structures to retrieve
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        await this.loadMarkets ();
        const request = {
            // 'page_token': 'dxzef', // request page after this page token
            // 'limit': 50, // optional, default 50
            // 'kind': 'string', // optional - air_drop, big_holder_dividend, default, eosc_to_eos, internal, equally_airdrop, referral_mining, one_holder_dividend, single_customer, snapshotted_airdrop, trade_mining
            // 'asset_symbol': 'BTC', // optional
        };
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency (code);
            request['asset_symbol'] = currency['id'];
        }
        if (limit !== undefined) {
            request['limit'] = limit; // default 50
        }
        const response = await this.privateGetWithdrawals (this.extend (request, params));
        //
        //     {
        //         "code": 0,
        //         "data": [
        //             {
        //                 "id": 10,
        //                 "customer_id": "10",
        //                 "asset_symbol": "ETH",
        //                 "amount": "5",
        //                 "state": "CONFIRMED",
        //                 "note": "2018-03-15T16:13:45.610463Z",
        //                 "txid": "0x4643bb6b393ac20a6175c713175734a72517c63d6f73a3ca90a15356f2e967da0",
        //                 "completed_at": "2018-03-15T16:13:45.610463Z",
        //                 "inserted_at": "2018-03-15T16:13:45.610463Z",
        //                 "is_internal": true,
        //                 "target_address": "0x4643bb6b393ac20a6175c713175734a72517c63d6f7"
        //             }
        //         ],
        //         "page_token":"dxvf"
        //     }
        //
        const withdrawals = this.safeValue (response, 'data', []);
        return this.parseTransactions (withdrawals, currency, since, limit);
    }

    async transfer (code: string, amount, fromAccount, toAccount, params = {}) {
        /**
         * @method
         * @name bigone#transfer
         * @description transfer currency internally between wallets on the same account
         * @param {string} code unified currency code
         * @param {float} amount amount to transfer
         * @param {string} fromAccount account to transfer from
         * @param {string} toAccount account to transfer to
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object} a [transfer structure]{@link https://docs.ccxt.com/#/?id=transfer-structure}
         */
        await this.loadMarkets ();
        const currency = this.currency (code);
        const accountsByType = this.safeValue (this.options, 'accountsByType', {});
        const fromId = this.safeString (accountsByType, fromAccount, fromAccount);
        const toId = this.safeString (accountsByType, toAccount, toAccount);
        const guid = this.safeString (params, 'guid', this.uuid ());
        const request = {
            'symbol': currency['id'],
            'amount': this.currencyToPrecision (code, amount),
            'from': fromId,
            'to': toId,
            'guid': guid,
            // 'type': type, // NORMAL, MASTER_TO_SUB, SUB_TO_MASTER, SUB_INTERNAL, default is NORMAL
            // 'sub_acccunt': '', // when type is NORMAL, it should be empty, and when type is others it is required
        };
        const response = await this.privatePostTransfer (this.extend (request, params));
        //
        //     {
        //         "code": 0,
        //         "data": null
        //     }
        //
        const transfer = this.parseTransfer (response, currency);
        const transferOptions = this.safeValue (this.options, 'transfer', {});
        const fillResponseFromRequest = this.safeValue (transferOptions, 'fillResponseFromRequest', true);
        if (fillResponseFromRequest) {
            transfer['fromAccount'] = fromAccount;
            transfer['toAccount'] = toAccount;
            transfer['amount'] = amount;
            transfer['id'] = guid;
        }
        return transfer;
    }

    parseTransfer (transfer, currency = undefined) {
        //
        //     {
        //         "code": 0,
        //         "data": null
        //     }
        //
        const code = this.safeNumber (transfer, 'code');
        return {
            'info': transfer,
            'id': undefined,
            'timestamp': undefined,
            'datetime': undefined,
            'currency': code,
            'amount': undefined,
            'fromAccount': undefined,
            'toAccount': undefined,
            'status': this.parseTransferStatus (code),
        };
    }

    parseTransferStatus (status) {
        const statuses = {
            '0': 'ok',
        };
        return this.safeString (statuses, status, 'failed');
    }

    async withdraw (code: string, amount, address, tag = undefined, params = {}) {
        /**
         * @method
         * @name bigone#withdraw
         * @description make a withdrawal
         * @param {string} code unified currency code
         * @param {float} amount the amount to withdraw
         * @param {string} address the address to withdraw to
         * @param {string} tag
         * @param {object} [params] extra parameters specific to the bigone api endpoint
         * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        [ tag, params ] = this.handleWithdrawTagAndParams (tag, params);
        await this.loadMarkets ();
        const currency = this.currency (code);
        const request = {
            'symbol': currency['id'],
            'target_address': address,
            'amount': this.currencyToPrecision (code, amount),
        };
        if (tag !== undefined) {
            request['memo'] = tag;
        }
        let networkCode = undefined;
        [ networkCode, params ] = this.handleNetworkCodeAndParams (params);
        if (networkCode !== undefined) {
            request['gateway_name'] = this.networkCodeToId (networkCode);
        }
        // requires write permission on the wallet
        const response = await this.privatePostWithdrawals (this.extend (request, params));
        //
        //     {
        //         "code":0,
        //         "message":"",
        //         "data":{
        //             "id":1077391,
        //             "customer_id":1082679,
        //             "amount":"21.9000000000000000",
        //             "txid":"",
        //             "is_internal":false,
        //             "kind":"on_chain",
        //             "state":"PENDING",
        //             "inserted_at":"2020-06-03T00:50:57+00:00",
        //             "updated_at":"2020-06-03T00:50:57+00:00",
        //             "memo":"",
        //             "target_address":"rDYtYT3dBeuw376rvHqoZBKW3UmvguoBAf",
        //             "fee":"0.1000000000000000",
        //             "asset_symbol":"XRP"
        //         }
        //     }
        //
        const data = this.safeValue (response, 'data', {});
        return this.parseTransaction (data, currency);
    }

    handleErrors (httpCode, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response === undefined) {
            return undefined; // fallback to default error handler
        }
        //
        //      {"code":10013,"message":"Resource not found"}
        //      {"code":40004,"message":"invalid jwt"}
        //
        const code = this.safeString (response, 'code');
        const message = this.safeString (response, 'message');
        if (code !== '0') {
            const feedback = this.id + ' ' + body;
            this.throwExactlyMatchedException (this.exceptions['exact'], message, feedback);
            this.throwExactlyMatchedException (this.exceptions['exact'], code, feedback);
            this.throwBroadlyMatchedException (this.exceptions['broad'], message, feedback);
            throw new ExchangeError (feedback); // unknown message
        }
        return undefined;
    }
}
