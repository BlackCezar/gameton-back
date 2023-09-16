import { HttpClient } from "./client";
import { BestPriceBidReq, BidResponse, ContentType, InfoResponse, LimitPriceBidReq, NewsResponse, RemoveBidReq, RequestParams, StockResp, SymbolsResp } from "./index.type";


export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    removeBid = {
        removeBid: (data: RemoveBidReq, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/RemoveBid`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    limitPriceSell = {
        /**
         * No description
         *
         * @tags place-bid-controller
         * @name PlaceLimitPriceSellBid
         * @summary Размещает заявку на продажу по цене не менее установленной
         * @request POST:/LimitPriceSell
         */
        placeLimitPriceSellBid: (data: LimitPriceBidReq, params: RequestParams = {}) =>
            this.request<BidResponse[], any>({
                path: `/LimitPriceSell`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    limitPriceBuy = {
        /**
         * No description
         *
         * @tags place-bid-controller
         * @name PlaceLimitPriceBuyBid
         * @summary Размещает заявку на покупку по цене не более установленной
         * @request POST:/LimitPriceBuy
         */
        placeLimitPriceBuyBid: (data: LimitPriceBidReq, params: RequestParams = {}) =>
            this.request<BidResponse[], any>({
                path: `/LimitPriceBuy`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    bestPriceSell = {
        /**
         * No description
         *
         * @tags place-bid-controller
         * @name PlaceBestPriceSellBid
         * @summary Размещает заявку на продажу по 'лучшей цене'
         * @request POST:/BestPriceSell
         */
        placeBestPriceSellBid: (data: BestPriceBidReq, params: RequestParams = {}) =>
            this.request<BidResponse[], any>({
                path: `/BestPriceSell`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    bestPriceBuy = {
        /**
         * No description
         *
         * @tags place-bid-controller
         * @name PlaceBestPriceBuyBid
         * @summary Размещает заявку на покупку по 'лучшей цене'
         * @request POST:/BestPriceBuy
         */
        placeBestPriceBuyBid: (data: BestPriceBidReq, params: RequestParams = {}) =>
            this.request<BidResponse[], any>({
                path: `/BestPriceBuy`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    sellStock = {
        /**
         * @description Возвращает количество активных заявок и их цену
         *
         * @tags stock-info
         * @name GetSellStockBySymbolId
         * @summary Заявки на продажу
         * @request GET:/sellStock
         */
        getSellStockBySymbolId: (params: RequestParams = {}) =>
            this.request<StockResp[], any>({
                path: `/sellStock`,
                method: "GET",
                ...params,
            }),
    };
    news = {
        /**
         * No description
         *
         * @tags news-controller
         * @name GetLatestNews
         * @summary Возвращает последнюю новость
         * @request GET:/news/LatestNews
         */
        getLatestNews: (params: RequestParams = {}) =>
            this.request<NewsResponse, any>({
                path: `/news/LatestNews`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags news-controller
         * @name GetLatestNews5
         * @summary Возвращает новости за последние 5 минут
         * @request GET:/news/LatestNews5Minutes
         */
        getLatestNews5: (params: RequestParams = {}) =>
            this.request<NewsResponse[], any>({
                path: `/news/LatestNews5Minutes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags news-controller
         * @name GetLatestNews1
         * @summary Возвращает новости за последнюю минуту
         * @request GET:/news/LatestNews1Minute
         */
        getLatestNews1: (params: RequestParams = {}) =>
            this.request<NewsResponse[], any>({
                path: `/news/LatestNews1Minute`,
                method: "GET",
                ...params,
            }),
    };
    info = {
        /**
         * No description
         *
         * @tags info-controller
         * @name AccountInfo
         * @summary Информация о счете
         * @request GET:/info
         */
        accountInfo: (params: RequestParams = {}) =>
            this.request<InfoResponse, any>({
                path: `/info`,
                method: "GET",
                ...params,
            }),
    };
    getSymbols = {
        /**
         * @description Возвращает список всех возможных активов
         *
         * @tags stock-info
         * @name Getsymbols
         * @summary Список всех активов
         * @request GET:/getSymbols
         */
        getsymbols: (params: RequestParams = {}) =>
            this.request<SymbolsResp[], any>({
                path: `/getSymbols`,
                method: "GET",
                ...params,
            }),
    };
    buyStock = {
        /**
         * @description Возвращает количество активных заявок и их цену
         *
         * @tags stock-info
         * @name GetBuyStockBySymbolId
         * @summary Заявки на покупку
         * @request GET:/buyStock
         */
        getBuyStockBySymbolId: (params: RequestParams = {}) =>
            this.request<StockResp[], any>({
                path: `/buyStock`,
                method: "GET",
                ...params,
            }),
    };
}