import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import './BotonInvitacion.css';

const BotonInvitacion = () => {
    return (
        <div className="inv-btn-container">
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}  // latido del botón
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
            >
                <Link to="/Productos" className="inv-boton">
                    <motion.span
                        className="inv-icon"
                        animate={{ rotate: [0, -8, 8, 0] }}  // movimiento del icono
                        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                    >
                        <FaRegEnvelopeOpen />
                    </motion.span>
                    Ver invitación
                </Link>
            </motion.div>
        </div>
    );
};

export default BotonInvitacion;
