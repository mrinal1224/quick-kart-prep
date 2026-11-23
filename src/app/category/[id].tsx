import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { categories } from '@/data/categories';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Match the URL parameter with our existing category data.
  const category = categories.find((item) => item.id === id);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{ title: category?.name ?? 'Category' }}
      />

      <View style={styles.content}>
        {category ? (
          <>
            <Text style={styles.heading}>{category.name}</Text>
            <Text style={styles.description}>
              Products from {category.name} will appear here.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.heading}>Category not found</Text>
            <Text style={styles.description}>
              No category exists with ID: {id ?? 'unknown'}
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#18181B',
    textAlign: 'center',
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});
