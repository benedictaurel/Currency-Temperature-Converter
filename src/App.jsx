import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomeScrn from './screens/HomeScrn'
import TempConv from './screens/TempConv'
import CurConv from './screens/CurConv'

function App() {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<HomeScrn/>} /> {/* 👈 Renders at /app/ */}
          <Route path="/CurrencyConverter" element={<CurConv/>} /> {/* 👈 Renders at /app/CurrencyConverter */}
          <Route path="/TemperatureConverter" element={<TempConv/>} /> {/* 👈 Renders at /app/TemperatureConverter */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
