import React, { createRef, useState, useEffect } from 'react';

const hue = (h) => `hsl(${h}, 100%, 50%)`;

function TempConv() {
    const background = `linear-gradient(306deg, ${hue(20)}, ${hue(40)})`;

    const baseTempRef = createRef();
    const targetTempRef = createRef();
    const [result, setResult] = useState(null);
    const [equation, setEquation] = useState(null);

    const handleButtonClick = () => {
        setResult(null);

        let value = parseFloat(document.getElementById("amount_one").value);
        let selectedBaseTemp = baseTempRef.current.value;
        let selectedTargetTemp = targetTempRef.current.value;
        let convertedValue = tempConverter(value, selectedBaseTemp, selectedTargetTemp);
        setResult(convertedValue);
    };

    const handleSwapButtonClick = () => {
        const temp1 = baseTempRef.current.value;
        const temp2 = targetTempRef.current.value;

        baseTempRef.current.value = temp2;
        targetTempRef.current.value = temp1;

        const value = parseFloat(document.getElementById("amount_one").value);
        const convertedValue = tempConverter(value, temp2, temp1);

        setResult(convertedValue);
    };

    const tempConverter = (value, selectedBaseTemp, selectedTargetTemp) => {
        const conversions = {
            K: {
                C: (v) => {
                    setEquation(`${v} - 273.15`);
                    return v - 273.15;
                },
                F: (v) => {
                    setEquation(`(${v} - 273.15) * 9/5 + 32`);
                    return ((v - 273.15) * 9) / 5 + 32;
                },
                R: (v) => {
                    setEquation(`(${v} - 273.15) * 4/5`);
                    return ((v - 273.15) * 4) / 5;
                },
            },
            C: {
                K: (v) => {
                    setEquation(`${v} + 273.15`);
                    return v + 273.15;
                },
                F: (v) => {
                    setEquation(`${v} * 9/5 + 32`);
                    return (v * 9) / 5 + 32;
                },
                R: (v) => {
                    setEquation(`${v} * 4/5`);
                    return (v * 4) / 5;
                },
            },
            F: {
                K: (v) => {
                    setEquation(`(${v} - 32) * 5/9 + 273.15`);
                    return ((v - 32) * 5) / 9 + 273.15;
                },
                C: (v) => {
                    setEquation(`(${v} - 32) * 5/9`);
                    return ((v - 32) * 5) / 9;
                },
                R: (v) => {
                    setEquation(`(${v} - 32) * 4/9`);
                    return ((v - 32) * 4) / 9;
                },
            },
            R: {
                K: (v) => {
                    setEquation(`${v} * 5/4 + 273.15`);
                    return (v * 5) / 4 + 273.15;
                },
                C: (v) => {
                    setEquation(`${v} * 5/4`);
                    return (v * 5) / 4;
                },
                F: (v) => {
                    setEquation(`${v} * 9/4 + 32`);
                    return (v * 9) / 4 + 32;
                },
            },
        };
    
        const conversionFunction = conversions[selectedBaseTemp][selectedTargetTemp];
        if (conversionFunction) {
            const convertedValue = conversionFunction(value);
            const roundedValue = parseFloat(convertedValue.toFixed(4));
            return roundedValue;
        }

        return null;
    };

    return (
        <div className="pages" style={{ background }}>
            <nav className="fixed-top">
                <a href="/" className="back">
                    <ion-icon name="home" />
                </a>
            </nav>
            <div id="container" className="text-black">
                <h1 className="title text-center text-white">Temperature Converter</h1>
                <div className="curtemp">
                    <select id="temp-input" ref={baseTempRef}>
                        <option value="K">Kelvin</option>
                        <option value="C" selected>Celsius</option>
                        <option value="F">Fahrenheit</option>
                        <option value="R">Reamur</option>
                    </select>
                    <input type="number" id="amount_one" placeholder="1" onChange={handleButtonClick} />
                </div>

                <div className="swap">
                    <div className="btn" id="swap" onClick={handleSwapButtonClick}>
                        <button type="submit">
                            Swap
                        </button>
                    </div>
                    <div className="text-white mr-48">
                        <p>Equation: {equation}</p>
                    </div>
                </div>

                <div className="curtemp">
                    <select id="temp-output" ref={targetTempRef}>
                        <option value="K">Kelvin</option>
                        <option value="C">Celsius</option>
                        <option value="F" selected>Fahrenheit</option>
                        <option value="R">Reamur</option>
                    </select>
                    <input type="number" id="amount_two" placeholder="Waiting..." value={result} disabled />
                </div>
            </div>
        </div>
    );
}

export default TempConv