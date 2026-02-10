import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CuentaRegresiva.css';

// 14 de diciembre 2025 - 13:00
const FECHA_EVENTO = new Date('2025-12-14T12:30:00');

export default function CuentaRegresiva() {
  const [tiempo, setTiempo] = useState(obtenerTiempo());

  function obtenerTiempo() {
    const ahora = new Date();
    const diferencia = FECHA_EVENTO - ahora;

    if (diferencia <= 0) return null;

    return {
      dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((diferencia / (1000 * 60)) % 60),
      segundos: Math.floor((diferencia / 1000) % 60),
    };
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo(obtenerTiempo());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  if (!tiempo) {
    return (
      <div className="countdown-completo">
        🎉 ¡La Primera Comunión ya empezó! 🎉
      </div>
    );
  }

  return (
    <div className="countdown-container">
      <Item valor={tiempo.dias} label="Días" />
      <Item valor={tiempo.horas} label="Horas" />
      <Item valor={tiempo.minutos} label="Min" />
      <Item valor={tiempo.segundos} label="Seg" />
    </div>
  );
}

/* ---------- Componente optimizado ---------- */
const Item = React.memo(function Item({ valor, label }) {
  return (
    <div className="countdown-item">
      <span className="numero">{valor}</span>
      <span className="label">{label}</span>
    </div>
  );
});

Item.displayName = 'Item';

Item.propTypes = {
  valor: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};
