import { where } from "sequelize";
import imagenes from "../tablas/imagenes.js";



const getImagenes = async (req, res) => {
    try {
        const imagenesLista = await imagenes.findAll({
            where: { unidadAlquilableId: null }
        });
        console.log(imagenesLista);
        res.json(imagenesLista);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las imágenes" });
    }
};

const createImagen = async (req, res) => {};

const updateImagen = async (req, res) => {};

const deleteImagen = async (req, res) => {};

const getImagen = async (req, res) => {
    const { id } = req.params;
    try {
    const imagen = await imagenes.findeOne({
        where: { id }
    })
    res.json(imagen)
    } catch (error) {
        res.status(404).json({message: "Imagen no encontrada"});
    }
};

export {getImagenes, getImagen};