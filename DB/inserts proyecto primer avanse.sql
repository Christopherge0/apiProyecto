use stokify;

-- Insertar datos en la tabla rol
INSERT INTO rol (descripccion) VALUES 
('Administrador'),
('Encargado');

-- Insertar datos en la tabla ubicacion
INSERT INTO ubicacion (nombre, provincia, canton, distrito, direccionExacta) VALUES 
('Bodega San Jose 1', 'San José', 'San José', 'San José', 'Avenida central'),
('Bodega Coyol 1', 'Alajuela', 'Alajuela', 'San José de Alajuela', 'Zona Franca el Coyol'),
('Bodega Montesillos1', 'Alajuela', 'Alajuela', 'Alajuela', 'Zona Franca Z');

-- Insertar datos en la tabla bodega
INSERT INTO bodega (nombre, dimensione, capacidad, tieneCajaSeguridad, idUbicacion) VALUES 
('Principal', 'Grande', 100, true, 1),
('Secundaria', 'Mediana', 100, false, 2),
('Terciaria', 'Mediana', 100, false, 3);

-- Insertar datos en la tabla usuario
INSERT INTO usuario (id, nombre, email, telefono, contrasenia, idRol, estado) VALUES 
(118160876, 'Christopher Segura', 'crisgeseso@gmail.com', '85251048', 'admin', 1, true),
(118510232, 'Angelica Gonzalez', 'empleado@example.com', '87654321', 'admin123', 1, true),
(118510233, 'Empleado', 'empleado@example.com', '87654325', 'empleado123', 2, true),
(118160278, 'Juan López', 'juan.lopez@example.com', '34567890', 'contraseña5', 2, 1),
(654789644, 'Sofía Martínez', 'sofia.martinez@example.com', '78901234', 'contraseña6', 2, 1),
(254016884, 'Diego Hernández', 'diego.hernandez@example.com', '12345678', 'contraseña7', 2, 1),
(125420164, 'Laura Gutiérrez', 'laura.gutierrez@example.com', '56789012', 'contraseña8', 2, 1),
(125876548, 'Fernanda Díaz', 'fernanda.diaz@example.com', '89012345', 'contraseña9', 2, 1);
-- Inserts para la tabla bodegaUsuario
INSERT INTO bodegaUsuario (idUsuario, idBodega) VALUES
(118160876, 1), (118160876, 2), (118160876, 3),
(118160278, 1),(118160278, 2), 
(654789644, 1), (654789644, 3),
(254016884, 2), (254016884, 3),
(125420164, 3),
(125876548, 3), (125876548, 1),
(118510232, 1), (118510232, 3), 
(118510233, 3), (118510233, 2);
-- Insertar datos en la tabla categoria
INSERT INTO categoria (nombre, SKU) VALUES 
('Juegos', 'JUE'),
('Perifericos','PER');

-- Insertar datos en la tabla subCategoria
INSERT INTO subCategoria (nombre, idCategoria, SKU) VALUES 
('Xbox', 1, 'XBO'),
('Sony', 1, 'SON'),
('Nintendo', 1, 'NIN'),
('Teclados', 2, 'TEC'),
('Audifonos', 2, 'AUD'),
('Ratones', 2, 'RAT');

-- Insertar datos en la tabla producto
INSERT INTO producto (nombre, descripcion, costoUnitario, idSubCategoria, idCategoria, sku, cantidadStock, fechaLanzamiento, tipoConexion) VALUES 
('Halo Infinitive', 'Videojuego saga de Halo', 36000 , 1, 1, 'JUE_XBO_01', 20, '2024-03-15', 'Multijugador'),
('God of War', 'Video juego de dios de la guerra', 36000, 2, 1, 'JUE_SON_02', 20, '2024-03-15','Un solo jugador'),
('Mario Wonder', 'Video juego de Mario plataforma', 36000, 3, 1, 'JUE_NIN_03', 20, '2024-03-15', 'Multijugador'),
('K70 MK2', 'Teclado CORSAIR', 90000, 4, 2, 'PER_TEC_04', 20, '2024-03-15',  'Alámbrico'),
('Virtuoso', 'Audifonos Corsair', 112000, 5, 2, 'PER_AUD_05', 20, '2024-03-15', 'Inalámbrico'),
('Darck Core Pro', 'Raton Corsair', 56000, 6, 2, 'PER_RAT_06', 20, '2024-03-15', 'Inalámbrico'),
('Red Dead Redemption 2', 'Videojuego de mundo abierto de vaqueros', 45000, 1, 1, 'JUE_XOB_07', 25, '2024-03-15', 'Multijugador'),
('The Legend of Zelda: Breath of the Wild', 'Videojuego de aventura de Zelda', 50000, 2, 1, 'JUE_NIN_08', 25, '2024-03-15', 'Un solo jugador'),
('Final Fantasy VII Remake', 'Remake del clásico de RPG', 48000, 3, 1, 'JUE_SON_09', 25, '2024-03-15', 'Un solo jugador'),
('Logitech G Pro X', 'Teclado mecánico para gaming', 110000, 4, 2, 'PER_TEC_10', 25, '2024-03-15', 'Alámbrico'),
('SteelSeries Arctis Pro', 'Audífonos para gaming', 125000, 5, 2, 'PER_AUD_11', 25, '2024-03-15', 'Alámbrico'),
('Razer DeathAdder Elite', 'Ratón para gaming', 75000, 6, 2, 'PER_RAT_12', 25, '2024-03-15', 'Alámbrico'),
('Cyberpunk 2077', 'Juego de rol de acción futurista', 65000, 2, 1, 'JUE_XBO_20', 22, '2024-03-15', 'Un solo jugador');

