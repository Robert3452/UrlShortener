"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var errorHandler_1 = require("./utils/handlers/errorHandler");
var notFoundHandler_1 = __importDefault(require("./utils/handlers/notFoundHandler"));
var app = express_1.default();
app.set('port', process.env.PORT || 3000);
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/', routes_1.default);
app.use(notFoundHandler_1.default);
//imprime en el terminal los errores
app.use(errorHandler_1.logErrors);
//determina los errores 
app.use(errorHandler_1.wrapErrors);
//maneja los errores y los devuelve
app.use(errorHandler_1.errorHandler);
exports.default = app;
