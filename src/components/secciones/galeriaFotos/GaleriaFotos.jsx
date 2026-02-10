import { motion, useMotionValue, useTransform } from 'motion/react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './GaleriaFotos.css';


function CardTilt({ children, onSendToBack, sensitivity }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="card-tilt"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}
CardTilt.propTypes = {
  children: PropTypes.node.isRequired,
  onSendToBack: PropTypes.func.isRequired,
  sensitivity: PropTypes.number.isRequired,
}

export default function GaleriaFotos({
  cards = [], // 👈 ahora recibe un array externo
  randomRotation = true,
  sensitivity = 180,
  cardDimensions = { width: 250, height: 350 },
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = true
}) {
  const [stack, setStack] = useState(cards);

  const sendToBack = id => {
    setStack(prev => {
      const newCards = [...prev];
      const index = newCards.findIndex(card => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="stack-gallery"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 800,
      }}
    >
      {stack.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        return (
          <CardTilt key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
            <motion.div
              className="card-mod"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: '50% 50%',
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <img src={card.img} alt={card.title} className="card-mod-image" />
              
            </motion.div>
          </CardTilt>
        );
      })}
    </div>
  );
}

GaleriaFotos.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    boton: PropTypes.string.isRequired,
  })),
  randomRotation: PropTypes.bool,
  sensitivity: PropTypes.number,
  cardDimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  animationConfig: PropTypes.shape({
    stiffness: PropTypes.number,
    damping: PropTypes.number,
  }),
  sendToBackOnClick: PropTypes.bool,
};