-- Insertar datos en la tabla inventario
INSERT INTO inventario (idProducto, idBodega, cantidadDisponible, cantidadMinima, cantidadMaxima, idUsuarioRegistro, idUsuarioActualizacion, fechaRegistro, fechaActualizacion) VALUES

(1, 1, 10, 5, 20, 118160278, 118510232, '2023-06-15', '2024-02-20'),
(1, 2, 5, 5, 20, 254016884, 254016884, '2023-06-15', '2024-02-20'),
(1, 3, 5, 5, 20, 118160876, 118160876, '2023-06-15', '2024-02-20'),

(2, 1, 5, 5, 20, 118160278, 254016884, '2023-08-21', '2024-01-10'),
(2, 2, 10, 5, 20, 118160278, 118510232, '2023-08-21', '2024-01-10'),
(2, 3, 5, 5, 20, 125420164, 125420164, '2023-08-21', '2024-01-10'),

(3, 1, 10, 5, 20, 254016884, 254016884, '2023-10-12', '2024-03-04'),
(3, 2, 10, 5, 20, 118160278, 118510232, '2023-10-12', '2024-03-04'),

(4, 1, 10, 5, 20, 654789644, 118510232, '2023-12-05', '2024-02-15'),
(4, 2, 5, 5, 20, 118160278, 118160876, '2023-12-05', '2024-02-15'),
(4, 3, 10, 5, 20, 118160876, 118160876, '2023-12-05', '2024-02-15'),

(5, 2, 15, 5, 20, 118160278, 254016884, '2024-01-30', '2023-12-25'),
(5, 3, 10, 5, 20, 125876548, 125876548, '2024-01-30', '2023-12-25'),

(6, 2, 10, 5, 20, 125876548, 125876548, '2024-03-04', '2023-10-18'),
(6, 3, 10, 5, 20, 118510232, 118510232, '2024-03-04', '2023-10-18'),

(7, 1, 10, 5, 20, 654789644, 118510232, '2023-05-28', '2024-01-05'),
(7, 2, 15, 5, 20, 118160278, 118160278, '2023-05-28', '2024-01-05'),

(8, 2, 15, 5, 20, 118160876, 118160876, '2023-07-14', '2024-03-01'),
(8, 3, 10, 5, 20, 125876548, 125876548, '2023-07-14', '2024-03-01'),

(9, 1, 5, 5, 20, 125876548, 125876548, '2023-09-03', '2024-02-10'),
(9, 2, 5, 5, 20, 118160876, 118160876, '2023-09-03', '2024-02-10'),
(9, 3, 15, 5, 20, 118160876, 118160876, '2023-09-03', '2024-02-10'),

(10, 1, 10, 5, 20, 125876548, 118510232, '2023-11-20', '2024-01-20'),
(10, 2, 15, 5, 20, 125876548, 125876548, '2023-11-20', '2024-01-20'),

(11, 2, 10, 5, 20, 118510233, 118510233, '2024-02-05', '2023-12-15'),
(11, 3, 15, 5, 20, 125876548, 125876548, '2024-02-05', '2023-12-15'),

(12, 2, 10, 5, 20, 118510233, 118510233, '2024-03-19', '2023-11-08'),
(12, 3, 15, 5, 20, 118510233, 118510233, '2024-03-19', '2023-11-08'),

