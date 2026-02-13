import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Martha.css";

function Martha() {
    const [mostrarCarta, setMostrarCarta] = useState(false);
    const [musicaActiva, setMusicaActiva] = useState(false);
    const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
    const audioRef = useRef(null);

    // 🔊 Música automática
    useEffect(() => {
        const playAudio = async () => {
            try {
                audioRef.current.volume = 0.4;
                await audioRef.current.play();
                setMusicaActiva(true);
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                console.log("Autoplay bloqueado");
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

    const fotosElla = [
        "/SanValentin/imagenes/Martha8.jpeg",
        "/SanValentin/imagenes/Martha2.jpeg",
        "/SanValentin/imagenes/Martha3.jpeg",
        "/SanValentin/imagenes/Martha4.jpeg",
        "/SanValentin/imagenes/Martha5.jpeg",
        "/SanValentin/imagenes/Martha7.jpeg",
        "/SanValentin/imagenes/Martha6.jpeg",
        "/SanValentin/imagenes/Martha9.jpeg",
    ];

    return (
        <div className="martha-container">
            <audio
                ref={audioRef}
                src="/SanValentin/musica/MeSalvaste.mp3"
                loop
            />

            {/* Botón música */}
            <button className="martha-boton-musica" onClick={toggleMusica}>
                {musicaActiva ? "⏸ Pausar música" : "🎵 Activar música"}
            </button>

            {/* Título */}
            <motion.h1
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="martha-titulo"
            >
                Para ti, Martha <br />
                ❤️ La mujer más hermosa ❤️
            </motion.h1>
            {/* GALERÍA SOLO DE ELLA */}
            <h1 className="martha1-titulo"> </h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="martha-mensaje"
            >
                Hay personas que llegan a tu vida…
                y se convierten en destino 
                
            </motion.p>
             <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="martha-mensaje"
            >
                
                Cada foto tuya es una obra de arte.
            </motion.p>

            <div className="martha-galeria">
                <div className="martha-grid">
                    {fotosElla.map((foto, index) => (
                        <div
                            key={index}
                            className="martha-card"
                            onClick={() => setFotoSeleccionada(foto)}
                        >
                            <img src={foto} alt={`Martha ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Carta */}
            <div className="martha-carta-wrapper">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="martha-boton"
                    onClick={() => setMostrarCarta(!mostrarCarta)}
                >
                    Leer mi carta 💌
                </motion.button>

                <AnimatePresence>
                    {mostrarCarta && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.6 }}
                            className="martha-carta"
                        >
                            <p>
                                Desde que llegaste a mi vida todo es más bonito.
                                Gracias por cada sonrisa, cada momento y cada recuerdo.
                                Eres mi persona favorita en este mundo. 💕✨
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Álbum pequeño */}
            <div className="martha2-album">
                <motion.h1
                    initial={{ opacity: 0, y: -60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="martha1-titulo"
                >
                    Nuestros Momentos ✨
                </motion.h1>
                <h2 className="martha-subtitulo"></h2>

                <div className="martha-polaroid-container">


                    <div className="martha-polaroid">
                        <img src="/SanValentin/imagenes/MatharVR.jpeg" alt="Juegos VR" />
                        <p>
                            El día que fuimos a los juegos de realidad virtual 🎮
                            risas, emoción y mirarte feliz… uno de mis recuerdos más especiales contigo.
                        </p>
                    </div>
                    <div className="martha-polaroid">
                        <img src="/SanValentin/imagenes/Marthallamdas.jpeg" alt="Llamadas nocturnas" />
                        
                        <p>
                            Nuestras llamadas cada noche 🌙
                            donde el tiempo se detiene y tu voz se convierte en mi lugar favorito.
                        </p>
                    </div>
                </div>
            </div>


            

            {/* Lightbox */}
            <AnimatePresence>
                {fotoSeleccionada && (
                    <motion.div
                        className="martha-lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setFotoSeleccionada(null)}
                    >
                        <motion.img
                            src={fotoSeleccionada}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Martha;
