export { FerryRoute } from './ferry';
export { ProfileRoute } from './profile';
export { SettingsRoute } from './settings';

export const routes = [
  { key: 'ferry', title: 'Ferry', focusedIcon: 'ferry', unfocusedIcon: 'ferry' },
  { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account' },
  { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog' },
];
