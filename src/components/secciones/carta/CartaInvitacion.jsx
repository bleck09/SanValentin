import React, { useState } from "react";
import "./CartaInvitacion.css";

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) color = color.split('').map(c => c + c).join('');
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const CartaInvitacion = () => {
  const [open, setOpen] = useState(false);
  const folderColor = "#5227FF";
  const folderBackColor = darkenColor(folderColor, 0.08);

  // Hojas dentro del folder
  const hojas = [
    { id: 1, color: "#ffffff" }, 
    { id: 2, color: "#f2f2f2" }, 
    { id: 3, color: "#e6e6e6" } 
  ];

  const toggleFolder = () => setOpen(!open);

  return (
    <div className="folder-container" onClick={toggleFolder}>
      <div className={`folder ${open ? "open" : ""}`} style={{ '--folder-color': folderColor, '--folder-back-color': folderBackColor }}>
        <div className="folder-back">
          {hojas.map((hoja) => (
            <div key={hoja.id} className="paper" style={{ backgroundColor: hoja.color }}>
              {/* Aquí dentro iría el contenido de cada hoja si quieres */}
            </div>
          ))}
          <div className="folder-front"></div>
          <div className="folder-front right"></div>
        </div>
      </div>
    </div>
  );
};

export default CartaInvitacion;
