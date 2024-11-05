import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// import { AppModule } from '../src/app.module'; // Make sure this points to your app's root module
import { AppModule } from '../app.module'; // Make sure this points to your app's root module
// import { CreateCategoryDTO } from '../../categories/dtos/create-category.dto'; // Adjust path if necessary
import { CreateCategoryDTO } from '../categories/dtos/create-category.dto'; // Adjust path if necessary

describe('Categories (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],  // Import the main app module to ensure all dependencies are available
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/categories (POST) should create a new category', async () => {
    const CreateCategoryDTO: CreateCategoryDTO = { name: 'Electronics' };
    const fileBuffer = Buffer.from('fake-image-data');
    
    const response = await request(app.getHttpServer())
      .post('/categories')
      .field('name', CreateCategoryDTO.name)
      .attach('image', fileBuffer, 'test.png');  // Adjust 'image' if that's the field name for file uploads

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual('Electronics');
  });

  it('/categories (GET) should return all categories', async () => {
    const response = await request(app.getHttpServer()).get('/categories');
    
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('/categories/:id (GET) should return a category by id', async () => {
    const categoryId = '1'; // Use a real ID from your test setup or create one before this test.
    const response = await request(app.getHttpServer()).get(`/categories/${categoryId}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', categoryId);
    expect(response.body).toHaveProperty('name');
  });

  it('/categories/:id (PATCH) should update a category', async () => {
    const categoryId = '1'; // Use a real ID from your test setup or create one before this test.
    const updateCategoryDto = { name: 'Updated Electronics' };
    
    const response = await request(app.getHttpServer())
      .patch(`/categories/${categoryId}`)
      .send(updateCategoryDto);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Electronics');
  });

  it('/categories/:id (DELETE) should delete a category', async () => {
    const categoryId = '1'; // Use a real ID from your test setup or create one before this test.
    
    const response = await request(app.getHttpServer()).delete(`/categories/${categoryId}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Category deleted');
  });
});
