use stoicberserker;
create table solicitud(
primary key (id_producto),
id_producto int not null auto_increment,
nombre_consulta varchar(30) not null,
producto_consulta  varchar(30) not null,
descripcion_consulta varchar(50) not null
);