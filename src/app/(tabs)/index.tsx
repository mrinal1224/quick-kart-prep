
import React, { useState } from 'react';

import {
  View,
  Text as RNText,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import CategoryCard from '@/components/CategoryCard';
import { categories, type Category } from '@/data/categories';

export default function HomeScreen() {
  const router = useRouter();
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Clear search input
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Navigate to the category screen with its dynamic ID.
  const handleCategoryPress = (category: Category) => {
    router.push({
      pathname: '/category/[id]',
      params: { id: category.id },
    });
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* DELIVERY HEADER */}
      <View style={styles.header}>

        <View style={styles.topRow}>
          <View style={styles.brandContainer}>
            <RNText style={styles.brand}>
              QUICKKART
            </RNText>

            <RNText style={styles.deliveryTime}>
              Delivery in 10 minutes
            </RNText>
          </View>

          <View style={styles.profileIcon}>
            <RNText style={styles.profileEmoji}>
              👤
            </RNText>
          </View>
        </View>

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

      {/* SEARCH SECTION */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>

          <RNText style={styles.searchIcon}>
            🔍
          </RNText>

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

        {searchQuery.trim().length > 0 && (
          <RNText style={styles.searchPreview}>
            Searching for: {searchQuery}
          </RNText>
        )}
      </View>

      {/* SCROLLABLE MAIN CONTENT */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* CATEGORY SECTION */}
        <View style={styles.categorySection}>

          <RNText style={styles.sectionTitle}>
            Shop by Category
          </RNText>

          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <View
                key={category.id}
                style={styles.categoryWrapper}
              >
                <CategoryCard
                  category={category}
                  onPress={handleCategoryPress}
                />
              </View>
            ))}
          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // DELIVERY HEADER
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

  // SEARCH SECTION
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
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

  clearButton: {
    padding: 8,
    marginLeft: 4,
  },

  clearText: {
    fontSize: 16,
    color: '#6B7280',
  },

  searchPreview: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
  },

  // SCROLL VIEW
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  // CATEGORY SECTION
  categorySection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#18181B',
    marginBottom: 18,
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 20,
  },

  categoryWrapper: {
    width: '33.3333%',
    paddingHorizontal: 6,
  },
});