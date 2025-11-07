import { useState } from 'react';
import api from '../service/api';

function MostrarDisponibilidad() {
  const [form, setForm] = useState({
    fechaIngreso: '',
    fechaEgreso: '',
    personas: ''
  });

  const [unidades, setUnidades] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/disponibilidad', form)
      .then((response) => {
        setUnidades(response.data);
        setError('');
      })
      .catch((err) => {
        console.error(err);
        setError('Error al obtener disponibilidad');
        setUnidades([]);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Consultar disponibilidad</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha ingreso:</label>
          <input
            type="date"
            name="fechaIngreso"
            value={form.fechaIngreso}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Fecha egreso:</label>
          <input
            type="date"
            name="fechaEgreso"
            value={form.fechaEgreso}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Personas:</label>
          <input
            type="number"
            name="personas"
            value={form.personas}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Consultar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Resultados:</h2>
      <ul>
        {unidades.map((u) => (
          <li key={u.id}>
            {u.nombre} — Capacidad: {u.capacidad} — Precio mínimo: ${u.precioMinimo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MostrarDisponibilidad;

