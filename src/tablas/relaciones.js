import unidadAlquilable from "./unidad-alquilable.js";
import precio from "./precio.js";
import reserva from "./reserva.js";

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

export {unidadAlquilable, precio, reserva};
