import { Model } from "mongoose";

export interface RepoCrud<T> {
    store(json: object): Promise<T>;
    update(id: string, json: object): Promise<T | null>;
    delete(id: string): Promise<T | Object | null>;
    getAll(): Promise<T[]>;
    findOneById(id: string): Promise<T | null>;
}

export default class Repository implements RepoCrud<Model<any>> {
    model: Model<any>;
    constructor(model: Model<any>) {
        this.model = model;
    }
    async delete(id: string): Promise<Object | Model<any> | null> {
        const response = await this.model.deleteOne({ _id: id });
        return response
    }
    async findOneById(id: string): Promise<Model<any> | null> {
        const url = await this.model.findById(id);
        return url
    }

    async store(json: object) {
        const url = await this.model.create(json);
        return url;
    }

    async update(id: string, json: object) {
        const response = await this.model.
            updateOne({ _id: id }, {
                $set: { ...json }
            });

        return response;
    }

    async getAll() {
        const urls = await this.model.find();
        return urls;
    }

}


