import {DataTypes} from 'sequelize';
import {sequelize} from '../base-de-datos/basededatos.js';

const unidadAlquilable = sequelize.define( 'unidad_alquilable', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    capacidad: {
        type: DataTypes.INTEGER,
    },
    descripcion: {
        type: DataTypes.STRING(500),
    },
    servicios: {
        type: DataTypes.STRING(500),
    }
}, { tableName: 'unidad_alquilable',
    timestamps: false
});

export default unidadAlquilable;