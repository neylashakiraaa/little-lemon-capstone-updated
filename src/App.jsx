import { useState } from 'react';
import Header from './components/Header.jsx';
import BookingForm from './components/BookingForm.jsx';
import './styles.css';

const INITIAL_TIMES = ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

export default function App() {
  const [availableTimes] = useState(INITIAL_TIMES);
  const [booking, setBooking] = useState(null);

  return <>
    <a className="skip-link" href="#main">Skip to main content</a>
    <Header />
    <main id="main">
      <section className="hero">
        <div className="wrap hero-content">
          <div><p className="eyebrow">A little taste of the Mediterranean</p><h1>Little Lemon</h1><h2>Chicago</h2>
          <p>Fresh ingredients, bold Mediterranean flavours, and a warm table waiting for you.</p>
          <a className="button primary" href="#reservations">Reserve a table</a></div>
          <div className="hero-art" role="img" aria-label="Fresh Mediterranean meal">🍋 🥙 🌿</div>
        </div>
      </section>
      <section className="wrap section" id="menu"><p className="eyebrow">From our kitchen</p><h2>This week’s specials</h2>
        <div className="cards">
          <article><div className="food">🥗</div><h3>Greek Salad <span>$12.99</span></h3><p>Crisp greens, olives, feta, and a lemon-herb dressing.</p></article>
          <article><div className="food">🍅</div><h3>Bruschetta <span>$8.50</span></h3><p>Grilled sourdough topped with tomatoes, basil, and olive oil.</p></article>
          <article><div className="food">🍋</div><h3>Lemon Dessert <span>$6.00</span></h3><p>A light, tangy house dessert with a buttery biscuit base.</p></article>
        </div>
      </section>
      <section className="reservation" id="reservations"><div className="wrap reservation-grid">
        <div><p className="eyebrow">Your table is waiting</p><h2>Make a reservation</h2><p>Choose a date and time, tell us a little about your visit, and we’ll get your table ready.</p></div>
        <div className="panel">{booking ? <div className="confirmation" role="status" aria-live="polite">
          <h3>Thank you, {booking.name}!</h3><p>Your reservation request has been received.</p>
          <p><b>Date:</b> {booking.date}<br/><b>Time:</b> {booking.time}<br/><b>Guests:</b> {booking.guests}<br/><b>Occasion:</b> {booking.occasion}</p>
          <button className="button primary full" onClick={() => setBooking(null)}>Make another reservation</button>
        </div> : <BookingForm availableTimes={availableTimes} onSubmit={setBooking} />}</div>
      </div></section>
      <section className="wrap section about" id="about"><div><p className="eyebrow">A family-owned restaurant</p><h2>Good food brings us together.</h2><p>At Little Lemon, we bring the colours and flavours of the Mediterranean to the neighbourhood. Come as you are and stay for one more bite.</p></div><div className="about-art">🫒 🍋 🍅</div></section>
    </main>
    <footer><div className="wrap footer"><b>🍋 Little Lemon</b><span>Fresh flavours. Good company. Every day.</span><small>© {new Date().getFullYear()} Little Lemon</small></div></footer>
  </>;
}
