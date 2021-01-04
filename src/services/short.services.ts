import { Request, Response, NextFunction } from 'express';
import Url from '../repositories/Urls.repos';
import boom from '@hapi/boom'
const urlRepo = new Url();

export const shortUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { url } = req.body;

        let regex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
        if (!regex.test(url)) {
            return next(boom.badRequest("Lo sentimos, lo que ingresaste no es una url"))
        }
        const response = await urlRepo.store({ url });

        return res.status(200).json({
            data: response,
            successful: true
        });


    } catch (error) {
        next(error)
    }
}

export const getUrls = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        
    }
}

export const getUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const response = await urlRepo.getByUrlId(id);
        return res.redirect(response[0].url)

    } catch (error) {
        next(error)
    }
}