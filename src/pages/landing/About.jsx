import { HandHeart, Music, Users } from 'lucide-react';
import { CHURCH } from '../../config/appConfig';

const VALUES = [
  { icon: Music, title: 'Worship', text: 'We gather to sing, pray and listen together, with hearts open to God.' },
  { icon: Users, title: 'Community', text: 'Cell groups across Abuja help every member feel known and cared for.' },
  { icon: HandHeart, title: 'Service', text: 'We give our time and gifts to our neighbours, our city and each other.' },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <h2 className="font-serif text-3xl font-semibold text-navy-800 sm:text-4xl">
            A church that knows your name
          </h2>
          <div className="space-y-4 leading-relaxed text-navy-600">
            <p>
              {CHURCH.name} began as a small prayer group in a living room in Abuja. Today we are a
              growing family of households who meet on Sundays and in neighbourhood fellowships through the week.
            </p>
            <p>
              We believe every person matters. Whether you are new to the city, new to faith or coming
              home after time away, you will find people who are glad you came.
            </p>
            <p>
              Behind the scenes, our pastors and department leaders keep careful records so no one is
              overlooked, from birthdays to first visits.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-navy-800">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
