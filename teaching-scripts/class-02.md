# Class 2 — Instructor Teaching Script (120 minutes)

**Aim:** Build the full Home → Category → Products flow incrementally. This script is for the instructor. Follow each checkpoint before continuing; the prep repository main already contains the complete result, so use the Class 1 checkpoint for live coding. Student companion: docs-notes/class-02.md. Assignments: assignments/campusstore-five-class-project.md.

## 0–10 min — Problem framing
Say: "Clicking Dairy shows an Alert; we need one reusable category detail screen that shows products belonging to Dairy, with a Back path." Draw: CategoryCard → Home callback → router.push → category/[id] → find category + filter products → FlatList → ProductCard.
Explain why six copied screens would be a maintenance problem. Ask students to distinguish a category id from a category name.

## 10–27 min — Step 2.1: Root Stack with NativeTabs child
Teach Stack as navigation history and Tabs as switching top-level destinations. Explain (tabs) = route group, not a URL segment. Move existing index.tsx and explore.tsx into src/app/(tabs)/.

Root src/app/_layout.tsx:
~~~tsx
import { Stack, DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
~~~
Tabs src/app/(tabs)/_layout.tsx:
~~~tsx
import AppTabs from '@/components/app-tabs';
export default function TabLayout() {
  return <AppTabs />;
}
~~~
Line explanations: useColorScheme reads OS preference; ThemeProvider passes navigator theme; the animation overlay is existing project code; Stack.Screen configures an existing route group; headerShown false hides the default header above custom Home. Existing AppTabs NativeTabs.Trigger name="index" and "explore" still point at sibling screen files.
Checkpoint: Home and Explore tabs still work.

## 27–40 min — Step 2.2: Dynamic category placeholder
Create src/app/category/[id].tsx:
~~~tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={styles.center}>
      <Text>Category Products</Text>
      <Text>Selected Category ID: {id}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
~~~
Explain filename [id] maps to /category/1; params are strings; the generic sets a TypeScript expectation but is NOT runtime validation. Add SafeAreaView in final source.
Checkpoint: manually open /category/2 on web when supported.

## 40–52 min — Step 2.3: Navigation from CategoryCard
Home src/app/(tabs)/index.tsx modifications:
~~~tsx
import { useRouter } from 'expo-router';

// Inside HomeScreen, at top level:
const router = useRouter();
const handleCategoryPress = (category: Category) => {
  router.push({
    pathname: '/category/[id]',
    params: { id: category.id },
  });
};
~~~
Remove old category Alert call. Keep CategoryCard onPress={handleCategoryPress} unchanged. Trace Pressable → onPress(category) → handler → router.push → destination receives id. Rule of Hooks: call useRouter at component top level, not in event callback. push adds a navigation entry, unlike replace.
Checkpoint: Dairy -> ID 1, Fruits -> ID 2, Back -> Home.

## 52–64 min — Step 2.4: Category lookup and fallback
Inside category screen:
~~~tsx
import { Stack, useLocalSearchParams } from 'expo-router';
import { categories } from '@/data/categories';
const { id } = useLocalSearchParams<{ id: string }>();
const category = categories.find(item => item.id === id);
~~~
Render:
~~~tsx
<Stack.Screen options={{ title: category?.name ?? 'Category' }} />
{category ? <Text>{category.name}</Text> : <Text>Category not found</Text>}
~~~
Explain find returns first matching category or undefined; optional chaining ?. safe property access; nullish fallback ??; conditional rendering. Unknown route /category/999 must not crash.
Checkpoint: valid category shows name; invalid ID shows fallback.

## 64–79 min — Step 2.5: Product type and data
Create src/data/products.ts:
~~~tsx
export type Product = {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  quantity: string;
  image: string;
};
export const products: Product[] = [
  {
    id: 'p1', categoryId: '1', name: 'Fresh Milk', price: 32,
    quantity: '500 ml',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
  },
  {
    id: 'p2', categoryId: '1', name: 'Butter', price: 60,
    quantity: '100 g',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400',
  },
];
~~~
Extend from prep products.ts to six categories and twelve products. Explain Product[], categoryId linking existing category.id, number price for calculations, quantity is packaging text (not cart quantity), and compile-time vs runtime type checking.
Checkpoint: data compiles even though no product card is yet displayed.

## 79–95 min — Step 2.6: Reusable ProductCard
Create src/components/ProductCard.tsx. Initial teaching version:
~~~tsx
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import type { Product } from '@/data/products';
type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};
export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text numberOfLines={2}>{product.name}</Text>
      <Text>{product.quantity}</Text>
      <Text>₹{product.price}</Text>
      <Pressable onPress={() => onAdd(product)}>
        <Text>ADD</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { flex: 1, padding: 12 },
  image: { width: '100%', aspectRatio: 1 },
});
~~~
Expand with styles from final component: imageContainer, border/radius, typography, price/add bottom row with space-between, green button, accessible labels.
Explain import type, typed props, function returning void, destructuring, Image source object, aspectRatio, onPress callback closure and why it must not execute during rendering.
Checkpoint: component type-checks; it is not visible yet.

