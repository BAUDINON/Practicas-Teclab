import app from './app.js';
import {sequelize} from './base-de-datos/basededatos.js';


async function main(){
    try {
   await sequelize.sync({force: false});
    console.log("Base de datos conectada");
    app.listen(3000);
    console.log("Servidor en el puerto", 3000);
    } catch (error) {
        console.error("Error al conectar la base de datos", error);
    };
};

main();