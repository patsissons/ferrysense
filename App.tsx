import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme, BottomNavigation, Text } from 'react-native-paper';
import React from 'react';

const HomeRoute = () => <Text style={styles.screenContent}>Home Screen</Text>;
const ProfileRoute = () => <Text style={styles.screenContent}>Profile Screen</Text>;
const SettingsRoute = () => <Text style={styles.screenContent}>Settings Screen</Text>;

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    profile: ProfileRoute,
    settings: SettingsRoute,
  });

  return (
    <PaperProvider theme={MD3LightTheme}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