## 95–113 min — Step 2.7: Filter + two-column FlatList
CategoryScreen imports ProductCard, products, Product, Alert, FlatList. Define:
~~~tsx
const categoryProducts = products.filter(product => product.categoryId === id);
const handleAdd = (product: Product) => {
  Alert.alert('Coming soon', 'Cart functionality for ' + product.name + ' is coming next!');
};
~~~
For VALID category:
~~~tsx
<FlatList
  data={categoryProducts}
  keyExtractor={item => item.id}
  numColumns={2}
  columnWrapperStyle={styles.row}
  contentContainerStyle={styles.listContent}
  ListHeaderComponent={
    <View style={styles.header}>
      <Text style={styles.heading}>{category.name}</Text>
      <Text>{categoryProducts.length} products available</Text>
    </View>
  }
  renderItem={({ item }) => (
    <View style={styles.productWrapper}>
      <ProductCard product={item} onAdd={handleAdd} />
    </View>
  )}
  ListEmptyComponent={<Text>No products available in this category yet.</Text>}
/>
~~~
Use styles row:{gap:12,marginBottom:12}, productWrapper:{flex:1}, listContent:{paddingHorizontal:16,paddingTop:20,paddingBottom:24}; use SafeAreaView edges bottom/left/right because Stack header provides top inset. Render separate Category not found view when category itself is invalid.

Explain find vs filter, array immutability, FlatList windowed rendering vs ScrollView+map, data and renderItem, destructured item, stable keyExtractor id vs index, two-column layout, ListHeaderComponent, ListEmptyComponent. ADD is explicitly a placeholder Alert; no actual cart.
Checkpoint: Dairy shows Milk/Butter, Fruits shows Apples/Bananas, all six categories work, Back works.

## 113–120 min — Test and wrap up
Run:
~~~bash
npm install
npx tsc --noEmit
npx expo start -c
~~~
Manual regression: tab switching, Home search and clear, dynamic route titles, correct product filtering, each ADD button Alert, valid empty category (temporarily zero products), invalid /category/999. On web, Alert behavior may differ; test native separately.
Ask: What is difference between (tabs) and [id]? Why find category but filter products? How does parent callback reach child? Why keyExtractor? What makes FlatList preferable for long lists?

**Assignments from only these two classes:** A1 static CampusStore shell; A2 controlled search + reusable categories; A3 navigation; A4 typed product cards; A5 FlatList final browsing app. Same repository throughout. Do NOT require Context, Redux, cart state, AsyncStorage, APIs, authentication, backend, payments or other untaught topics.

**Important:** partial code blocks here are staged exercises; they are not complete replacements for final files. Current prep repository files have the complete styles and edge-case handling.
