import React from "react";
import "./Home.css";
import TextoDesvanecido from "../../secciones/textos/textoDesvanecido/TextoDesvanecido";

import Sobre from "../../secciones/sobre/Sobre";

const Home = () => {
  return (
    <div className="fondo_invitacion">
      <div className="overlay">
        <TextoDesvanecido
          text="Mi Primera Comunión"
          delay={500}
          animateBy="words"
          className="Titulo_luis_Principal"
        />
       
        <br /><br /><br />
        <Sobre />
         <TextoDesvanecido
          text="Luis Miguel"
          delay={100}
          animateBy="words"
          className="Titulo_luis_Principal"
        />
      </div>
    </div>
  );
};

export default Home;
