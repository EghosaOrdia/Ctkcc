import { toISO } from '../utils/dates';

// All names, numbers and addresses below are invented placeholders.
// Dates are generated relative to today so the demo always looks current.

const NAME_POOLS = {
  yoruba: {
    weight: 28,
    male: ['Adebayo', 'Oluwaseun', 'Tunde', 'Kehinde', 'Babatunde', 'Olumide', 'Segun', 'Femi', 'Damilola', 'Ayodele', 'Gbenga', 'Kayode', 'Biodun', 'Rotimi'],
    female: ['Folake', 'Funmilayo', 'Yetunde', 'Bukola', 'Titilayo', 'Adebimpe', 'Omolara', 'Temitope', 'Abiola', 'Modupe', 'Ronke', 'Morenike', 'Damilare'],
    surnames: ['Adeyemi', 'Ogunleye', 'Balogun', 'Adeleke', 'Olaniyan', 'Akinwale', 'Ogundipe', 'Salako', 'Oyebanji', 'Famuyiwa', 'Ajayi', 'Olatunji'],
  },
  igbo: {
    weight: 26,
    male: ['Chinedu', 'Emeka', 'Ikenna', 'Obinna', 'Chukwuemeka', 'Nnamdi', 'Uchenna', 'Kelechi', 'Ifeanyi', 'Chibuike', 'Tochukwu', 'Ugochukwu'],
    female: ['Ngozi', 'Chiamaka', 'Adaeze', 'Nkechi', 'Ifeoma', 'Chidinma', 'Onyinye', 'Amarachi', 'Uchechi', 'Ebere', 'Oluchi'],
    surnames: ['Okonkwo', 'Eze', 'Nwosu', 'Okafor', 'Nwachukwu', 'Obi', 'Anyanwu', 'Chukwu', 'Umeh', 'Nnadi', 'Ejiofor', 'Ibe'],
  },
  hausa: {
    weight: 12,
    male: ['Danladi', 'Bitrus', 'Yakubu', 'Gideon', 'Istifanus', 'Musa', 'Ibrahim', 'Sani', 'Aminu', 'Joshua'],
    female: ['Laraba', 'Talatu', 'Rahila', 'Hannatu', 'Maryam', 'Amina', 'Asabe', 'Salamatu', 'Hauwa'],
    surnames: ['Danjuma', 'Garba', 'Sule', 'Bako', 'Auta', 'Maikano', 'Kure', 'Abdullahi', 'Bello', 'Gambo'],
  },
  edo: {
    weight: 14,
    male: ['Osaze', 'Osagie', 'Efosa', 'Eghosa', 'Osas', 'Ehizogie', 'Nosa', 'Uyi', 'Idemudia'],
    female: ['Itohan', 'Osarugue', 'Ehi', 'Efe', 'Iyobosa', 'Eseosa', 'Aisosa', 'Ivie', 'Osaretin'],
    surnames: ['Ogbeide', 'Aigbokhan', 'Omoregie', 'Idahosa', 'Osayande', 'Ehigiator', 'Enabulele', 'Aghedo'],
  },
  other: {
    weight: 20,
    male: ['Etim', 'Edet', 'Ekong', 'Ime', 'Akpofure', 'Ovie', 'Terkimbi', 'Aondofa', 'Tamuno', 'Ufuoma'],
    female: ['Mfon', 'Eno', 'Utibe', 'Ejiro', 'Doose', 'Ifiok', 'Nse', 'Oghenetega', 'Imaobong'],
    surnames: ['Okon', 'Bassey', 'Udoh', 'Akpan', 'Ekpenyong', 'Ikpe', 'Ukueku', 'Tyoden'],
  },
};

const AREAS = {
  'Wuse Fellowship': ['Wuse II', 'Wuse Zone 4', 'Jabi'],
  'Garki Fellowship': ['Garki II', 'Garki Area 8'],
  'Maitama Fellowship': ['Maitama', 'Asokoro'],
  'Gwarinpa Fellowship': ['Gwarinpa'],
  'Kubwa Fellowship': ['Kubwa'],
  'Lugbe Fellowship': ['Lugbe'],
};
const CELL_WEIGHTS = [
  ['Wuse Fellowship', 22],
  ['Garki Fellowship', 18],
  ['Maitama Fellowship', 12],
  ['Gwarinpa Fellowship', 20],
  ['Kubwa Fellowship', 16],
  ['Lugbe Fellowship', 12],
];
const STREETS = ['Crescent', 'Close', 'Street', 'Avenue', 'Road'];
const STREET_NAMES = ['Mambilla', 'Ebitu Ukiwe', 'Gimbiya', 'Libreville', 'Lobito', 'Sokode', 'Nile', 'Ahmadu Bello', 'Kumasi', 'Bamako', 'Cairo', 'Mississippi', 'Danube', 'Zambezi', 'Aguiyi Ironsi'];

