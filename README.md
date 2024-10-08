### **Beard Nest API**

**Beard Nest** is a full-featured RESTful API designed to manage an e-commerce platform that supports multiple functionalities such as user management, product listings, order processing, and more. The API is built using the **NestJS** framework, leveraging modern web development practices for secure and scalable applications. It integrates essential modules such as JWT-based authentication, role-based authorization, and data persistence using **TypeORM**with a PostgreSQL database.

---

### **Core Features**:

1. **User Management**:
    - Comprehensive endpoints for user registration, profile management, and role-based access.
    - Role distinction between admin and regular users (customers), enabling different access levels.
    - Secure password handling and authentication via JWT tokens.
2. **Product and Category Management**:
    - CRUD operations for managing products and categories.
    - Admins can create, update, and delete product listings and categories.
    - Users can browse and interact with product details.
3. **Order and Cart Management**:
    - Shopping cart functionality, allowing users to add, update, or remove items.
    - Order processing where users can create, view, and track their orders.
    - Admin-level access to view and manage all orders.
4. **Authorization and Authentication**:
    - JWT-based authentication ensuring secure access to protected routes.
    - Role-based access control (RBAC) that restricts access to sensitive data and operations based on user roles.
    - Custom guards and decorators used to enforce security policies.
5. **Persistence and Database Integration**:
    - **TypeORM** is used to interact with the PostgreSQL database, ensuring efficient data management.
    - Entities such as **User**, **Product**, **Order**, and **Category** represent the database schema and handle all CRUD operations.
    - Relationship management between users, orders, and carts, providing a seamless flow of data.
6. **Image and Media Handling**:
    - Upload and manage images associated with products and user profiles.
    - Secure storage and retrieval of media content through dedicated endpoints.

---

### **Tech Stack**:

- **NestJS**: A progressive Node.js framework for building scalable server-side applications.
- **TypeORM**: A powerful ORM for database management, integrated with PostgreSQL.
- **JWT (JSON Web Tokens)**: Secure token-based authentication for handling user sessions.
- **Passport.js**: A middleware used for authentication strategies, integrated with JWT for user login.
- **PostgreSQL**: Relational database system used for data persistence.
- **Docker**: Environment setup through `docker-compose`, facilitating easy deployment.

---

### **Authentication**

Authentication in the **Users Module** is handled using **JWT (JSON Web Token)** strategy via **Passport.js**. The implementation details are as follows:

- **Module Setup**:
    - **JwtModule** is registered in `users.module.ts` using the `JwtModule.registerAsync()` method. This enables asynchronous configuration of the JWT module, retrieving secret and expiration time values from environment variables.
    - **ConfigModule** and **ConfigService** are used to inject environment variables for JWT configuration:
        - `JWT_SECRET`: The secret key used to sign the JWT.
        - `JWT_EXPIRES_IN`: The expiration time for the JWT.
- **Strategy**:
    - **JwtStrategy**: Located in the `strategies` folder, this class defines how incoming JWT tokens are validated. It ensures that only users with valid tokens can access protected endpoints.
    - **PassportModule**: The module is configured in `users.module.ts` with the default strategy set to **JWT**. This means that all protected routes will require valid JWT authentication.

---

### **Authorization**

Authorization is primarily implemented through **guards** and **decorators** to enforce role-based access control (RBAC).

- **Roles**:
    - The **Admin** and **Customer** roles are defined through the `Admin` and `Customer` entities. These roles determine the level of access a user has across the API.
- **Guards**:
    - Located in the `guards` directory, custom guards like `RolesGuard` are implemented to check a user’s role and ensure they have permission to access certain endpoints.
- **Decorators**:
    - Located in the `decorators` directory, decorators such as `@Roles()` are used in controllers to specify which roles (e.g., `admin`, `user`) are required to access specific routes.
- **User Role Hierarchy**:
    - The **Admin** role typically has full access to all user, product, and order data.
    - The **Customer** role has limited access to their own data and interactions with products, comments, and orders.

---

### **Persistence**

Persistence in the **Users Module** is implemented using **TypeORM** to interact with the database.

- **Entities**:
    - The **User** entity, along with **Customer** and **Admin**, represents the user table in the database. These entities define the structure of the database schema, including attributes like `id`, `username`, `password`, `role`, etc.
    - `TypeOrmModule.forFeature([User, Customer, Admin])` is used in `users.module.ts` to register these entities, allowing the module to interact with the database for CRUD operations.
- **Service Layer**:
    - The `UsersService` is responsible for interacting with the database via **TypeORM repositories**. This service handles tasks such as creating users, updating user profiles, and managing user roles.
    - **Repository Pattern**: Each entity has a corresponding repository that handles interactions with the database.

---

### Overview of the API:

This API consists of various modules that manage different resources such as users, orders, products, comments, blogs, and more. Each module includes the following key components:

- **Controller**: Defines the API endpoints and handles HTTP requests.
- **Service**: Implements the business logic and interacts with the data layer.
- **DTOs (Data Transfer Objects)**: Define the structure of data used in requests and responses.
- **Entities**: Represent database models used by the API.

