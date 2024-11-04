import { Injectable, NotFoundException } from '@nestjs/common';
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
        
        const imagesToSave = images.map((res) => {
            return this.imageRepository.create({
                url_img: res.secure_url,
                product: product,
            });
        });
        await this.imageRepository.save(imagesToSave);
        return imagesToSave;
    }

    async findImagesProduct(idProduct: string) {
        const imagesProduct = await this.imageRepository.find({
            where: { product: { id: idProduct } }, // Usa la relación 'product' en lugar de 'productId'
            //relations: ['product'], // Asegúrate de cargar la relación 'product' si necesitas acceder a los datos del producto
        });
    
        if (!imagesProduct || imagesProduct.length === 0) {
            throw new NotFoundException('Images for this product not found');
        }
    
        return imagesProduct;
    }
    
    
}