const ADULT_JOBS = ['Teacher', 'Civil Servant', 'Engineer', 'Trader', 'Nurse', 'Entrepreneur', 'Driver', 'Banker', 'Accountant', 'Lawyer', 'Pharmacist', 'Software Developer', 'Tailor', 'Caterer', 'Electrician', 'Journalist', 'Architect', 'Hairdresser', 'Lecturer', 'Farmer', 'Civil Engineer', 'Marketing Officer', 'Administrator'];
const SENIOR_JOBS = ['Retired Civil Servant', 'Retired Teacher', 'Trader', 'Farmer', 'Retired Banker', 'Retired Nurse'];

const NOTES = [
  'Prefers to be contacted on WhatsApp.',
  'Leads the Saturday morning prayer call.',
  'Recently relocated from Lagos and getting to know the fellowship.',
  'Available for weekday volunteering.',
  'Plays the keyboard and is open to joining the choir.',
  'Coordinates the annual food drive for the Welfare team.',
  'Needs a ride to church on Sunday mornings.',
  'Baptised in the past year.',
  'Interested in leading a new cell group.',
  'Helps with the sound desk on Sundays.',
];

const EMAIL_DOMAINS = ['gmail.com', 'gmail.com', 'gmail.com', 'yahoo.com', 'outlook.com'];
const PHONE_PREFIXES = ['0803', '0806', '0810', '0813', '0816', '0802', '0805', '0814', '0703', '0706', '0903', '0906', '0913', '0810', '0818'];

// Months-ago -> number of members, giving a visible growth pattern.
const RECENT_MONTH_COUNTS = [10, 7, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2];
const TOTAL = 100;

