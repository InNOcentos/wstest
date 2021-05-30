import express from 'express'

export default function startRest(ws: any) {
    const app = express()

    app.use(express.json())

    app.get('/', (req,res)=> {
        return res.json({ok: true})
    })

    app.get('/test', (req,res)=> {
        ws.start('127001')
        return res.json({ok: true})
    })

    app.listen(80, ()=> {
        console.log('listening on 80 port')
    })
}