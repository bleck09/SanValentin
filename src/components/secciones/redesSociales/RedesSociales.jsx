import React from "react";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaTiktok } from "react-icons/fa";
import "./RedesSociales.css";

export default function RedesSociales() {
  const redes = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      link: "https://www.instagram.com/adri_bel3",
      color: "#E1306C",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      link: "https://www.facebook.com/share/1GSUjQh5ag/",
      color: "#1877F2",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      link: "https://wa.me/59171725541",
      color: "#25D366",
    },
    {
      name: "TikTok",
      icon: <FaTiktok />,
      link: "https://www.tiktok.com/@adri_bel3",
      color: "#010101",
    },
  ];

  return (
    <section className="redes-section">
      <h3 className="redes-frase">
        Descubre el mundo de Adriana en sus redes sociales
      </h3>

      <div className="redes-icons">
        {redes.map((red, i) => (
          <a
            key={i}
            href={red.link}
            target="_blank"
            rel="noopener noreferrer"
            className="red-icon anim-latido"
            style={{ color: red.color, animationDelay: `${i * 0.2}s` }}
            title={red.name}
          >
            {red.icon}
          </a>
        ))}
      </div>
    </section>
  );
}
