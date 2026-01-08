import precio from "../tablas/precio.js";

const getPrecios = async (req, res) => {
    try {
    const precios = await precio.findAll()
    console.log(precios);
    res.send('Obtener todos los precios');
    } catch (error) {
        res.status(500).json({message: "Error al obtener los precios"});
    }
};

const createPrecio = async (req, res) => {
    const {monto, cantidad_personas, estado} = req.body;
    try {
    const newPrecio = await precio.create({
        monto,
        cantidad_personas,
        estado
    })

    console.log(newPrecio);

    res.send('Crear un nuevo precio');
    } catch (error) {
        res.status(500).json({message: "Error al crear el precio"});
    }
};

const updatePrecio = async (req, res) => {
    try {
    const { id } = req.params;
    const { monto, cantidad_personas, estado } = req.body;
    const precio = await precio.findByPk(id);
    precio.monto = monto;
    precio.cantidad_personas = cantidad_personas;
    precio.estado = estado;

    await precio.save();

    res.json(precio);
    } catch (error) {
        res.status(500).json({message: "Error al actualizar el precio"});
    }
};

const deletePrecio = async (req, res) => {
    try {
    const { id } = req.params;
    await precio.destroy({
        where: { id }
    });
    res.send('Precio eliminado');
    } catch (error) {
        res.status(500).json({message: "Error al eliminar el precio"});
    }
};

const getPrecio = async (req, res) => {
    const { id } = req.params;
    try {
    const precio = await precio.findByPk({
        where: { id }
    })
    res.json(precio)
    } catch (error) {
        res.status(404).json({message: "Precio no encontrado"});
    }
};

export {getPrecios, createPrecio, updatePrecio, deletePrecio, getPrecio};