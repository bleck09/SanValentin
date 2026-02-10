import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaStepForward,
  FaStepBackward
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import "./Musica.css";

function Musica() {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [volumen, setVolumen] = useState(0.7);
  const [mostrarVolumen, setMostrarVolumen] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = volumen;
    }
  }, []);

  // Actualiza el progreso mientras la música se reproduce
  const actualizarProgreso = () => {
    const audio = audioRef.current;
    const porcentaje = (audio.currentTime / audio.duration) * 100;
    setProgreso(porcentaje || 0);
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      toast.error("⏸ Música pausada");
    } else {
      audio.play();
      toast.success("🎵 Reproduciendo música");
    }
    setIsPlaying(!isPlaying);
  };

  const cambiarTiempo = (e) => {
    const audio = audioRef.current;
    const nuevoTiempo = (e.target.value / 100) * audio.duration;
    audio.currentTime = nuevoTiempo;
    setProgreso(e.target.value);
  };

  const toggleVolumen = () => setMostrarVolumen(!mostrarVolumen);

  const handleVolumen = (e) => {
    const value = parseFloat(e.target.value);
    setVolumen(value);
    audioRef.current.volume = value;
  };

  return (
    <div className="musica-container">
      <h2 className="titulo-musica">Presiona Play para escuchar mi canción</h2>

      <audio
        ref={audioRef}
        src="/SanValentin/musica/MeSalvaste.mp3"
        preload="auto"
        onTimeUpdate={actualizarProgreso}
      />

      <input
        type="range"
        className="barra-progreso"
        value={progreso}
        onChange={cambiarTiempo}
      />

      <div className="controles-musica">
        <button className="boton-musica" onClick={() => toast("⏮ Demo")}>
          <FaStepBackward />
        </button>

        <button
          className={`boton-musica principal ${isPlaying ? "activo" : ""}`}
          onClick={handlePlayPause}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button className="boton-musica" onClick={() => toast("⏭ Demo")}>
          <FaStepForward />
        </button>

        <div className="volumen-wrapper">
          <button className="boton-musica" onClick={toggleVolumen}>
            {volumen === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>

          {mostrarVolumen && (
            <div className="slider-volumen-popup">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volumen}
                onChange={handleVolumen}
                className="slider-vertical"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Musica;
