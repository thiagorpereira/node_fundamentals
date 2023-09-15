import http from 'node:http' //CommonJS => import/export => ESModules

import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async(req, res) => {
    const { method, url } = req

    await json(req, res)
    
    // if(method === 'GET' && url === '/users') {

    // }
    
    // if (method === 'POST' && url === '/users') {

    // }
    const route = routes.find(route => {
        return route.method === method && route.path === url
    })
    console.log(route)

    return res.writeHead(404).end()

    // return res.end('Hello World!!!!')
})

server.listen(3333)