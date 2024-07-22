"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const service_worker_1 = require("./debian/service_worker");
const websocket_1 = require("./websocket");
router.get('/getstatus', async (req, res) => {
    const s = await (0, service_worker_1.status)();
    if (s == 0) {
        res.json({ "status": "running" }).status(200);
        return;
    }
    if (s == 1) {
        res.json({ "status": "stopped" }).status(200);
        return;
    }
    if (s == 2) {
        res.json({ "status": "ncreated" }).status(200);
        return;
    }
    res.json({ "status": "error" }).status(500);
});
router.post('/create', async (req, res) => {
    const resp = await (0, service_worker_1.create)();
    if (resp != 0) {
        res.json({ "error": "Error while creating machine" }).status(500);
        return;
    }
    res.json({ "msg": "machine created" }).status(200);
});
router.post('/stop', async (req, res) => {
    const resp = await (0, service_worker_1.stop)();
    if (resp != 0) {
        res.json({ "error": "Error while stopping machine" }).status(500);
        return;
    }
    res.json({ "msg": "machine stopped" }).status(200);
    (0, websocket_1.close)();
});
router.post('/start', async (req, res) => {
    const resp = await (0, service_worker_1.start)();
    if (resp != 0) {
        res.json({ "error": "Error while starting machine" }).status(500);
        return;
    }
    res.json({ "msg": "machine started" }).status(200);
    (0, websocket_1.init)();
});
router.post('/remove', async (req, res) => {
    const resp = await (0, service_worker_1.remove)();
    if (resp != 0) {
        res.json({ "error": "Error while removing machine" }).status(500);
        return;
    }
    res.json({ "msg": "machine removed" }).status(200);
});
exports.default = router;
//# sourceMappingURL=router.js.map