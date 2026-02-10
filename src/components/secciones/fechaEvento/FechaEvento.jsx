import React from "react";
import "./FechaEvento.css";
import { FaDove } from "react-icons/fa";

export default function FechaEvento() {
  const year = 2025;
  const monthIndex = 11; // 11 = Diciembre (JavaScript usa 0 para Enero)
  const firstDay = new Date(year, monthIndex, 1);
  const firstWeekday = (firstDay.getDay() + 6) % 7; // El 1 de Diciembre 2025 es Lunes (empieza lunes)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // DÍA DEL EVENTO: Cambiado de 20 a 14
  const EVENTO_DIA = 14; 

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <section className="fechaEvento-wrap">
      <div className="cal-card">
        <div className="cal-left">
          <div className="mes-titulo">Diciembre 2025</div>

          <div className="grid-legend">
            <div>Lun</div>
            <div>Mar</div>
            <div>Mié</div>
            <div>Jue</div>
            <div>Vie</div>
            <div>Sáb</div>
            <div>Dom</div>
          </div>

          <div className="grid-days">
            {cells.map((d, i) => {
              // === CAMBIO CLAVE: El día especial es ahora el 14 ===
              const isEvento = d === EVENTO_DIA; 
              
              return (
                <div
                  key={i}
                  className={`dia ${isEvento ? "especial" : d ? "" : "vacio"}`}
                  aria-label={d ? `Día ${d}` : "vacío"}
                >
                  {d && isEvento ? (
                    <div className="dia-especial">
                      <span className="corazon"><FaDove /></span>
                      <span className="numero-dia">{d}</span>
                    </div>
                  ) : d ? (
                    d
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}