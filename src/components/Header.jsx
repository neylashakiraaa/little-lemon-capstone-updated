export default function Header() {
  return <header className="header"><div className="wrap header-inner">
    <a className="brand" href="#main">🍋 Little Lemon</a>
    <nav aria-label="Main navigation"><a href="#main">Home</a><a href="#menu">Menu</a><a href="#about">About</a><a href="#reservations">Reservations</a></nav>
    <a className="button primary header-button" href="#reservations">Book a table</a>
  </div></header>;
}
