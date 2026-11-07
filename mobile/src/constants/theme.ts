export const colors = {
  background: '#FBF7F0',
  surface: '#FFFFFF',
  primary: '#C45A2C',
  primarySoft: '#F3D9CB',
  text: '#2B2018',
  textMuted: '#7A6A5C',
  border: '#E7DDD0',
  success: '#3E7A4E',
  danger: '#B3402F',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  pill: 999,
} as const;

export const typography = {
  title: { fontSize: 28, fontWeight: '700' },
  heading: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 13, fontWeight: '400' },
} as const;
