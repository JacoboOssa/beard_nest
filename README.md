### Informe Técnico de Funcionalidades Implementadas en la Aplicación

### Estructura General de la Aplicación

La aplicación utiliza **Next.js** para el frontend, con un enfoque en la organización de páginas y componentes reutilizables. Los archivos clave incluyen `layout.tsx` para la estructura de diseño de la aplicación, `middleware.ts`para la gestión de rutas y autenticación, y múltiples páginas (`page.tsx`) para diferentes secciones, como `home`, `cart`, `checkout`, y `user`.

### Funcionalidades Implementadas

1. **Autenticación y Autorización**:
    - La autenticación se gestiona a través de `useCurrentUser`, un hook que devuelve el estado del usuario y verifica su autenticación.
    - El archivo `middleware.ts` define las rutas protegidas y asegura que solo los usuarios autenticados accedan a áreas privadas.
    - Las páginas `user/page.tsx` y `register/page.tsx` incluyen redireccionamientos para usuarios no autenticados, manteniendo la seguridad de datos personales y la integridad de la experiencia de usuario.
2. **Gestión del Estado**:
    - La aplicación utiliza hooks como `useCart`, `useProfileOrder`, y `useShipping` para la gestión del estado, especialmente en `cart` y `checkout`. Estos hooks capturan y mantienen datos actualizados del usuario y del carrito de compras.
    - Se realiza un cálculo dinámico del subtotal y el total en la página `cart` y `checkout`, utilizando métodos como `reduce` para actualizar valores según los elementos en el carrito.
3. **Funcionalidades Específicas del Carrito de Compras y Pago**:
    - En `cart/page.tsx`, el carrito muestra productos con detalles, como nombre, precio y cantidad. Se ofrece una sección para aplicar cupones y calcular el subtotal y total de la compra.
    - La página `checkout/page.tsx` incluye formularios detallados para el procesamiento de pagos y datos de envío, junto con cálculos de impuestos y costos de envío. La función `handlePlaceOrder` maneja la confirmación de pedido, la eliminación de artículos del carrito y la redirección al perfil del usuario.
4. **Página de Perfil y Órdenes del Usuario**:
    - La página `user/page.tsx` ofrece una interfaz para que los usuarios visualicen y editen su información personal. Además, muestra el historial de pedidos del usuario, permitiendo un acceso rápido a los detalles de cada pedido.

### Implementación de Autenticación, Autorización y Gestión del Estado

- **Autenticación**: La autenticación se implementa mediante `useCurrentUser`, que verifica si el usuario está logueado y redirige a `login` si no lo está. Esta lógica está integrada en varias páginas para mantener un flujo seguro.
- **Autorización**: A través del `middleware.ts`, se protege el acceso a ciertas rutas, verificando si el usuario tiene los permisos necesarios. Esto es fundamental en rutas como `user`, donde se gestionan datos personales.
- **Gestión del Estado**: La aplicación emplea hooks personalizados para centralizar el estado de datos críticos, como `useCart` para el carrito y `useProfileOrder` para los datos de perfil. Esto facilita el manejo de la información en toda la aplicación, proporcionando una interfaz reactiva y eficiente.