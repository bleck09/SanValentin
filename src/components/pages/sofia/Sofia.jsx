import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./Sofia.css";

function Sofia() {
  const [mostrarCarta, setMostrarCarta] = useState(false);
  const [musicaActiva, setMusicaActiva] = useState(false);
  const audioRef = useRef(null);

  // Intentar reproducir automáticamente
  useEffect(() => {
    const playAudio = async () => {
      try {
        audioRef.current.volume = 0.4; // volumen suave
        await audioRef.current.play();
        setMusicaActiva(true);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.log("Autoplay bloqueado por el navegador");
      }
    };

    playAudio();
  }, []);

  const toggleMusica = () => {
    if (musicaActiva) {
      audioRef.current.pause();
      setMusicaActiva(false);
    } else {
      audioRef.current.play();
      setMusicaActiva(true);
    }
  };

  return (
    <div className="sofia-container">
      <audio
        ref={audioRef}
        src="/SanValentin/musica/MeSalvaste.mp3"
        loop
      />

      {/* Botón música */}
      <button className="sofia-boton-musica" onClick={toggleMusica}>
        {musicaActiva ? "⏸ Pausar música" : "🎵 Activar música"}
      </button>

      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="sofia-titulo"
      >
        Te amo Sofia 💖
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="sofia-mensaje"
      >
        Esta sorpresa es únicamente para ti ✨
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="sofia-boton"
        onClick={() => setMostrarCarta(true)}
      >
        Leer mi carta 💌
      </motion.button>

      {mostrarCarta && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="sofia-carta"
        >
          <p>
            Desde que llegaste a mi vida todo es más bonito.
            Gracias por cada sonrisa, cada momento y cada recuerdo.
            Eres mi persona favorita en este mundo. 💕✨
          </p>
        </motion.div>
      )}
      <div className="sofia-album">
  <h2 className="sofia-subtitulo">Nuestros Recuerdos 📸</h2>

  <div className="sofia-polaroid-container">

    <div className="sofia-polaroid">
      <img src="/SanValentin/imagenes/sofia1.jpg" alt="recuerdo1" />
      <p>Ese día que nunca olvidaré 💕</p>
    </div>

    <div className="sofia-polaroid">
      <img src="/SanValentin/imagenes/sofia2.jpg" alt="recuerdo2" />
      <p>Tu sonrisa ilumina todo ✨</p>
    </div>

    <div className="sofia-polaroid">
      <img src="/SanValentin/imagenes/sofia3.jpg" alt="recuerdo3" />
      <p>Momentos que valen oro 💖</p>
    </div>

  </div>
</div>

    </div>
  );
}

export default Sofia;
