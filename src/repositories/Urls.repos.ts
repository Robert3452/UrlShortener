import Url, { ISplittedUrl } from '../models/Url';
import Repository from './Repository'

class Urls extends Repository {
    constructor() {
        super(Url);
    }
    async getByUrlId(urlId: string) {
        try {
            const url = await this.model.find({ urlId });
            return url
        } catch (error) {
            throw error
        }
    }
}

export default Urls;
