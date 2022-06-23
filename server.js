const port = 3000;
import bodyParser from "body-parser";
import express from "express";
import App from "./App.js"

const server = express()

const app = new App();

// Run Tunnel to expose
// ngrok http -hostname=beakon.ngrok.io 3000

server.use(bodyParser.json());

server.get('/', (req, res) => {
    console.log(`GET /`, req.body);
    res.json({
        apiversion: "1",
        author: "PhoneBurner Team Snake Eater",
        color: "#ff0000",
        head: "default",
        tail: "default"
    })
});

server.post('/start', (req, res) => {
    console.log(`POST /start`, req.body);
    res.send('OK');
});

server.post('/move', (req, res) => {
    console.log(`POST /move`, req.body);
    const move = app.move(req.body);

    console.log(`Found Move: ${move}`);

    res.json({
        "move": move,
        "shout": "I guess I'll go up then."
    });
})

server.post('/end', (req, res) => {
    console.log(`POST /end`, req.body);
    res.send('OK');
});

server.listen(port, () => {
    console.log(`Snake Eater: listening on port ${port}`)
});
