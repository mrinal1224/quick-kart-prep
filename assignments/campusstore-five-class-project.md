# CampusStore — 5 Progressive Assignments
**Strict syllabus: Class 1 and Class 2 ONLY. One project, one repository, five milestones.**

## Project premise
Build **CampusStore**, a mobile campus-essentials browsing app: students can explore stationery, snacks, study gear, bottles, and room essentials. Choose your own campus-friendly theme and sample catalog. The project is a browsing interface, **not** an e-commerce checkout. Each assignment extends the code submitted for the previous one. Do not create five separate POCs.

**In scope only:** Expo + RN core components; SafeAreaView; StyleSheet and Flexbox; ScrollView; TextInput and useState; conditional rendering; Pressable, Image, alerts; array map, find and filter; typed objects/arrays/function props; component reuse; Expo Router Stack + tabs + dynamic route parameters; FlatList, renderItem, keyExtractor, numColumns, header/empty states; optional chaining and nullish fallback.

**Not taught / not required / DO NOT GRADE:** authentication, REST APIs/fetch, backend, database, AsyncStorage, Redux, Context API, real cart or quantity-management state, advanced hooks, external UI libraries, persistent storage, location APIs, payments, checkout, animations. ADD button in A4/A5 displays a product-specific placeholder alert only.

## Continuous delivery rules
- A1 creates the student-owned **campusstore-mobile** repo. A2–A5 enhance **the same repository** and retain all prior features.
- Use TypeScript/TSX, Expo Router, native RN components, StyleSheet, and local mock arrays.
- Commit each milestone and create tags assignment-1 through assignment-5; push tags and main.
- Submission each time: repo URL, tag/commit link, 2 screenshots, short demo (30–60 seconds), brief README change summary.
- Keep project original: campus-themed data, labels and styling, not a mere rename of QuickKart.
- A failed image URL due to network does not automatically mean all UI is wrong; provide accessible fallbacks as an optional polish task without needing a new library.

## Milestone progression

~~~text
A1  Static home shell
 ↓
A2  Controlled search + reusable category grid
 ↓
A3  Stack + Tabs + dynamic category detail screen
 ↓
A4  Typed products + category filtering + reusable product card
 ↓
A5  FlatList product catalog + loading-free empty/invalid states + final polish
~~~

## Assignment 1 — Foundation: CampusStore Home
**Concepts from Class 1:** Expo, View, Text, SafeAreaView, StyleSheet, Flexbox, ScrollView, TextInput.  
**Effort:** approximately 60–90 minutes. **Marks:** 20.

### Student problem statement
Create the home screen for CampusStore, a campus essentials marketplace. This milestone is intentionally static. The screen must immediately communicate app identity and where students can browse campus items.

### Requirements
1. Expo app opens on phone/emulator and renders a CampusStore Home screen.
2. Header contains app name, tagline (for example "Ready for your next class") and campus location text; include a horizontal row using flexDirection.
3. Search-area TextInput with informative placeholder; it can be uncontrolled for now.
4. ScrollView with "Shop by Category" section title and short introductory text (cards are **not** expected).
5. StyleSheet.create used for styles: padding, alignment, contrast, background, font sizes.
6. Proper safe area; no raw text directly inside View.

### Acceptance cases
- Home opens without crash; header, search and category section visible.
- On a small phone, content remains readable; ScrollView works.
- All text uses Text and styles are organized.

### Assessment /20
Native primitives 5; layout/Flexbox 6; styling/readability 5; run/demo/README 4.

**Submission tag:** assignment-1.

## Assignment 2 — Interactive Home + Data-Driven Categories
**Concepts from Class 1:** useState; controlled TextInput; conditional rendering; Pressable; Image; type aliases; typed arrays; props and callbacks; map.  
**Effort:** 90–120 minutes. **Marks:** 20.

### Student problem statement
Extend your A1 Home (do NOT start over). Make search input responsive and create a reusable category grid from local data. Category tap gives an alert because navigation is not yet in scope.

### Requirements
1. Search TextInput with searchQuery/useState; value/onChangeText; clear button appears only for nonempty input.
2. When trim() is nonempty, display "Searching for: ..." preview. **Do not filter data yet**.
3. src/data/categories.ts exports Category type {id:string,name:string,image:string} and at least 4 original campus categories.
4. src/components/CategoryCard.tsx receives category: Category and onPress callback; renders remote/local image, category name, accessible Pressable.
5. Home uses categories.map with stable id key to render a 2- or 3-column grid using flexWrap.
6. Category tap shows Alert with selected category name; no route yet.

### Acceptance cases
- Input, clear and conditional preview behave correctly.
- All category cards come from the array; image/name displayed.
- Each alert corresponds to the tapped card; callback and types are reused.
- A1 layout remains intact.

### Assessment /20
Controlled state 5; TS data model 4; reusable card + callback 5; data-driven responsive grid 4; demo 2.

**Submission tag:** assignment-2.

## Assignment 3 — Category Navigation
**Concepts from Class 2 steps 2.1–2.4:** root Stack + tabs layout, Expo Router, useRouter/push, [id], useLocalSearchParams, find, optional chaining/nullish fallback, conditional rendering.  
**Effort:** 90–120 minutes. **Marks:** 20.

### Student problem statement
Replace A2's category alert with navigation. A single dynamic category screen should display whichever category was selected, and show a helpful message for an invalid category ID.

