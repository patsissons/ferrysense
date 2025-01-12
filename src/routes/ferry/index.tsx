import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Menu, Button, List, Surface, useTheme } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { en, registerTranslation } from 'react-native-paper-dates';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';

registerTranslation('en', en);

const terminals = [
  { label: 'Tsawwassen', value: 'tsawwassen' },
  { label: 'Swartz Bay', value: 'swartz' },
  { label: 'Duke Point', value: 'duke' },
  { label: 'Departure Bay', value: 'departure' },
  { label: 'Horseshoe Bay', value: 'horseshoe' },
  { label: 'Langdale', value: 'langdale' },
];

// Mock sailing data - in a real app this would come from an API
const mockSailings = [
  { departureTime: '6:00 AM', arrivalTime: '8:35 AM', vessel: 'Spirit of British Columbia', available: true },
  { departureTime: '8:00 AM', arrivalTime: '10:35 AM', vessel: 'Coastal Renaissance', available: true },
  { departureTime: '10:00 AM', arrivalTime: '12:35 PM', vessel: 'Spirit of Vancouver Island', available: false },
  { departureTime: '12:00 PM', arrivalTime: '2:35 PM', vessel: 'Spirit of British Columbia', available: true },
  { departureTime: '2:00 PM', arrivalTime: '4:35 PM', vessel: 'Coastal Renaissance', available: true },
  { departureTime: '4:00 PM', arrivalTime: '6:35 PM', vessel: 'Spirit of Vancouver Island', available: false },
  { departureTime: '6:00 PM', arrivalTime: '8:35 PM', vessel: 'Spirit of British Columbia', available: true },
  { departureTime: '8:00 PM', arrivalTime: '10:35 PM', vessel: 'Coastal Renaissance', available: true },
];

export const FerryRoute = () => {
  const theme = useTheme();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [showDepartureMenu, setShowDepartureMenu] = React.useState(false);
  const [showArrivalMenu, setShowArrivalMenu] = React.useState(false);
  const [departureTerminal, setDepartureTerminal] = React.useState(terminals[0]);
  const [arrivalTerminal, setArrivalTerminal] = React.useState(terminals[1]);

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.header} elevation={2}>
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
      </Surface>
      <ScrollView style={styles.content}>
        <View style={styles.sailingHeader}>
          <Text variant="titleMedium">
            {date ? format(date, 'EEEE, MMMM d, yyyy') : 'Select a date'}
          </Text>
          <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
            {departureTerminal.label} → {arrivalTerminal.label}
          </Text>
        </View>
        <List.Section>
          {mockSailings.map((sailing, index) => (
            <List.Item
              key={index}
              title={`${sailing.departureTime} → ${sailing.arrivalTime}`}
              description={sailing.vessel}
              left={props => <List.Icon {...props} icon="ferry" />}
              right={props => (
                <Text
                  {...props}
                  style={[
                    styles.availabilityText,
                    { color: sailing.available ? theme.colors.primary : theme.colors.error }
                  ]}
                >
                  {sailing.available ? 'Available' : 'Full'}
                </Text>
              )}
              style={styles.sailingItem}
            />
          ))}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 16,
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
  },
  sailingHeader: {
    padding: 16,
    gap: 4,
  },
  sailingItem: {
    paddingHorizontal: 16,
  },
  availabilityText: {
    alignSelf: 'center',
    fontWeight: '500',
  },
});
