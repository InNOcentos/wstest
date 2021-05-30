import server from './server'
import ws from './ws-service'

async function start () {
    const wss = new ws()
    server(wss)
}

start()