---

### Endpoints by Module:

### 1. **Users Module** (`users.controller.ts`)

- **GET /users**: Retrieve all users.
    - **Parameters**: None.
    - **Response**: List of users.
    - Accessible by **admin** and **user** (admin can view any user, and a user can view their own profile).
- **GET /users/**: Retrieve a user by ID.
    - **Parameters**: User ID (in path).
    - **Response**: User details.
    - **Accessible** by **admin** (view all users).
- **POST /users**: Create a new user.
    - **Parameters**: User DTO in the request body.
    - **Response**: Created user object.
    - **Accesible** by any.
- **PATCH /users/**: Update a user by ID.
    - **Parameters**: User ID (in path), Update DTO in the body.
    - **Response**: Updated user object.
    - Accessible by **admin** and **user** (admin can update any user, a user can update their own profile).
- **DELETE /users/**: Delete a user by ID.
    - **Parameters**: User ID (in path).
    - **Response**: Success message.
    - Accessible by **admin** (to delete user accounts).

### 2. **Orders Module** (`orders.controller.ts`)

- **GET /orders**: Retrieve all orders.
    - **Parameters**: None.
    - **Response**: List of orders.
    - Accessible by **admin** (to view all orders).
- **GET /orders/**: Retrieve an order by ID.
    - **Parameters**: Order ID (in path).
    - **Response**: Order details.
    - Accessible by **admin** and **user** (admin can view any order, a user can view their own order).
- **POST /orders**: Create a new order.
    - **Parameters**: Order DTO in the request body.
    - **Response**: Created order object.
    - Accessible by **user** (to create new orders).
- **PATCH /orders/**: Update an order by ID.
    - **Parameters**: Order ID (in path), Update DTO in the body.
    - **Response**: Updated order object.
    - Accessible by **admin** (admin can update any order).
- **DELETE /orders/**: Delete an order by ID.
    - **Parameters**: Order ID (in path).
    - **Response**: Success message.
    - Accessible by **admin** (to delete any order).

### 3. **Products Module** (`products.controller.ts`)

- **GET /products**: Retrieve all products.
    - **Parameters**: None.
    - **Response**: List of products.
    - Accessible by **admin** and **user** (both can view products).
- **GET /products/**: Retrieve a product by ID.
    - **Parameters**: Product ID (in path).
    - **Response**: Product details.
    - Accessible by **admin** and **user** (both can view a specific product).
- **POST /products**: Create a new product.
    - **Parameters**: Product DTO in the request body.
    - **Response**: Created product object.
    - Accessible by **admin** (to add new products).
- **PATCH /products/**: Update a product by ID.
    - **Parameters**: Product ID (in path), Update DTO in the body.
    - **Response**: Updated product object.
    - Accessible by **admin** (to update product details).
- **DELETE /products/**: Delete a product by ID.
    - **Parameters**: Product ID (in path).
    - **Response**: Success message.
    - Accessible by **admin** (to remove a product).m

### 4. **Comments Module** (`comments.controller.ts`)

- **GET /comments**: Retrieve all comments.
    - **Parameters**: None.
    - **Response**: List of comments.
    - Accessible by **admin** and **user** (both can view comments).
- **GET /comments/**: Retrieve a comment by ID.
    - **Parameters**: Comment ID (in path).
    - **Response**: Comment details.
    - Accessible by **admin** and **user** (both can view a specific comment).
- **POST /comments**: Create a new comment.
    - **Parameters**: Comment DTO in the request body.
    - **Response**: Created comment object.
    - Accessible by **user** (users can add comments).
- **PATCH /comments/**: Update a comment by ID.
    - **Parameters**: Comment ID (in path), Update DTO in the body.
    - **Response**: Updated comment object.
    - Accessible by **admin** and **user** (admin can update any comment, users can update their own comments).
- **DELETE /comments/**: Delete a comment by ID.
    - **Parameters**: Comment ID (in path).
    - **Response**: Success message.
    - Accessible by **admin** and **user** (admin can delete any comment, users can delete their own comments).

### 5. **Blogs Module** (`blogs.controller.ts`)

- **GET /blogs**: Retrieve all blogs.
    - **Parameters**: None.
    - **Response**: List of blogs.
    - Accessible by **admin** and **user** (both can view blogs).
- **GET /blogs/**: Retrieve a blog by ID.
    - **Parameters**: Blog ID (in path).
    - **Response**: Blog details.
    - Accessible by **admin** and **user** (both can view a specific blog).
- **POST /blogs**: Create a new blog.
    - **Parameters**: Blog DTO in the request body.
    - **Response**: Created blog object.
    - Accessible by **admin** (to create a new blog post).
- **PATCH /blogs/**: Update a blog by ID.
    - **Parameters***: Blog ID (in path), Update DTO in the body.
    - **Response**: Updated blog object.
    - Accessible by **admin** (to update blog posts).
- **DELETE /blogs/**: Delete a blog by ID.
    - **Parameters**: Blog ID (in path).
    - **Response**: Success message.
    - Accessible by **admin** (to delete a blog post).

### 6. **Cart Items Module** (`cart_items.controller.ts`)

- **GET /cart-items**: Retrieve all items in all carts.
    - **Parameters**: None.
    - **Response**: List of cart items.
    - Accessible by **admin** and **user** (admin can view all cart items, a user can view their own items).
- **GET /cart-items/**: Retrieve a specific cart item by ID.
    - **Parameters**: Cart item ID (in path).
    - **Response**: Cart item details.
    - Accessible by **admin** and **user** (admin can view any cart item, users can view their own).
- **POST /cart-items**: Add a new item to a cart.
    - **Parameters**: Cart item DTO in the request body.
    - **Response**: Created cart item object.
    - Accessible by **user** (to add items to their cart).
- **PATCH /cart-items/**: Update a cart item by ID.
    - **Parameters**: Cart item ID (in path), Update DTO in the body.
    - **Response**: Updated cart item object.
    - Accessible by **admin** and **user** (admin can update any cart item, users can update their own items).
- **DELETE /cart-items/**: Remove an item from a cart.
    - **Parameters**: Cart item ID (in path).
    - **Response**: Success message.
    - Accessible by **admin** and **user** (admin can delete any cart item, users can delete their own items).

### 7. **Carts Module** (`carts.controller.ts`)

- **GET /carts**: Retrieve all carts.
    - **Parameters**: None.
    - **Response**: List of carts.
    - Accessible by **admin** (to view all carts).
- **GET /carts/**: Retrieve a specific cart by ID.
    - **Parameters**: Cart ID (in path).
    - **Response**: Cart details.
    - Accessible by **admin** and **user** (admin can view any cart, users can view their own cart).
- **POST /carts**: Create a new cart.
    - **Parameters**: Cart DTO in the request body.
    - **Response**: Created cart object.
    - Accessible by **user** (to create a new cart).
- **PATCH /carts/**: Update a cart by ID.
    - **Parameters**: Cart ID (in path), Update DTO in the body.
    - **Response**: Updated cart object.
    - Accessible by **admin** and **user** (admin can update any cart, users can update their own cart).
- **DELETE /carts/**: Delete a cart by ID.
    - **Parameters**: Cart ID (in path).
    - **Response**: Success message.
    - Accessible by **admin** and **user** (admin can delete any cart, users can delete their own cart).

### 8. **Categories Module** (`categories.controller.ts`)

- **GET /categories**: Retrieve all categories.
    - **Parameters**: None.
    - **Response**: List of categories.
    - Accessible by **admin** and **user** (both can view categories).
- **GET /categories/**: Retrieve a specific category by ID.
    - **Parameters**: Category ID (in path).
    - **Response**: Category details.
    - Accessible by **admin** and **user** (both can view a specific category).
- **POST /categories**: Create a new category.
    - **Parameters**: Category DTO in the request body.
    - **Response**: Created category object.
    - Accessible by **admin** (to create a new category).
- **PATCH /categories/**: Update a category by ID.
    - **Parameters**: Category ID (in path), Update DTO in the body.
    - **Response**: Updated category object.
    - Accessible by **admin** (to update categories).
- **DELETE /categories/**: Delete a category by ID.
    - **Parameters**: Category ID (in path).
    - **Response**: Success message.
    - Accessible by **admin** (to delete a category).

### 9. **Images Module** (`images.controller.ts`)

- **GET /images**: Retrieve all images.
    - **Parameters**: None.
    - **Response**: List of images.
    - Accessible by **admin** and **user** (both can view images).
- **GET /images/**: Retrieve a specific image by ID.
    - **Parameters**: Image ID (in path).
    - **Response**: Image details.
    - Accessible by **admin** and **user** (both can view a specific image).
- **POST /images**: Upload a new image.
    - **Parameters**: Image DTO in the request body.
    - **Response**: Created image object.
    - Accessible by **admin** (to upload new images).
- **DELETE /images/**: Delete an image by ID.
    - **Parameters**: Image ID (in path).
    - **Response**: Success message.
    - Accessible by **admin** (to delete images).

### 10. **Orders Details Module** (`orders_details.controller.ts`)

- **GET /orders-details**: Retrieve all order details.
    - **Parameters**: None.
    - **Response**: List of order details.
    - Accessible by **admin** (to view all order details).
- **GET /orders-details/**: Retrieve specific order details by ID.
    - **Parameters**: Order details ID (in path).
    - **Response**: Order details.
    - Accessible by **admin** and **user** (admin can view any order details, users can view their own).
- **POST /orders-details**: Create new order details.
    - **Parameters**: Order details DTO in the request body.
    - **Response**: Created order details object.
    - Accessible by **admin** (typically managed by admins).
- **PATCH /orders-details/**: Update order details by ID.
    - **Parameters**: Order details ID (in path), Update DTO in the body.
    - **Response**: Updated order details object.
    - Accessible by **admin** (to update order details).
- **DELETE /orders-details/**: Delete order details by ID.
    - **Parameters**: Order details ID (in path).
    - **Response**: Success message.
    - Accessible by **admin** (to delete order details).