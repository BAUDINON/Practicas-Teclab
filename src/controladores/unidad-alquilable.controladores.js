import unidadAlquilable from '../tablas/unidad-alquilable.js';

const getUnidadesAlquilables = async (req, res) => {
    try {
    const unidadesAlquilables = await unidadAlquilable.findAll();
    console.log(unidadesAlquilables);
    res.send('Obtener todas las unidades alquilables');
    } catch (error) {
        res.status(500).json({message: "Error al obtener las unidades alquilables"});
    }
};

const createUnidadAlquilable = async (req, res) => {
    const { nombre, capacidad } = req.body;
    try {
    const newUnidadAlquilable = await unidadAlquilable.create({
        nombre,
        capacidad
    })

    console.log(newUnidadAlquilable);
    res.send('Crear una nueva unidad alquilable');
    } catch (error) {
        res.status(500).json({message: "Error al crear la unidad alquilable"});
    }
};

const updateUnidadAlquilable = async (req, res) => {
    try {
    const { id } = req.params;
    const { nombre, capacidad } = req.body;
    const unidadAlquilable = await unidadAlquilable.findByPk(id);
    unidadAlquilable.nombre = nombre;
    unidadAlquilable.capacidad = capacidad;
    
    await unidadAlquilable.save();
    
    res.json(unidadAlquilable);
    } catch (error) {
        res.status(500).json({message: "Error al actualizar la unidad alquilable"});
    }
};

const deleteUnidadAlquilable = async (req, res) => {
    try {
    const { id } = req.params;
    await unidadAlquilable.destroy({
        where: { id }
    });
    res.send('Unidad alquilable eliminada');
    } catch (error) {
        res.status(500).json({message: "Error al eliminar la unidad alquilable"});
    }
};

const getUnidadAlquilable = async (req, res) => {
    const { id } = req.params;
    try {
    const unidadAlquilable = await unidadAlquilable.findByPk({
        where: { id }
    })
    res.json(unidadAlquilable)
    } catch (error) {
        res.status(404).json({message: "Unidad alquilable no encontrada"});
    }
};

export {getUnidadesAlquilables, createUnidadAlquilable, updateUnidadAlquilable, deleteUnidadAlquilable, getUnidadAlquilable};