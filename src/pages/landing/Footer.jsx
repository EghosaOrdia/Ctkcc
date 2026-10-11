import { Link } from 'react-router-dom';
import { CHURCH } from '../../config/appConfig';
import Logo from '../../components/Logo';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Logo tone="light" />
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#service-times" className="hover:text-white">Service Times</a>
          <a href="#contact" className="hover:text-white">Contact</a>
          <Link to="/login" className="hover:text-white">{CHURCH.portalName}</Link>
        </nav>
        <p className="text-sm text-navy-300">
          © {YEAR} {CHURCH.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
