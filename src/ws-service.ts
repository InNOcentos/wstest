import http from 'http';
import https from 'https';
import express from 'express';
import WebSocket from 'ws'

export default class WsService {
    private app: express.Express;
    private server: http.Server | https.Server;
    private wss: WebSocket.Server | undefined;
    private connections = new Map()

    constructor () {
        this.app = express();
        this.server = http.createServer(this.app).listen(5050);
        this.setupHttpServer();
    }

    setupHttpServer() {

        this.app.get('/', function (request, response) {
            var statString;
            statString = JSON.stringify({
                clientsCount: {},
                socketsData: [1, 2, 3]
            });
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.write(statString);
            return response.end();
        });

    }

    setupIoServer(account_id: string) {
        if (!this.wss) {
            console.log("socket не запущен");
            return;
        }
        this.wss.on('connection', (socket: WebSocket) => {
            if (!this.connections.get(account_id)) {
                console.log(`new connection ${account_id}`)
                this.connections.set(account_id, socket)
            }
        })
    }

    getConnection(account_id: string) {
        return this.connections.get(account_id)
    }

    sendMessage(account_id: string, message: string) {
        let connection = this.connections.get(account_id)
        if (connection) {
            connection.socket?.send(message)
        }
    }

    start(account_id: string) {
        this.wss = new WebSocket.Server({ server: this.server })
        this.setupIoServer(account_id);
    }
}