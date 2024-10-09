import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary'

import { CloudinaryResponse } from './cloudinary-response'

const streamifier = require('streamifier');


@Injectable()
export class CloudinaryService {
    // istanbul ignore next
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>{
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                (error, result) => {
                if (error){
                    return reject(error)
                } else {
                    resolve(result);
                }
            });

            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }

    // istanbul ignore next
    async uploadFiles(files: Express.Multer.File[]): Promise<CloudinaryResponse[]> {
        const uploadPromises = files.map(file => this.uploadFile(file));  // Crea un array de Promesas para cada archivo
        return Promise.all(uploadPromises); // Espera a que todas las Promesas se resuelvan
    }
}
