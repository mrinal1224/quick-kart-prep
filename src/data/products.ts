// A Product describes one item that customers can browse in QuickKart.
export type Product = {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  quantity: string;
  image: string;
};

// Local sample data for learning. We will load products from an API later.
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
  {
    id: 'p3',
    categoryId: '2',
    name: 'Fresh Apples',
    price: 120,
    quantity: '4 pcs',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
  },
  {
    id: 'p4',
    categoryId: '2',
    name: 'Bananas',
    price: 50,
    quantity: '6 pcs',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
  },
  {
    id: 'p5',
    categoryId: '3',
    name: 'Tomatoes',
    price: 35,
    quantity: '500 g',
    image: 'https://images.unsplash.com/photo-1546470427-e5b89cd551b8?w=400',
  },
  {
    id: 'p6',
    categoryId: '3',
    name: 'Carrots',
    price: 40,
    quantity: '500 g',
    image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400',
  },
  {
    id: 'p7',
    categoryId: '4',
    name: 'Whole Wheat Bread',
    price: 55,
    quantity: '1 loaf',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
  },
  {
    id: 'p8',
    categoryId: '4',
    name: 'Croissant',
    price: 70,
    quantity: '2 pcs',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
  },
  {
    id: 'p9',
    categoryId: '5',
    name: 'Potato Chips',
    price: 30,
    quantity: '50 g',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
  },
  {
    id: 'p10',
    categoryId: '5',
    name: 'Popcorn',
    price: 45,
    quantity: '75 g',
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400',
  },
  {
    id: 'p11',
    categoryId: '6',
    name: 'Orange Juice',
    price: 90,
    quantity: '1 L',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
  },
  {
    id: 'p12',
    categoryId: '6',
    name: 'Cold Coffee',
    price: 85,
    quantity: '250 ml',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
  },
];
