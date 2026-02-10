import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [form, setForm] = useState({
    comida: "",
    color: "",
    nosotros: ""
  });

  const [correcto, setCorrecto] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const verificar = (e) => {
    e.preventDefault();

    if (
      form.comida.toLowerCase().trim() === "pizza" &&
      form.color.toLowerCase().trim() === "rosa" &&
      form.nosotros.toLowerCase().trim() === "destino"
    ) {
      setCorrecto(true);
      setError("");
    } else {
      setError("Mmm... creo que necesitas conocerme un poquito más 💕");
    }
  };

  return (
    <div className="fondo_romantico">
      <div className="contenedor_formulario">

        <motion.h1 
          className="titulo_romantico"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Solo quien conoce mi corazón puede abrir esta invitación 💖
        </motion.h1>

        {!correcto && (
          <form onSubmit={verificar} className="formulario_romantico">

            <input
              type="text"
              name="comida"
              placeholder="🍕 ¿Mi comida favorita?"
              onChange={handleChange}
            />

            <input
              type="text"
              name="color"
              placeholder="🌸 ¿Mi color favorito?"
              onChange={handleChange}
            />

            <input
              type="text"
              name="nosotros"
              placeholder="💌 ¿Qué somos tú y yo?"
              onChange={handleChange}
            />

            <button type="submit" className="btn_verificar">
              Desbloquear 💕
            </button>
          </form>
        )}

        {error && <p className="mensaje_error">{error}</p>}

        {correcto && (
          <motion.div
            className="inv-btn-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link to="/Productos" className="inv-boton">
                <motion.span
                  className="inv-icon"
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                >
                  <FaRegEnvelopeOpen />
                </motion.span>
                Ver invitación
              </Link>
            </motion.div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Home;
