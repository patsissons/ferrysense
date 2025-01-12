export { HomeRoute } from './home';
export { ProfileRoute } from './profile';
export { SettingsRoute } from './settings';

export const routes = [
  { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
  { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
];
