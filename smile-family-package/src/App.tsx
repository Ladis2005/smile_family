import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { AppointmentModal } from '@/components/sections/AppointmentModal';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';

/**
 * Raiz da aplicação. Gere o estado do modal de marcação (partilhado por
 * cabeçalho, secções e chamada para ação) e define as rotas.
 */
export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Saltar para o conteúdo
      </a>

      <Header onBook={openBooking} />

      <main>
        <Routes>
          <Route path="/" element={<Home onBook={openBooking} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer onBook={openBooking} />
      <WhatsAppFloat />
      <AppointmentModal open={bookingOpen} onClose={closeBooking} />
    </>
  );
}
