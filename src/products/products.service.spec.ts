
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { NotFoundException } from '@nestjs/common';

const mockProductRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
};

const mockCategoriesService = {};

describe('ProductsService', () => {
    let service: ProductsService;
    let productRepository: Repository<Product>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                { provide: getRepositoryToken(Product), useValue: mockProductRepository },
                { provide: CategoriesService, useValue: mockCategoriesService },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return all products with status "S"', async () => {
            const result = [{ id: '1', name: 'Product 1', status: 'S' }];
            mockProductRepository.find.mockResolvedValue(result);

            expect(await service.findAll()).toEqual(result);
            expect(mockProductRepository.find).toHaveBeenCalledWith({ where: { status: 'S' } });
        });
    });

    describe('findOne', () => {
        it('should return a product if found', async () => {
            const product = { id: '1', name: 'Product 1', status: 'S' };
            mockProductRepository.findOneBy.mockResolvedValue(product);

            expect(await service.findOne('1')).toEqual(product);
        });

        it('should throw a NotFoundException if no product is found', async () => {
            mockProductRepository.findOneBy.mockResolvedValue(null);

            await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
        });

        it('should throw a NotFoundException if product status is not "S"', async () => {
            const product = { id: '1', name: 'Product 1', status: 'I' };  // Inactive product
            mockProductRepository.findOneBy.mockResolvedValue(product);

            await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
        });
    });
});
