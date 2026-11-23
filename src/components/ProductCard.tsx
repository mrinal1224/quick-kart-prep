import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '@/data/products';

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={product.name}
        />
      </View>

      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>

      <Text style={styles.quantity}>{product.quantity}</Text>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>₹{product.price}</Text>

        <Pressable
          style={styles.addButton}
          onPress={() => onAdd(product)}
          accessibilityRole="button"
          accessibilityLabel={`Add ${product.name} to cart`}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#18181B',
    minHeight: 40,
  },
  quantity: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 4,
    marginBottom: 12,
  },
  bottomRow: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#18181B',
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#16A34A',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
  },
});
