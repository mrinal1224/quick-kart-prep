# QuickKart — Class 1: React Native Fundamentals & Our First Grocery Home Screen

> **Student handbook · Beginner-friendly · Build step by step**  
> **Project:** QuickKart (a quick-commerce grocery app inspired by the *experience* of Blinkit and Zepto)  
> **Stack:** React Native · Expo · Expo Router · TypeScript · `StyleSheet`  


**How to use these notes:** Read one stage, type its code, run it, observe the output, and only then move forward. The complete final code is at the end, but **do not begin by copying the finished app**. The illustrations show the intended layout, not emulator screenshots. The real app uses emoji icons and remote photographs, so the exact appearance may differ slightly.

## Learning outcomes

By the end of Class 1, you should be able to:

- Explain React Native and Expo and how they differ from React for the browser.
- Create a screen with `View`, `Text`, `SafeAreaView`, and `StyleSheet`.
- Arrange content with Flexbox (`flexDirection`, `justifyContent`, `alignItems`, `flex`, and `flexWrap`).
- Create a controlled `TextInput` using `useState`.
- Show/hide UI with conditional rendering and handle taps with `Pressable`.
- Store categories in an array and render them with `.map()`.
- Load images and build a reusable `CategoryCard` using props and callback functions.
- Explain the **TypeScript actually used**: annotations, inference, type aliases, typed arrays, typed props, callback types, `void`, `import type`, generics, and unions.
- Commit completed features to Git.

## Contents

