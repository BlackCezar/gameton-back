import { Api } from "./api"
import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'node:http'
import { AssetResponse, ClientToServerEvents, InterServerEvents, LimitPriceBid, ServerToClientEvents, SocketData, StockResp } from "./index.type";

const app = express();
const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server);
const api = new Api()
const state = {
    info: {
        account: {
            id: 0,
            name: ''
        },
        bids: [],
        assets: [],
        frozenAssets: []
    },
    maxBuyPrice: 3000,
} as {
    info: {
        account: {
            id: number;
            name: string;
        }
        bids: LimitPriceBid[];
        assets: AssetResponse[];
        frozenAssets: AssetResponse[];
    }
    maxBuyPrice: number;
}
const tickersMap: Map<string, number> = new Map()

server.listen(process.env.PORT)


io.on('connection', (socket) => {
    console.log('a user connected');
});

io.on('getStatus', (socket) => {
    socket.emit()
})

const main = async () => {
    console.log('System started')

    try {

        const tickersResponse = await api.getSymbols.getsymbols()
        const tickers = await tickersResponse.json()

        for (const tick of tickers) {
            tickersMap.set(tick.ticker.split('/').pop(), tick.id)
        }
        console.log('Ticker map setted')

        const activesResponse = await api.info.accountInfo()
        const actives = await activesResponse.json()

        state.info = actives;
        console.log('Actives', actives)

        runNews()




        setInterval(async () => {
            runNews()
        }, 1000 * 60)
    } catch (err: any) {
        console.error(err)
    }
}

const runNews = async () => {
    try {
        const response = await api.news.getLatestNews()

        if (response.status === 200) {
            const news = await response.json()
            console.log("Last news", news)

            if (news.rate < 0) {
                const stockResponse = await api.sellStock.getSellStockBySymbolId()
                const stock = await stockResponse.json() satisfies StockResp[]

                for (const ticker of news.companiesAffected) {
                    const stockId = tickersMap.get(ticker) as number

                    const sellItem = stock.find(item => item.id === stockId && item.bids?.length)
                    if (!sellItem || !sellItem.bids?.length) continue;
                    const prices = sellItem.bids.map(item => item.price) as number[]
                    const minBidPrice = Math.min(...prices)

                    if (minBidPrice > state.maxBuyPrice) continue;

                    console.log({
                        price: minBidPrice,
                        quantity: 1,
                        symbolId: sellItem.id
                    })

                    const result = await api.limitPriceBuy.placeLimitPriceBuyBid({
                        price: minBidPrice,
                        quantity: 1,
                        symbolId: sellItem.id
                    })
                    const resultMsg = await result.json()
                    console.dir(resultMsg)

                    const activesResponse = await api.info.accountInfo()
                    const actives = await activesResponse.json()
                    state.info = actives;

                    sleep(500)
                }
            } else if (news.text === 'Ожидается выплата дивидендов') {
                for (const ticker of news.companiesAffected) {
                    if (tickersMap.has(ticker) && state.info.assets.find((item) => item.name === ticker && item.quantity)) {
                        console.log(`Мы получили диведенты на ${ticker} в размере ${news.rate}%`)
                    }
                }
            } else {
                for (const ticker of news.companiesAffected) {
                    if (!tickersMap.has(ticker)) {
                        console.log(`Not ${ticker} found`)
                        continue;
                    }
                    const symbolId = tickersMap.get(ticker)

                    const quantity = state.info.assets.find(item => {
                        return item.name === ticker && item.quantity
                    })?.quantity

                    if (quantity) {
                        // const result = await api.bestPriceSell.placeBestPriceSellBid({
                        //     quantity: quantity ?? 1,
                        //     symbolId
                        // })

                        // const resultMsg = await result.json()
                        // console.dir(resultMsg)

                        // const activesResponse = await api.info.accountInfo()
                        // const actives = await activesResponse.json()
                        // state.info = actives;
                        // sleep(500)
                    }
                }
            }
        }
    } catch (err: any) {
        const data = await err.text()
        console.log('Handle error', data)
    }
}

main()

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}