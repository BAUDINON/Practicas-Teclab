function Servicios() {
  const servicios = [
    { icono: "bi-water", texto: "Pileta para refrescarte" },
    { icono: "bi-fire", texto: "Quincho para asados" },
    { icono: "bi-car-front", texto: "Estacionamiento techado" },
    { icono: "bi-tree-fill", texto: "Amplio parque" },
    { icono: "bi-droplet", texto: "Río a 150 m" },
    { icono: "bi-tv", texto: "DirecTV" },
    { icono: "bi-wifi", texto: "Wi-Fi" },
    { icono: "bi-cup-hot", texto: "Desayuno alpino" },
    { icono: "bi-egg-fried", texto: "Cocina completa" },
    { icono: "bi-snow", texto: "A/C frío - calor" },
    { icono: "bi-moon-stars", texto: "Sábanas incluidas" },
    { icono: "bi-exclamation-triangle", texto: "Toallones no incluidos" },
  ];

  return (
    <div className="container mt-5">
      <h2
        className="text-center mb-4"
        style={{ color: "var(--verde-hover)" }}
      >
        Servicios del Complejo
      </h2>

      <div className="row g-4 text-center">
        {servicios.map((s, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <i
              className={`bi ${s.icono}`}
              style={{ fontSize: "2.5rem", color: "var(--verde-osc-2)" }}
            ></i>
            <p className="mt-2">{s.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;
