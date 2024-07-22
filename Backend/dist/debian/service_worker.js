"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.create = exports.status = exports.stop = exports.start = void 0;
const dockerode_1 = __importDefault(require("dockerode"));
const docker = new dockerode_1.default();
//0 -> super
//1 -> error
let con;
const create = async () => {
    try {
        con = await docker.createContainer({
            Image: 'debian',
            name: 'node-1',
            Tty: true
        });
        return 0;
    }
    catch (e) {
        console.error(`Error while create machine ${e}`);
        return 1;
    }
};
exports.create = create;
const remove = async () => {
    try {
        con.remove();
        con = null;
        return 0;
    }
    catch (e) {
        console.error(`Error while removing machine ${e}`);
        return 1;
    }
};
exports.remove = remove;
const start = async () => {
    try {
        con.start();
        return 0;
    }
    catch (e) {
        console.error(`Error while starting machine ${e}`);
        return 1;
    }
};
exports.start = start;
const stop = async () => {
    try {
        con.stop();
        return 0;
    }
    catch (e) {
        console.error(`Error while stopping machine ${e}`);
        return 1;
    }
};
exports.stop = stop;
const status = async () => {
    //TODO: Update this method with docker.getConatiner in a try catch
    // 0 -> running
    // 1 -> stoped
    // 2 -> notcreated 
    if (!con) {
        //notcreated
        return 2;
    }
    const containerInfo = await con.inspect();
    if (!containerInfo.State.Running)
        return 1;
    return 0;
};
exports.status = status;
//# sourceMappingURL=service_worker.js.map