import { createClient } from "redis";
import { WebSocketServer, WebSocket } from "ws";

const PORT = 8080;


const wss = new WebSocketServer({ port: PORT });

const activeConnections = new Map<string, WebSocket>();

const redisSubscriber = createClient({ url: "redis://localhost:6379" });

wss.on("connection", async (ws: WebSocket, req: any) => {
    // connection ws://localhost:8080/?uid=1
    ws.send("connection established");
    const uid: number = Number(req.url.split("/?uid=")[1]);
    if (!uid) {
        ws.send("Invalid connection, UID is required");
    }
    activeConnections.set(uid.toString(), ws);
    console.log("New client connected with uid  " + uid);
    if (uid) {
        const channel = `user:sub::${uid}`;
        console.log("Subscribing to channel " + channel);
        const listner = async (message: string) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(message);
            }
        }
        try {
            await redisSubscriber.subscribe(channel, listner);
        } catch (e) {
            console.log("Error while subscribing to channel");
        }
        ws.on("close", async () => {
            activeConnections.delete(uid.toString());
            try {
                await redisSubscriber.unsubscribe(channel);
                console.log("Unsubscribed from channel " + channel);
            } catch (e) {
                console.log("Error while unsubscribing from channel");
            }
            console.log("Client with uid " + uid + " disconnected");
        })
    }
    ws.on("message", (message: string) => {
        console.log(message);
    })
});

async function startWebSocketServer() {
    try {
        await redisSubscriber.connect();
        wss.on("listening", () => {
            console.log("WebSocket Server is listening on port " + PORT);
        });
    } catch (e) {
        console.log("Error while connecting to Redis: " + e);
    }
}

startWebSocketServer();

