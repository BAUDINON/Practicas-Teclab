export default function BotonUbicacion() {
  const handleClick = () => {
    window.open(
      "https://www.google.com/maps/place/Caba%C3%B1as+Bella+Vista/@-31.4731357,-64.5712666,1293m/data=!3m2!1e3!4b1!4m9!3m8!1s0x942d684a06bd8733:0x502e9f7418b4cd17!5m2!4m1!1i2!8m2!3d-31.4731403!4d-64.5686917!16s%2Fg%2F11c5ztb9bq?entry=ttu",
      "_blank"
    );
  };

  return (
    <button onClick={handleClick} className="btn boton-ubicacion">
      Ver ubicación
    </button>
  );
}