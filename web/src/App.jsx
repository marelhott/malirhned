import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { CalendarPage } from './pages/CalendarPage'
import { OrderPage } from './pages/OrderPage'
import { AboutPage } from './pages/AboutPage'
import { CalculatorPage } from './pages/CalculatorPage'
import { ConfirmationPage } from './pages/ConfirmationPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/o-nas" element={<AboutPage />} />
      <Route path="/kalkulacka" element={<CalculatorPage />} />
      <Route path="/kalendar" element={<CalendarPage />} />
      <Route path="/objednat" element={<OrderPage />} />
      <Route path="/potvrzeni" element={<ConfirmationPage />} />
      <Route path="/maliri" element={<Navigate to="/kalendar" replace />} />
      <Route path="/malir/:painterId" element={<Navigate to="/kalendar" replace />} />
      <Route path="/profil-zakaznika" element={<Navigate to="/objednat" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
