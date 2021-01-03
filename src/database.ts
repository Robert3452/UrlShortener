import mongoose, { ConnectionOptions } from 'mongoose';

const dbUser: string = encodeURIComponent(process.env.DBUSER || "root");
const dbPassword: string = encodeURIComponent(process.env.DBPASSWORD || "");
const dbHost: string = process.env.DBHOST || "localhost";
const dbName: string = process.env.DBNAME || "test";

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

}


const dbUri =
    `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbUri, dbOptions);

const connection = mongoose.connection;


connection.once('open', () => {
    console.log('Database connection stablished')
});

connection.on('error', err => {
    console.log(err);
    process.exit(0);
})