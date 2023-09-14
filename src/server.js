import http from 'node:http' //CommonJS => import/export => ESModules
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js'
import { Database } from './database.js'

const database = new Database()



const server = http.createServer(async(req, res) => {
    const { method, url } = req

    await json(req, res)
    
    if(method === 'GET' && url === '/users') {
        return res
        .end(JSON.stringify(database.select('users')))
    }
    
    if (method === 'POST' && url === '/users') {
        console.log("FOI1")
        const {name, email} = req.body

        database.insert('users', {
            id: randomUUID(),
            name,
            email
        })

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()

    // return res.end('Hello World!!!!')
})

server.listen(3333)