function mulberry32(seed) {
  let a = seed;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSeedMembers() {
  const rand = mulberry32(23);
  const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const weighted = (entries) => {
    const total = entries.reduce((sum, [, w]) => sum + w, 0);
    let roll = rand() * total;
    for (const [value, w] of entries) {
      roll -= w;
      if (roll < 0) return value;
    }
    return entries[entries.length - 1][0];
  };
  const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const today = new Date();
  const year = today.getFullYear();

  // 1. Join-date slots: recent months follow the growth curve, the rest are spread over ~5 years.
  const slots = [];
  const dayIn = (monthsAgo) => {
    const first = new Date(year, today.getMonth() - monthsAgo, 1);
    const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const maxDay = monthsAgo === 0 ? today.getDate() : lastDay;
    return new Date(first.getFullYear(), first.getMonth(), randInt(1, maxDay));
  };
  RECENT_MONTH_COUNTS.forEach((count, monthsAgo) => {
    for (let i = 0; i < count; i += 1) slots.push({ monthsAgo, join: dayIn(monthsAgo) });
  });
  while (slots.length < TOTAL) {
    const monthsAgo = randInt(12, 59);
    slots.push({ monthsAgo, join: dayIn(monthsAgo) });
  }
  slots.sort((a, b) => a.join - b.join);

  // 2. Assign roles to slots.
  const olderIdx = shuffle(slots.map((s, i) => i).filter((i) => slots[i].monthsAgo >= 1));
  const birthdayIdx = new Set(olderIdx.slice(0, 6));
  const childIdx = new Set(olderIdx.slice(6, 14));
  const seniorIdx = new Set(olderIdx.slice(14, 20));
  const inactiveIdx = new Set(
    shuffle(
      slots
        .map((s, i) => i)
        .filter((i) => slots[i].monthsAgo >= 8 && !birthdayIdx.has(i) && !childIdx.has(i)),
    ).slice(0, 20),
  );
  const noteIdx = new Set(
    shuffle(slots.map((s, i) => i).filter((i) => !childIdx.has(i))).slice(0, NOTES.length),
  );
  const noteList = [...NOTES];
  const birthdayOffsets = [0, 1, 2, 3, 5, 6];
  const birthdayAges = [34, 29, 41, 52, 23, 38];
  let birthdayCursor = 0;

  const usedNames = new Set();
  const usedPhones = new Set();
  const usedEmails = new Set();

  const makeDob = (age, forcedOffset) => {
    if (forcedOffset !== undefined) {
      const target = new Date(today.getFullYear(), today.getMonth(), today.getDate() + forcedOffset);
      const month = target.getMonth();
      const day = month === 1 && target.getDate() === 29 ? 28 : target.getDate();
      return new Date(year - age, month, day);
    }
    return new Date(year - age, randInt(0, 11), randInt(1, 28));
  };

  const members = slots.map((slot, index) => {
    const isChild = childIdx.has(index);
    const isSenior = seniorIdx.has(index);
    const isBirthday = birthdayIdx.has(index);
    const isNew = slot.monthsAgo === 0;

    // Name
    const groupKey = weighted(Object.entries(NAME_POOLS).map(([key, pool]) => [key, pool.weight]));
    const pool = NAME_POOLS[groupKey];
    const gender = rand() < 0.55 ? 'Female' : 'Male';
    let firstName;
    let lastName;
    let attempts = 0;
    do {
      firstName = pick(gender === 'Female' ? pool.female : pool.male);
      const surnamePool = rand() < 0.8 ? pool.surnames : NAME_POOLS[pick(Object.keys(NAME_POOLS))].surnames;
      lastName = pick(surnamePool);
      attempts += 1;
    } while (usedNames.has(`${firstName} ${lastName}`) && attempts < 40);
    usedNames.add(`${firstName} ${lastName}`);

    // Age and date of birth
    let age;
    let dob;
    if (isBirthday) {
      age = birthdayAges[birthdayCursor];
      dob = makeDob(age, birthdayOffsets[birthdayCursor]);
      birthdayCursor += 1;
    } else {
      if (isChild) age = randInt(4, 15);
      else if (isSenior) age = randInt(66, 82);
      else {
        const roll = rand();
        age = roll < 0.35 ? randInt(18, 30) : roll < 0.75 ? randInt(31, 45) : randInt(46, 65);
      }
      dob = makeDob(age);
    }

    // Marital status
    let maritalStatus;
    if (isChild || age < 22) maritalStatus = 'Single';
    else if (age <= 30) maritalStatus = weighted([['Single', 60], ['Married', 40]]);
    else if (age <= 45) maritalStatus = weighted([['Married', 70], ['Single', 20], ['Divorced', 5], ['Widowed', 5]]);
    else maritalStatus = weighted([['Married', 70], ['Widowed', 15], ['Single', 10], ['Divorced', 5]]);

    if (gender === 'Female' && maritalStatus === 'Married' && !isChild && rand() < 0.25) {
      const other = pick(pool.surnames);
      if (other !== lastName) lastName = `${lastName}-${other}`;
    }

    // Occupation
    let occupation;
    if (isChild) occupation = age < 11 ? 'Pupil' : 'Student';
    else if (isSenior) occupation = pick(SENIOR_JOBS);
    else if (age <= 24 && rand() < 0.6) occupation = 'Student';
    else occupation = pick(ADULT_JOBS);

    // Department
    let department;
    if (isChild) department = "Children's Church";
    else if (isSenior)
      department = weighted([['Prayer Team', 30], ['Welfare', 25], ['Ushers', 20], ['None', 25]]);
    else {
      department = weighted([
        ['Choir', 18], ['Ushers', 15], ['Media', age < 45 ? 14 : 3], ['Protocol', 8],
        ["Children's Church", 3], ['Youth', age <= 35 ? 22 : 0], ['Prayer Team', 10],
        ['Welfare', 8], ['Technical', age < 50 ? 5 : 1], ['None', 10],
      ]);
    }

    // Location
    const cellGroup = weighted(CELL_WEIGHTS);
    const area = pick(AREAS[cellGroup]);
    const address = `${randInt(1, 48)} ${pick(STREET_NAMES)} ${pick(STREETS)}, ${area}, Abuja`;

    // Contact
    let phone;
    do {
      phone = `${pick(PHONE_PREFIXES)}${String(randInt(0, 9999999)).padStart(7, '0')}`;
    } while (usedPhones.has(phone));
    usedPhones.add(phone);

    let email = '';
    if (!isChild && rand() < 0.85) {
      const base = `${firstName}.${lastName.split('-')[0]}`.toLowerCase();
      let candidate = `${base}@${pick(EMAIL_DOMAINS)}`;
      while (usedEmails.has(candidate)) candidate = `${base}${randInt(2, 99)}@${pick(EMAIL_DOMAINS)}`;
      usedEmails.add(candidate);
      email = candidate;
    }

    const status = isNew ? 'New' : inactiveIdx.has(index) ? 'Inactive' : 'Active';
    const notes = noteIdx.has(index) && noteList.length ? noteList.shift() : '';

    return {
      id: `mem-${String(index + 1).padStart(3, '0')}`,
      firstName,
      lastName,
      gender,
      phone,
      email,
      address,
      dateOfBirth: toISO(dob),
      maritalStatus,
      occupation,
      department,
      cellGroup,
      joinDate: toISO(slot.join),
      status,
      notes,
    };
  });

  return members;
}
