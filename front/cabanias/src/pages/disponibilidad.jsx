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

    const { fechaIngreso, fechaEgreso, personas } = form;
    const faltantes = [];
    if (!fechaIngreso) faltantes.push('fecha de ingreso');
    if (!fechaEgreso) faltantes.push('fecha de egreso');
    if (!personas) faltantes.push('cantidad de personas');

    if (faltantes.length > 0) {
      setError(`Faltan los siguientes campos: ${faltantes.join(', ')}`);
      setUnidades([]);
      return;
    }

    const ingresoDate = new Date(fechaIngreso);
    const egresoDate = new Date(fechaEgreso);

    if (isNaN(ingresoDate) || isNaN(egresoDate)) {
      setError('Las fechas deben tener un formato válido.');
      setUnidades([]);
      return;
    }

    if (ingresoDate >= egresoDate) {
      setError('La fecha de ingreso debe ser anterior a la de egreso.');
      setUnidades([]);
      return;
    }

    if (Number(personas) <= 0) {
      setError('La cantidad de personas debe ser mayor a 0.');
      setUnidades([]);
      return;
    }

    if (Number(personas) > 5) {
      setError('La cantidad de personas debe ser menor o igual a 5.');
      setUnidades([]);
      return;
    }

    

    api.post('/disponibilidad', form)
      .then((response) => {
        setUnidades(response.data);
        setError('');
      })
      .catch((err) => {
        console.error(err);
        
        const mensaje =
          err.response?.data?.error || 'Error al obtener disponibilidad';
        setError(mensaje);
        setUnidades([]);
      });
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#00743eff',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
        Consultar disponibilidad
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          Fecha ingreso:
          <input type="date" name="fechaIngreso" value={form.fechaIngreso}
            onChange={handleChange} style={inputStyle} />
        </label>

        <label>
          Fecha egreso:
          <input type="date" name="fechaEgreso" value={form.fechaEgreso}
            onChange={handleChange} style={inputStyle} />
        </label>

        <label>
          Personas:
          <input type="number" name="personas" value={form.personas}
            onChange={handleChange} min="1" style={inputStyle} />
        </label>

        <button type="submit" style={buttonStyle}>Consultar</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

      <h2 style={{ marginTop: '30px', color: '#000000ff' }}>Resultados:</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {unidades.length > 0 ? (
          unidades.map((u) => (
            <li key={u.id} style={cardStyle}>
              <strong>{u.nombre}</strong><br />
              Capacidad: {u.capacidad} <br />
              Precio mínimo: <strong>${u.precioMinimo}</strong>
            </li>
          ))
        ) : (
          !error && <p>No hay resultados.</p>
        )}
      </ul>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginTop: '5px',
  borderRadius: '8px',
  border: '1px solid #000000ff',
  fontSize: '14px'
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background 0.3s'
};

const cardStyle = {
  backgroundColor: '#292929ff',
  border: '1px solid #000000ff',
  borderRadius: '10px',
  padding: '10px',
  marginTop: '10px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
};

export default MostrarDisponibilidad;