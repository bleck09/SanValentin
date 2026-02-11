import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Maria.css";

function Maria() {
  const [mostrarCarta, setMostrarCarta] = useState(false);

  return (
    <div className="maria-container">

      {/* 🎵 Música */}
      <audio autoPlay loop>
        <source src="/SanValentin/musica/MeSalvaste.mp3" type="audio/mpeg" />
      </audio>

      {/* 🌌 Estrellas */}
      <div className="stars"></div>

      {/* 🌙 Título */}
      <motion.h1
        className="titulo-maria"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        María ✨
      </motion.h1>

      <motion.p
        className="subtitulo-maria"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Entre todas las estrellas… tú sigues siendo la que más brilla 🌟
      </motion.p>

      <motion.button
        className="boton-maria"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMostrarCarta(true)}
      >
        Mira al cielo 💫
      </motion.button>

      {/* 💌 Carta */}
      {mostrarCarta && (
        <motion.div
          className="carta-maria"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p>
            Desde que llegaste a mi vida, cada noche tiene más luz.
            No importa cuán oscuro esté el cielo,
            porque tú siempre iluminas mi mundo.
            ✨💜
          </p>
        </motion.div>
      )}

      {/* 📸 Galería */}
      <div className="galeria-maria">
        <h2>Nuestros Recuerdos 📸</h2>
        <div className="fotos">
          <div className="foto">Recuerdo 1</div>
          <div className="foto">Recuerdo 2</div>
          <div className="foto">Recuerdo 3</div>
        </div>
      </div>

      {/* 💍 Promesa Final */}
      <div className="promesa">
        <h2>Mi Promesa 💍</h2>
        <p>
          Prometo seguir eligiéndote cada día,
          en cada universo,
          en cada vida.
        </p>
      </div>

    </div>
  );
}

export default Maria;
