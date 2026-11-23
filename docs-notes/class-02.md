# QuickKart — Class 2 Student Notes: Navigation, Product Models and FlatList

> **Read in order and type code in stages.** Class 1 foundation: docs-notes/class-01.md. Instructor delivery script: teaching-scripts/class-02.md. A1–A5 progressive CampusStore assignment brief: assignments/campusstore-five-class-project.md.

## Learning outcomes
After this class, explain root Stack vs NativeTabs, route groups, dynamic routes, router.push, useLocalSearchParams, find and filter, TypeScript Product and typed callback, Image, Pressable, FlatList and its essential props, and safe invalid/empty states.

## 1. What we are building
The Home category cards currently navigate to a new screen; clicking Dairy should load only Dairy items, clicking Fruits only Fruit items. One dynamic route handles all categories, and one ProductCard component handles all products.

Flow:
~~~text
HomeScreen
 └─ categories.map → CategoryCard onPress
      └─ Home handleCategoryPress → router.push /category/[id]
            └─ CategoryScreen
                 ├─ useLocalSearchParams → id
                 ├─ categories.find → one selected category
                 ├─ products.filter → matching Product[]
                 └─ FlatList → reusable ProductCard
~~~

## 2. Start and inspect project
~~~bash
git clone https://github.com/mrinal1224/React-Native-2028.git
cd React-Native-2028
npm install
npx expo start
~~~
If you already cloned the repo, run git pull origin main instead of cloning again. If a simulator shows cached content, stop and run npx expo start -c. For compile-time checks run npx tsc --noEmit.

**Caution:** classroom repo may have more/less code than prep repo depending on teaching progress. Do not overwrite class work with completed prep code without guidance.

## 3. Step 2.1 — Stack and Tabs

**Tabs** let users switch top-level Home/Explore. **Stack** lets a user open Category on top of the tab experience, then go back.

Folder plan:
~~~text
src/app/
  _layout.tsx           # root Stack
  (tabs)/
    _layout.tsx         # NativeTabs via AppTabs
    index.tsx           # Home route /
    explore.tsx         # Explore route /explore
  category/
    [id].tsx            # dynamic route /category/1
~~~

- Parentheses in (tabs) define a route group omitted from the URL.
- Square brackets in [id] represent a variable URL segment.
- Each _layout.tsx is a nested navigation/layout boundary.
- Root Stack.Screen with name "(tabs)" configures the tabs route group; headerShown:false prevents a redundant navigation header on our custom Home.
- Existing NativeTabs.Trigger name="index" / "explore" must match tab route names.

Root layout code:
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

Tabs layout:
~~~tsx
import AppTabs from '@/components/app-tabs';
export default function TabLayout() {
  return <AppTabs />;
}
~~~

Check: Home and Explore still switch; no duplicated header.

## 4. Step 2.2 — Dynamic route parameters

Create src/app/category/[id].tsx:
~~~tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text>Category Products</Text>
      <Text>Selected Category ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
~~~

- /category/1 yields id equal to string '1'.
- useLocalSearchParams reads route parameters; the generic describes expected TypeScript shape.
- TypeScript does not validate a real-world user URL at runtime.
- Add SafeAreaView from react-native-safe-area-context when building the final screen.

## 5. Step 2.3 — Programmatic navigation

In src/app/(tabs)/index.tsx, inside HomeScreen:
~~~tsx
import { useRouter } from 'expo-router';

// At top level of component:
const router = useRouter();

// Called when a category card is tapped:
const handleCategoryPress = (category: Category) => {
  router.push({
    pathname: '/category/[id]',
    params: { id: category.id },
  });
};
~~~
Keep existing:
~~~tsx
<CategoryCard category={category} onPress={handleCategoryPress} />
~~~
Within CategoryCard:
~~~tsx
<Pressable onPress={() => onPress(category)}>
~~~

The callback is not executed during render. It runs when pressed. useRouter is a Hook and belongs at the top of the component, not inside click handler. push keeps Back history; replace substitutes current route.

## 6. Step 2.4 — Find one category, handle invalid IDs

~~~tsx
import { categories } from '@/data/categories';
const category = categories.find(item => item.id === id);
~~~
- find returns first match or undefined, not an array.
- category?.name safely yields undefined when category is missing.
- category?.name ?? 'Category' supplies a fallback title.
- Conditional rendering protects against invalid route values.

~~~tsx
<Stack.Screen options={{ title: category?.name ?? 'Category' }} />
{category ? (
  <Text>{category.name}</Text>
) : (
  <Text>Category not found</Text>
)}
~~~
Test /category/999; the app must not crash.

## 7. Step 2.5 — Product model and category relationship

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
    id: 'p1',
    categoryId: '1',
    name: 'Fresh Milk',
    price: 32,
    quantity: '500 ml',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
  },
  {
    id: 'p2',
    categoryId: '1',
    name: 'Butter',
    price: 60,
    quantity: '100 g',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400',
  },
];
~~~
Add remaining ten products from the current implementation as practice. Product.id identifies one item, Product.categoryId links to existing Category.id. Store numeric price for calculations and render with the ₹ symbol in the UI. Quantity means package size, not cart count.

