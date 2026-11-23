# Class 1 — Instructor Teaching Script (120 minutes)

> **Audience:** React/JS-comfortable students beginning React Native. **Project built live:** QuickKart home screen.
> **Source of truth:** `docs-notes/class-01.md` (complete student handbook and final Class 1 code). **Prep implementation:** `src/app/(tabs)/index.tsx`, `src/components/CategoryCard.tsx`, `src/data/categories.ts`.
> **Important:** The current prep repo contains *Class 2* navigation and product listing already. Teach Class 1 from the student handbook and reconstruct its stages, not by showing today's completed app immediately.

## Before entering class

- Open simulator or Expo Go, VS Code, terminal and repository. Verify `node -v`, `npm install`, `npx expo start`.
- If starting from the latest repo, explain that later-class code exists; use a clean scaffold / saved Class 1 checkpoint for actual live coding. Do not pretend current `main` is a Class 1-only snapshot.
- Tell students the deliverable: a grocery home page with a delivery header, interactive controlled search box, and category grid.
- Reserve 10 minutes at the end for Assignment 1 (CampusStore), not another grocery POC.

## 0–10 min — Opening and mobile mental model

**Say:** "You already know React. Today the big change is not hooks: it's which components React renders and which platform runs them."

On board:

```txt
React Web: div / p / input / img → browser DOM
React Native: View / Text / TextInput / Image → native UI
Expo: development/build tooling around React Native
Expo Router: file-based screens and navigation
```

Ask: Why can we reuse `useState` but not web `<div>`? Explain that React logic is reusable; renderer and components differ. Compare RN vs Flutter/native without claiming any universal winner.

## 10–25 min — Setup and file structure

Live commands (if project is not already cloned):

```bash
git clone https://github.com/mrinal1224/React-Native-2028.git
cd React-Native-2028
npm install
npx expo start
```

For a fresh scaffold demo only: `npx create-expo-app@latest quick-kart --template default`. Do **not** run it inside an existing project.

Point out `src/app/index.tsx` in the original Class 1 scaffold versus `src/app/(tabs)/index.tsx` after Class 2 restructuring. Teach `.ts` for data, `.tsx` for JSX. Show `@/` alias referencing `src/` in this codebase.

**Check:** students launch simulator/physical device. If not, pair them with someone running Expo and continue on time.

## 25–43 min — Build the delivery header

Explain `SafeAreaView` from `react-native-safe-area-context`, `View`, `Text`, `StyleSheet.create`.

```tsx
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>QUICKKART</Text>
        <Text style={styles.delivery}>Delivery in 10 minutes</Text>
        <Text>📍 Electronic City, Bengaluru</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#FACC15', padding: 20 },
  brand: { fontWeight: '800', fontSize: 14 },
  delivery: { fontWeight: '700', fontSize: 23, marginVertical: 6 },
});
```

**Line narration:** `flex: 1` fills available space, `padding` is inside spacing, `StyleSheet` uses camelCase, and default React Native flex direction is column. Then add `topRow` and `locationRow` from handbook, demonstrating `flexDirection: 'row'`, `justifyContent: 'space-between'`, `alignItems: 'center'`.

**Ask:** Why does `alignItems` center horizontally in a column but vertically in a row?

**Checkpoint:** yellow header and location appear without overflow.

## 43–65 min — Controlled search and keyboard

Introduce state before writing UI:

```tsx
const [searchQuery, setSearchQuery] = useState('');
```

Show `TextInput` (inside search section):

```tsx
<TextInput
  placeholder="Search for milk, bread, fruits..."
  value={searchQuery}
  onChangeText={setSearchQuery}
  autoCapitalize="none"
  autoCorrect={false}
  returnKeyType="search"
  onSubmitEditing={() => Keyboard.dismiss()}
/>
{searchQuery.length > 0 && (
  <Pressable onPress={() => setSearchQuery('')}>
    <Text>✕</Text>
  </Pressable>
)}
```

