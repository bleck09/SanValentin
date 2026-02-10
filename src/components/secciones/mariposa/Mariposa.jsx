import React, { useEffect } from 'react';
import { GiButterfly } from 'react-icons/gi';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import './Mariposa.css';

function Mariposa({ count }) {
    const mariposas = Array.from({ length: count });

    const container = document.querySelector('.mariposa-container');
    const containerWidth = container?.offsetWidth || window.innerWidth;
    const containerHeight = container?.offsetHeight || window.innerHeight;



    return (
        <>
            {mariposas.map((_, index) => {
                const anim = useAnimation();

                const size = 20 + Math.random() * 30;
                const color = Math.random() > 0.5 ? "#fd3da3" : "#ffd700";

                // Función para iniciar vuelo
                const startFlight = (currentX = null, currentY = null) => {
                    const startX = currentX !== null ? currentX : Math.random() * containerWidth;
                    const startY = currentY !== null ? currentY : Math.random() * containerHeight;
                    const endX = Math.random() * containerWidth;
                    const endY = Math.random() * containerHeight;
                    const duration = 6 + Math.random() * 6;


                    anim.start({
                        x: [startX, endX, startX],
                        y: [startY, endY, startY],
                        rotate: [0, 360, 0],
                        transition: {
                            repeat: Infinity,
                            duration: duration,
                            ease: 'linear',
                            repeatType: 'loop',
                        }
                    });
                };

                // Inicia vuelo al montar
                useEffect(() => {
                    startFlight();
                }, []);

                return (
                    <motion.div
                        key={index}
                        className="mariposa"
                        drag
                        dragMomentum={false}
                        dragConstraints={{
                            top: 0,
                            left: 0,
                            right: containerWidth,
                            bottom: containerHeight,
                        }}
                        animate={anim}
                        onDragEnd={(event, info) => {
                            // info.point contiene la posición final del drag
                            startFlight(info.point.x, info.point.y);
                        }}
                    >
                        <GiButterfly size={size} color={color} />
                    </motion.div>
                );
            })}
        </>
    );
}

Mariposa.propTypes = {
    count: PropTypes.number.isRequired,
};

export default Mariposa;
