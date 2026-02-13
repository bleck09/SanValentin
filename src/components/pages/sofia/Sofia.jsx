import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./Sofia.css";

function Sofia() {
  const [mostrarCarta, setMostrarCarta] = useState(false);
  const [musicaActiva, setMusicaActiva] = useState(false);

  const [mostrarCorazon, setMostrarCorazon] = useState(false);
  const [mostrarNombre, setMostrarNombre] = useState(false);
  const [mostrarFrase, setMostrarFrase] = useState(false);

  const audioRef = useRef(null);
  const animRef = useRef(null);
  const secuenciaRef = useRef(false);
  
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
  // ❤️ Animación corazón 3D
  useEffect(() => {
    if (!mostrarCorazon) return;

    const canvas = document.querySelector(".sofia-heart-canvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const total = 1500;

    let angleY = 0;
    let formation = 0;

    function heartShape(t) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      return { x, y };
    }

    for (let i = 0; i < total; i++) {
      const t = Math.random() * Math.PI * 2;
      const heart = heartShape(t);
      const depth = (Math.random() - 0.5) * 40;

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 300 - 150,
        targetX: heart.x,
        targetY: heart.y,
        targetZ: depth,
        size: Math.random() * 2 + 1
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (formation < 1) {
        formation += 0.004;
      } else if (!secuenciaRef.current) {
        secuenciaRef.current = true;

        setTimeout(() => setMostrarNombre(true), 400);
        setTimeout(() => setMostrarFrase(true), 1800);
      }

      angleY += 0.01;

      particles.forEach(p => {
        const scale = canvas.width / 40;

        const tx = canvas.width / 2 + p.targetX * scale;
        const ty = canvas.height / 2 - p.targetY * scale;
        const tz = p.targetZ;

        p.x += (tx - p.x) * formation * 0.05;
        p.y += (ty - p.y) * formation * 0.05;
        p.z += (tz - p.z) * formation * 0.05;

        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);

        const x = p.x - canvas.width / 2;
        const z = p.z;

        const rotatedX = x * cosY - z * sinY;
        const rotatedZ = x * sinY + z * cosY;

        const perspective = 400 / (400 + rotatedZ);
        const finalX = canvas.width / 2 + rotatedX * perspective;
        const finalY = p.y * perspective;

        const size = p.size * perspective * 2;

        ctx.beginPath();
        ctx.arc(finalX, finalY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 30, 120, ${0.7 + rotatedZ / 300})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animRef.current);
    };
  }, [mostrarCorazon]);

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
      <br /><br /><br />

      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="sofia-titulo"
      >
        Te amo Sofia
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
        onClick={() => setMostrarCorazon(true)}
      >
        Revelar mi corazón
      </motion.button>
      {mostrarCorazon && (
        <div className="sofia-heart-wrapper">
          <canvas className="sofia-heart-canvas"></canvas>

          <div className="sofia-heart-text">
            {mostrarNombre && (
              <div className="texto-nombre">Sofía</div>
            )}

            {mostrarFrase && (
              <div className="texto-frase">Mi persona favorita</div>
            )}
          </div>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="sofia-boton"
        onClick={() => setMostrarCarta(true)}
      >
        Leer mi carta
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
            <img src="/SanValentin/imagenes/SanValentin1.jpg" alt="recuerdo1" />
            <p>Ese día que nunca olvidaré 💕</p>
          </div>

          <div className="sofia-polaroid">
            <img src="/SanValentin/imagenes/SanValentin2.jpg" alt="recuerdo2" />
            <p>Tu sonrisa ilumina todo ✨</p>
          </div>

          <div className="sofia-polaroid">
            <img src="/SanValentin/imagenes/SanValentin3.jpg" alt="recuerdo3" />
            <p>Momentos que valen oro 💖</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Sofia;
