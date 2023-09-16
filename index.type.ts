export interface RemoveBidReq {
    /**
     * id заявки
     * @format int64
     * @example 1
     */
    bidId?: number;
}

export interface LimitPriceBidReq {
    /**
     * id актива
     * @format int64
     * @min 2
     * @example 2
     */
    symbolId?: number;
    /**
     * цена
     * @format int64
     * @min 1
     * @example 100
     */
    price?: number;
    /**
     * количество
     * @format int32
     * @min 1
     * @example 1
     */
    quantity?: number;
}

export interface BidResponse {
    /**
     * Сообщение
     * @example "Ok"
     */
    message?: string;
    /**
     * id заявки
     * @format int64
     * @example 1
     */
    bidId?: number;
    /**
     * цена покупки/продажи
     * @format int64
     * @example 100
     */
    price?: number;
}

export interface BestPriceBidReq {
    /**
     * id актива
     * @format int64
     * @min 2
     * @example 2
     */
    symbolId?: number;
    /**
     * требуемое количество
     * @format int32
     * @min 1
     * @max 10000
     * @example 100
     */
    quantity?: number;
}

/** Заявки */
export interface BidStat {
    /**
     * Цена
     * @format int64
     * @example 100
     */
    price?: number;
    /**
     * Количество заявок
     * @format int32
     * @example 500
     */
    quantity?: number;
}

export interface StockResp {
    /**
     * id
     * @format int64
     * @example 2
     */
    id?: number;
    /**
     * Тикер
     * @example "Oranges/Rocks"
     */
    ticker?: string;
    /** Заявки */
    bids?: BidStat[];
}

export interface NewsResponse {
    /**
     * Дата-время новости
     * @format date-time
     */
    date?: string;
    /**
     * Текст новости
     * @example "Текст новости"
     */
    text?: string;
    /**
     * Предполагаемое влияние
     * @format int32
     * @example -30
     */
    rate?: number;
    /** Список затронутых компаний */
    companiesAffected?: string[];
}

export interface Account {
    /**
     * id аккаунта
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * Имя
     * @example "Имя"
     */
    name?: string;
}

/** замороженные активы */
export interface AssetResponse {
    /**
     * id актива
     * @format int64
     */
    id?: number;
    /** Имя актива */
    name?: string;
    /**
     * Количество
     * @format int64
     */
    quantity?: number;
}

export interface InfoResponse {
    bidId?: Account;
    /**
     * активные заявки
     * @uniqueItems true
     */
    bids?: LimitPriceBid[];
    /** замороженные активы */
    assets?: AssetResponse[];
}

/** активные заявки */
export interface LimitPriceBid {
    /** @format int64 */
    id?: number;
    account?: Account;
    /** @format int64 */
    symbolId?: number;
    /** @format int64 */
    price?: number;
    type?: "BUY" | "SELL";
    /** @format date-time */
    createDate?: string;
}

export interface SymbolsResp {
    /**
     * id актива
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * текстовое представление
     * @example "rub/dats"
     */
    ticker?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}

export type RequestParams = Omit<
    FullRequestParams,
    "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (
        securityData: SecurityDataType | null
    ) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
    extends Response {
    data: D;
    error: E;
}

export type CancelToken = Symbol | string | number;

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
}


export interface ClientToServerEvents {
    getStatus: () => void;
}

export interface ServerToClientEvents {
    getStatus: () => void;
}


export interface InterServerEvents {
    ping: () => void;
}


export interface SocketData {
}