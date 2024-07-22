"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3000;
const router_1 = __importDefault(require("./router"));
(0, express_1.default)()
    .use(require('body-parser').json())
    .use(require('cors')({ origin: '*' }))
    .use('/', router_1.default)
    .listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
//# sourceMappingURL=index.js.map