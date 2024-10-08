import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ImagesService {
    constructor(@InjectRepository (Image) private readonly imageRepository: Repository<Image>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly productsService: ProductsService){}

    async create(files: Express.Multer.File[], productId: string){
        const images = await this.cloudinaryService.uploadFiles(files);
        const product = await this.productsService.findOne(productId)
        
        // Guardar cada imagen con el ID del producto en la tabla de imágenes
        const imagesToSave = images.map((res) => {
            return this.imageRepository.create({
                url_img: res.secure_url,   // URL de la imagen en Cloudinary
                product: product,  // Relacionar con el producto
            });
        });
        await this.imageRepository.save(imagesToSave); // Guardar todas las imágenes en la base de datos
        return imagesToSave;
    }
}
