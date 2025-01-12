import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme, BottomNavigation } from 'react-native-paper';
import React from 'react';
import { HomeRoute, ProfileRoute, SettingsRoute, routes } from './routes';

export default function App() {
  const [index, setIndex] = React.useState(0);

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
