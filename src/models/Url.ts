import { Document, Schema, model, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import makeId from '../utils/makeIds'


export interface ISplittedUrl extends Document {
    url: string,
    urlId: string,
    shortUrl: string
}

const splittedUrl = new Schema({
    url: { type: String, required: true },
    urlId: { type: String },
    shortUrl: { type: String },
});

splittedUrl.pre<ISplittedUrl>('save', async function (next) {
    const domain =
        process.env.DOMAIN
        || "http://localhost:3000"
    const url = this;
    url.urlId = makeId(10);
    url.shortUrl = `${domain}/${url.urlId}`;
});

const Url: Model<ISplittedUrl> = model<ISplittedUrl>('splitted-url', splittedUrl)
export default Url