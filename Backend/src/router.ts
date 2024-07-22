import express from 'express';
const router = express.Router();
import { create, start, stop, remove, status } from './debian/service_worker';
import {init as initWebSocket, close as closeWebSocket} from './websocket';

router.get('/getstatus', async (req, res) => {
    const s = await status();
    if (s == 0) {res.json({"status": "running"}).status(200); return;}
    if (s == 1) {res.json({"status": "stopped"}).status(200); return;}
    if (s == 2) {res.json({"status": "ncreated"}).status(200); return;}
    res.json({"status": "error"}).status(500);

});
router.post('/create', async (req, res) => {
    const resp = await create();
    if (resp != 0) {res.json({"error": "Error while creating machine"}).status(500); return;}
    res.json({"msg": "machine created"}).status(200);
});
router.post('/stop', async (req, res) => {
    const resp = await stop();
    if (resp != 0) {res.json({"error": "Error while stopping machine"}).status(500); return;}
    res.json({"msg": "machine stopped"}).status(200);
    closeWebSocket();
});
router.post('/start', async (req, res) => {
    const resp = await start();
    if (resp != 0) {res.json({"error": "Error while starting machine"}).status(500); return;}
    res.json({"msg": "machine started"}).status(200);
    initWebSocket();
});
router.post('/remove', async (req, res) => {
    const resp = await remove();
    if (resp != 0) {res.json({"error": "Error while removing machine"}).status(500); return;}
    res.json({"msg": "machine removed"}).status(200);
});

export default router;