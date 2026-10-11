import { Clock } from 'lucide-react';

const SERVICES = [
  { name: 'Sunday Service', day: 'Sunday', times: ['8:00 AM', '10:30 AM'] },
  { name: 'Midweek Service', day: 'Wednesday', times: ['5:30 PM'] },
  { name: 'Prayer Meeting', day: 'Friday', times: ['6:00 PM'] },
];

export default function ServiceTimes() {
  return (
    <section id="service-times" className="scroll-mt-16 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold text-navy-800 sm:text-4xl">Service times</h2>
        <p className="mt-3 max-w-xl text-navy-600">Join us in person at any of our weekly gatherings.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.name} className="rounded-2xl border border-navy-100 bg-paper p-6">
              <h3 className="font-serif text-xl font-semibold text-navy-800">{s.name}</h3>
              <p className="mt-1 text-sm text-navy-500">{s.day}</p>
              <ul className="mt-5 space-y-2">
                {s.times.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-lg font-semibold text-navy-700">
                    <Clock size={18} className="text-gold-600" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
