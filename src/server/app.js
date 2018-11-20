const express       = require("express")
const http          = require("http")
const WebSocket     = require("ws")
const Broadcaster   = require ("./Broadcaster")

const app        = express()

const httpServer = http.createServer(app)

app
	.set("views", `${process.cwd()}/src/server/views`)
	.set("view engine", "pug")
	.use(express.static(`${process.cwd()}/src/client`))

app
	.get("/", (req, res) => {
		res.render("index")
	})


const wss = new WebSocket.Server({ server: httpServer })

const broadcaster = new Broadcaster()

broadcaster.start()
broadcaster.on("data", (data) => {
	wss.clients.forEach((socket) => {
		socket.send(JSON.stringify(data))
	})
})


httpServer.listen(3000, () => {
	console.log("HTTP server listening on port 3000")
})


