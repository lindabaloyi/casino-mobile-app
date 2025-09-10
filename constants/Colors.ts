/**
 * Color constants for the Casino Card Game
 * Supports light and dark themes
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    cardBackground: '#fff',
    cardBorder: '#ddd',
    tableBackground: '#2d5a27',
    buttonPrimary: '#007AFF',
    buttonSecondary: '#6c757d',
    buttonDanger: '#dc3545',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    cardBackground: '#2d2d2d',
    cardBorder: '#444',
    tableBackground: '#1a3a1a',
    buttonPrimary: '#0a84ff',
    buttonSecondary: '#8e8e93',
    buttonDanger: '#ff453a',
    success: '#30d158',
    warning: '#ff9f0a',
    error: '#ff453a',
    info: '#64d2ff',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ColorName = keyof typeof Colors.light;
