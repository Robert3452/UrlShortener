"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dbUser = encodeURIComponent(process.env.DBUSER || "root");
var dbPassword = encodeURIComponent(process.env.DBPASSWORD || "");
var dbHost = process.env.DBHOST || "localhost";
var dbName = process.env.DBNAME || "test";
var dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
var dbUri = "mongodb+srv://" + dbUser + ":" + dbPassword + "@" + dbHost + "/" + dbName + "?retryWrites=true&w=majority";
mongoose_1.default.connect(dbUri, dbOptions);
var connection = mongoose_1.default.connection;
connection.once('open', function () {
    console.log('Database connection stablished');
});
connection.on('error', function (err) {
    console.log(err);
    process.exit(0);
});
