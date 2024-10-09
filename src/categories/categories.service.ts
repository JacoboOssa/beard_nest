import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateCategoryDTO } from "./dtos/create-category.dto";
import { UpdateCategoryDTO } from "./dtos/update-category.dto";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository (Category) private readonly categoryRepository: Repository<Category>,
    private readonly cloudinaryService: CloudinaryService){
    }

    // istanbul ignore next
    async findAll(){
        return await this.categoryRepository.find();
    }

    // istanbul ignore next
    async findOne(id:string){
        const category = await this.categoryRepository.findOneBy({id});
        if (!category){
            throw new NotFoundException('Category not found');
        }
        return category;
    }

    // istanbul ignore next
    async create(file: Express.Multer.File, createCategoryDTO: CreateCategoryDTO){
        const res = await this.cloudinaryService.uploadFile(file)
        const category = this.categoryRepository.create({
            url_image: res.secure_url,
            ...createCategoryDTO
        });
        await this.categoryRepository.save(category);
        return category
    }

    // istanbul ignore next
    async update(updateCategoryDTO: UpdateCategoryDTO){
        const category = await this.categoryRepository.preload({
            ...updateCategoryDTO
        });
        if(!category){
            throw new NotFoundException('Category not found');
        }
        try {
            await this.categoryRepository.save(category);
            return category;
        } catch (error){
            this.handleDBExceptions(error);
        }
    }

    // istanbul ignore next
    async delete(id:string){
        try {
            const category = await this.findOne(id);
            if (!category){
                throw new NotFoundException('Category not found');
            }
            await this.categoryRepository.remove(category);
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    // istanbul ignore next
    private handleDBExceptions(error: any) {
        if(error.code === '23505') {
          throw new BadRequestException('Category already exists');
        }
        throw new InternalServerErrorException(error.code);
    }
}

