import { motion } from "framer-motion";

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

function Option({ emoji, hueA, hueB, to }) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

    return (
        <div className="options">
            <a href={to} className="card-link">
                <motion.div
                    className="card-container"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                >
                    <div className="splash" style={{ background }} />
                    <motion.div className="card" variants={cardVariants}>
                        {emoji}
                    </motion.div>
                </motion.div>
            </a>
        </div>
    );
}

const Converter = [
  ["💱", 60, 90, "/CurrencyConverter"],
  ["🌡️", 20, 40, "/TemperatureConverter"],
];

export default function App() {
    return (
        <div className="card-container-wrapper">
          {Converter.map(([emoji, hueA, hueB, to]) => (
            <Option emoji={emoji} hueA={hueA} hueB={hueB} to={to} key={emoji} />
          ))}
        </div>
      );
}
