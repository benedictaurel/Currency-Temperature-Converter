
const hue = (h) => `hsl(${h}, 100%, 50%)`;

function Option({ emoji, hueA, hueB, to }) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

    return (
      <div className="options">
        <a href={to} className="card-link" data-aos="fade-up">
            <div className="card-container">
                <div className="splash" style={{ background }} data-aos="zoom-in"></div>
                <div className="card" data-aos="fade-right">
                    {emoji}
                </div>
            </div>
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
