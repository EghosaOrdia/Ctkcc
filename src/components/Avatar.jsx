import { avatarColor, fullName, initials } from '../utils/members';

const SIZES = {
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-20 w-20 text-2xl sm:h-24 sm:w-24 sm:text-3xl',
};

export default function Avatar({ member, size = 'md' }) {
  return (
    <span
      role="img"
      aria-label={`Avatar for ${fullName(member)}`}
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold ${SIZES[size]} ${avatarColor(member.id)}`}
    >
      {initials(member)}
    </span>
  );
}
