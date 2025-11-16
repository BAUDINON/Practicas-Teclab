import { Op, Sequelize } from 'sequelize';
import unidadAlquilable from '../tablas/unidad-alquilable.js';
import precio from '../tablas/precio.js';

const postDisponibilidad = async (req, res) => {
  const { fechaIngreso, fechaEgreso, personas } = req.body;

  const faltantes = [];
  if (!fechaIngreso) faltantes.push('fechaIngreso');
  if (!fechaEgreso) faltantes.push('fechaEgreso');
  if (!personas) faltantes.push('personas');

  if (faltantes.length > 0) {
    return res.status(400).json({
      error: `Faltan los siguientes parámetros: ${faltantes.join(', ')}`
    });
  }

  const ingresoDate = new Date(fechaIngreso);
  const egresoDate = new Date(fechaEgreso);

  if (isNaN(ingresoDate) || isNaN(egresoDate)) {
    return res.status(400).json({ error: 'Las fechas deben tener un formato válido (YYYY-MM-DD)' });
  }

  if (ingresoDate >= egresoDate) {
    return res.status(400).json({
      error: 'La fecha de ingreso debe ser anterior a la fecha de egreso'
    });
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

export { postDisponibilidad };