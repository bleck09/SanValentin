import React, { useState, useRef, useEffect } from "react";
import "./ChatResp.css";

const ChatResp = () => {
  const [isVisible, setIsVisible] = useState(false); // Para cargar solo cuando sea visible
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {isVisible && <ChatActivo />}
    </div>
  );
};

const ChatActivo = () => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: ` ¡Hola! 👋 Soy la asistente virtual de <span class="adri-text">Adriana Belén</span> en sus <span class="años15-text">15 años</span>.  
Estoy aquí para ayudarte con cualquier información del evento.`,
      hasButton: false,
    },
  ]);

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // 🔥 Scroll automático
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input, hasButton: false };
    setMessages((prev) => [...prev, userMessage]);

    const lower = input.toLowerCase();
    let botResponse = "";
    

    // ⭐ Respuestas personalizadas
    if (lower.includes("hora")) {
      botResponse = `La recepción inicia a las <span class="adri-text">6:00 PM</span>.  
Te esperamos para celebrar junto a <span class="adri-text">Adriana Belén</span>.`;
    } else if (
      lower.includes("dónde") ||
      lower.includes("donde") ||
      lower.includes("ubicación") ||
      lower.includes("ubicacion") ||
      lower.includes("lugar")
    ) {
      botResponse = `El evento será en <span class="adri-text">MAG EMIL EVENTOS</span>.  
Haz clic aquí para abrir el mapa:  
<br><a target="_blank" class="link-mapa" href="https://maps.app.goo.gl/ALZ8cKowfjHGPH4Q8"> Ver ubicación</a>`;
    } else if (
      lower.includes("padres")||
      lower.includes("papas") ||
      lower.includes("papás")
    ) {
      botResponse = `
Los padres de Adriana son:  
• <span class="adri-text">Felipe Chambi Correa</span>  
  <a class="link-mapa" target="_blank" rel="noopener noreferrer" href="https://wa.me/59172743432"> Enviar mensaje al padre</a>  
• <span class="adri-text">Martha Revollo Loza</span>  
  <a class="link-mapa" target="_blank" rel="noopener noreferrer" href="https://wa.me/59168580574"> Enviar mensaje a la madre</a>
      `;
    } else if (lower.includes("padrinos")) {
      botResponse = `Los padrinos de Adriana son:  
• <span class="adri-text">Mario Alvarez</span>  
• <span class="adri-text">Julienta Loza</span>`;
    } else if (
      lower.includes("contacto") ||
      lower.includes("telefono") ||
      lower.includes("número") ||
      lower.includes("numero")
    ) {
      botResponse = `Contactos directos:  
Madre: <span class="adri-text">+591 68580574</span>  
Padre: <span class="adri-text">+591 72743432</span>`;
    } else if (lower.includes("hola")) {
      botResponse = `¡Hola! Soy la asistente virtual del evento de <span class="adri-text">Adriana Belén</span>.  
Puedes preguntarme hora, lugar, contacto, padres o padrinos.`;
    } else if (
      lower.includes("gracias") ||
      lower.includes("muchas gracias") ||
      lower.includes("gracias!")
    ) {
      const respuestasGracias = [
        "¡De nada! Me alegra poder ayudarte",
        "Siempre un placer ayudarte, cualquier cosa dime",
        "Me encanta poder ayudarte con la información del evento",
      ];
      botResponse =
        respuestasGracias[Math.floor(Math.random() * respuestasGracias.length)];
    } else if (
    // Las condiciones se cumplen si el usuario menciona alguna de estas palabras
    lower.includes("adriana") ||
    lower.includes("belen") ||
    lower.includes("chambi") ||
    lower.includes("adri")
) {
    // Array de respuestas para el chatbot
    const respuestasAdriana = [
        // El texto se mantiene tal cual en una sola línea de código, usando \n para los saltos de línea visibles en el editor
        "Nuestra protagonista es Adriana Belén Chambi Revollo. Su historia comenzó un frío 22 de diciembre de 2010, el día que nació.\n" +
        "Adriana vive en Quillacollo, Cochabamba, y ahí es donde se dedica a sus estudios en el prestigioso Colegio Urcupiña.\n" +
        "Si le preguntas por lo que más ama en el mundo, te dirá que a su familia, ¡son lo más importante para ella! No es de extrañar, ya que en casa nunca hay un momento aburrido: tiene dos hermanas y un hermano que la acompañan en todas sus aventuras.\n" +
        "Adriana tiene un color favorito que la representa muy bien: el rojo, un tono lleno de energía y pasión.\n" +
        "Cuando no está estudiando, le encanta visitar a sus abuelitos en Independencia, un pueblo al que adora. Además, Adriana es una joven de fe, y le gusta mucho ir a la iglesia.",
    ];

    // Selecciona la respuesta (actualmente solo hay una)
    botResponse =
        respuestasAdriana[Math.floor(Math.random() * respuestasAdriana.length)];
}
// ... resto del código con el else final ...
else {
      botResponse = `No entendí muy bien tu mensaje…  
Puedes preguntarme sobre:  
• Hora del evento  
• Ubicación  
• Padres  
• Padrinos  
• Contacto`;
    }

    // Array de cierres amigables
    const cierresAmigables = [
      "Si necesitas algo más, solo pregunta, estaré feliz de ayudarte.",
      "Cualquier duda que tengas, no dudes en escribirme.",
      "Si quieres saber más, pregúntame sin miedo.",
      "Estoy aquí para ti, solo dime lo que necesites.",
      "No dudes en escribirme, estoy para ayudarte con todo lo de la fiesta.",
    ];

    const cierreAleatorio =
      cierresAmigables[Math.floor(Math.random() * cierresAmigables.length)];

    botResponse += `\n${cierreAleatorio}`;

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
    }, 600);

    setInput("");
  };

  return (
    <>
      <div className="ChatResp-container">
        <div className="ChatResp-window">
          {messages.map((msg, i) => (
            <div key={i} className={`ChatResp-msg ${msg.from}`}>
              <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="ChatResp-inputArea">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Enviar</button>
        </div>
      </div>
    </>
  );
};

export default ChatResp;
