"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.wrapErrors = exports.logErrors = void 0;
var boom_1 = __importDefault(require("@hapi/boom"));
function withErrorStack(error, stack) {
    if (process.env.DEV)
        return __assign(__assign({}, error), { stack: stack });
    return error;
}
function logErrors(error, req, res, next) {
    console.log(error);
    return next(error);
}
exports.logErrors = logErrors;
function wrapErrors(error, req, res, next) {
    //MongoDB error
    if (error.hasOwnProperty('_message') || error.hasOwnProperty('path') || error.hasOwnProperty('kind'))
        return next(boom_1.default.badRequest(error));
    if (!error.isBoom)
        return next(boom_1.default.badImplementation(error));
    return next(error);
}
exports.wrapErrors = wrapErrors;
function errorHandler(error, req, res, next) {
    var _a = error.output, statusCode = _a.statusCode, payload = _a.payload;
    return res.status(statusCode).json(withErrorStack(payload, error.stack));
}
exports.errorHandler = errorHandler;
