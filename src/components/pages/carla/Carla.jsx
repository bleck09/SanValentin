import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./Carla.css";

function Carla() {
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
            <br /><br /><br /><br />

            <motion.h1
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="sofia-titulo"
            >
                Te quiero mi Carlita 💖
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
                        <img src="/SanValentin/imagenes/carla1.jpeg" alt="Tienda juntos" />
                        <p>Vendiendo tenis contigo, todo fue más divertido 👟💕</p>
                    </div>

                    <div className="sofia-polaroid">
                        <img src="/SanValentin/imagenes/carla2.jpeg" alt="En el auto" />
                        <p>A solas en el auto, hablando sin que el tiempo importe 🚗✨</p>
                    </div>

                    <div className="sofia-polaroid">
                        <img src="/SanValentin/imagenes/carla3.jpeg" alt="Vóley" />
                        <p>Eres la mejor jugadora, incluso más fuerte que cualquier caída 🏐💛</p>
                    </div>

                    <div className="sofia-polaroid">
                        <img src="/SanValentin/imagenes/carla4.jpeg" alt="Películas juntos" />
                        <p>Películas, comida y tú… mi plan favorito 🎬🍿💖</p>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Carla;
