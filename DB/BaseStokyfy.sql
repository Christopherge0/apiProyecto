-- Creacion de la base de datos
CREATE DATABASE IF NOT EXISTS stokify;

-- Usar la base de datos recien creada
USE stokify;

-- tabla rol
CREATE TABLE IF NOT EXISTS rol(
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripccion VARCHAR(100) 
);

-- Tabla de ubicaciones
CREATE TABLE IF NOT EXISTS ubicacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    provincia VARCHAR(100),
    canton VARCHAR(100),
    distrito VARCHAR(100),
    direccionExacta  VARCHAR(256)
);

-- Tabla de bodegas
CREATE TABLE IF NOT EXISTS bodega (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    dimensione VARCHAR(100),
    capacidad INT,
    tieneCajaSeguridad BOOLEAN,
    idUbicacion INT,
    FOREIGN KEY (idUbicacion) REFERENCES ubicacion(id)
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuario (
    id INT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    telefono VARCHAR(100),
    contrasenia VARCHAR(100),
    idRol INT,
    estado BOOLEAN,
    FOREIGN KEY (idRol) REFERENCES rol(id)
);

-- Tabla de relaciones entre usuarios y bodegas
CREATE TABLE IF NOT EXISTS bodegaUsuario(
    idUsuario INT, 
    idBodega INT,
    FOREIGN KEY (idUsuario) REFERENCES usuario(id),
    FOREIGN KEY (idBodega) REFERENCES bodega(id),
    PRIMARY KEY (idBodega, idUsuario)
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    SKU VARCHAR(3),
    nombre VARCHAR(100) 
);

-- Tabla de subcategorías
CREATE TABLE IF NOT EXISTS subCategoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
	SKU VARCHAR(3),
    idCategoria  INT,
    FOREIGN KEY (idCategoria) REFERENCES categoria(id)
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    costoUnitario DECIMAL,
    idSubCategoria INT,
    idCategoria INT,
    sku VARCHAR(25),
    cantidadStock INT DEFAULT 0,
    fechaLanzamiento DATE,
    tipoConexion VARCHAR(50),
    UNIQUE(sku),
    FOREIGN KEY (idSubCategoria) REFERENCES subCategoria(id)
);

-- Tabla de inventario
CREATE TABLE IF NOT EXISTS inventario (
    idProducto INT,
    idBodega INT,
    cantidadDisponible INT,
    cantidadMinima INT,
    cantidadMaxima INT,
    idUsuarioRegistro INT,
    idUsuarioActualizacion INT,
    fechaRegistro DATETIME,
    fechaActualizacion DATETIME,
    idInventario int AUTO_INCREMENT,
    UNIQUE (idInventario),
    FOREIGN KEY (idProducto) REFERENCES producto(id),
    FOREIGN KEY (idBodega) REFERENCES bodega(id),
    FOREIGN KEY (idUsuarioRegistro) REFERENCES usuario(id),
    FOREIGN KEY (idUsuarioActualizacion) REFERENCES usuario(id),
    PRIMARY KEY (idProducto, idBodega)
);

-- Tabla de proveedores
CREATE TABLE IF NOT EXISTS proveedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    canton VARCHAR(100),
    provincia VARCHAR(20),
    distrito VARCHAR(255),
    direccionExacta VARCHAR(255)
);

-- Tabla de contactos de proveedores
CREATE TABLE IF NOT EXISTS proveedorContacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idProveedor INT,
    nombre VARCHAR(100),
    telefono VARCHAR(100),
    correo VARCHAR(20),

    FOREIGN KEY (idProveedor) REFERENCES proveedor(id)
);

-- Tabla de estado de ordenes de compra
CREATE TABLE IF NOT EXISTS estadoOrdenCompra (
	id int AUTO_INCREMENT PRIMARY KEY,
    descripccion VARCHAR(100)
);

-- Tabla de ordenes de compra
CREATE TABLE IF NOT EXISTS ordenCompra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idProveedor INT,
    idBodega INT,
    fechaGeneracion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaRecepcion DATETIME,
    idUsuarioRegistro INT,
	idUsuarioResepccion  INT,
    estado int,
    FOREIGN KEY (idProveedor) REFERENCES proveedor(id),
    FOREIGN KEY (idBodega) REFERENCES bodega(id),
    FOREIGN KEY (idUsuarioRegistro) REFERENCES usuario(id),
    FOREIGN KEY (idUsuarioResepccion) REFERENCES usuario(id)
);

-- Tabla de detalles de ordenes de compra
CREATE TABLE IF NOT EXISTS detalleOrdenCompra (
    idOrdenCompra INT,
    idProducto INT,
    cantidad INT,
    FOREIGN KEY (idOrdenCompra) REFERENCES ordenCompra(id),
    FOREIGN KEY (idProducto) REFERENCES producto(id),
    PRIMARY KEY (idOrdenCompra, idProducto) 
);

-- Tabla de traslados entre bodegas
CREATE TABLE IF NOT EXISTS traslado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idBodegaOrigen INT ,
    idBodegaDestino INT ,
    fechaEnvio DATETIME ,
    fechaRecepcion DATETIME,
    idUsuarioRegistro INT ,
    FOREIGN KEY (idBodegaOrigen) REFERENCES bodega(id),
    FOREIGN KEY (idBodegaDestino) REFERENCES bodega(id),
    FOREIGN KEY (idUsuarioRegistro) REFERENCES usuario(id)
);

-- Tabla de detalles de traslados
CREATE TABLE IF NOT EXISTS detalleTraslado (
    idTraslado INT ,
    idProducto INT ,
    cantidad INT ,
    FOREIGN KEY (idTraslado) REFERENCES traslado(id),
    FOREIGN KEY (idProducto) REFERENCES producto(id),
    PRIMARY KEY (idTraslado, idProducto) 
);

-- Tabla de salidas de inventario
CREATE TABLE IF NOT EXISTS salidaInventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idBodega INT ,
    fechaSalida DATETIME ,
    idUsuarioRegistro INT ,
    observacion VARCHAR(255),
    FOREIGN KEY (idBodega) REFERENCES bodega(id),
    FOREIGN KEY (idUsuarioRegistro) REFERENCES usuario(id)
);

-- Tabla de detalles de salidas de inventario
CREATE TABLE IF NOT EXISTS detalleSalidaInventario (
    idSalidaInventario INT,
    idProducto INT ,
    cantidad INT ,
    FOREIGN KEY (idSalidaInventario) REFERENCES salidaInventario(id),
    FOREIGN KEY (idProducto) REFERENCES producto(id),
    PRIMARY KEY (idSalidaInventario, idProducto)
);