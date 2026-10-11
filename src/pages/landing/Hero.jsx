import { Link } from 'react-router-dom';
import { CHURCH } from '../../config/appConfig';

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-16 bg-navy-900 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.25fr_1fr] md:py-24">
        <div>
          <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Come as you are.
            <br />
            Stay as family.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100">
            Welcome to {CHURCH.name}. {CHURCH.tagline} There is a seat for you this Sunday.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#service-times" className="btn-gold px-6 py-3 text-base">Plan Your Visit</a>
            <Link
              to="/login"
              className="btn border border-navy-400 px-6 py-3 text-base text-white hover:bg-navy-800"
            >
              {CHURCH.portalName}
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xs">
          <div className="rounded-t-[999px] border-2 border-gold-400/70 p-2">
            <div className="flex aspect-[3/4] flex-col items-center justify-end rounded-t-[999px] bg-navy-800 px-6 pb-10 text-center">
              <p className="text-sm text-navy-200">Every Sunday</p>
              <p className="mt-2 font-serif text-4xl font-semibold text-gold-300">8:00 AM</p>
              <p className="font-serif text-4xl font-semibold text-gold-300">10:30 AM</p>
              <p className="mt-4 text-sm text-navy-200">Abuja, Nigeria</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
