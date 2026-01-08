import unidadAlquilable from "./unidad-alquilable.js";
import precio from "./precio.js";
import reserva from "./reserva.js";
import imagenes from "./imagenes.js";

unidadAlquilable.hasMany(reserva,{
    foreignKey: 'unidad_alquilableId',
    onDelete: 'CASCADE'
});

reserva.belongsTo(unidadAlquilable,{
     foreignKey: 'unidad_alquilableId'
});

precio.hasMany(reserva,{
    foreignKey: 'precioId',
});

reserva.belongsTo(precio,{
    foreignKey: 'precioId'
});

unidadAlquilable.hasMany(imagenes, {
  foreignKey: 'unidadAlquilableId', 
  as: 'imagenes',
  onDelete: 'CASCADE'
});

imagenes.belongsTo(unidadAlquilable, {
  foreignKey: 'unidadAlquilableId', 
  as: 'unidadAlquilable'
});

export {unidadAlquilable, precio, reserva, imagenes};
