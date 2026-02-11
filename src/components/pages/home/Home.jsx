import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import "./Home.css";

/* 🔐 PERSONAS SECRETAS */
const personas = {
  ana: {
    alias: ["ana", "ani", "anita"],
    comida: "pizza",
    color: "rosa",
    nosotros: "destino",
    ruta: "/Productos",
    nombreMostrar: "Ana"
  },
  maria: {
    alias: ["maria", "mary", "mari"],
    comida: "sushi",
    color: "azul",
    nosotros: "eternidad",
    ruta: "/maria",
    nombreMostrar: "María"
  },
  sofia: {
    alias: ["sofia", "sofi", "sof"],
    comida: "pasta",
    color: "lila",
    nosotros: "magia",
    ruta: "/sofia",
    nombreMostrar: "Sofía"
  }
  ,
  martha: {
    alias: ["martha", "mar", "martita"],
    comida: "pescado",
    color: "negro",
    nosotros: "amigos",
    ruta: "/martha",
    nombreMostrar: "Martha"
  }
};

const Home = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    comida: "",
    color: "",
    nosotros: ""
  });

  const [personaActiva, setPersonaActiva] = useState(null);
  const [modal, setModal] = useState({ visible: false, mensaje: "" });
  const [mostrarExito, setMostrarExito] = useState(false);

  const normalizar = (texto) =>
    texto.toLowerCase().trim();

  const encontrarPersona = (nombreIngresado) => {
    const nombreNormalizado = normalizar(nombreIngresado);

    return Object.values(personas).find(persona =>
      persona.alias.includes(nombreNormalizado)
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const verificar = (e) => {
    e.preventDefault();

    const persona = encontrarPersona(form.nombre);

    if (!persona) {
      setModal({
        visible: true,
        mensaje: "Creo que esta invitación no era para ti... 💌"
      });
      return;
    }

    let errores = [];

    if (normalizar(form.comida) !== persona.comida) errores.push(2);
    if (normalizar(form.color) !== persona.color) errores.push(3);
    if (normalizar(form.nosotros) !== persona.nosotros) errores.push(4);

    if (errores.length === 0) {
      setPersonaActiva(persona);
      setMostrarExito(true);
    } else {
      setModal({
        visible: true,
        mensaje: `Te equivocaste en la pregunta ${errores.join(", ")} 💔`
      });

      let nuevoForm = { ...form };
      if (errores.includes(2)) nuevoForm.comida = "";
      if (errores.includes(3)) nuevoForm.color = "";
      if (errores.includes(4)) nuevoForm.nosotros = "";

      setForm(nuevoForm);
    }
  };

  return (
    <div className="fondo_romantico">
      <div className="contenedor_formulario">

        {!mostrarExito && (
          <>
            <h1 className="titulo_romantico">
              Esta invitación es especial... 💖
            </h1>

            <form onSubmit={verificar} className="formulario_romantico">

              <input
                type="text"
                name="nombre"
                placeholder="💌 Escribe tu nombre"
                value={form.nombre}
                onChange={handleChange}
              />

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
                placeholder="💞 ¿Qué somos tú y yo?"
                value={form.nosotros}
                onChange={handleChange}
              />

              <button type="submit" className="btn_verificar">
                Desbloquear 💕
              </button>

            </form>
          </>
        )}

        {/* 💖 MENSAJE PERSONALIZADO */}
        <AnimatePresence>
          {mostrarExito && personaActiva && (
            <motion.div
              className="mensaje_exito"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Ohh que linda si me conoces 💖</h2>
              <h3>Te amo {personaActiva.nombreMostrar} 💕</h3>

              <motion.button
                className="inv-boton"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(personaActiva.ruta)}
              >
                <FaRegEnvelopeOpen />
                Abrir Invitación
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* MODAL ERROR */}
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
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3>{modal.mensaje}</h3>
              <button
                className="btn_modal"
                onClick={() => setModal({ visible: false })}
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
