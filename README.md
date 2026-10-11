# Grace Assembly Member Portal (demo)

A church membership records demo: a public landing page plus an admin portal for managing members.
Everything runs in the browser. There is no backend and there are no API calls.

## Run it

```bash
npm install
npm run dev        # development server (http://localhost:5173)
npm run build      # production build into dist/
npm run preview    # serve the production build
```

Requires Node 18 or newer.

## Demo login

Open `/login` and use:

- Email: `admin@church.demo`
- Password: `admin123`

The login page also has a "Fill in for me" button. Signing in stores an `isAuthed` flag in
localStorage. All `/admin` routes redirect to `/login` without it, and Logout clears it.

## Demo data

- 100 invented members are generated in `src/data/members.js`. Names, phone numbers, emails
  and addresses are placeholders, not real people.
- Dates are generated relative to today, so there are always members with birthdays in the next
  7 days, 10 members who joined this month, and a rising 12-month growth pattern.
- Changes are saved to localStorage on every edit and survive a refresh.
- To reset: click **Reset Demo Data** in the admin sidebar and confirm. This restores a fresh set of
  100 members. You can also clear the `church_demo_members_v1` key in your browser's storage.

## Customising

| What | Where |
| --- | --- |
| Church name, tagline, address, phone, email | `src/config/appConfig.js` |
| Demo credentials | `src/config/appConfig.js` |
| Colours (navy, gold, paper) | `tailwind.config.js` (charts read from the same tokens) |
| Departments, cell groups, statuses | `src/constants/constants.js` |

## Structure

```
src/
  components/   reusable UI (StatCard, StatusBadge, Avatar, ConfirmModal, Toast, MemberForm,
                EmptyState, FilterBar, Pagination, ActionsMenu, Logo, ProtectedRoute)
  config/       church name and demo settings
  constants/    departments, cell groups and other option lists
  context/      members, auth and toast providers (+ contexts.js with the hooks)
  data/         seed member generator
  layouts/      admin shell with responsive sidebar
  pages/        Landing (sections in pages/landing), Login, Dashboard, MembersList,
                MemberProfile, MemberFormPage
  utils/        dates, phone validation, filtering and sorting, CSV export, chart theme
```

Scope: membership records only. There are no tithe, finance or events features.
