import tailwindConfig from '../../tailwind.config.js';

// Chart colours come from the Tailwind theme so there is a single source of truth.
const colors = tailwindConfig.theme.extend.colors;

export const CHART = {
  primary: colors.navy[700],
  primarySoft: colors.navy[200],
  accent: colors.gold[400],
  accentDark: colors.gold[600],
  grid: colors.navy[100],
  text: colors.navy[500],
  palette: [colors.navy[700], colors.gold[400], colors.navy[400], colors.gold[600], colors.navy[200]],
};
