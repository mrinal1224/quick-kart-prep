
import React from 'react';

import {
  View,
  Text as RNText,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';

import type { Category } from '@/data/categories';

type CategoryCardProps = {
  category: Category;
  onPress: (category: Category) => void;
};

export default function CategoryCard({
  category,
  onPress,
}: CategoryCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress(category)}
      accessibilityRole="button"
      accessibilityLabel={`Browse ${category.name}`}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: category.image }}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={category.name}
        />
      </View>

      <RNText style={styles.name} numberOfLines={2}>
        {category.name}
      </RNText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
  },

  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#18181B',
    textAlign: 'center',
    marginTop: 8,
  },
});
