import Sequelize from 'sequelize';

export const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'postgres',
    port: 5432,
    dialect: 'postgres'
});