Import `useState` from React and `TextInput`, `Pressable`, `Keyboard` from React Native. Explain the control loop: **type → onChangeText receives new string → setState → rerender → value reflects state**. `onChangeText` gives the *text*, not web's `event.target.value`. Explain `&&` conditional rendering and that this search is *not filtering yet*.

**Checkpoint:** typing, clearing and dismissing keyboard work.

## 65–82 min — Categories data and TypeScript

Create `src/data/categories.ts`:

```tsx
export type Category = { id: string; name: string; image: string };

export const categories: Category[] = [
  { id: '1', name: 'Dairy', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300' },
  { id: '2', name: 'Fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300' },
];
```

Then refer to the handbook for the full six-item array. Teach `type`, `string`, `Category[]`, type-checking vs runtime validation, and why `id` is a stable key. Show `categories.map(c => <Text key={c.id}>{c.name}</Text>)` temporarily before introducing images.

**Checkpoint:** six names render from data, not individually hardcoded views.

## 82–103 min — Component extraction and category grid

Create `src/components/CategoryCard.tsx`:

```tsx
import { View, Text, Image, Pressable } from 'react-native';
import type { Category } from '@/data/categories';

type Props = { category: Category; onPress: (category: Category) => void };

export default function CategoryCard({ category, onPress }: Props) {
  return (
    <Pressable onPress={() => onPress(category)}>
      <Image source={{ uri: category.image }} style={{ width: '100%', aspectRatio: 1 }} />
      <Text numberOfLines={2}>{category.name}</Text>
    </Pressable>
  );
}
```

This is the conceptual extraction; use the **full styles from the student handbook** for polished sizing, clipping and spacing. Highlight `import type`, typed callback, destructuring, `source={{ uri }}`, `numberOfLines` and `onPress={() => onPress(category)}` (do not call it during render).

Parent uses `categories.map(...)`; wrap each card in a `View` with `width: '33.3333%'`, `paddingHorizontal: 6`; parent `flexDirection: 'row'`, `flexWrap: 'wrap'`, `rowGap: 20`. Explain 3-column sizing. Pass a temporary `Alert.alert(category.name, 'Products coming soon!')` handler.

**Checkpoint:** grid with image/name/tap alert works.

## 103–110 min — ScrollView and finishing touches

Place the grid in `ScrollView`, explain it renders the mapped children and is appropriate for this small home screen. Add `showsVerticalScrollIndicator={false}`, `keyboardShouldPersistTaps="handled"`, bottom padding and accessibility labels. Test iOS/Android spacing and smaller screen.

## 110–120 min — Recap + assignment launch

Quick-fire questions:
1. Why is `View` used instead of `div`?
2. How does `TextInput` send text back to React state?
3. Why use `Category[]`?
4. Why does each list item need a stable key?
5. What actually happens when a `Pressable` callback fires?

**Assignment 1:** begin the **CampusStore** home page in a separate student-owned repository. Its inventory/theme must differ from QuickKart; see `assignments/campusstore-five-class-project.md`. Tell students to retain this exact same project for Assignments 2–5.

### Troubleshooting prompts

- Red files in VS Code Explorer can be Git decorations, not TypeScript errors. Inspect `git status`.
- Raw text inside `View` is invalid RN UI; wrap in `Text`.
- If remote images do not load, check URL/network and fixed dimensions.
- If Expo cache looks stale, run `npx expo start -c`.
- If `Text` collides with DOM types, ensure it is imported from `react-native`; alias `Text as RNText` if clarity helps.

## End-of-class board summary

```txt
HomeScreen
├─ SafeAreaView
├─ Header (View + Text + Flexbox)
├─ Search (TextInput ↔ useState + Pressable)
└─ ScrollView
   └─ categories.map → CategoryCard (Image + props + callback)
```

**Teaching principle:** Do not demo later-class routing, `FlatList`, cart or API features as if covered in Class 1. Keep the student assignment aligned to this milestone.