### Requirements
1. Root src/app/_layout.tsx uses Stack; (tabs)/_layout.tsx uses existing native tab navigator. Preserve Home/Explore.
2. Create src/app/category/[id].tsx. Do not create separate screen files for each category.
3. Home uses useRouter() and pushes {pathname:'/category/[id]',params:{id:category.id}}.
4. Category screen reads id using typed useLocalSearchParams; uses categories.find(item=>item.id===id).
5. Display selected category name and a "products coming next" placeholder; set Stack.Screen title with category?.name ?? 'Category'.
6. Invalid /category/999 shows "Category not found", without crash. Back returns to Home.

### Acceptance cases
- Every category opens correct title and ID-driven content.
- Tabs remain available on tab screens; category detail opens in root Stack.
- Invalid category and back navigation work.
- A1 and A2 features remain.

### Assessment /20
Navigation layouts 5; dynamic route 5; router/params 5; lookup + fallback 3; demo 2.

**Submission tag:** assignment-3.

## Assignment 4 — Product Data and Reusable Cards
**Concepts from Class 2 steps 2.5–2.6:** Product type, typed array, relationship via categoryId, find/filter, Image, Pressable, typed onAdd callback, component props.  
**Effort:** 90–120 minutes. **Marks:** 20.

### Student problem statement
Extend A3 category details with products. A category must show only the inventory linked to its ID. First focus on product data and a reusable ProductCard; FlatList optimization is A5.

### Requirements
1. src/data/products.ts exports Product type: {id:string,categoryId:string,name:string,price:number,quantity:string,image:string}.
2. At least 8 distinct campus products, >=2 per each of at least 4 categories; every categoryId refers to a real Category ID.
3. src/components/ProductCard.tsx accepts product:Product and onAdd:(product:Product)=>void.
4. Display product name (at most 2 lines), image, pack size/quantity, ₹ price, ADD Pressable.
5. Category screen uses products.filter(product=>product.categoryId===id), renders filtered ProductCards with ScrollView + map and stable keys (FlatList comes next).
6. ADD triggers a product-specific Alert saying cart is coming soon. **No cart state, counters or storage.**
7. Preserve handling for an unknown category.

### Acceptance cases
- Selecting a category shows only relevant items.
- An item never appears in the wrong category.
- ADD alerts with its correct name; display is not duplicative hand-written JSX.
- Product price is numeric in data, with currency added in UI.

### Assessment /20
Typed data and relationships 5; filtering 5; reusable typed component 6; functional placeholder + regression 4.

**Submission tag:** assignment-4.

## Assignment 5 — Complete CampusStore Browsing Experience
**Concepts from Class 2 step 2.7:** FlatList, data, renderItem, keyExtractor, numColumns, ListHeaderComponent, ListEmptyComponent, conditional rendering, safe-area edges, flex layouts.  
**Effort:** 90–120 minutes. **Marks:** 20.

### Student problem statement
Finish A4 as a cohesive, responsive product-browsing mobile app. Replace your ScrollView + map product listing with a two-column FlatList; handle invalid categories and legitimate empty catalogs gracefully.

### Requirements
1. Use FlatList to render categoryProducts with data, renderItem={({item})=>...}, keyExtractor=item.id, numColumns={2}.
2. Style consistent two-column cards with columnWrapperStyle; title/count in ListHeaderComponent.
3. ListEmptyComponent explains a valid category having zero products. For verification, temporarily create an empty test category or temporarily filter to [].
4. Unknown category route displays a *different* "Category not found" view.
5. ADD still shows only the correct alert; do not invent a cart feature.
6. Ensure Back, Tabs, Home search preview, categories and all prior assignments continue to work.
7. README includes navigation flow, folder tree, TypeScript models, test scenarios and screenshots; commit/tag milestone 5.

### Acceptance cases
- Four or more categories route correctly; at least eight products in the catalog.
- Two cards appear per row and remain readable on phone viewport.
- Valid empty category and invalid ID have distinct UI outcomes.
- A1–A4 functionality works after refactor.
- App source remains within Class 1/2 concepts.

### Assessment /20
FlatList and stable keys 7; grid and header 4; empty/invalid states 4; quality and regression/demo 5.

**Submission tag:** assignment-5.

## Final rubric (100 marks total)
A1 20 + A2 20 + A3 20 + A4 20 + A5 20.

**Grading priority:** correct RN fundamentals and evolving architecture > polish. Do not deduct for absence of untaught APIs, cart, persistence, Context, or auth. Do not allow AI-generated unexplainable code to substitute for student understanding: ask the student to explain one useState binding, one typed callback, the [id] route and a FlatList prop.

## Final expected tree (representative)
~~~text
src/
  app/
    _layout.tsx
    (tabs)/
      _layout.tsx
      index.tsx
      explore.tsx
    category/
      [id].tsx
  components/
    CategoryCard.tsx
    ProductCard.tsx
  data/
    categories.ts
    products.ts
~~~

## Classroom viva prompts
1. Why does a React Native screen use Text instead of raw text inside View?
2. Why is the search TextInput called "controlled"?
3. Why use Category[] and Product[] rather than untyped objects?
4. Why does product.categoryId refer to category.id?
5. What happens if a route uses an unknown category ID?
6. Explain why router.push is called inside a press callback.
7. Why find for the category but filter for products?
8. What does renderItem receive and what does keyExtractor return?
9. When would FlatList be better than ScrollView + map?
10. Why is ADD only an Alert in this two-class project?