TypeScript basics:
- Product[] means array containing Product-shaped objects.
- A type annotation checks source at development time; it does not validate fetched JSON/route values at runtime.
- import type imports a type only, not a runtime value.
- Callback signature onAdd:(product:Product)=>void describes a function expecting a product argument.

## 8. Step 2.6 — Reusable ProductCard

Create src/components/ProductCard.tsx:
~~~tsx
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Product } from '@/data/products';

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
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
  card: { flex: 1, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 14 },
  image: { width: '100%', aspectRatio: 1 },
});
~~~

See full src/components/ProductCard.tsx for border, image wrapper, title, price row and button styling. A reusable component receives props and tells parent about a press via callback. It should not own the business logic.

Why write onPress={() => onAdd(product)} instead of onPress={onAdd(product)}? The former passes a function; the latter immediately invokes onAdd during render.

Image source={{uri:...}} has two nested brace roles: the outer JSX expression and inner JavaScript object. A remote Image needs resolvable dimensions; aspectRatio 1 provides a square at the computed width.

## 9. Step 2.7 — Filter and render with FlatList

Inside CategoryScreen:
~~~tsx
import { Alert, FlatList } from 'react-native';
import ProductCard from '@/components/ProductCard';
import { products, type Product } from '@/data/products';

const categoryProducts = products.filter(product => product.categoryId === id);

const handleAdd = (product: Product) => {
  Alert.alert('Coming soon', 'Cart functionality for ' + product.name + ' is coming next!');
};
~~~

filter returns an array of **every matching** product, unlike find which returns the **first** match. The original array is unchanged.

Only in the valid-category JSX branch:
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
  ListEmptyComponent={
    <Text>No products available in this category yet.</Text>
  }
/>
~~~
Styles to add:
~~~tsx
row: { gap: 12, marginBottom: 12 },
productWrapper: { flex: 1 },
listContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24 },
header: { marginBottom: 20 },
heading: { fontSize: 24, fontWeight: '700' },
~~~

Why FlatList? It uses windowed rendering and is more suitable for longer lists than mapping all children in ScrollView. data receives a list, renderItem receives an object containing item, keyExtractor returns a stable unique key, numColumns creates the grid, ListHeaderComponent renders heading in scroll content, ListEmptyComponent renders when the array is empty.

**Distinguish cases:**
1. Valid category and 2 products → list shows 2 cards.
2. Valid category and zero products → ListEmptyComponent.
3. Invalid category ID → "Category not found" (outside FlatList).

The ADD button only shows a placeholder alert. Working cart, quantity counter and persistence are not covered here.

## 10. Common mistakes and troubleshooting
| Symptom | Cause or check |
|---|---|
| Route not found | Check category/[id].tsx file and pathname |
| All categories show same products | Confirm filter compares product.categoryId === id |
| Category is undefined | Use categories.find and invalid fallback |
| Image blank | URL/network + style width/height/aspectRatio |
| ProductCard not visible | Confirm rendered in FlatList renderItem |
| Duplicate keys | Product IDs must be unique |
| Two-column spacing wrong | Review columnWrapperStyle, wrapper flex and card size |
| Type error on number | price must be number, not currency-formatted string |
| Native Alert not showing on web | Test iOS/Android and use native Alert for expected behavior |
| Metro stale | npx expo start -c |

## 11. Practice questions
1. What is the distinction between Stack and Tabs?
2. Why does (tabs) not appear in the route URL?
3. What string is id at /category/3?
4. Why must useRouter be called at component top level?
5. Difference between find and filter?
6. Difference between ?. and ???
7. Why is price numeric but quantity text?
8. What does ProductCardProps guarantee?
9. Why does renderItem destructure { item }?
10. What is the purpose of keyExtractor?
11. Why use FlatList rather than ScrollView + map for large datasets?
12. Why are "Category not found" and "No products available" separate states?

## 12. Class 2 milestone test checklist
- Home and Explore tabs switch.
- Search input still works.
- All six category cards navigate to the right category.
- Stack Back returns to Home.
- Category names and product counts match.
- Each category shows its own products in a two-column grid.
- ADD shows a product-specific placeholder alert.
- Valid empty category and invalid category ID display distinct messages.
- Type-check with npx tsc --noEmit.

## 13. Assignments — one project, five milestones
**Assignments 1 and 2** use only Class 1 concepts; **Assignments 3–5** use only Class 2 concepts, all in the **same CampusStore repository**. See assignments/campusstore-five-class-project.md for full deliverables, marks, acceptance tests and submission tags. No cart state, Context API, backend, API calls, database, AsyncStorage, authentication or payments.

## Further reading
- https://docs.expo.dev/router/introduction/
- https://docs.expo.dev/router/basics/layout/
- https://reactnative.dev/docs/flatlist
- https://reactnative.dev/docs/image
- https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
