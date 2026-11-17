
import React, { useState } from 'react';

import {
  View,
  Text as RNText,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  // State to store search input
  const [searchQuery, setSearchQuery] = useState('');

  // Function to clear the search input
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* =========================
          DELIVERY HEADER
      ========================= */}

      <View style={styles.header}>

        {/* Top Row */}
        <View style={styles.topRow}>

          {/* App Branding */}
          <View style={styles.brandContainer}>
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

      {/* =========================
          SEARCH SECTION
      ========================= */}

      <View style={styles.searchSection}>

        <View style={styles.searchContainer}>

          {/* Search Icon */}
          <RNText style={styles.searchIcon}>
            🔍
          </RNText>

          {/* Search Input */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search for milk, bread, fruits..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            accessibilityLabel="Search products"
            onSubmitEditing={() => Keyboard.dismiss()}
          />

          {/* Clear Search Button */}
          {searchQuery.length > 0 && (
            <Pressable
              onPress={clearSearch}
              style={styles.clearButton}
              accessibilityRole="button"
              accessibilityLabel="Clear search"
            >
              <RNText style={styles.clearText}>
                ✕
              </RNText>
            </Pressable>
          )}

        </View>

        {/* Live Search Preview */}
        {searchQuery.trim().length > 0 && (
          <RNText style={styles.searchPreview}>
            Searching for: {searchQuery}
          </RNText>
        )}

      </View>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <View style={styles.content}>
        <RNText style={styles.placeholder}>
          Categories coming soon...
        </RNText>
      </View>

    </SafeAreaView>
  );
}

// =========================
// STYLES
// =========================

const styles = StyleSheet.create({

  // Main Screen
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Delivery Header
  header: {
    backgroundColor: '#FACC15',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },

  // Header Top Row
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Branding
  brandContainer: {
    flex: 1,
  },

  brand: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#18181B',
  },

  deliveryTime: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#18181B',
    marginTop: 4,
  },

  // Profile Icon
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  profileEmoji: {
    fontSize: 24,
  },

  // Location
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

  // Search Section
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
  },

  searchIcon: {
    fontSize: 19,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#18181B',
    paddingVertical: 0,
  },

  // Clear Search Button
  clearButton: {
    padding: 8,
    marginLeft: 4,
  },

  clearText: {
    fontSize: 16,
    color: '#6B7280',
  },

  // Live Search Preview
  searchPreview: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
  },

  // Main Content
  content: {
    flex: 1,
    padding: 20,
  },

  placeholder: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});
