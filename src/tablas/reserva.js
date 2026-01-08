import{DataTypes} from 'sequelize';
import {sequelize} from '../base-de-datos/basededatos.js';

const reserva = sequelize.define('reserva',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaIngreso: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaEgreso: {
        type: DataTypes.DATE,
        allowNull: false
    },
    unidad_alquilableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'unidad_alquilable',
            key: 'id'
        }
    },
    precioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'precio',
            key: 'id'
        }
    }
}, { tableName: 'reserva',
    timestamps: false
});

export default reserva;
