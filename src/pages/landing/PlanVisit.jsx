import { Mail, MapPin, Phone } from 'lucide-react';
import { CHURCH } from '../../config/appConfig';

export default function PlanVisit() {
  const rows = [
    { icon: MapPin, label: 'Address', value: CHURCH.address },
    { icon: Phone, label: 'Phone', value: CHURCH.phone, href: `tel:${CHURCH.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: CHURCH.email, href: `mailto:${CHURCH.email}` },
  ];

  return (
    <section id="contact" className="scroll-mt-16 bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-navy-800 p-8 text-white md:p-12">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Plan your visit</h2>
          <p className="mt-3 max-w-xl text-navy-100">
            Arrive a few minutes early and someone from our welcome team will show you around.
          </p>
          <dl className="mt-8 grid gap-6 md:grid-cols-3">
            {rows.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-700 text-gold-300">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-sm text-navy-200">{label}</dt>
                  <dd className="break-words font-medium">
                    {href ? <a href={href} className="hover:text-gold-300">{value}</a> : value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
