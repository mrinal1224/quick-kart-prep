
import React from 'react';

import {
  View,
  Text as RNText,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>

      {/* Delivery Header */}
      <View style={styles.header}>

        {/* Top Row */}
        <View style={styles.topRow}>

          {/* App Branding */}
          <View>
            <RNText style={styles.brand}>
              QUICKKART
            </RNText>

            <RNText style={styles.deliveryTime}>
              Delivery in 10 minutes
            </RNText>
          </View>

          {/* Profile Icon */}
          <View style={styles.profileIcon}>
            <RNText style={styles.profileEmoji}>
              👤
            </RNText>
          </View>

        </View>

        {/* Delivery Location */}
        <View style={styles.locationRow}>

          <RNText style={styles.locationIcon}>
            📍
          </RNText>

          <View style={styles.locationDetails}>
            <RNText style={styles.locationTitle}>
              Home ▼
            </RNText>

            <RNText style={styles.address}>
              Electronic City, Bengaluru
            </RNText>
          </View>

        </View>

      </View>

      {/* Main Content - Coming Soon */}
      <View style={styles.content}>
        <RNText style={styles.placeholder}>
          Home screen content coming next...
        </RNText>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    backgroundColor: '#FACC15',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brand: {
    fontSize: 14,
    fontWeight: '800',
    color: '#18181B',
    letterSpacing: 1,
  },

  deliveryTime: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#18181B',
    marginTop: 4,
  },

  profileIcon: {
    width: 45,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  profileEmoji: {
    fontSize: 24,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  locationIcon: {
    fontSize: 22,
    marginRight: 8,
  },

  locationDetails: {
    flex: 1,
  },

  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#18181B',
  },

  address: {
    fontSize: 13,
    color: '#3F3F46',
    marginTop: 2,
  },

  content: {
    flex: 1,
    padding: 20,
  },

  placeholder: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});