1. [Understanding our app and technology](#1-understanding-our-app-and-technology)
2. [Project setup and folder structure](#2-project-setup-and-folder-structure)
3. [React Native component fundamentals](#3-react-native-component-fundamentals)
4. [Step 1: Delivery header](#4-step-1-delivery-header)
5. [Step 2: Controlled search bar](#5-step-2-controlled-search-bar)
6. [Step 3: Data-driven grocery categories](#6-step-3-data-driven-grocery-categories)
7. [Step 4: Reusable CategoryCard with props](#7-step-4-reusable-categorycard-with-props)
8. [Step 5: Add categories to HomeScreen](#8-step-5-add-categories-to-homescreen)
9. [TypeScript, explained from zero](#9-typescript-explained-from-zero)
10. [Complete final project code](#10-complete-final-project-code)
11. [Errors and debugging](#11-errors-and-debugging)
12. [Exercises, assessment and viva](#12-exercises-assessment-and-viva)
13. [Class 1 recap](#13-class-1-recap)

---

## 1. Understanding our app and technology

### 1.1 What is QuickKart?

QuickKart is the grocery-delivery app we will build throughout the mobile development course. In **Class 1** we only implement the homepage foundation: delivery information, search input, and category cards. **No authentication, cart, checkout, backend APIs, or product filtering yet.** The delivery time shown is static sample text, not a real ETA.

### 1.2 React vs React Native

React is a library for composing user interfaces using components, props, state and hooks. In a web app, React typically renders DOM elements such as `<div>`, `<p>` and `<input>`. In React Native, we describe our interface using React Native components that map to native platform UI.

**React (web):**

```jsx
function App() {
  return (
    <div>
      <h1>Welcome</h1>
      <input placeholder="Search" />
      <button onClick={() => alert('Clicked')}>Go</button>
    </div>
  );
}
```

**React Native:**

```tsx
import { View, Text, TextInput, Pressable } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>Welcome</Text>
      <TextInput placeholder="Search" />
      <Pressable onPress={() => console.log('Pressed')}>
        <Text>Go</Text>
      </Pressable>
    </View>
  );
}
```

| Browser React | React Native | What it does |
|---|---|---|
| `<div>` | `<View>` | Container/layout |
| `<h1>`, `<p>`, `<span>` | `<Text>` | Text |
| `<img>` | `<Image>` | Image |
| `<input>` | `<TextInput>` | User input |
| `<button>` | `<Button>` or `<Pressable>` | User action |
| `onClick` | `onPress` | User interaction |
| CSS | `StyleSheet` / style objects | Styling |

**Important:** React Native is *not* HTML inside a mobile WebView. It uses native rendering for its native platforms. You still get familiar React concepts: components, state, props, hooks and conditional rendering.

### 1.3 Why choose React Native? Why not Flutter or separate iOS/Android apps?

- **React Native:** lets a team familiar with React/JavaScript build mobile interfaces using shared code and native functionality.
- **Flutter:** is also cross-platform, but generally uses Dart and Flutter's own widget-rendering model.
- **Native Android/iOS:** Kotlin/Java and Swift give platform-specific development options and may make sense for deep platform-specific requirements.

Our choice is **educational**: students already know React, so React Native is a natural bridge from web to mobile. No framework is universally best.

### 1.4 What is Expo?

Expo is a framework and tooling ecosystem around React Native. It provides project creation, a development server, SDK modules and build workflows. React Native is the app framework; Expo simplifies working with it. We use **Expo Router** for file-based navigation.

---

## 2. Project setup and folder structure

### 2.1 Setup commands

Our project has already been initialized and pushed, but here is how we got started:

```bash
npx create-expo-app@latest quick-kart --template default
cd quick-kart
npx expo start
```

- `npx`: runs a package's command without needing a global CLI installation.
- `create-expo-app`: scaffolds a new Expo project.
- `--template default`: selects the default starter template.
- `npx expo start`: starts the development server.

A mobile app may run in an Android emulator, iOS simulator, or on a compatible physical device. Expo's default template changes between SDK versions; always inspect the files actually generated.

### 2.2 The relevant project structure

```text
quick-kart/
├── assets/
├── src/
│   ├── app/
│   │   ├── _layout.tsx        # Existing Expo Router navigation layout
│   │   ├── index.tsx          # QuickKart home screen
│   │   └── explore.tsx        # Existing template screen
│   ├── components/
│   │   └── CategoryCard.tsx   # We create this in Class 1
│   └── data/
│       └── categories.ts     # We create this in Class 1
├── package.json
├── app.json
└── tsconfig.json
```

**Why these locations?** `src/app` is reserved for Expo Router screens. Reusable components belong outside it (`src/components`). Data can live in `src/data`. The existing `_layout.tsx` already configures tabs; **we do not change it in this class**.

### 2.3 `.tsx` vs `.ts`

- `.ts` → TypeScript file without JSX. Example: `categories.ts`.
- `.tsx` → TypeScript file containing JSX. Example: `index.tsx` and `CategoryCard.tsx`.
- `.jsx` → JavaScript with JSX, but without TypeScript checking.

### 2.4 Why StyleSheet, not Tailwind or shadcn?

We're learning the native layout primitives first. `StyleSheet.create()` makes Flexbox, spacing, sizing, color and component structure explicit. Once these foundations are clear, a utility styling framework can be evaluated separately. **A polished UI does not require a third-party styling library.**

---

## 3. React Native component fundamentals

### 3.1 `View`: a container

```tsx
import { View, Text } from 'react-native';

<View>
  <Text>QuickKart</Text>
  <Text>Delivery in 10 minutes</Text>
</View>
```

A `View` groups child components and provides a layout surface. Views can be nested: a header View may contain a row View, which contains a branding View and a profile View.

### 3.2 `Text`: display text

```tsx
<Text>Home</Text>
```

Raw text should be wrapped in `Text` instead of placed directly inside `View`:

```tsx
// ❌ Incorrect for React Native
<View>Hello</View>

// ✅ Correct
<View><Text>Hello</Text></View>
```

We use the local alias `RNText` in our app:

```tsx
import { Text as RNText } from 'react-native';
```

That simply renames the imported component in the file. It is useful for clarity after encountering an earlier name-resolution error involving the DOM `Text` constructor. The regular import `Text` is perfectly valid.

### 3.3 `SafeAreaView`: protect content from system UI

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView style={{ flex: 1 }}>
  <RNText>Safe content</RNText>
</SafeAreaView>
```

Modern devices have notches, status bars, rounded edges and gesture areas. A safe-area container helps keep content inside an appropriate visible region. Use the version from **`react-native-safe-area-context`** in this project.

### 3.4 `StyleSheet.create`: styling with JavaScript objects

**Web CSS:**

```css
.header { background-color: yellow; font-size: 20px; }
```

**React Native:**

```tsx
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'yellow',
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
});
```

Use camelCase (`backgroundColor` instead of `background-color`). Numeric dimensions are generally *density-independent units* rather than CSS `px` strings.

### 3.5 Flexbox: the mental model

React Native uses Flexbox, and its default `flexDirection` is **`column`**, unlike the familiar default row direction of many web flex layouts.

```tsx
row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
```

- `flexDirection: 'row'` → children are side by side.
- `flexDirection: 'column'` → children stack vertically.
- `justifyContent` → distributes items along the **main axis**.
- `alignItems` → positions items along the **cross axis**.
- `flex: 1` → allows an element to grow to use available space in its parent flex layout.
- `flexWrap: 'wrap'` → allows row items to continue onto the next row.

**Think:** For a horizontal top row, `space-between` puts branding on one side and the profile icon on the other. `alignItems: 'center'` centers them vertically.

---

## 4. Step 1: Delivery header

**Goal:** Build the yellow QuickKart header, delivery time, profile icon and address. It is intentionally static in Class 1.

### Expected output — Stage 1

![Step 1: Delivery header UI](./images/quickkart_class1_step1.png)

> **Illustrative UI mockup:** actual OS status bars, emoji glyphs, and native tabs may look different.

### 4.1 Break the UI into boxes

```text
SafeAreaView
└── Header View (yellow)
    ├── Top Row (horizontal)
    │   ├── Branding View
    │   │   ├── QUICKKART
    │   │   └── Delivery in 10 minutes
    │   └── Profile circle
    └── Location Row (horizontal)
        ├── 📍
        └── Location text View
            ├── Home ▼
            └── Electronic City, Bengaluru
```

### 4.2 First write the top row

```tsx
<View style={styles.topRow}>
  <View style={styles.brandContainer}>
    <RNText style={styles.brand}>QUICKKART</RNText>
    <RNText style={styles.deliveryTime}>Delivery in 10 minutes</RNText>
  </View>

  <View style={styles.profileIcon}>
    <RNText style={styles.profileEmoji}>👤</RNText>
  </View>
</View>
```

**Why nested Views?** The two text lines should stack together, while the entire branding block should sit horizontally beside the profile circle.

### 4.3 Add the location row

```tsx
<View style={styles.locationRow}>
  <RNText style={styles.locationIcon}>📍</RNText>
  <View style={styles.locationDetails}>
    <RNText style={styles.locationTitle}>Home ▼</RNText>
    <RNText style={styles.address}>Electronic City, Bengaluru</RNText>
  </View>
</View>
```

### 4.4 Apply styles

```tsx
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
brandContainer: { flex: 1 },
profileIcon: {
  width: 45,
  height: 45,
  borderRadius: 25,
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
},
locationRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 18,
},
```

**Why does the profile look circular?** It has equal width and height, with `borderRadius` at least half the side length. **Why no fixed header height?** Its content and padding determine the natural height.

### Checkpoint exercise

Change the yellow header to green, make the delivery text say **8 minutes**, and increase the profile circle to `60 × 60`. Observe which parts adjust naturally.

### Git checkpoint

```bash
git add src/app/index.tsx
git commit -m "feat: build QuickKart delivery header"
```

---

## 5. Step 2: Controlled search bar

**Goal:** Display a search box under the header. Typing should update React state, and the clear button should appear only when there is text. **This step does not search actual products yet.**

### Expected output — Stage 2

![Step 2: Delivery header and search bar](./images/quickkart_class1_step2.png)

### 5.1 Start with a TextInput

```tsx
import { TextInput } from 'react-native';

<TextInput
  placeholder="Search for milk, bread, fruits..."
  placeholderTextColor="#9CA3AF"
/>
```

`TextInput` opens the mobile text-input system. `placeholder` is the hint shown when the field is empty. `placeholderTextColor` changes the hint's appearance.

### 5.2 Put an icon next to the field

```tsx
<View style={styles.searchContainer}>
  <RNText style={styles.searchIcon}>🔍</RNText>
  <TextInput
    style={styles.searchInput}
    placeholder="Search for milk, bread, fruits..."
  />
</View>
```

Style the parent as a row, and give the input `flex: 1` so it fills the space that remains after the icon.

### 5.3 What is component state?

State is information React remembers between renders. User-typed search text is a perfect example because it changes as the user types.

```tsx
import React, { useState } from 'react';

const [searchQuery, setSearchQuery] = useState('');
```

Read it as: **`searchQuery` holds the current string, `setSearchQuery` updates it, and `''` is its initial value.**

### 5.4 Make the TextInput controlled

```tsx
<TextInput
  style={styles.searchInput}
  value={searchQuery}
  onChangeText={setSearchQuery}
  placeholder="Search for milk, bread, fruits..."
/>
```

Data flow:

```text
User types "milk"
      ↓
onChangeText receives "milk"
      ↓
setSearchQuery("milk")
      ↓
React renders the updated state
      ↓
TextInput displays "milk"
```

**Web comparison:** React web commonly uses `onChange={e => setValue(e.target.value)}`. In React Native, `onChangeText` provides the string directly.

### 5.5 Add a conditional clear button

```tsx
const clearSearch = () => {
  setSearchQuery('');
};
```

```tsx
{searchQuery.length > 0 && (
  <Pressable onPress={clearSearch}>
    <RNText>✕</RNText>
  </Pressable>
)}
```

The expression `{condition && <Component />}` renders that component only if the condition is truthy. When text is cleared, the button disappears. **We change state; React updates the UI.**

### 5.6 Useful input properties

```tsx
<TextInput
  value={searchQuery}
  onChangeText={setSearchQuery}
  autoCorrect={false}
  autoCapitalize="none"
  returnKeyType="search"
  onSubmitEditing={() => Keyboard.dismiss()}
  accessibilityLabel="Search products"
/>
```

- `autoCorrect={false}` → avoids correcting unusual product names.
- `autoCapitalize="none"` → avoids automatic capitalization.
- `returnKeyType="search"` → requests a Search action on the keyboard, where supported.
- `onSubmitEditing` → called when the keyboard submission action is triggered; here it dismisses the keyboard.
- `accessibilityLabel` → provides a description for assistive technologies.

### 5.7 Display a live preview

```tsx
{searchQuery.trim().length > 0 && (
  <RNText style={styles.searchPreview}>
    Searching for: {searchQuery}
  </RNText>
)}
```

This is **not actual filtering**. It is a quick demonstration that the value from `TextInput` has reached React state.

### Checkpoint exercise

Display `You typed 4 characters` when the user enters `milk`. Hint: `searchQuery.length`.

### Git checkpoint

```bash
git add src/app/index.tsx
git commit -m "feat: add controlled product search bar"
```

---

## 6. Step 3: Data-driven grocery categories

**Goal:** Create the grocery category section without repeating nearly identical JSX six times.

### Expected output — Stage 3

![Step 3: Grocery categories](./images/quickkart_class1_step3.png)

### 6.1 Why data-driven rendering?

Bad approach: copy and paste separate UI blocks for Dairy, Fruits, Vegetables, Bakery, Snacks and Beverages. A change to the card design then requires six edits.

Better approach: **store data in an array and render one reusable card per object**.

```ts
const categories = [
  { id: '1', name: 'Dairy' },
  { id: '2', name: 'Fruits' },
  { id: '3', name: 'Vegetables' },
];
```

### 6.2 Introduce a TypeScript blueprint

Create **`src/data/categories.ts`**:

```ts
export type Category = {
  id: string;
  name: string;
  image: string;
};
```

This says every Category object has an `id`, `name`, and `image`, each a string. `type` is a description used by TypeScript; it isn't a runtime class or object.

### 6.3 Create the array

```ts
export const categories: Category[] = [
  { id: '1', name: 'Dairy', image: 'https://example.com/milk.jpg' },
  { id: '2', name: 'Fruits', image: 'https://example.com/fruits.jpg' },
];
```

`Category[]` means **an array of objects matching the Category type**. The URLs above are explanatory placeholders; the complete code below uses concrete Unsplash URLs.

### 6.4 Render the data with `.map()`

```tsx
{categories.map((category) => (
  <RNText key={category.id}>{category.name}</RNText>
))}
```

For each object, the callback returns a JSX element. React renders those elements. `key={category.id}` gives each sibling a stable identifier. Put the key on the outermost element returned by `map()`.

### 6.5 Why not use the array index as key?

If items are inserted, removed or reordered, indices can refer to different items on subsequent renders. A stable database/category ID is safer.

### Checkpoint exercise

Add `Personal Care` as the seventh category. Later, after the grid is built, it should wrap onto the next row without requiring you to duplicate the card layout.

---

## 7. Step 4: Reusable CategoryCard with props

**Goal:** Teach React component composition, typed props, images, and press callbacks.

Create **`src/components/CategoryCard.tsx`**.

### 7.1 Begin with a simple component

```tsx
function CategoryCard() {
  return <RNText>Dairy</RNText>;
}
```

This renders the same text every time. To reuse it for different categories, we need **props**.

### 7.2 Understand props in JavaScript terms

A JavaScript function receives arguments:

```js
function greet(name) {
  return `Hello ${name}`;
}
```

A React component receives a `props` object:

```tsx
function CategoryCard({ category }: { category: Category }) {
  return <RNText>{category.name}</RNText>;
}
```

The parent can pass a different `category` object each time, while the component's structure stays the same.

### 7.3 Type the props

```tsx
type CategoryCardProps = {
  category: Category;
  onPress: (category: Category) => void;
};
```

**Read the second line carefully:** `onPress` must be a function that receives one `Category` object and doesn't provide a meaningful result to the caller. The syntax describes a **function type**, not a function body.

### 7.4 Destructure typed props

```tsx
export default function CategoryCard({
  category,
  onPress,
}: CategoryCardProps) {
  // component JSX
}
```

This is equivalent to receiving `props.category` and `props.onPress`, but cleaner. The `: CategoryCardProps` annotation tells TypeScript what shape the props object must have.

### 7.5 Display an image

```tsx
<Image
  source={{ uri: category.image }}
  style={styles.image}
  resizeMode="cover"
  accessibilityLabel={category.name}
/>
```

- `source={{ uri: ... }}` → loads a remote image.
- Remote images need valid layout dimensions; we place ours inside a square container.
- `resizeMode="cover"` → fills the image rectangle while maintaining aspect ratio, cropping if necessary.
- `accessibilityLabel` → helps describe the image to assistive technologies.

Use a parent with:

```tsx
imageContainer: {
  width: '100%',
  aspectRatio: 1,
  overflow: 'hidden',
  borderRadius: 14,
}
```

`aspectRatio: 1` means width equals height. `overflow: 'hidden'` clips the image to the rounded parent.

### 7.6 Make the whole card interactive

```tsx
<Pressable onPress={() => onPress(category)}>
  {/* image and name */}
</Pressable>
```

The arrow function is important: we want to call the parent callback **when the user presses**, not during rendering. It passes the specific clicked category as the argument.

### 7.7 Parent-child interaction flow

```text
HomeScreen supplies category data and onPress callback
                        ↓
CategoryCard displays the name and image
                        ↓
User taps the card
                        ↓
CategoryCard calls onPress(category)
                        ↓
HomeScreen receives the selected category
                        ↓
HomeScreen displays a temporary alert
```

This is a fundamental React pattern: **props move data down; callbacks report interactions up**.

---

## 8. Step 5: Add categories to HomeScreen

### Expected final Class 1 screen

![Step 4: Complete home screen reference](./images/quickkart_class1_step4.png)

> This is a **design mockup**, not a literal output of our code. Our implementation uses remote photo images, emoji icons, and the native tabs already configured by the Expo template. Extra decorative copy in the mockup is not implemented in Class 1.

### 8.1 Import data and component

```tsx
import CategoryCard from '@/components/CategoryCard';
import { categories, type Category } from '@/data/categories';
```

The `@/` alias points at our configured source alias in the project. `type Category` imports the type information only; `categories` is the actual runtime array.

### 8.2 Handle a category press

```tsx
const handleCategoryPress = (category: Category) => {
  Alert.alert(
    category.name,
    `${category.name} products coming soon!`
  );
};
```

TypeScript knows `category.name` is a string. The alert is temporary. We will add real category navigation/filtering in a future class.

### 8.3 Build a three-column grid

```tsx
<View style={styles.categoryGrid}>
  {categories.map((category) => (
    <View key={category.id} style={styles.categoryWrapper}>
      <CategoryCard
        category={category}
        onPress={handleCategoryPress}
      />
    </View>
  ))}
</View>
```

```tsx
categoryGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  rowGap: 20,
},
categoryWrapper: {
  width: '33.3333%',
  paddingHorizontal: 6,
},
```

Why `33.3333%`? One card wrapper takes about a third of a row, so three fit side by side. With `flexWrap: 'wrap'`, a fourth card moves to the next row. Padding inside wrappers creates space without making each wrapper wider than its allocated third.

### 8.4 Why add ScrollView?

More content needs scrolling. A `ScrollView` is suitable for our **small** list of categories:

```tsx
<ScrollView
  style={styles.scrollView}
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
  keyboardShouldPersistTaps="handled"
>
  {/* category section */}
</ScrollView>
```

- `style` styles the scroll viewport.
- `contentContainerStyle` styles its content wrapper.
- `showsVerticalScrollIndicator={false}` hides the visual scrollbar.
- `keyboardShouldPersistTaps="handled"` allows taps on handled controls while the keyboard is open.

**Why not FlatList yet?** `ScrollView` eagerly creates its children. When we get to a large product catalogue in Class 2, we will use `FlatList`, which supports efficient virtualization.

### Checkpoint exercise

Change the grid to **two columns** by changing each wrapper width to `50%`. Then change it back to `33.3333%`.

### Git checkpoint

```bash
git add src/app/index.tsx src/components/CategoryCard.tsx src/data/categories.ts
git commit -m "feat: add reusable grocery category grid"
```

---

## 9. TypeScript, explained from zero

> **Read this after building the feature once.** TypeScript looks intimidating mostly because its notation is unfamiliar. Let's translate every part back to JavaScript you already know.

### 9.1 What does TypeScript do?

JavaScript allows a variable to hold different types:

```js
let price = 100;
price = 'one hundred'; // valid JS, potentially wrong for cart maths
```

TypeScript lets us describe intended types:

```ts
let price: number = 100;
price = 'one hundred'; // ❌ type error
```

**Types are checked during development, not at runtime.** They do not make an API trustworthy or automatically validate JSON.

### 9.2 Basic types

```ts
let productName: string = 'Milk';
let price: number = 60;
let inStock: boolean = true;
```

| Notation | Meaning | Example |
|---|---|---|
| `string` | text | `'Dairy'` |
| `number` | numeric value | `60` |
| `boolean` | true or false | `true` |
| `null` | no value | `null` |

### 9.3 Type annotations vs inference

```ts
let city: string = 'Bengaluru';  // explicit
let quantity = 5;               // inferred number
```

TypeScript understands that `quantity` is a number from its initial value. We do **not** need to annotate every simple variable.

### 9.4 Type aliases: an object blueprint

```ts
type Category = {
  id: string;
  name: string;
  image: string;
};
```

This is a **shape**, not an object we instantiate. A valid value:

```ts
const item: Category = {
  id: '1',
  name: 'Dairy',
  image: 'milk.jpg',
};
```

Invalid example:

```ts
const item: Category = {
  id: 1, // ❌ expected string
  name: 'Dairy',
  image: 'milk.jpg',
};
```

### 9.5 Typed arrays

```ts
const names: string[] = ['Dairy', 'Fruits'];
const prices: number[] = [50, 90];
const categories: Category[] = [
  { id: '1', name: 'Dairy', image: 'milk.jpg' },
];
```

Read `Category[]` as “array of Category objects.” `Array<Category>` is another equivalent notation.

### 9.6 What does `export` do?

```ts
export type Category = { id: string; name: string; image: string };
export const categories: Category[] = [];
```

- `Category` is a **type**, used by the type checker.
- `categories` is a real **JavaScript array** available at runtime.
- `export` makes each available to other modules.

### 9.7 Why `import type`?

```tsx
import type { Category } from '@/data/categories';
```

It explicitly imports the type for checking and is removed from generated JavaScript. Compare:

```tsx
import { categories } from '@/data/categories';
```

This imports a value needed at runtime.

### 9.8 Props typing

```ts
type CategoryCardProps = {
  category: Category;
  onPress: (category: Category) => void;
};
```

- `category: Category` → the child receives a Category object.
- `onPress: ...` → the child receives a function.
- `(category: Category)` → that function takes a Category argument.
- `=> void` → no meaningful return value is expected from the callback.

**Crucial distinction:**

```ts
// Function TYPE: describes what function is allowed
type Handler = (name: string) => void;

// Function IMPLEMENTATION: code that actually runs
const printName = (name: string) => {
  console.log(name);
};
```

### 9.9 Typed destructuring

```tsx
function CategoryCard({ category, onPress }: CategoryCardProps) {
  // ...
}
```

JavaScript part: `{ category, onPress }` destructures a props object. TypeScript part: `: CategoryCardProps` describes that object's required shape.

Longer equivalent idea:

```tsx
function CategoryCard(props: CategoryCardProps) {
  const category = props.category;
  const onPress = props.onPress;
}
```

### 9.10 Generics and `useState`

```tsx
const [searchQuery, setSearchQuery] = useState('');
```

TypeScript infers `string` from `''`. We could be explicit:

```tsx
const [searchQuery, setSearchQuery] = useState<string>('');
const [count, setCount] = useState<number>(0);
const [isLoading, setIsLoading] = useState<boolean>(false);
```

`<string>` is a **generic type argument**. It tells a generic function what value type to work with.

### 9.11 Union types

Later, we may want an optional selected category:

```tsx
const [selectedCategory, setSelectedCategory] =
  useState<Category | null>(null);
```

`Category | null` means the state can hold a Category object **or** `null`. Use unions when a value genuinely has multiple possible types/states.

### 9.12 Common TypeScript errors to understand

```ts
category.price; // ❌ Property 'price' does not exist on Category
```

This is helpful: the Category model contains `id`, `name`, and `image` only. Do not blindly add `price` unless it belongs in the model. Later our Product model will have its own price field.

### 9.13 Tiny guided TypeScript exercise

1. Define a `Product` type containing `id: string`, `name: string`, `price: number`, and `inStock: boolean`.
2. Create one valid product object.
3. Change `price` to `'sixty'` and observe the error.
4. Create `Product[]` with two products.
5. Write `function showProduct(product: Product): void { console.log(product.name); }`.

**Possible solution:**

```ts
type Product = {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
};

const products: Product[] = [
  { id: 'p1', name: 'Milk', price: 60, inStock: true },
  { id: 'p2', name: 'Bread', price: 45, inStock: false },
];

function showProduct(product: Product): void {
  console.log(product.name);
}

showProduct(products[0]);
```

---

## 10. Complete final project code

> **Reference solution:** These are the three complete files for the end of Class 1. Use them for debugging/revision **after** implementing the intermediate steps.

### File A — `src/data/categories.ts`

```ts
export type Category = {
  id: string;
  name: string;
  image: string;
};

export const categories: Category[] = [
  {
    id: '1',
    name: 'Dairy',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300',
  },
  {
    id: '2',
    name: 'Fruits',
    image:
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300',
  },
  {
    id: '3',
    name: 'Vegetables',
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300',
  },
  {
    id: '4',
    name: 'Bakery',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',
  },
  {
    id: '5',
    name: 'Snacks',
    image:
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300',
  },
  {
    id: '6',
    name: 'Beverages',
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300',
  },
];
```

### File B — `src/components/CategoryCard.tsx`

```tsx
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
```

### File C — `src/app/index.tsx`

```tsx
import React, { useState } from 'react';
import {
  View,
  Text as RNText,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from '@/components/CategoryCard';
import { categories, type Category } from '@/data/categories';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleCategoryPress = (category: Category) => {
    Alert.alert(category.name, `${category.name} products coming soon!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* DELIVERY HEADER */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View style={styles.brandContainer}>
            <RNText style={styles.brand}>QUICKKART</RNText>
            <RNText style={styles.deliveryTime}>
              Delivery in 10 minutes
            </RNText>
          </View>
          <View style={styles.profileIcon}>
            <RNText style={styles.profileEmoji}>👤</RNText>
          </View>
        </View>

        <View style={styles.locationRow}>
          <RNText style={styles.locationIcon}>📍</RNText>
          <View style={styles.locationDetails}>
            <RNText style={styles.locationTitle}>Home ▼</RNText>
            <RNText style={styles.address}>
              Electronic City, Bengaluru
            </RNText>
          </View>
        </View>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <RNText style={styles.searchIcon}>🔍</RNText>
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
              <RNText style={styles.clearText}>✕</RNText>
            </Pressable>
          )}
        </View>
        {searchQuery.trim().length > 0 && (
          <RNText style={styles.searchPreview}>
            Searching for: {searchQuery}
          </RNText>
        )}
      </View>

      {/* SCROLLABLE CATEGORY SECTION */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
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
```

### End-to-end runtime flow

```text
App opens → HomeScreen renders
    ├── Delivery header displays static sample information
    ├── searchQuery initializes to ''
    ├── TextInput reads and updates searchQuery
    └── categories array is mapped to CategoryCard components
            ├── Each card gets typed category props
            ├── Each card renders image and name
            └── Press calls HomeScreen's callback → Alert
```

---

## 11. Errors and debugging

### 11.1 `Failed to construct 'Text'`

This error can occur when a DOM `Text` constructor is resolved instead of the React Native `Text` component. Check the import:

```tsx
import { Text } from 'react-native';
// or the explicit alias:
import { Text as RNText } from 'react-native';
```

If the import is already correct, examine name shadowing, auto-imports, module resolution and configuration. The alias alone is a diagnostic aid, **not a guaranteed fix**.

### 11.2 Image is invisible

Check the remote URL, network access, supported format and dimensions. A `uri` source without layout size can produce an invisible image. In our card, the parent is square and the image fills that space.

### 11.3 `Property 'price' does not exist on type 'Category'`

Our category type only has `id`, `name` and `image`. `price` belongs to a future `Product` model, not automatically to Category.

### 11.4 `Each child in a list should have a unique "key" prop`

Put a stable `key={category.id}` on the outermost element returned by `.map()`.

### 11.5 Import path not found

Confirm that:

```text
src/data/categories.ts
src/components/CategoryCard.tsx
```

exist, the file names match capitalization, and the `@/` alias is configured in the project's TypeScript/Expo setup.

### 11.6 Useful commands

```bash
npx expo start
npx expo start --clear
npx tsc --noEmit
npx expo lint
npx expo-doctor
```

Use `--clear` to reset Metro's transformation cache if stale bundling causes confusing behavior. Type checking and linting help, but **always test on a device or simulator as well**.

---

## 12. Exercises, assessment and viva

### 12.1 Hands-on practice

1. **Delivery header:** change the header color, delivery time and address. Explain `flexDirection` and `space-between`.
2. **Search:** display `You typed N characters` below the controlled field. Explain `onChangeText`.
3. **Conditional UI:** make the clear button disappear when the field is empty. Explain the `&&` expression.
4. **Category data:** add `Personal Care` without modifying `CategoryCard.tsx`.
5. **Flexbox:** switch from three categories per row to two. Explain the percentage widths.
6. **Typed props:** create a `Product` type and a tiny product component that receives a typed product object.

### 12.2 Think-before-you-code questions

**Q. Why can't raw text appear directly inside View?**  
A. In native React Native rendering, text must normally be inside the `Text` component.

**Q. Why is `TextInput` considered controlled here?**  
A. Its `value` is set from React state and `onChangeText` updates that state.

**Q. What does `flex: 1` do on the search input?**  
A. In its horizontal flex parent, it lets the input take remaining space after the icon and clear button.

**Q. Why use `.map()`?**  
A. It creates repeated UI from an array while keeping the rendering structure in one place.

**Q. Why does a card receive an `onPress` prop?**  
A. The child reports an interaction; the parent decides what action to perform.

**Q. Why use `Category[]`?**  
A. It states every element of the array must satisfy the Category type.

**Q. What is `void`?**  
A. In our callback type, it indicates no meaningful return value is expected by the caller.

**Q. Does TypeScript validate network responses at runtime?**  
A. No. Runtime validation requires actual validation logic or a validation library.

**Q. Why not FlatList already?**  
A. Six categories are small. We'll introduce FlatList when larger product datasets make virtualization useful.

### 12.3 Mini assessment (suggested)

| Task | Marks |
|---|---:|
| Build and style delivery header | 20 |
| Implement controlled search + clear action | 25 |
| Type and render category data with `.map()` | 20 |
| Create reusable typed `CategoryCard` | 25 |
| Explain two concepts verbally | 10 |
| **Total** | **100** |

**Rubric reminder:** award understanding and correct behavior, not exact reproduction of every pixel in the mockup.

---

## 13. Class 1 recap

### What is complete?

- ✅ Expo project and Git workflow
- ✅ Delivery header using `View`, `Text`, Flexbox and `StyleSheet`
- ✅ Controlled search with `TextInput`, `useState`, clear button and live preview
- ✅ Category data in a typed array
- ✅ Category images
- ✅ Reusable, typed `CategoryCard`
- ✅ Categories rendered with `.map()` in a three-column grid
- ✅ `Pressable` category alerts
- ✅ `ScrollView` for the home content

### What is deliberately NOT complete?

- ⏳ Product search filtering
- ⏳ Product details and real product listings
- ⏳ Add-to-cart and quantity controls
- ⏳ Authentication and backend APIs
- ⏳ Checkout and orders

### The architecture students should remember

```text
QuickKart HomeScreen (index.tsx)
├── Delivery Header
├── Search Section
│   ├── searchQuery state
│   ├── TextInput
│   └── Conditional clear button
└── ScrollView
    └── Grocery Categories
        ├── categories.ts (data + type)
        └── CategoryCard.tsx (reusable presentation + callback)
```

> **The big lesson:** A React Native screen is not one giant block of UI. We compose it from containers, reusable components, data and state. TypeScript describes the contracts between these pieces. We use `StyleSheet` and Flexbox to control layout, and React state to make the interface respond to users.

**End of Class 1.** In Class 2, we can introduce a `Product` model, `FlatList`, product cards and add-to-cart interactions.

---

## Further reading

- [React Native — Core Components](https://reactnative.dev/docs/intro-react-native-components)
- [React Native — Flexbox](https://reactnative.dev/docs/flexbox)
- [React Native — TextInput](https://reactnative.dev/docs/textinput)
- [React Native — Pressable](https://reactnative.dev/docs/pressable)
- [React Native — Image](https://reactnative.dev/docs/image)
- [Expo documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)