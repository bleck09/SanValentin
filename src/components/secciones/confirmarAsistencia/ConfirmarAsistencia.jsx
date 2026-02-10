import React from 'react';
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import './ConfirmarAsistencia.css';

function ConfirmarAsistencia() {
    const whatsappNumber = "+59174339667";
    const mensaje = encodeURIComponent(
        "¡Hola! Gracias por la invitación, confirmo mi asistencia a la Primera Comunión de Luis Miguel..."
    );
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${mensaje}`;

    return (
        <div className="confirmar-actions">
            <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="confirmar-btn"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
            >
                <motion.span
                    className="confirmar-icon"
                    whileHover={{ rotate: 12 }}
                    transition={{ duration: 0.2 }}
                >
                    <FaCheckCircle />
                </motion.span>
                Confirmar asistencia
            </motion.a>
        </div>
    );
}

export default ConfirmarAsistencia;
