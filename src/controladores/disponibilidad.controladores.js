import { Op, Sequelize } from 'sequelize';
import unidadAlquilable from '../tablas/unidad-alquilable.js';
import precio from '../tablas/precio.js';


const postDisponibilidad = async (req, res) => {
    const { fechaIngreso, fechaEgreso, personas } = req.body;

    if (!fechaIngreso || !fechaEgreso || !personas) {
        return res.status(400).json({ error: 'Faltan parametros' });
    }

    try {
    const unidades = await unidadAlquilable.findAll({
      where: {
        capacidad: { [Op.gte]: personas },
        id: {
          [Op.notIn]: Sequelize.literal(`(
            SELECT "unidad_alquilableId"
            FROM "reserva"
            WHERE "fechaIngreso" < '${fechaEgreso}'
            AND "fechaEgreso" > '${fechaIngreso}'
          )`)
        }
      },
      attributes: [
        'id',
        'nombre',
        'capacidad',

        [
          Sequelize.literal(`(
            SELECT MIN("monto")
            FROM "precio"
            WHERE "cantidad_personas" >= ${personas}
          )`),
          'precioMinimo'
        ]
      ]
    });

    res.json(unidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la disponibilidad' });
  }
};

export {postDisponibilidad};
