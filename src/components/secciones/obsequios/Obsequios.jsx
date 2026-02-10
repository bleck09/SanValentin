import React from 'react';
import { motion } from 'framer-motion';
import { FaGift } from 'react-icons/fa';
import './Obsequios.css';

export default function Obsequios() {
  return (
    <section className="obsequios-section">
      <motion.div
        className="obsequios-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="gift-icon"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <FaGift />
        </motion.div>
        <motion.h2
          className="obsequios-text"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          El mayor de los regalos será contar con tu compañía
        </motion.h2>
        <motion.div
          className="gift-icon"
          animate={{ rotate: [0, -15, 15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <FaGift />
        </motion.div>
      </motion.div>
    </section>
  );
}
