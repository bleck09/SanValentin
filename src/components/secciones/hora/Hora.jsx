import React from "react";
import { FaClock } from "react-icons/fa";
import "./Hora.css";

function Hora() {
  return (
    <div className="hora-container">



      <div className="hora-card">
        <FaClock className="hora-icon" />
        <span className="hora-text anim-hora">12:30 hrs</span>
      </div>
      <p className="hora-detalle">
        Después de la misa, que se celebrará a las <span className="puntualidad">11:00 de la mañana</span>,
        los invitamos con mucho cariño a <span className="puntualidad"> nuestra casa </span>
        a partir de las <span className="puntualidad"> 12:30 </span>
        para compartir un almuerzo en familia.
      </p>

    </div>
  );
}

export default Hora;
