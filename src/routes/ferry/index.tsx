import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Menu, Button } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { en, registerTranslation } from 'react-native-paper-dates';
import { SafeAreaView } from 'react-native-safe-area-context';

registerTranslation('en', en);

const terminals = [
  { label: 'Tsawwassen', value: 'tsawwassen' },
  { label: 'Swartz Bay', value: 'swartz' },
  { label: 'Duke Point', value: 'duke' },
  { label: 'Departure Bay', value: 'departure' },
  { label: 'Horseshoe Bay', value: 'horseshoe' },
  { label: 'Langdale', value: 'langdale' },
];

export const FerryRoute = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [showDepartureMenu, setShowDepartureMenu] = React.useState(false);
  const [showArrivalMenu, setShowArrivalMenu] = React.useState(false);
  const [departureTerminal, setDepartureTerminal] = React.useState(terminals[0]);
  const [arrivalTerminal, setArrivalTerminal] = React.useState(terminals[1]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.datePickerContainer}>
          <DatePickerInput
            locale="en"
            label="Date of sailing"
            value={date}
            onChange={setDate}
            inputMode="start"
            mode="outlined"
            withDateFormatInLabel={false}
          />
        </View>
        <View style={styles.terminalsContainer}>
          <View style={styles.dropdownContainer}>
            <Menu
              visible={showDepartureMenu}
              onDismiss={() => setShowDepartureMenu(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setShowDepartureMenu(true)}
                >
                  {departureTerminal.label}
                </Button>
              }
            >
              {terminals.map((terminal) => (
                <Menu.Item
                  key={terminal.value}
                  onPress={() => {
                    setDepartureTerminal(terminal);
                    setShowDepartureMenu(false);
                  }}
                  title={terminal.label}
                />
              ))}
            </Menu>
          </View>
          <View style={styles.dropdownContainer}>
            <Menu
              visible={showArrivalMenu}
              onDismiss={() => setShowArrivalMenu(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setShowArrivalMenu(true)}
                >
                  {arrivalTerminal.label}
                </Button>
              }
            >
              {terminals.map((terminal) => (
                <Menu.Item
                  key={terminal.value}
                  onPress={() => {
                    setArrivalTerminal(terminal);
                    setShowArrivalMenu(false);
                  }}
                  title={terminal.label}
                />
              ))}
            </Menu>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text>Ferry Schedule</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBlock: 16,
    elevation: 2,
    paddingHorizontal: 16,
    rowGap: 8,
  },
  datePickerContainer: {
    height: 60,
  },
  terminalsContainer: {
    flexDirection: 'row',
    columnGap: 8,
  },
  dropdownContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
