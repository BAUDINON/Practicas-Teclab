import reserva from '../tablas/reserva.js';

const getReservas = async (req, res) => {
    try {
    const reservas = await reserva.findAll()
    console.log(reservas);
    res.send('Obtener todas las reservas');
    } catch (error) {
        res.status(500).json({message: "Error al obtener las reservas"});
    }
};

const createReserva = async (req, res) => {};

const updateReserva = async (req, res) => {};

const deleteReserva = async (req, res) => {};

const getReserva = async (req, res) => {
    const { id } = req.params;
    try {
    const reserva = await reserva.findeOne({
        where: { id }
    })
    res.json(reserva)
    } catch (error) {
        res.status(404).json({message: "Reserva no encontrada"});
    }
};

export {getReservas, getReserva};