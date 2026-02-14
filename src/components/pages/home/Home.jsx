import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import "./Home.css";

/* 🔐 PERSONAS SECRETAS */
const personas = {
  ana: {
    alias: ["Blady", "blady", "vlady", "bladi", "vladi", "vladimir", "bladimir", "Vlady"],
    comida: "pescado",
    color: "negro",
    codigoSecreto: "EBILX", // 5 letras
    pistas: [
      "Inicial del mes en que nos conocimos",
      "La inicial de tu segundo nombre",
      "Número especial para nosotros",
      "Inicial de la ciudad donde vivimos",
      "La última letra de mi nombre"
    ],
    ruta: "/sofia",
    nombreMostrar: "Sofia"
  },
  carla: {
    alias: ["Carla", "carlita", "carla"],
    comida: "pescado",
    color: "negro",
    codigoSecreto: "8MILS", // 5 letras
    pistas: [
      "Son dos Aries",
      "Pelicula de Depredador tierras salvajes",
      "El lugar se llama Stitch",
      "Empieza con L",
      "Es un fuego, Ardiente "
    ],
    ruta: "/carla",
    nombreMostrar: "Carla"
  },
  maria: {
    alias: ["bleck", "Bleck"],
    comida: "pique",
    color: "negro",
    codigoSecreto: "AGMTRA", // 6 letras
    pistas: [
      "Es del color del cielo en un día despejado",          // Azul → A12345
      "Animal que dice 'miau'",                              // Gato →  A G 3456
      "Fruta roja que también puede ser verde",              // Manzana → A G M 456
      "El planeta donde vivimos",                            // Tierra → A G M T 56
      "Lo que usamos para ver la hora",                      // Reloj → A G M T R 6
      "Sentimiento que mueve el mundo"                       // Amor → A G M T R A
    ],
    ruta: "/maria",
    nombreMostrar: "María"
  },
  martha: {
    alias: ["martha", "Martha", "Martita"],
    comida: "pique",
    color: "negro",
    codigoSecreto: "MGRkV", 
    pistas: [
      "Nombre de una película que navegó por los océanos", // Moana → M
      "Personaje travieso de un juego que empieza con G",  // Groo Game → G
      "Mismo personaje de antes, pero con la letra que sigue en su código secreto", // R
      "Canción romántica en español, comienza con la letra que dice bésame", // K
      "Número que escribimos en números romanos y siempre usamos juntos"
    ],
    ruta: "/martha",
    nombreMostrar: "Martha"
  }
};

const Home = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    comida: "",
    color: ""
  });

  const [personaActiva, setPersonaActiva] = useState(null);
  const [faseDos, setFaseDos] = useState(false);
  const [codigoInput, setCodigoInput] = useState([]);
  const [errores, setErrores] = useState([]);
  const [mostrarPistas, setMostrarPistas] = useState(false);
  const [mostrarBotonFinal, setMostrarBotonFinal] = useState(false);
  const [modal, setModal] = useState({ visible: false, mensaje: "" });

  const normalizar = (texto) => texto.toLowerCase().trim();

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
        mensaje: "Este detalle no era para ti 💔"
      });
      return;
    }

    if (
      normalizar(form.comida) === persona.comida &&
      normalizar(form.color) === persona.color
    ) {
      setPersonaActiva(persona);
      setFaseDos(true);
      setCodigoInput(new Array(persona.codigoSecreto.length).fill(""));
    } else {
      setModal({
        visible: true,
        mensaje: "Te equivocaste en la respuesta 2 o 3 💭"
      });
    }
  };

  const handleCodigoChange = (index, value) => {
    const nuevoCodigo = [...codigoInput];
    nuevoCodigo[index] = value.toUpperCase().slice(0, 1);
    setCodigoInput(nuevoCodigo);
  };

  const verificarCodigo = () => {
    const correcto = personaActiva.codigoSecreto.toUpperCase();
    let posicionesIncorrectas = [];

    for (let i = 0; i < correcto.length; i++) {
      if (codigoInput[i] !== correcto[i]) {
        posicionesIncorrectas.push(i + 1);
      }
    }

    if (posicionesIncorrectas.length === 0) {
      setErrores([]);
      setMostrarPistas(false);
      setMostrarBotonFinal(true);
    } else {
      setErrores(posicionesIncorrectas);
      setMostrarBotonFinal(false);
      setMostrarPistas(false);
    }
  };

  const formatearErrores = (lista) => {
    if (lista.length === 1) return lista[0];
    if (lista.length === 2) return `${lista[0]} y ${lista[1]}`;
    return lista.slice(0, -1).join(", ") + " y " + lista[lista.length - 1];
  };

  return (
    <div className="fondo_romantico">
      <div className="contenedor_formulario">

        {!faseDos && (
          <>
            <h1 className="sofia-titulo">
              Solo quien conoce mi corazón podrá desbloquear esta sorpresa
            </h1>

            <form onSubmit={verificar} className="formulario_romantico">
              <input
                type="text"
                name="nombre"
                placeholder="Escribe tu nombre"
                value={form.nombre}
                onChange={handleChange}
              />
              <input
                type="text"
                name="comida"
                placeholder="¿Mi comida favorita?"
                value={form.comida}
                onChange={handleChange}
              />
              <input
                type="text"
                name="color"
                placeholder="¿Mi color favorito?"
                value={form.color}
                onChange={handleChange}
              />
              <button type="submit">Desbloquear 💕</button>
            </form>
          </>
        )}

        <AnimatePresence>
          {faseDos && personaActiva && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

              <h1 className="sofia-titulo">
                {mostrarBotonFinal ? (
                  <>
                    ¡Wow {personaActiva.nombreMostrar}! <br />
                    Eres increíble… se nota que eres tú
                  </>
                ) : (
                  "Descifra nuestro código secreto"
                )}
              </h1>

              <div className="codigo-container">
                {codigoInput.map((letra, index) => (
                  <input
                    key={index}
                    type="text"
                    value={letra}
                    onChange={(e) =>
                      handleCodigoChange(index, e.target.value)
                    }
                    className={`codigo-input ${errores.includes(index + 1) ? "codigo-error" : ""
                      }`}
                  />
                ))}
              </div>


              <br />

              {!mostrarBotonFinal && (
                <button onClick={verificarCodigo}>
                  Confirmar código 🔐
                </button>
              )}

              {errores.length > 0 && (
                <div className="mensaje-error">
                  ❌ Te equivocaste en la posición {formatearErrores(errores)}
                  <br />
                  <button onClick={() => setMostrarPistas(true)}>
                    ¿Quieres ver la pista?
                  </button>
                </div>
              )}
              {mostrarPistas && (
                <div className="pistas-container">
                  {errores.map((pos) => (
                    <p key={pos}>
                      💡 Posición {pos}: {personaActiva.pistas[pos - 1]}
                    </p>
                  ))}
                </div>
              )}

              {mostrarBotonFinal && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.15 }}
                  onClick={() => navigate(personaActiva.ruta)}
                >
                  <FaRegEnvelopeOpen style={{ marginRight: "8px" }} />
                  Descubrir tu sorpresa 💝
                </motion.button>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <AnimatePresence>
        {modal.visible && (
          <motion.div className="modal_overlay">
            <motion.div className="modal_contenido">
              <h3>{modal.mensaje}</h3>
              <button onClick={() => setModal({ visible: false })}>
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
