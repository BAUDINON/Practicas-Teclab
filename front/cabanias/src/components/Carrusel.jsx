function Carrusel({ fotos = [], id = "carrusel" }) {
  const tieneFotos = fotos.length > 0;

  return (
    <div id={id} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {tieneFotos ? (
          fotos.map((foto, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="aspect-ratio-wrapper">
                <img src={foto} alt={`Slide ${index}`} />
              </div>
            </div>
          ))
        ) : (
          <div className="carousel-item active">
            <div className="d-flex justify-content-center align-items-center" style={{ height: "250px", backgroundColor: "#eee" }}>
              <p>No hay imágenes disponibles</p>
            </div>
          </div>
        )}
      </div>

      {tieneFotos && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </>
      )}
    </div>
  );
}

export default Carrusel;