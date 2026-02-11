import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import "./Home.css";

const respuestasCorrectas = {
  comida: "pizza",
  color: "rosa",
  nosotros: "destino"
};

const Home = () => {
  const [form, setForm] = useState({
    comida: "",
    color: "",
    nosotros: ""
  });

  const [correcto, setCorrecto] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    mensaje: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const verificar = (e) => {
    e.preventDefault();

    let errores = [];

    Object.keys(respuestasCorrectas).forEach((campo, index) => {
      if (
        form[campo].toLowerCase().trim() !== respuestasCorrectas[campo]
      ) {
        errores.push(index + 1);
      }
    });

    if (errores.length === 0) {
      setCorrecto(true);
    } else {
      setModal({
        visible: true,
        mensaje: `Te equivocaste en la pregunta ${errores.join(", ")} 💔`
      });

      // Borra solo las incorrectas
      let nuevoForm = { ...form };
      errores.forEach((num) => {
        const campo = Object.keys(respuestasCorrectas)[num - 1];
        nuevoForm[campo] = "";
      });

      setForm(nuevoForm);
    }
  };

  return (
    <div className="fondo_romantico">
      <div className="contenedor_formulario">

        <h1 className="titulo_romantico">
          Solo quien conoce mi corazón puede abrir esta invitación 💖
        </h1>

        {!correcto && (
          <form onSubmit={verificar} className="formulario_romantico">

            <input
              type="text"
              name="comida"
              placeholder="🍕 ¿Mi comida favorita?"
              value={form.comida}
              onChange={handleChange}
            />

            <input
              type="text"
              name="color"
              placeholder="🌸 ¿Mi color favorito?"
              value={form.color}
              onChange={handleChange}
            />

            <input
              type="text"
              name="nosotros"
              placeholder="💌 ¿Qué somos tú y yo?"
              value={form.nosotros}
              onChange={handleChange}
            />

            <button type="submit" className="btn_verificar">
              Desbloquear 💕
            </button>
          </form>
        )}

        {correcto && (
          <div className="inv-btn-container">
            <Link to="/Productos" className="inv-boton">
              <FaRegEnvelopeOpen />
              Ver invitación
            </Link>
          </div>
        )}

      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modal.visible && (
          <motion.div
            className="modal_overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal_contenido"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>{modal.mensaje}</h3>
              <button
                className="btn_modal"
                onClick={() =>
                  setModal({ ...modal, visible: false })
                }
              >
                Intentar otra vez 💗
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;
