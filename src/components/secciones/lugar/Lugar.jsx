import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./Lugar.css";

export default function Lugar() {
    const imagenes = [
        "/Adriana/imagenes/lugar5.jpeg",
        "/Adriana/imagenes/lugar4.jpeg",
        "/Adriana/imagenes/lugar2.jpeg",
    ];

    const mapsLink = "https://maps.app.goo.gl/RueNJVDnKy19EpgN8?g_st=aw";
    const venueName = "MAG EMIL EVENTOS";
    const venueAddress = "Av. Capitán Víctor Ustariz y Av. Segunda, Km 4";

    return (
        <section className="lugar-section">

            {/* Encabezado elegante */}
            <div className="lugar-header">


                <motion.h3
                    className="titulo-lugar-small"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                >
                    {venueName}
                </motion.h3>

                <motion.p
                    className="direccion-lugar"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                >
                    {venueAddress}
                </motion.p>
            </div>

            {/* Galería + Carrusel combinados */}
            <div className="galeria-responsive" role="list">
                {imagenes.map((img, index) => (
                    <motion.div
                        key={index}
                        className="galeria-item"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <img src={img} alt={`imagen-${index}`} />
                    </motion.div>
                ))}
            </div>

            {/* Botones y detalles del evento */}
            <div className="lugar-actions">
                <motion.a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-mapa"
                    animate={{ scale: [1, 1.1, 1] }} // latido continuo
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    whileHover={{ scale: 1.08 }}       // crece al hover
                    whileTap={{ scale: 0.96 }}         // efecto al click
                >
                    <motion.div
                        className="icono-mapa"
                        animate={{ scale: [1, 1.25, 1] }} // latido del icono
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    >
                        <FaMapMarkerAlt />
                    </motion.div>
                    Ver ubicación
                </motion.a>

                <div className="lugar-meta">
                    <div className="meta-item">
                        <span className="meta-label">Hora</span>
                        <span className="meta-value">18:00</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">  Capacidad</span>
                        <span className="meta-value">  200</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
