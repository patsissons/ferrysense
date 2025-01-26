import React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Text, Menu, Button, List, Surface, useTheme, Divider, MD3Theme } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { en, registerTranslation } from 'react-native-paper-dates';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';

registerTranslation('en', en);

const terminals = [
  { label: 'Tsawwassen', value: 'TSA' },
  { label: 'Swartz Bay', value: 'SWB' },
  { label: 'Duke Point', value: 'DUK' },
  { label: 'Departure Bay', value: 'NAN' },
  { label: 'Horseshoe Bay', value: 'HSB' },
  { label: 'Langdale', value: 'LNG' },
];


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

const mockSailingWithDetails = mockSailings.map((sailing, i) => ({
  id: String(i + 1),
  ...sailing,
  capacity: '85%',
  checkInBy: '5:30 AM',
  currentConditions: 'On Time',
  vesselInfo: {
    built: 1993,
    length: '167m',
    capacity: '2100 passengers and crew',
    vehicles: '358 vehicles',
    amenities: ['Coastal Cafe', 'Seawest Lounge', 'Kids Play Area', 'Gift Shop'],
    status: 'In Service',
  },
  routeInfo: {
    distance: '24 nautical miles',
    duration: '1 hour 35 minutes',
    checkInLocation: 'Terminal 1',
    parking: 'Long-term parking available',
  },
}));

interface SailingDetailsProps {
  departureTerminal: string;
  arrivalTerminal: string;
  sailing: typeof mockSailingWithDetails[0];
  theme: MD3Theme;
}

const SailingDetails: React.FC<SailingDetailsProps> = ({ departureTerminal, arrivalTerminal, sailing, theme }) => {
  const openBookingPage = () => {
    Linking.openURL(`https://www.bcferries.com/?sailing=true&departureLocation=${departureTerminal}&arrivalLocation=${arrivalTerminal}`);
  };

  const openCurrentConditionsPage = () => {
    // https://www.bcferries.com/routes-fares/schedules/seasonal/HSB-LNG
    Linking.openURL(`https://www.bcferries.com/routes-fares/schedules/seasonal/${departureTerminal}-${arrivalTerminal}`);
  };

  return (
    <View style={styles.sailingDetails}>
      <Divider />

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <Button
          mode="contained"
          onPress={openBookingPage}
          icon="ferry"
          style={styles.actionButton}
        >
          Book on BC Ferries
        </Button>
        <Button
          mode="outlined"
          onPress={openCurrentConditionsPage}
          icon="information"
          style={styles.actionButton}
        >
          View Current Conditions
        </Button>
      </View>

      {/* Status Section */}
      <View style={styles.detailSection}>
        <Text variant="titleSmall" style={styles.sectionTitle}>Status</Text>
        <View style={styles.detailRow}>
          <Text>Current Status: </Text>
          <Text style={{ color: theme.colors.primary }}>{sailing.currentConditions}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text>Capacity: </Text>
          <Text>{sailing.capacity}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text>Check-in by: </Text>
          <Text style={{ fontWeight: '500' }}>{sailing.checkInBy}</Text>
        </View>
      </View>

      {/* Vessel Information */}
      <View style={styles.detailSection}>
        <Text variant="titleSmall" style={styles.sectionTitle}>Vessel Information</Text>
        <View style={styles.detailRow}>
          <Text>Built: </Text>
          <Text>{sailing.vesselInfo.built}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text>Capacity: </Text>
          <Text>{sailing.vesselInfo.capacity}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text>Vehicle Spaces: </Text>
          <Text>{sailing.vesselInfo.vehicles}</Text>
        </View>
        <View style={styles.amenitiesList}>
          <Text style={{ marginBottom: 4 }}>Amenities:</Text>
          {sailing.vesselInfo.amenities.map((amenity, index) => (
            <View key={index} style={styles.amenityItem}>
              <Text>• {amenity}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Route Information */}
      <View style={styles.detailSection}>
        <Text variant="titleSmall" style={styles.sectionTitle}>Route Information</Text>
        <View style={styles.detailRow}>
          <Text>Distance: </Text>
          <Text>{sailing.routeInfo.distance}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text>Duration: </Text>
          <Text>{sailing.routeInfo.duration}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text>Check-in: </Text>
          <Text>{sailing.routeInfo.checkInLocation}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text>Parking: </Text>
          <Text>{sailing.routeInfo.parking}</Text>
        </View>
      </View>
    </View>
  );
};

export const FerryRoute = () => {
  const theme = useTheme();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [showDepartureMenu, setShowDepartureMenu] = React.useState(false);
  const [showArrivalMenu, setShowArrivalMenu] = React.useState(false);
  const [departureTerminal, setDepartureTerminal] = React.useState(terminals[0]);
  const [arrivalTerminal, setArrivalTerminal] = React.useState(terminals[1]);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'top', 'right']}>
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
                  mode="contained"
                  onPress={() => setShowDepartureMenu(true)}
                >
                  {departureTerminal.label}
                </Button>
              }
            >
              {terminals.map((terminal) => (
                <Menu.Item
                  key={terminal.value}
                  disabled={terminal.value === arrivalTerminal.value}
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
                  mode="contained"
                  onPress={() => setShowArrivalMenu(true)}
                >
                  {arrivalTerminal.label}
                </Button>
              }
            >
              {terminals.map((terminal) => (
                <Menu.Item
                  key={terminal.value}
                  disabled={terminal.value === departureTerminal.value}
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
          {mockSailingWithDetails.map((sailing) => (
            <List.Accordion
              key={sailing.id}
              id={sailing.id}
              expanded={expandedId === sailing.id}
              onPress={() => setExpandedId(expandedId === sailing.id ? null : sailing.id)}
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
            >
              <SailingDetails departureTerminal={departureTerminal.value} arrivalTerminal={arrivalTerminal.value} sailing={sailing} theme={theme} />
            </List.Accordion>
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
    padding: 16,
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
  availabilityText: {
    alignSelf: 'center',
    fontWeight: '500',
  },
  sailingDetails: {
    padding: 16,
    paddingTop: 0,
    gap: 16,
  },
  detailSection: {
    gap: 8,
  },
  sectionTitle: {
    fontWeight: '500',
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amenitiesList: {
    marginTop: 4,
  },
  amenityItem: {
    paddingLeft: 8,
    marginVertical: 2,
  },
  actionsContainer: {
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    borderRadius: 8,
  },
});
