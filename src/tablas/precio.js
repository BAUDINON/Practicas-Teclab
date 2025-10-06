import {DataTypes} from 'sequelize';
import {sequelize} from '../base-de-datos/basededatos.js';

const precio = sequelize.define('precio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    monto: {
        type: DataTypes.INTEGER,
    },
    cantidad_personas: {
        type: DataTypes.INTEGER,
    },
    estado: {
        type: DataTypes.STRING
    }
}, { tableName: 'precio',
    timestamps: false
});

export default precio;