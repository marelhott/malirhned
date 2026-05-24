import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { CalendarPage } from './pages/CalendarPage'
import { PaintersPage } from './pages/PaintersPage'
import { PainterDetailPage } from './pages/PainterDetailPage'
import { OrderPage } from './pages/OrderPage'
import { AboutPage } from './pages/AboutPage'
import { CalculatorPage } from './pages/CalculatorPage'
import { CustomerProfilePage } from './pages/CustomerProfilePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/o-nas" element={<AboutPage />} />
      <Route path="/kalkulacka" element={<CalculatorPage />} />
      <Route path="/kalendar" element={<CalendarPage />} />
      <Route path="/maliri" element={<PaintersPage />} />
      <Route path="/malir/:painterId" element={<PainterDetailPage />} />
      <Route path="/objednat" element={<OrderPage />} />
      <Route path="/profil-zakaznika" element={<CustomerProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
