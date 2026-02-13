import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaHeart, FaMapMarkerAlt, FaClock } from "react-icons/fa";

import "./Bleck.css";

function Bleck() {
    const totalIntentos = 10;

    const imagenes = [
        "/SanValentin/imagenes/gif2.gif",
        "/SanValentin/imagenes/gif_sad1.gif",
        "/SanValentin/imagenes/gif_sad3.gif",
        "/SanValentin/imagenes/gif_sad4.gif",
        "/SanValentin/imagenes/gif_sad5.gif",
        "/SanValentin/imagenes/gif_sad6.gif",
        "/SanValentin/imagenes/gif_sad7.gif",
        "/SanValentin/imagenes/gif_sad8.gif",
        "/SanValentin/imagenes/gif_sad9.gif",
        "/SanValentin/imagenes/gif_sad2.gif",
    ];

    const textos = [
        "Ups… botón equivocado 😅",
        "¿Segura que no? 🤭",
        "Piénsalo otra vez 💭",
        "Creo que querías presionar el otro 👀",
        "Ese no era 😌",
        "Inténtalo otra vez 💖",
        "Hmm… sospechoso 🤨",
        "Ese botón está fallando 😜",
        "Vamos, tú puedes 💕",
        "Sabía que intentarías ese 😆",
        "El rosa se ve bonito 😜"
    ];

    const [intento, setIntento] = useState(0);
    const [imagenActual, setImagenActual] = useState(imagenes[0]);
    const [textoActual, setTextoActual] = useState(
        "Prometo que será un día inolvidable"
    );
    const [noSize, setNoSize] = useState(1);
    const [posNo, setPosNo] = useState({ x: 0, y: 0 });
    const [aceptado, setAceptado] = useState(false);
    const [usados, setUsados] = useState([]);
    const [movible, setMovible] = useState(false);

    const audioSiRef = useRef(null);
    const audioNoRef = useRef(null);
    const [musicaActual, setMusicaActual] = useState(null);

    const zonaRef = useRef(null);

    const obtenerNuevoIndice = () => {
        const disponibles = imagenes
            .map((_, i) => i)
            .filter((i) => !usados.includes(i));

        if (disponibles.length === 0) return null;
        return disponibles[Math.floor(Math.random() * disponibles.length)];
    };

    const moverBoton = () => {
        if (!zonaRef.current) return;

        const zona = zonaRef.current.getBoundingClientRect();

        const buttonWidth = 110;
        const buttonHeight = 45;

        const maxX = zona.width - buttonWidth;
        const maxY = zona.height - buttonHeight;

        let nuevoX;
        let nuevoY;

        do {
            nuevoX = Math.random() * maxX;
            nuevoY = Math.random() * maxY;
        } while (
            // Evita zona central donde está el botón SI
            nuevoX > zona.width / 2 - 80 &&
            nuevoX < zona.width / 2 + 80
        );

        setPosNo({ x: nuevoX, y: nuevoY });
    };

    const manejarNo = () => {
        if (intento >= totalIntentos) return;

        const nuevoIndice = obtenerNuevoIndice();
        if (nuevoIndice === null) return;

        setMovible(true);
        setUsados([...usados, nuevoIndice]);
        setImagenActual(imagenes[nuevoIndice]);
        setTextoActual(textos[nuevoIndice]);
        setIntento(intento + 1);
        setNoSize((prev) => prev * 0.85);

        moverBoton();

        // 🎵 Música NO (solo la primera vez)
        if (musicaActual !== "no") {
            if (audioSiRef.current) {
                audioSiRef.current.pause();
                audioSiRef.current.currentTime = 0;
            }

            if (audioNoRef.current) {
                audioNoRef.current.play();
            }

            setMusicaActual("no");
        }
    };


    const manejarSi = () => {
        setAceptado(true);

        // 🎵 Cambiar música a romántica
        if (musicaActual !== "si") {
            if (audioNoRef.current) {
                audioNoRef.current.pause();
                audioNoRef.current.currentTime = 0;
            }

            if (audioSiRef.current) {
                audioSiRef.current.play();
            }

            setMusicaActual("si");
        }
    };


    return (
        <div className="anahy-page">
            <audio
                ref={audioSiRef}
                src="/SanValentin/musica/Happy.mp3"
                loop
            />

            <audio
                ref={audioNoRef}
                src="/SanValentin/musica/Sad.mp3"
                loop
            />
            <div className="anahy-card">
                <span className="heart heart-top-left">💖</span>
                <span className="heart heart-top-right">💖</span>
                <span className="heart heart-bottom-left">💖</span>
                <span className="heart heart-bottom-right">💖</span>
                <AnimatePresence mode="wait">
                    {!aceptado ? (
                        <motion.div
                            key="contenido"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h1 className="anahy-title">
                                Hola, Nashly<br />
                                ¿Quieres ser mi San Valentín?
                            </h1>

                            <motion.img
                                key={imagenActual}
                                src={imagenActual}
                                alt="San Valentin"
                                className="anahy-image"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            />

                            <div className="anahy-zona" ref={zonaRef}>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="anahy-btn-si"
                                    onClick={manejarSi}
                                >
                                    Sí
                                </motion.button>

                                {intento < totalIntentos ? (
                                    <motion.button
                                        className="anahy-btn-no"
                                        style={{
                                            position: movible ? "absolute" : "relative",
                                            left: movible ? 0 : "auto",
                                            top: movible ? 0 : "auto",
                                        }}
                                        animate={
                                            movible
                                                ? { x: posNo.x, y: posNo.y, scale: noSize }
                                                : { scale: 1 }
                                        }
                                        transition={{ type: "spring", stiffness: 300 }}
                                        onClick={manejarNo}
                                    >
                                        No
                                    </motion.button>

                                ) : (
                                    <motion.button
                                        className="anahy-btn-si"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                        onClick={manejarSi}
                                    >
                                        Sí 😜
                                    </motion.button>
                                )}
                            </div>

                            <motion.p
                                key={textoActual}
                                className="anahy-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {textoActual}
                            </motion.p>


                        </motion.div>
                    ) : (
                        <motion.div
                            key="final"
                            className="anahy-final"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, type: "spring" }}
                        >
                            <motion.h2
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="anahy-final-title"
                            >
                                ¡Sabía que dirías que sí!
                            </motion.h2>

                            <motion.img
                                src="/SanValentin/imagenes/SanValentin3.jpg"
                                alt="Anahy"
                                className="anahy-image-final"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 }}
                            />
                            <motion.h2
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="anahy-final-title"
                            >
                                De mí, para ti, Nashly.
                            </motion.h2>

                            <motion.p
                                className="anahy-final-text"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                            >
                                Sabía que terminarías aquí… el amor siempre encuentra el camino (aunque yo lo haya guiado un poquito 🤣😂).
                            </motion.p>
                            <motion.div
                                className="anahy-invite-box"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 }}
                            >
                                <div className="anahy-invite-header">
                                    <FaHeart className="heart-icon" />
                                    <h3>Nuestra cita especial</h3>
                                    <FaHeart className="heart-icon" />
                                </div>

                                <div className="anahy-invite-info">
                                    <p>
                                        <FaClock className="info-icon" />
                                        Mañana — 5:00 p.m.
                                    </p>
                                    <p>
                                        <FaMapMarkerAlt className="info-icon" />
                                        En la plaza 💖
                                    </p>
                                </div>

                                <p className="anahy-invite-text">
                                    Prometo una tarde llena de sonrisas, miradas que dicen más que mil palabras
                                    y un momento que quedará guardado en nuestro corazón para siempre.
                                </p>

                                <motion.button
                                    className="anahy-whatsapp-btn"
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                        window.open(
                                            "https://wa.me/59168542532?text=Sí%20confirmo%20nuestra%20cita%20mañana%20a%20las%205%20p.m.%20💖",
                                            "_blank"
                                        )
                                    }
                                >
                                    <FaWhatsapp />
                                    Confirmar por WhatsApp
                                </motion.button>
                            </motion.div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Bleck;
