import React, { useState } from 'react';
import './Sobre.css';
import BotonInvitacion from "../../secciones/botonInvitacion/BotonInvitacion";
// Asume que la imagen del sello está disponible, por ejemplo, 
// import SealImage from '/ruta/al/sello.png'; 

const Sobre = () => {
  const [estaAbierto, setEstaAbierto] = useState(false);

  // Función para manejar el clic y abrir/cerrar el sobre
  const handleToggle = () => {
    setEstaAbierto(!estaAbierto);
  };

  return (
    <div className="sobre-container" onClick={handleToggle}>
      {/* El elemento principal tiene la clase 'abierto' si el estado es true.
        Esta clase controlará la animación en CSS.
      */}
      <div className={`sobre ${estaAbierto ? 'abierto' : ''}`}>
        
        {/* Parte trasera del sobre (Fondo estático) */}
        <div className="sobre-base"></div>
        
        {/* Solapa superior: Se gira y se eleva para simular la apertura.
        */}
        <div className="sobre-solapa-superior"></div>
        
        {/* Cuerpo principal frontal del sobre */}
        <div className="sobre-cuerpo">
          
          {/* Cinta y Sello (Contenido decorativo) */}
          <div className="sobre-cinta-sello">
             {/* La imagen del sello la haremos con CSS para simplificar, o podrías usar una etiqueta img */}
             {/* <img src={SealImage} alt="Sello de la Comunión" className="sello-img" /> */}
          </div>
        </div>
        
        {/* Aquí iría el contenido de la invitación (Tarjeta) que se vería 
          cuando el sobre esté abierto.
        */}
        <div className="sobre-tarjeta-interior">
             <p>Tenemos el honor de invitarle a Celebrar mi primera Comunión.</p>
             
                <BotonInvitacion />
             {/* Este es el espacio donde iría la tarjeta de invitación completa. */}
        </div>

      </div>
      {/* Mensaje o Indicación */}
      <p className="mensaje-sobre">{estaAbierto ? 'Cerrar sobre' : 'Haz clic para abrir'}</p>
    </div>
  );
};

export default Sobre;