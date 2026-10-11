import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Cake, PartyPopper, UserCheck, UserMinus, UserPlus, Users } from 'lucide-react';
import Avatar from '../components/Avatar';
import EmptyState from '../components/EmptyState';
import StatCard from '../components/StatCard';
import { useMembers } from '../context/contexts';
import { MARITAL_STATUSES } from '../constants/constants';
import {
  birthdayLabel,
  birthdaysThisWeek,
  formatDate,
  formatDayMonth,
  isSameMonth,
  lastMonths,
  monthKey,
} from '../utils/dates';
import { fullName } from '../utils/members';
import { CHART } from '../utils/theme';

const tooltipStyle = {
  borderRadius: 12,
  border: 'none',
  boxShadow: '0 8px 30px rgba(18, 30, 58, 0.14)',
  fontSize: 13,
};

function countBy(items, key) {
  return items.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <section className={`card p-5 ${className}`}>
      <h2 className="font-serif text-lg font-semibold text-navy-800">{title}</h2>
      {subtitle && <p className="text-sm text-navy-400">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function Dashboard() {
  const { members } = useMembers();
  const [today] = useState(() => new Date());

  const data = useMemo(() => {
    const status = countBy(members, 'status');
    const departments = Object.entries(countBy(members, 'department'))
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
    const joinsByMonth = countBy(
      members.map((m) => ({ k: monthKey(m.joinDate) })),
      'k',
    );
    const growth = lastMonths(12, today).map(({ key, label }) => ({
      label,
      joined: joinsByMonth[key] || 0,
    }));
    const gender = Object.entries(countBy(members, 'gender')).map(([name, value]) => ({ name, value }));
    const marital = countBy(members, 'maritalStatus');
    const recent = [...members]
      .sort((a, b) => b.joinDate.localeCompare(a.joinDate) || b.id.localeCompare(a.id))
      .slice(0, 5);

    return {
      total: members.length,
      newThisMonth: members.filter((m) => isSameMonth(m.joinDate, today)).length,
      active: status.Active || 0,
      inactive: status.Inactive || 0,
      departments,
      growth,
      gender,
      marital: MARITAL_STATUSES.map((name) => ({ name, value: marital[name] || 0 })),
      recent,
      birthdays: birthdaysThisWeek(members, today),
    };
  }, [members, today]);

  const maritalMax = Math.max(1, ...data.marital.map((m) => m.value));

  if (members.length === 0) {
    return (
      <div className="card">
        <EmptyState
          icon={Users}
          title="Your dashboard is waiting for members"
          message="Add a member, or restore the demo data from the sidebar, to see your numbers here."
          action={<Link to="/admin/members/new" className="btn-primary">Add Member</Link>}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total members" value={data.total} icon={Users} />
        <StatCard label="New this month" value={data.newThisMonth} icon={UserPlus} tone="gold" />
        <StatCard label="Active members" value={data.active} icon={UserCheck} tone="green" />
        <StatCard label="Inactive members" value={data.inactive} icon={UserMinus} tone="gray" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard title="Member growth" subtitle="New members joining each month, last 12 months" className="lg:col-span-2">
          <div className="h-64" role="img" aria-label="Bar chart of new members per month over the last 12 months">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.growth} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="label" tick={{ fill: CHART.text, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: CHART.text, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: CHART.grid, opacity: 0.5 }} contentStyle={tooltipStyle} formatter={(v) => [v, 'New members']} />
                <Bar dataKey="joined" fill={CHART.primary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <section className="card p-5">
          <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-navy-800">
            <Cake size={18} className="text-gold-600" aria-hidden="true" /> Birthdays this week
          </h2>
          {data.birthdays.length === 0 ? (
            <EmptyState
              icon={PartyPopper}
              title="No birthdays this week"
              message="Birthdays in the next 7 days will show up here."
            />
          ) : (
            <ul className="mt-3 max-h-72 divide-y divide-navy-50 overflow-y-auto">
              {data.birthdays.map(({ member, days, date }) => (
                <li key={member.id}>
                  <Link to={`/admin/members/${member.id}`} className="flex items-center gap-3 rounded-lg py-2.5 hover:bg-gold-50/60">
                    <Avatar member={member} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-navy-800">{fullName(member)}</span>
                      <span className="block text-xs text-navy-400">{formatDayMonth(date)}</span>
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        days === 0 ? 'bg-gold-400 text-navy-900' : 'bg-navy-50 text-navy-600'
                      }`}
                    >
                      {birthdayLabel(days)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard title="Members by department" className="lg:col-span-2">
          <div className="h-80" role="img" aria-label="Bar chart of members in each department">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.departments} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} horizontal={false} />
                <XAxis type="number" allowDecimals={false} tick={{ fill: CHART.text, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={128} tick={{ fill: CHART.text, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: CHART.grid, opacity: 0.5 }} contentStyle={tooltipStyle} formatter={(v) => [v, 'Members']} />
                <Bar dataKey="value" fill={CHART.accent} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Gender split">
          <div className="h-48" role="img" aria-label="Donut chart of members by gender">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.gender} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={3} stroke="none">
                  {data.gender.map((entry, i) => (
                    <Cell key={entry.name} fill={CHART.palette[i % 2]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 flex justify-center gap-5 text-sm text-navy-600">
            {data.gender.map((entry, i) => (
              <li key={entry.name} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: CHART.palette[i % 2] }} aria-hidden="true" />
                {entry.name} ({entry.value})
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-navy-50 pt-4">
            <h3 className="mb-3 text-sm font-semibold text-navy-700">Marital status</h3>
            <ul className="space-y-2.5">
              {data.marital.map((m) => (
                <li key={m.name} className="text-sm">
                  <div className="mb-1 flex justify-between text-navy-600">
                    <span>{m.name}</span>
                    <span className="font-medium text-navy-800">{m.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-navy-50">
                    <div className="h-2 rounded-full bg-navy-600" style={{ width: `${(m.value / maritalMax) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ChartCard>
      </div>

      <section className="card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-navy-800">Recently joined</h2>
          <Link to="/admin/members" className="text-sm font-semibold text-navy-600 hover:text-navy-900">
            View all members
          </Link>
        </div>
        <ul className="mt-3 divide-y divide-navy-50">
          {data.recent.map((m) => (
            <li key={m.id}>
              <Link to={`/admin/members/${m.id}`} className="flex items-center gap-4 rounded-lg py-3 hover:bg-gold-50/60">
                <Avatar member={m} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-navy-800">{fullName(m)}</span>
                  <span className="block text-sm text-navy-500">{m.department === 'None' ? 'No department yet' : m.department}</span>
                </span>
                <span className="text-sm text-navy-500">{formatDate(m.joinDate)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
