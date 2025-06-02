import juiceImage from '../images/juice.png';
import coconutoilImage from '../images/coconutoil.png';
import palmoil2Image from '../images/palmoil2.png';
import jasminericeImage from '../images/jasminerice.png';
import cereamixImage from '../images/cereamix.png';
import brownriceImage from '../images/brownrice.png';
import cocoafruitjuiceImage from '../images/cocoafruitjuice.png';
import fishImage from '../images/fish.png';
import gariImage from '../images/gari.png';
import garimixImage from '../images/garimix.png';
import palmoilImage from '../images/palmoil.png';
import plainriceImage from '../images/plainrice.png';
import soboloImage from '../images/sobolo.png';
import winesImage from '../images/wines.png';
import kokonteImage from '../images/kokonte.png';

export const featuredProducts = [
  {
    id: '1',
    name: 'Ekumfi Juice',
    price: 5.00,
    oldPrice: 5.50,
    discount: 20,
    rating: 5,
    image: juiceImage,
    category: 'Juices',
    description: 'Fresh, naturally fruit juice made from 100% real Ghanaian fruits with no added sugars or preservatives.',
    variant: '300ml',
  },
  {
    id: '2',
    name: 'DHOME Organic Virgin Coconut Oil',
    price: 24.99,
    rating: 4,
    image: coconutoilImage,
    category: 'Oils',
    description: 'Cold-pressed, unrefined coconut oil sourced from organic coconuts in Ghana. Perfect for cooking, baking, or as a natural beauty product.',
    variant: '500ml',
  },
  {
    id: '3',
    name: 'Ahuntor Homemade Palm Oil',
    price: 18.99,
    oldPrice: 21.99,
    discount: 15,
    rating: 5,
    image: palmoil2Image,
    category: 'Oils',
    description: 'Traditional Ghanaian palm oil made from the finest palm fruits. Rich in antioxidants and perfect for authentic West African dishes.',
    variant: '750ml',
  },
  {
    id: '4',
    name: 'Ahuntor Ghana Jasmine Rice',
    price: 29.99,
    rating: 5,
    image: jasminericeImage,
    category: 'Grains',
    description: 'Aromatic jasmine rice grown in the fertile soils of Ghana. Known for its unique fragrance and perfect texture when cooked.',
    variant: '5kg',
  },
];

export const productCategories = [
  {
    id: 1,
    name: 'Fruit Juices',
    slug: 'juices',
    image: juiceImage,
  },
  {
    id: 2,
    name: 'Oils',
    slug: 'oils',
    image: palmoil2Image,
  },
  {
    id: 3,
    name: 'Ready-to-eat Cereals',
    slug: 'cereals',
    image: cereamixImage,
  },
  {
    id: 4,
    name: 'Wines',
    slug: 'wines',
    image: winesImage,
  },
  {
    id: 5,
    name: 'Plain Rice',
    slug: 'rice',
    image: plainriceImage,
  },
  {
    id: 6,
    name: 'Dried and Salted Fish',
    slug: 'fish',
    image: fishImage,
  },
  {
    id: 7,
    name: 'Ready-to-eat Garimix',
    slug: 'gari',
    image: garimixImage,
  },
  {
    id: 8,
    name: 'Sobolo Drink',
    slug: 'drinks',
    image: soboloImage,
  },
];

export const testimonials = [
  {
    name: 'Ama Boateng',
    location: 'Accra, Ghana',
    avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
    text: 'The Ekumfi Pineapple Juice is absolutely amazing! It tastes just like the juice from the raw fruit. I will definitely be ordering more.',
    rating: 5,
  },
  {
    name: 'Michael Adu',
    location: 'Tema, Ghana',
    avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
    text: 'As a Ghanaian, finding authentic products can be difficult. Dzidzeme Home Group Limited delivers the real taste of home with their premium quality products.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    location: 'Accra, Ghana',
    avatar: 'https://randomuser.me/api/portraits/women/92.jpg',
    text: 'The palm oil and kokonte flour are exactly as described. My Ghanaian husband was so pleased to find these authentic ingredients for his favorite dishes!',
    rating: 5,
  },
];

export const featuredPosts = [
  {
    id: 1,
    title: '5 Delicious Recipes Using Homemade Palm Oil',
    slug: '5-delicious-recipes-using-homemade-palm-oil',
    excerpt: 'Discover the rich flavor of traditional Ghanaian palm oil with these easy-to-follow recipes that will transport your taste buds to West Africa.',
    image: palmoilImage,
    date: 'March 15, 2025',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'The Health Benefits of Coconut Oil in Your Diet',
    slug: 'health-benefits-coconut-oil-diet',
    excerpt: 'Learn about the numerous health benefits of incorporating Ghanaian coconut oil into your daily diet and lifestyle.',
    image: coconutoilImage,
    date: 'March 10, 2025',
    readTime: '4 min',
  },
  {
    id: 3,
    title: 'How to Make Perfect Jollof Rice with Ghana Jasmine Rice',
    slug: 'perfect-jollof-rice-ghana-jasmine',
    excerpt: 'Follow our step-by-step guide to creating the perfect pot of Jollof rice using premium Ghana Jasmine rice for authentic flavor.',
    image: jasminericeImage,
    date: 'March 5, 2025',
    readTime: '6 min',
  },
];