import Sequelize from 'sequelize';

export const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    port: 54321,
    dialect: 'postgres'
});