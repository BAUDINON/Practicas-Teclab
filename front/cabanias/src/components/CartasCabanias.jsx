import { useState } from "react";

function CartasCabanias({ titulo, texto, fotos, servicios, capacidad }) {
  const [showModal, setShowModal] = useState(false);

  const sanitizeId = (str) =>
    String(str)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "");

  const idBase = sanitizeId(titulo);

  return (
    <>
      {/* TARJETA */}
      <div className="card card-naturaleza" style={{ width: "22rem" }}>
        {/* CARRUSEL */}
        <div
          id={`carousel-${idBase}`}
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {(fotos ?? []).length > 0 ? (
              fotos.map((foto, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={foto}
                    className="d-block w-100 img-carrusel"
                    alt={`foto-${index}`}
                  />
                </div>
              ))
            ) : (
              <div className="carousel-item active">
                <img
                  src="/no-image.jpg"
                  className="d-block w-100 img-carrusel"
                  alt="sin-fotos"
                />
              </div>
            )}
          </div>
        </div>

        {/* TEXTO */}
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>

          {capacidad && (
            <p className="text-muted mb-1">
              Capacidad: <strong>{capacidad} personas</strong>
            </p>
          )}

          <p className="card-text">{texto?.slice(0, 90)}...</p>

          <button
            className="btn btn-success btn-verde"
            onClick={() => setShowModal(true)}
          >
            Ver más
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.6)",
            zIndex: 9999,
          }}
          tabIndex="-1"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{titulo}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                {/* CARRUSEL GRANDE */}
                <div
                  id={`modal-carousel-${idBase}`}
                  className="carousel slide mb-3"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {(fotos ?? []).map((foto, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                      >
                        <img
                          src={foto}
                          className="d-block w-100 rounded"
                          style={{ maxHeight: "80vh", objectFit: "contain" }}
                        />
                      </div>
                    ))}
                  </div>

                  {(fotos ?? []).length > 1 && (
                    <>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#modal-carousel-${idBase}`}
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon" />
                      </button>

                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#modal-carousel-${idBase}`}
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon" />
                      </button>
                    </>
                  )}
                </div>

                {/* DESCRIPCIÓN */}
                <h6 className="fw-bold">Descripción</h6>
                <p>{texto}</p>

                {capacidad && (
                  <>
                    <h6 className="fw-bold mt-3">Capacidad</h6>
                    <p>{capacidad} personas</p>
                  </>
                )}

                {servicios && (
                  <>
                    <h6 className="fw-bold mt-3">Servicios</h6>
                    <p>{servicios}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartasCabanias;
