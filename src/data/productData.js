import juiceImage from '../images/juice.png';

export const allProducts = [
  {
    id: '1',
    name: 'Ekumfi Pineapple Juice',
    price: 12.99,
    oldPrice: 15.99,
    discount: 20,
    rating: 5,
    image: juiceImage,
    category: 'juices',
    description: 'Fresh, naturally sweet pineapple juice made from 100% real Ghanaian pineapples with no added sugars or preservatives.',
    variant: '1 Liter',
    stock: 25,
    createdAt: '2025-02-15T10:00:00Z',
    isFeatured: true,
    sku: 'EKJ-001',
    weight: '1.1 kg',
    dimensions: {
      height: '25 cm',
      width: '8 cm',
      depth: '8 cm'
    },
    tags: ['organic', 'natural', 'juice', 'pineapple'],
    reviews: 42
  },
  {
    id: '2',
    name: 'Premium Coconut Oil',
    price: 24.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/725998/pexels-photo-725998.jpeg',
    category: 'oils',
    description: 'Cold-pressed, unrefined coconut oil sourced from organic coconuts in Ghana. Perfect for cooking, baking, or as a natural beauty product.',
    variant: '500ml',
    stock: 30,
    createdAt: '2025-03-01T14:30:00Z',
    isFeatured: true,
    sku: 'PCO-002',
    weight: '0.55 kg',
    dimensions: {
      height: '15 cm',
      width: '8 cm',
      depth: '8 cm'
    },
    tags: ['organic', 'natural', 'oil', 'coconut'],
    reviews: 36
  },
  {
    id: '3',
    name: 'Homemade Palm Oil',
    price: 18.99,
    oldPrice: 21.99,
    discount: 15,
    rating: 5,
    image: 'https://images.pexels.com/photos/262896/pexels-photo-262896.jpeg',
    category: 'oils',
    description: 'Traditional Ghanaian palm oil made from the finest palm fruits. Rich in antioxidants and perfect for authentic West African dishes.',
    variant: '750ml',
    stock: 18,
    createdAt: '2025-02-20T09:15:00Z',
    isFeatured: true,
    sku: 'HPO-003',
    weight: '0.8 kg',
    dimensions: {
      height: '20 cm',
      width: '10 cm',
      depth: '10 cm'
    },
    tags: ['traditional', 'palm oil', 'cooking'],
    reviews: 29
  },
  {
    id: '4',
    name: 'Premium Ghana Jasmine Rice',
    price: 29.99,
    rating: 5,
    image: 'https://images.pexels.com/photos/1310779/pexels-photo-1310779.jpeg',
    category: 'grains',
    description: 'Aromatic jasmine rice grown in the fertile soils of Ghana. Known for its unique fragrance and perfect texture when cooked.',
    variant: '5kg',
    stock: 40,
    createdAt: '2025-01-25T11:45:00Z',
    isFeatured: true,
    sku: 'GJR-004',
    weight: '5.1 kg',
    dimensions: {
      height: '30 cm',
      width: '20 cm',
      depth: '10 cm'
    },
    tags: ['rice', 'jasmine', 'grain'],
    reviews: 56
  },
  {
    id: '5',
    name: 'Organic Brown Rice',
    price: 22.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/7438982/pexels-photo-7438982.jpeg',
    category: 'grains',
    description: 'Nutritious brown rice grown organically in Ghana. High in fiber and essential nutrients with a nutty flavor and chewy texture.',
    variant: '3kg',
    stock: 28,
    createdAt: '2025-02-10T13:20:00Z',
    isFeatured: false,
    sku: 'OBR-005',
    weight: '3.1 kg',
    dimensions: {
      height: '25 cm',
      width: '18 cm',
      depth: '8 cm'
    },
    tags: ['organic', 'brown rice', 'grain', 'nutritious'],
    reviews: 32
  },
  {
    id: '6',
    name: 'Cocoa Fruit Juice',
    price: 14.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/357743/pexels-photo-357743.jpeg',
    category: 'juices',
    description: 'Refreshing juice made from fresh cocoa fruit pulp, offering a unique tropical flavor with hints of lychee, citrus, and mango.',
    variant: '750ml',
    stock: 15,
    createdAt: '2025-03-05T15:10:00Z',
    isFeatured: false,
    sku: 'CFJ-006',
    weight: '0.85 kg',
    dimensions: {
      height: '25 cm',
      width: '8 cm',
      depth: '8 cm'
    },
    tags: ['cocoa', 'fruit juice', 'natural', 'tropical'],
    reviews: 18
  },
  {
    id: '7',
    name: 'Kokonte Flour',
    price: 16.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/4198022/pexels-photo-4198022.jpeg',
    category: 'grains',
    description: 'Traditional cassava flour commonly used in Ghanaian cuisine. Perfect for making kokonte, a popular West African dish.',
    variant: '2kg',
    stock: 22,
    createdAt: '2025-02-18T08:40:00Z',
    isFeatured: false,
    sku: 'KKF-007',
    weight: '2.1 kg',
    dimensions: {
      height: '25 cm',
      width: '15 cm',
      depth: '8 cm'
    },
    tags: ['flour', 'cassava', 'traditional', 'gluten-free'],
    reviews: 26
  },
  {
    id: '8',
    name: 'Cereamix Tombrown',
    price: 18.99,
    oldPrice: 20.99,
    discount: 10,
    rating: 5,
    image: 'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg',
    category: 'cereals',
    description: 'Nutritious cereal mix made from roasted corn, millet, and soya beans. Rich in protein and perfect for breakfast or as a snack.',
    variant: '1.5kg',
    stock: 35,
    createdAt: '2025-01-30T12:15:00Z',
    isFeatured: false,
    sku: 'CTB-008',
    weight: '1.6 kg',
    dimensions: {
      height: '25 cm',
      width: '15 cm',
      depth: '8 cm'
    },
    tags: ['cereal', 'breakfast', 'nutritious', 'protein'],
    reviews: 41
  },
  {
    id: '9',
    name: 'Coffee Wine',
    price: 34.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg',
    category: 'wines',
    description: 'Unique artisanal wine made from fermented coffee beans. Features rich coffee flavors with subtle fruity notes and a smooth finish.',
    variant: '750ml',
    stock: 12,
    createdAt: '2025-03-10T16:45:00Z',
    isFeatured: false,
    sku: 'CFW-009',
    weight: '1.2 kg',
    dimensions: {
      height: '30 cm',
      width: '8 cm',
      depth: '8 cm'
    },
    tags: ['wine', 'coffee', 'artisanal', 'fermented'],
    reviews: 15
  },
  {
    id: '10',
    name: 'Red Palm Wine',
    price: 28.99,
    rating: 5,
    image: 'https://images.pexels.com/photos/4255482/pexels-photo-4255482.jpeg',
    category: 'wines',
    description: 'Traditional palm wine with a distinctive red hue. Naturally fermented with a sweet, tangy flavor and mild alcoholic content.',
    variant: '750ml',
    stock: 10,
    createdAt: '2025-02-25T14:20:00Z',
    isFeatured: false,
    sku: 'RPW-010',
    weight: '1.1 kg',
    dimensions: {
      height: '30 cm',
      width: '8 cm',
      depth: '8 cm'
    },
    tags: ['palm wine', 'traditional', 'fermented', 'alcoholic'],
    reviews: 22
  },
  {
    id: '11',
    name: 'Sobolo (Hibiscus) Drink',
    price: 9.99,
    rating: 5,
    image: 'https://images.pexels.com/photos/6086318/pexels-photo-6086318.jpeg',
    category: 'juices',
    description: 'Refreshing drink made from dried hibiscus flowers with a sweet-tart flavor. Rich in antioxidants and naturally caffeine-free.',
    variant: '1 Liter',
    stock: 30,
    createdAt: '2025-03-02T10:30:00Z',
    isFeatured: false,
    sku: 'SBL-011',
    weight: '1.1 kg',
    dimensions: {
      height: '25 cm',
      width: '8 cm',
      depth: '8 cm'
    },
    tags: ['hibiscus', 'sobolo', 'drink', 'natural'],
    reviews: 38
  },
  {
    id: '12',
    name: 'Ginger Flavored Gari',
    price: 13.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/1327832/pexels-photo-1327832.jpeg',
    category: 'grains',
    description: 'Traditional cassava flakes infused with natural ginger flavor. Ready to eat or can be soaked in water for a quick meal or snack.',
    variant: '1kg',
    stock: 25,
    createdAt: '2025-02-12T09:50:00Z',
    isFeatured: false,
    sku: 'GFG-012',
    weight: '1.1 kg',
    dimensions: {
      height: '20 cm',
      width: '15 cm',
      depth: '5 cm'
    },
    tags: ['gari', 'cassava', 'ginger', 'snack'],
    reviews: 29
  },
  {
    id: '13',
    name: 'Dried Salted Tilapia',
    price: 19.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg',
    category: 'fish',
    description: 'Premium dried and salted tilapia fish, a staple in many Ghanaian dishes. Adds rich flavor to soups, stews, and sauces.',
    variant: '500g',
    stock: 15,
    createdAt: '2025-01-20T11:25:00Z',
    isFeatured: false,
    sku: 'DST-013',
    weight: '0.55 kg',
    dimensions: {
      height: '30 cm',
      width: '20 cm',
      depth: '5 cm'
    },
    tags: ['fish', 'tilapia', 'dried', 'protein'],
    reviews: 31
  },
  {
    id: '14',
    name: 'Organic Wheat Cereal',
    price: 15.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/4397836/pexels-photo-4397836.jpeg',
    category: 'cereals',
    description: 'Whole grain wheat cereal grown organically in Ghana. Nutritious breakfast option high in fiber and essential nutrients.',
    variant: '1.2kg',
    stock: 20,
    createdAt: '2025-02-05T13:40:00Z',
    isFeatured: false,
    sku: 'OWC-014',
    weight: '1.3 kg',
    dimensions: {
      height: '25 cm',
      width: '15 cm',
      depth: '8 cm'
    },
    tags: ['wheat', 'cereal', 'organic', 'breakfast'],
    reviews: 24
  },
  {
    id: '15',
    name: 'Maize Cereal',
    price: 14.99,
    oldPrice: 16.99,
    discount: 12,
    rating: 4,
    image: 'https://images.pexels.com/photos/4051554/pexels-photo-4051554.jpeg',
    category: 'cereals',
    description: 'Traditional maize cereal made from 100% natural corn. Versatile ingredient for breakfast porridge or various Ghanaian dishes.',
    variant: '1.5kg',
    stock: 22,
    createdAt: '2025-01-15T10:15:00Z',
    isFeatured: false,
    sku: 'MZC-015',
    weight: '1.6 kg',
    dimensions: {
      height: '25 cm',
      width: '15 cm',
      depth: '8 cm'
    },
    tags: ['maize', 'corn', 'cereal', 'natural'],
    reviews: 27
  },
  {
    id: '16',
    name: 'Cadeau Palm Wine',
    price: 31.99,
    rating: 5,
    image: 'https://images.pexels.com/photos/1028637/pexels-photo-1028637.jpeg',
    category: 'wines',
    description: 'Premium palm wine with a sweet, delicate flavor profile. Carefully fermented using traditional methods for a refined taste experience.',
    variant: '750ml',
    stock: 8,
    createdAt: '2025-03-15T15:30:00Z',
    isFeatured: false,
    sku: 'CPW-016',
    weight: '1.1 kg',
    dimensions: {
      height: '30 cm',
      width: '8 cm',
      depth: '8 cm'
    },
    tags: ['palm wine', 'premium', 'cadeau', 'gift'],
    reviews: 19
  }
];

export const productById = (id) => {
  return allProducts.find(product => product.id === id);
};

export const relatedProducts = (id, category, limit = 4) => {
  return allProducts
    .filter(product => product.id !== id && product.category === category)
    .slice(0, limit);
};