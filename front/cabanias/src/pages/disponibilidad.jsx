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
        const mensaje = err.response?.data?.error || 'Error al obtener disponibilidad';
        setError(mensaje);
        setUnidades([]);
      });
  };

  
  const calcularNoches = () => {
    const ingreso = new Date(form.fechaIngreso);
    const egreso = new Date(form.fechaEgreso);
    const diff = egreso - ingreso;
    return diff / (1000 * 60 * 60 * 24);
  };

  
  const formatNumber = (num) => {
    return num.toLocaleString("es-AR");
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center fondo-beige"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4 shadow card-naturaleza" style={{ width: "100%", maxWidth: "600px" }}>
        
        <h1 className="text-center mb-4" style={{ color: "var(--verde-primario)" }}>
          Consultar disponibilidad
        </h1>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

          <div>
            <label className="form-label label-verde">Fecha ingreso</label>
            <input 
              type="date"
              name="fechaIngreso"
              value={form.fechaIngreso}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div>
            <label className="form-label label-verde">Fecha egreso</label>
            <input 
              type="date"
              name="fechaEgreso"
              value={form.fechaEgreso}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div>
            <label className="form-label label-verde">Personas</label>
            <input 
              type="number"
              name="personas"
              value={form.personas}
              onChange={handleChange}
              min="1"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-verde mt-2">
            Consultar
          </button>
        </form>

        {error && <p className="text-danger mt-3">{error}</p>}

        <h2 className="mt-4" style={{ color: "var(--verde-primario)" }}>Resultados:</h2>

        <ul className="list-unstyled">
          {unidades.length > 0 ? (
            unidades.map((u) => {
              const noches = calcularNoches();
              const precioPorNoche = u.precioMinimo;
              const precioTotal = noches * precioPorNoche;

              return (
                <li key={u.id} className="p-3 item-naturaleza mb-2">
                  <strong>{u.nombre}</strong><br />
                  Capacidad: {u.capacidad} Personas <br />
                  Precio por noche: <strong>${formatNumber(precioPorNoche)}</strong> <br />
                  Noches: {noches} <br />
                  TOTAL: <strong>${formatNumber(precioTotal)}</strong>
                </li>
              );
            })
          ) : (
            !error && <p>No hay resultados.</p>
          )}
        </ul>
         <a
              href="https://wa.me/5493564579613"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
              style={{ fontSize: "1.6rem" }}
            >
              <i className="bi bi-whatsapp"></i>
            </a>
      </div>
    </div>
  );
}

export default MostrarDisponibilidad;
