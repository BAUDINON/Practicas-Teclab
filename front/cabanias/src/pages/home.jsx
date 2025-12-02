import { useState, useEffect } from 'react';
import api from '../service/api';
import BotonDisponibilidad from "../components/BotonDisponibilidad";
import BotonUbicacion from "../components/BotonUbicacion";
import CartasCabanias from "../components/CartasCabanias";
import Carrusel from '../components/Carrusel';
import Servicios from '../components/Servicios';

function Home() {

  const [unidades, setUnidades] = useState([]);
  const [error, setError] = useState('');
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    api.get('/imagenes/complejo')
      .then(res => {
        setFotos(res.data.map(img => img.imagenUrl));
      })
      .catch(err => {
        console.error("Error al obtener imágenes:", err);
      });
  }, []);

  useEffect(() => {
    api.get('/')
      .then((response) => {
        const data = response.data;
        const lista = Array.isArray(data)
          ? data
          : Array.isArray(data?.unidades)
          ? data.unidades
          : [];

        setUnidades(lista);
        setError('');
      })
      .catch((err) => {
        console.error(err);
        const mensaje =
          err.response?.data?.error || "Error al obtener cabañas";
        setError(mensaje);
        setUnidades([]);
      });
  }, []);

  return (
    <>
      <div className="botones-fixed">
        <BotonDisponibilidad />
        <BotonUbicacion />
      </div>

      <div className="container mt-3">
        <header className="text-center mt-3">
          <h1
            className="fw-bold mb-3"
            style={{
              color: "var(--verde-hover)",
              fontFamily: "'Great Vibes', cursive",
              fontSize: "4rem",
              lineHeight: "1.1",
            }}
          >
            Cabañas Bella Vista
          </h1>
          <p className="lead" style={{ color: "var(--verde-osc-2)" }}>
            Un lugar para descansar, disfrutar y conectar con la naturaleza.
          </p>
        </header>

        <Carrusel fotos={fotos} height="400px" />

        <Servicios />

        <div className="container mt-5">
          <h2
            className="text-center mb-4"
            style={{ color: "var(--verde-hover)" }}
          >
            Nuestras Cabañas
          </h2>

          <div className="row g-4">
            {unidades.length > 0 ? (
              unidades.map((u) => (
                <div
                  key={u.id}
                  className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
                >
                  <CartasCabanias
                    titulo={u.nombre}
                    texto={u.descripcion}
                    servicios={u.servicios}
                    capacidad={u.capacidad}
                    fotos={u.imagenes?.map(img => img.imagenUrl)}
                  />
                </div>
              ))
            ) : (
              !error && <p>No hay resultados</p>
            )}
          </div>

        </div>
      </div>

      <footer
        className="mt-5 py-4 text-center"
        style={{ background: "var(--verde-hover)", color: "white" }}
      >
        <div className="container">

          <h4 className="mb-3">Contacto</h4>

          <div className="d-flex justify-content-center gap-4">

            <a
              href="https://wa.me/5493564579613"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
              style={{ fontSize: "1.6rem" }}
            >
              <i className="bi bi-whatsapp"></i>
            </a>

            <a
              href="https://instagram.com/bellavistatalahuasi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
              style={{ fontSize: "1.6rem" }}
            >
              <i className="bi bi-instagram"></i>
            </a>

          </div>

          <p className="mt-3 mb-0">
            © {new Date().getFullYear()} Cabañas Bella Vista
          </p>
        </div>
      </footer>

    </>
  );
}

export default Home;
