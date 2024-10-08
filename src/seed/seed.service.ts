import { Injectable } from '@nestjs/common';
import { Blog } from '../blogs/entities/blog.entity';
import { DataSource } from 'typeorm';
import { CartItem } from '../cart_items/entities/cart_item.entity';
import { Cart } from '../carts/entities/cart.entity';
import { Category } from '../categories/entities/category.entity';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { OrderDetails } from '../orders_details/entities/order_detail';
import { Customer } from 'src/users/entities/customer.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Image } from 'src/images/entities/image.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class SeedService {
    constructor(private readonly datasource: DataSource){}

    async seed() {
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const blogRepository = queryRunner.manager.getRepository(Blog);
            const cartItemsRepository = queryRunner.manager.getRepository(CartItem);
            const cartRepository = queryRunner.manager.getRepository(Cart);
            const categoryRepository = queryRunner.manager.getRepository(Category);
            const commentRepository = queryRunner.manager.getRepository(Comment);
            const imageRepository = queryRunner.manager.getRepository(Image);
            const orderRepository = queryRunner.manager.getRepository(Order);
            const orderDetailsRepository = queryRunner.manager.getRepository(OrderDetails);
            const productRepository = queryRunner.manager.getRepository(Product)
            const userRepository = queryRunner.manager.getRepository(User);
            const customerRepository = queryRunner.manager.getRepository(Customer);

            // 1. Eliminar comentarios
            const comments = await commentRepository.find();
            await commentRepository.remove(comments);

            // 2. Eliminar cartItems
            const cartItems = await cartItemsRepository.find();
            await cartItemsRepository.remove(cartItems);

            // 10. Eliminar usuarios (Customer)
            const users = await userRepository.find();
            await userRepository.remove(users);

            // 3. Eliminar carts
            const carts = await cartRepository.find();
            await cartRepository.remove(carts);

            // 5. Eliminar orders
            const orders = await orderRepository.find();
            await orderRepository.remove(orders);

            const products = await productRepository.find();
            await productRepository.remove(products);

            // 4. Eliminar orderDetails
            const orderDetails = await orderDetailsRepository.find();
            await orderDetailsRepository.remove(orderDetails);

            // 6. Eliminar imágenes
            const images = await imageRepository.find();
            await imageRepository.remove(images);


            // 8. Eliminar categorías
            const categories = await categoryRepository.find();
            await categoryRepository.remove(categories);

            // 9. Eliminar blogs
            const blogs = await blogRepository.find();
            await blogRepository.remove(blogs);



            const blog1 = blogRepository.create({
                title: "La guía definitiva sobre aceites para barba",
                status: "A",
                content: "Descubre los mejores aceites para mantener tu barba suave, brillante y saludable. Nuestra guía cubre los mejores productos y consejos para el cuidado diario."
              });
            
              const blog2 = blogRepository.create({
                title: "5 herramientas esenciales para el cuidado de la barba",
                status: "A",
                content: "Desde peines hasta recortadoras, conoce las herramientas esenciales que todo hombre necesita para mantener una barba bien arreglada."
              });
            
              const blog3 = blogRepository.create({
                title: "Cómo estilizar una barba larga",
                status: "A",
                content: "Aprende cómo estilizar una barba larga para cualquier ocasión. Nuestros consejos te ayudarán a lograr un look limpio y sofisticado."
              });
            
              const blog4 = blogRepository.create({
                title: "Los beneficios de usar bálsamo para barba",
                status: "A",
                content: "El bálsamo para barba puede ayudarte a domar los pelos rebeldes, suavizar tu barba y proporcionar hidratación extra. Descubre cómo incorporarlo en tu rutina."
              });
            
              const blog5 = blogRepository.create({
                title: "Problemas comunes de la barba y cómo solucionarlos",
                status: "A",
                content: "Desde el crecimiento irregular hasta la caspa en la barba, discutimos los problemas más comunes de la barba y ofrecemos soluciones para mantenerla en su mejor estado."
              });

              await blogRepository.save([blog1,blog2,blog3,blog4,blog5]);

              const category1 = categoryRepository.create({
                name: "Aceites para Barba",
                url_image: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728348290/WhatsApp_Image_2024-09-30_at_9.50.57_AM_vggh2j.jpg",
              });

              const category2 = categoryRepository.create({
                name: "Bálsamos para Barba",
                url_image: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1727836211/unavd4gafbx9mla9rywd.jpg",
              });
              
              const category3 = categoryRepository.create({
                name: "Peines y Cepillos",
                url_image: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1727836211/unavd4gafbx9mla9rywd.jpg",
              });

              const category4 = categoryRepository.create({
                name: "Ceras y Cremas",
                url_image: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728348325/WhatsApp_Image_2024-09-30_at_9.52.59_AM_qybfxk.jpg",
              });

            await categoryRepository.save([category1,category2,category3,category4]);

            const product1 = productRepository.create({
                name: "Aceite para Barba de Madera",
                description: "Aceite para barba de madera de cedro y pino.",
                price: 15.99,
                stock: 10,
                status: 'S',
                category: category1,
            });

            const product2 = productRepository.create({
                name: "Aceite para Barba de Cítricos",
                description: "Aceite para barba de cítricos y menta.",
                price: 15.99,
                stock: 10,
                status: 'S',
                category: category1,
            });

            const product3 = productRepository.create({
                name: "Bálsamo para Barba de Madera",
                description: "Bálsamo para barba de madera de cedro y pino.",
                price: 12.99,
                stock: 10,
                status: 'S',
                category: category2,
            });

            const product4 = productRepository.create({
                name: "Bálsamo para Barba de Cítricos",
                description: "Bálsamo para barba de cítricos y menta.",
                price: 12.99,
                stock: 10,
                status: 'S',
                category: category2,
            });

            const product5 = productRepository.create({
                name: "Peine de Madera",
                description: "Peine de madera de sándalo.",
                price: 9.99,
                stock: 10,
                status: 'S',
                category: category3,
            });

            const product6 = productRepository.create({
                name: "Cepillo de Cerdas de Jabalí",
                description: "Cepillo de cerdas de jabalí.",
                price: 9.99,
                stock: 10,
                status: 'S',
                category: category3,
            });

            const product7 = productRepository.create({
                name: "Cera para Barba de Madera",
                description: "Cera para barba de madera de cedro y pino.",
                price: 12.99,
                stock: 10,
                status: 'S',
                category: category4,
            });

            await productRepository.save([product1,product2,product3,product4,product5,product6,product7]);

             const image1a = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359473/WhatsApp_Image_2024-09-30_at_9.56.39_AM_2_s6yinb.jpg",
                product: product1,
            });

            const image1b = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359469/WhatsApp_Image_2024-09-30_at_9.56.39_AM_1_fbzyks.jpg",
                product: product1,
            });

            const image2a = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359362/imagen_2024-09-30_094559238-removebg-preview_hscdva.png",
                product: product2,
            });

            const image2b = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359362/WhatsApp_Image_2024-09-30_at_9.56.39_AM_etdbhy.jpg",
                product: product2,
            });

            const image3a = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359362/imagen_2024-09-30_095005665-removebg-preview_epmdod.png",
                product: product3,
            });

            const image3b = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359362/WhatsApp_Image_2024-09-30_at_9.51.32_AM_z8bgt1.jpg",
                product: product3,
            });

            const image4a = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359362/WhatsApp_Image_2024-09-30_at_9.54.26_AM_e8qutz.jpg",
                product: product4,
            });

            const image4b = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359362/imagen_2024-09-30_095048976-removebg-preview_ral9ap.png",
                product: product4,
            });

            const image5a = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359362/WhatsApp_Image_2024-09-30_at_9.52.59_AM_fzrhq2.jpg",
                product: product5,
            });

            const image5b = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359362/WhatsApp_Image_2024-09-30_at_9.52.02_AM_wuhabn.jpg",
                product: product5,
            });

            const image6a = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359362/imagen_2024-09-30_095617927-removebg-preview_dezdlr.png",
                product: product6,
            });

            const image6b = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359361/WhatsApp_Image_2024-09-30_at_9.50.57_AM_bjfuzb.jpg",
                product: product6,
            });

            const image7a = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359361/WhatsApp_Image_2024-09-30_at_9.53.33_AM_bliogc.jpg",
                product: product7,
            });

            const image7b = imageRepository.create({
                url_img: "https://res.cloudinary.com/dapfvvlsy/image/upload/v1728359361/WhatsApp_Image_2024-09-30_at_9.52.34_AM_lfzowc.jpg",
                product: product7,
            });

            await imageRepository.save([
                image1a, image1b,
                image2a, image2b,
                image3a, image3b,
                image4a, image4b,
                image5a, image5b,
                image6a, image6b,
                image7a, image7b,
            ]);



            const cart1 = cartRepository.create({});
            const cart2 = cartRepository.create({});
            const cart3 = cartRepository.create({});
            const cart4 = cartRepository.create({});
            const cart5 = cartRepository.create({});
            const cart6 = cartRepository.create({});

            await cartRepository.save([cart1,cart2,cart3,cart4,cart5,cart6]);

            const cartItem1 = cartItemsRepository.create({
                total: product1.price * 2, // Cantidad: 2
                quantity: 2,
                product: product1,
                cart: cart1,
              });
              
            const cartItem2 = cartItemsRepository.create({
                total: product2.price * 1, // Cantidad: 1
                quantity: 1,
                product: product2,
                cart: cart2,
            });
              
            const cartItem3 = cartItemsRepository.create({
                total: product3.price * 3, // Cantidad: 3
                quantity: 3,
                product: product3,
                cart: cart3,
            });
              
            const cartItem4 = cartItemsRepository.create({
                total: product4.price * 1, // Cantidad: 1
                quantity: 1,
                product: product4,
                cart: cart4,
            });

            await cartItemsRepository.save([cartItem1, cartItem2, cartItem3, cartItem4]);

            

            const customer1 = customerRepository.create({
                name: "Juan",
                lastname: "Pérez",
                email: "juan.perez@example.com",
                password: bcrypt.hashSync("securePassword123",10),
                roles: ["user"],
                status: "active",
                bilingAddress: "Carrera 45 #12-34, Cali, Valle del Cauca",
                shippingAddress: "Carrera 45 #12-34, Cali, Valle del Cauca",
                phone: "+57 312 345 6789",
                country: "Colombia",
                city: "Cali",
                cart: cart1, 
            });
            
            const customer2 = customerRepository.create({
                name: "Laura",
                lastname: "Gómez",
                email: "laura.gomez@example.com",
                password: bcrypt.hashSync("securePassword123",10),
                roles: ["user"],
                status: "active",
                bilingAddress: "Calle 98 #25-45, Bogotá, Cundinamarca",
                shippingAddress: "Calle 98 #25-45, Bogotá, Cundinamarca",
                phone: "+57 314 567 8901",
                country: "Colombia",
                city: "Bogotá",
                cart: cart2,
            });
            
            const customer3 = customerRepository.create({
                name: "Carlos",
                lastname: "Ramírez",
                email: "carlos.ramirez@example.com",
                password: bcrypt.hashSync("securePassword123",10),
                roles: ["user"],
                status: "active",
                bilingAddress: "Carrera 78 #30-12, Medellín, Antioquia",
                shippingAddress: "Carrera 78 #30-12, Medellín, Antioquia",
                phone: "+57 311 234 5678",
                country: "Colombia",
                city: "Medellín",
                cart: cart3, // Debes tener un carrito para asociar
            });
            
            const customer4 = customerRepository.create({
                name: "Ana",
                lastname: "Sánchez",
                email: "ana.sanchez@example.com",
                password: bcrypt.hashSync("securePassword123",10),
                roles: ["user"],
                status: "active",
                bilingAddress: "Calle 45 #15-67, Cartagena, Bolívar",
                shippingAddress: "Calle 45 #15-67, Cartagena, Bolívar",
                phone: "+57 315 678 1234",
                country: "Colombia",
                city: "Cartagena",
                cart: cart4, // Debes tener un carrito para asociar
            });
            
            const customer5 = customerRepository.create({
                name: "Mario",
                lastname: "López",
                email: "mario.lopez@example.com",
                password: bcrypt.hashSync("securePassword123",10),
                roles: ["user"],
                status: "active",
                bilingAddress: "Carrera 20 #45-30, Barranquilla, Atlántico",
                shippingAddress: "Carrera 20 #45-30, Barranquilla, Atlántico",
                phone: "+57 310 987 6543",
                country: "Colombia",
                city: "Barranquilla",
                cart: cart5, // Debes tener un carrito para asociar
            });
            
            const customer6 = customerRepository.create({
                name: "Paola",
                lastname: "Martínez",
                email: "paola.martinez@example.com",
                password: bcrypt.hashSync("securePassword123",10),
                roles: ["user"],
                status: "active",
                bilingAddress: "Carrera 10 #30-45, Bucaramanga, Santander",
                shippingAddress: "Carrera 10 #30-45, Bucaramanga, Santander",
                phone: "+57 316 543 2109",
                country: "Colombia",
                city: "Bucaramanga",
                cart: cart6, // Debes tener un carrito para asociar
            });

            await customerRepository.save([customer1,customer2,customer3,customer4,customer5,customer6]);

            const comment1 = commentRepository.create({
                content: "Excelente producto, lo recomiendo.",
                stars: 5,
                customer: customer1,
                product: product1,
            });

            const comment2 = commentRepository.create({
                content: "Muy buen producto, me encantó.",
                stars: 4,
                customer: customer2,
                product: product2,
            });

            const comment3 = commentRepository.create({
                content: "Buena calidad, volvería a comprar.",
                stars: 4,
                customer: customer3,
                product: product3,
            });

            const comment4 = commentRepository.create({
                content: "Muy buen producto, lo recomiendo.",
                stars: 5,
                customer: customer4,
                product: product4,
            });

            const comment5 = commentRepository.create({
                content: "Excelente producto, me encantó.",
                stars: 5,
                customer: customer5,
                product: product5,
            });

            const comment6 = commentRepository.create({
                content: "Buena calidad, volvería a comprar.",
                stars: 4,
                customer: customer6,
                product: product6,
            });

            const comment7 = commentRepository.create({
                content: "Muy buen producto, lo recomiendo.",
                stars: 5,
                customer: customer1,
                product: product7,
            });

            const comment8 = commentRepository.create({
                content: "Excelente producto, me encantó.",
                stars: 5,
                customer: customer2,
                product: product1,
            });

            const comment9 = commentRepository.create({
                content: "Buena calidad, volvería a comprar.",
                stars: 4,
                customer: customer3,
                product: product2,
            });

            await commentRepository.save([
                comment1,comment2,comment3,comment4,comment5,comment6,comment7,comment8,comment9
            ]);

            const order1 = orderRepository.create({
                amount: 150.99,
                shipping_address: "Carrera 45 #12-34, Cali, Valle del Cauca",
                order_address: "Carrera 45 #12-34, Cali, Valle del Cauca",
                day: 5,
                month: 10,
                year: 2023,
                order_status: "Procesando",
                customer: customer1 // Asegúrate de que esta sea una instancia válida de Customer
            });

            const order2 = orderRepository.create({
                amount: 200.75,
                shipping_address: "Calle 98 #25-45, Bogotá, Cundinamarca",
                order_address: "Calle 98 #25-45, Bogotá, Cundinamarca",
                day: 10,
                month: 9,
                year: 2023,
                order_status: "Enviado",
                customer: customer2
            });

            const order3 = orderRepository.create({
                amount: 89.50,
                shipping_address: "Carrera 78 #30-12, Medellín, Antioquia",
                order_address: "Carrera 78 #30-12, Medellín, Antioquia",
                day: 18,
                month: 8,
                year: 2023,
                order_status: "Entregado",
                customer: customer3
            });

            const order4 = orderRepository.create({
                amount: 350.00,
                shipping_address: "Calle 45 #15-67, Cartagena, Bolívar",
                order_address: "Calle 45 #15-67, Cartagena, Bolívar",
                day: 22,
                month: 7,
                year: 2023,
                order_status: "Cancelado",
                customer: customer4
            });

            const order5 = orderRepository.create({
                amount: 500.99,
                shipping_address: "Carrera 20 #45-30, Barranquilla, Atlántico",
                order_address: "Carrera 20 #45-30, Barranquilla, Atlántico",
                day: 2,
                month: 12,
                year: 2023,
                order_status: "Procesando",
                customer: customer5
            });

            const order6 = orderRepository.create({
                amount: 75.25,
                shipping_address: "Carrera 10 #30-45, Bucaramanga, Santander",
                order_address: "Carrera 10 #30-45, Bucaramanga, Santander",
                day: 14,
                month: 11,
                year: 2023,
                order_status: "Pendiente",
                customer: customer6
            });

            const order7 = orderRepository.create({
                amount: 320.00,
                shipping_address: "Calle 50 #22-33, Santa Marta, Magdalena",
                order_address: "Calle 50 #22-33, Santa Marta, Magdalena",
                day: 30,
                month: 9,
                year: 2023,
                order_status: "Entregado",
                customer: customer6 
            });

            await orderRepository.save([order1, order2, order3, order4, order5, order6, order7]);

            const orderDetails1 = orderDetailsRepository.create({
                price: 50.99,
                quantity: 3,
                order: order1,
                product: product1 
            });

            const orderDetails2 = orderDetailsRepository.create({
                price: 75.50,
                quantity: 2,
                order: order2,
                product: product2
            });

            const orderDetails3 = orderDetailsRepository.create({
                price: 20.00,
                quantity: 5,
                order: order3,
                product: product3
            });

            const orderDetails4 = orderDetailsRepository.create({
                price: 100.25,
                quantity: 1,
                order: order4,
                product: product4
            });

            const orderDetails5 = orderDetailsRepository.create({
                price: 125.00,
                quantity: 4,
                order: order5,
                product: product5
            });

            await orderDetailsRepository.save([orderDetails1, orderDetails2, orderDetails3, orderDetails4, orderDetails5]);

            const admin1 = userRepository.create({
                name: "Juan",
                lastname: "Gómez",
                email: "juan.gomez@admin.com",
                password: bcrypt.hashSync("securePassword123",10),
                roles: ["admin"],
                status: "active"
            });


            const admin2 = userRepository.create({
                name: "María",
                lastname: "Pérez",
                email: "maria.perez@admin.com",
                password: bcrypt.hashSync("securePassword123",10),
                roles: ["admin"],
                status: "active"
            });

            const admin3 = userRepository.create({
                name: "Carlos",
                lastname: "Ramírez",
                email: "carlos.ramirez@admin.com",
                password: bcrypt.hashSync("securePassword123",10), 
                roles: ["admin"],
                status: "active"
            });

            await userRepository.save([admin1, admin2, admin3]);  
            
            await queryRunner.commitTransaction();
            
        }catch(error){
            await queryRunner.rollbackTransaction();
            console.log(error)
            console.log('fallo eso')
            throw error;
        }finally{
            await queryRunner.release();
            return 'Seeder complete succesfully'
        }

    }
}