(13, 1, 12, 5, 20, 125876548, 118160876, '2023-04-10', '2024-02-25'),
(13, 3, 10, 5, 20, 118510233, 118510233, '2023-04-10', '2024-02-25');

-- Insertar datos en la tabla estado ordenCompra
INSERT INTO estadoOrdenCompra (descripccion) VALUES 
('Tramitado'),
('Sin Tramitar');

-- Insertar datos en la tabla proveedor
INSERT INTO proveedor (nombre, provincia, canton, distrito, direccionExacta) VALUES 
('Proveedor Samtec',  'San José', 'San José', 'San José', '456 Avenida Central'),
('Proveedor Incomex', 'Alajuela', 'Alajuela', 'San José de Alajuela', '456 Avenida Principal'),
('Proveedor Productos Japoneses', 'San José', 'San José', 'La Uruca', '456 Avenida Principal');

-- Insertar datos en la tabla proveedorContacto
INSERT INTO proveedorContacto (idProveedor, nombre, telefono,correo) VALUES 
(1, 'Christopher Segura', '85251048','crisgeseso@gmail.com'),
(2, 'Abigail Gomez', '60349359','angegm20@gmail.com'),
(3, 'Angelica Gozalez', '62808943', 'kishaperry@gmail.com');

-- Insertar datos en la tabla ordenCompra
INSERT INTO ordenCompra (idProveedor, idBodega, fechaGeneracion, fechaRecepcion, idUsuarioRegistro, idUsuarioResepccion, estado) VALUES 
(1, 1, NOW(), DATE_ADD(CURDATE(), INTERVAL 1 DAY) , 118160876, 125420164 ,1),
(2, 2, NOW(), DATE_ADD(CURDATE(), INTERVAL 1 DAY) , 118160876, 125420164,2),
(3, 3, NOW(), DATE_ADD(CURDATE(), INTERVAL 1 DAY) , 118160876, 125420164,1),
(1, 1, NOW(), DATE_ADD(CURDATE(), INTERVAL 1 DAY) , 118160876, 125420164,2),
(2, 2, NOW(), DATE_ADD(CURDATE(), INTERVAL 1 DAY) , 118160876, 125420164,1),
(3, 3, NOW(), DATE_ADD(CURDATE(), INTERVAL 1 DAY) , 118160876, 125420164,2),
(2, 1, NOW(), DATE_ADD(CURDATE(), INTERVAL 1 DAY) , 118160876, 125420164,1);

-- Insertar datos en la tabla detalleOrdenCompra
INSERT INTO detalleOrdenCompra (idOrdenCompra, idProducto, cantidad) VALUES 
(1, 1, 7), (1 ,2, 10), (1 ,9, 6), (1, 3, 5), (1 ,5, 5), (1 ,7, 4), 
(2, 2, 4), (2, 10, 5), (2, 9, 7),(2, 4, 4),
(3, 3, 6),(3, 4, 4),(3, 5, 9),(3, 6, 5),
(4, 7, 8), (4, 8, 5), (4, 9, 2),
(5, 5, 8), (5, 4, 9), (5, 8, 5),
(6, 6, 3),(6, 9, 5),(6, 7, 10),
(7, 8, 9),(7, 1, 8),(7, 5, 7);

-- Insertar datos en la tabla traslado
INSERT INTO traslado (idBodegaOrigen, idBodegaDestino, fechaEnvio, fechaRecepcion, idUsuarioRegistro) VALUES 
(1, 2, NOW(), DATE_ADD(CURDATE(), INTERVAL 1 DAY) , 118160876),
(2, 3, NOW(), DATE_ADD(CURDATE(), INTERVAL 1 DAY) , 118160876);
  
-- Insertar datos en la tabla detalleTraslado
INSERT INTO detalleTraslado (idTraslado, idProducto, cantidad) VALUES 
(1, 1, 5),
(2, 2, 6);

-- Insertar datos en la tabla salidaInventario
INSERT INTO salidaInventario (idBodega, fechaSalida, idUsuarioRegistro, observacion) VALUES 
(1, NOW(), 118160876, 'Salida por venta'),
(2, NOW(), 118160876, 'Salida por venta');

-- Insertar datos en la tabla detalleSalidaInventario
INSERT INTO detalleSalidaInventario (idSalidaInventario, idProducto, cantidad) VALUES 
(1, 1, 2),
(2, 2, 2),
(2, 1, 5),
(2, 7, 5),
(2, 5, 2);