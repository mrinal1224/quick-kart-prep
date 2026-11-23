import { Stack, useLocalSearchParams } from 'expo-router';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProductCard from '@/components/ProductCard';
import { categories } from '@/data/categories';
import { products, type Product } from '@/data/products';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const category = categories.find((item) => item.id === id);
  const categoryProducts = products.filter((product) => product.categoryId === id);

  const handleAdd = (product: Product) => {
    Alert.alert('Coming soon', `Cart functionality for ${product.name} is coming next!`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: category?.name ?? 'Category' }} />

      {category ? (
        <FlatList
          data={categoryProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.heading}>{category.name}</Text>
              <Text style={styles.description}>
                {categoryProducts.length} products available
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.productWrapper}>
              <ProductCard product={item} onAdd={handleAdd} />
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No products available in this category yet.
            </Text>
          }
        />
      ) : (
        <View style={styles.notFound}>
          <Text style={styles.heading}>Category not found</Text>
          <Text style={styles.description}>
            No category exists with ID: {id ?? 'unknown'}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#18181B',
  },
  description: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  row: {
    gap: 12,
    marginBottom: 12,
  },
  productWrapper: {
    flex: 1,
  },
  emptyText: {
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
