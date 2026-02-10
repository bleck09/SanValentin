import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// **CAMBIO AQUÍ: Importamos un nuevo ícono (FaImages)**
import { FaImages } from "react-icons/fa"; 
import './BotonAlbun.css';

const BotonAlbun = () => {
    return (
        <div className="inv-btn-container">
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}  // latido del botón
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
            >
                {/* Asegúrate de cambiar la ruta si es necesario. "/Albun" está bien si lleva a la galería. */}
                <Link to="/Albun" className="inv-boton"> 
                    <motion.span
                        className="inv-icon"
                        animate={{ rotate: [0, -8, 8, 0] }}  // movimiento del icono
                        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                    >
                        {/* **CAMBIO AQUÍ: Usamos el nuevo ícono** */}
                        <FaImages /> 
                    </motion.span>
                    {/* **TEXTO DEL BOTÓN: Elige la opción que más te guste** */}
                    Mi Álbum de Recuerdos
                </Link>
            </motion.div>
        </div>
    );
};

export default BotonAlbun;