import { DataTypes } from 'sequelize';
import { sequelize } from '../base-de-datos/basededatos.js';
import unidadAlquilable from './unidad-alquilable.js';

const imagenes = sequelize.define('imagenes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    unidadAlquilableId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: unidadAlquilable,
            key: 'id'
        }
    },
    imagenUrl: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
}, { 
    tableName: 'imagenes',
    timestamps: false
});

export default imagenes;