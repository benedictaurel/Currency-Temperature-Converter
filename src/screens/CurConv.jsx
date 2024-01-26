import React, { createRef, useState, useEffect } from 'react';

const hue = (h) => `hsl(${h}, 100%, 50%)`;

function CurConv() {
    const background = `linear-gradient(306deg, ${hue(60)}, ${hue(90)})`;

    const [result, setResult] = useState(null);
    const [baseCurrency, setBaseCurrency] = useState("IDR");
    const [targetCurrencies, setTargetCurrencies] = useState(["USD", "BTC", "JPY"]);
    const [exchangeRates, setExchangeRates] = useState({
        USD: 0,
        BTC: 0,
        JPY: 0,
    });
    const [amount, setAmount] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        getExchangeRates(baseCurrency, targetCurrencies, amount);
    }, [baseCurrency, targetCurrencies, amount]);

    const getExchangeRates = async (selectedBaseCurrency, selectedTargetCurrencies, amount) => {
        const timestamp = new Date().getTime();
        let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${selectedBaseCurrency.toLowerCase()}.json?timestamp=${timestamp}`;
        const response = await fetch(url);
        const data = await response.json();
        selectedBaseCurrency = selectedBaseCurrency.toLowerCase();
    
        let newExchangeRates = {};
        for (const targetCurrency of selectedTargetCurrencies) {
            let exchangeRate = data[selectedBaseCurrency][targetCurrency.toLowerCase()];
            exchangeRate *= amount;
            newExchangeRates[targetCurrency] = exchangeRate;
        }
    
        setExchangeRates(newExchangeRates);
        setLastUpdated(data.date);
    };

    useEffect(() => {
        let resultText = "";
        for (const targetCurrency of targetCurrencies) {
            let resultValue = Number(exchangeRates[targetCurrency]).toLocaleString(undefined, {
                minimumFractionDigits: 10,
                maximumFractionDigits: 10,
            });
            resultText += `${amount} ${baseCurrency} = ${resultValue} ${targetCurrency}\n`;
        }
        setResult(resultText);
    }, [amount, baseCurrency, exchangeRates, targetCurrencies]);

    const handleBaseCurrencyChange = (e) => {
        const selectedBaseCurrency = e.target.value;
        setBaseCurrency(selectedBaseCurrency);

        let newTargetCurrencies = ["USD", "BTC", "JPY"];
        if (selectedBaseCurrency === "IDR") {
            newTargetCurrencies = ["USD", "BTC", "JPY"];
        } else if (selectedBaseCurrency === "USD") {
            newTargetCurrencies = ["IDR", "BTC", "JPY"];
        } else if (selectedBaseCurrency === "BTC") {
            newTargetCurrencies = ["USD", "IDR", "JPY"];
        } else if (selectedBaseCurrency === "JPY") {
            newTargetCurrencies = ["USD", "IDR", "BTC"];
        }

        setTargetCurrencies(newTargetCurrencies);
    };

    return (
        <div className="pages" style={{ background }}>
            <nav className="fixed-top">
                <a href="/" className="back">
                    <ion-icon name="home" />
                </a>
            </nav>
            <div id="container" className="text-black">
                <h1 className="title text-center text-white">Currency Exchanger</h1>
                <div className="curtemp">
                    <select id="cur-input" onChange={handleBaseCurrencyChange} value={baseCurrency}>
                        <option value="USD">USD</option>
                        <option value="IDR">IDR</option>
                        <option value="JPY">JPY</option>
                        <option value="BTC">BTC</option>
                    </select>
                    <input type="number" id="amount_one" placeholder="0" onChange={(e) => setAmount(e.target.value)} />
                </div>

                <div className="text-white text-center">
                    <p>Last Updated: {lastUpdated}</p>
                </div>

                <div className="curr mt-8">
                    {targetCurrencies.map((currency) => (
                        <div key={currency} className="target-container mt-3">
                            <p className="text-white text-center">{currency}</p>
                            <input
                                type="text"
                                id="amount_two"
                                className="result-input mt-2 rounded-md ml-48"
                                style={{ width: "550px"}}
                                value={Number(exchangeRates[currency]).toLocaleString(undefined, {
                                    minimumFractionDigits: 10,
                                    maximumFractionDigits: 10,
                                })}
                                disabled
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CurConv
