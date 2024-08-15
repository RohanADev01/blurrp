// constants.js
export const NOTIF_TYPES = {
  'welcomeNotif': require('../assets/images/WelcomeIcon.png'),
  'userNotif': require('../assets/images/UserIcon.png'),
  'sysNotif': require('../assets/images/NotifIcon.png')
}

export const EXAMPLE_NOTIFICATIONS = [
  {
    id: '6',
    type: 'sysNotif',
    title: 'New Notification',
    action: '...',
    time: '20 min ago',
    image: '',
  },
  {
    id: '5',
    type: 'userNotif',
    title: 'Pabel Vuiya',
    action: 'Placed a new order',
    time: '20 min ago',
    image: require('../assets/images/Sushi.png'),
  },
  {
    id: '4',
    type: 'userNotif',
    title: 'Royal Bengol',
    action: 'agreed to cancel',
    time: '20 min ago',
    image: require('../assets/images/Sushi.png'),
  },
  {
    id: '3',
    type: 'userNotif',
    title: 'Salim Smith',
    action: 'left a 5 star review',
    time: '20 min ago',
    image: require('../assets/images/Sushi.png'),
  },
  {
    id: '2',
    type: 'sysNotif',
    title: 'New Notification',
    action: '...',
    time: '20 min ago',
    image: '',
  },
  {
    id: '1',
    type: 'welcomeNotif',
    title: 'Welcome to Blurrp!!!',
    action: 'We\'re so excited to have you here!',
    time: '10 mins ago',
    image: '',
  },
];

export const FOOD_ITEM_CATEGORIES = ['All Day', 'Breakfast', 'Lunch', 'Dinner']

export const FOOD_ITEM_TYPES = ['Food', 'Drink']

export const FOOD_INGREDIENTS = [
  {
    category: 'Basic',
    ingredients: [
      { name: 'Onion', allergy: true },
      { name: 'Garlic', allergy: false },
      { name: 'Ginger', allergy: false },
      { name: 'Peppers', allergy: true },
    ],
  },
  {
    category: 'Meat',
    ingredients: [
      { name: 'Eggs', allergy: false },
      { name: 'Chicken', allergy: false },
      { name: 'Beef', allergy: false },
      { name: 'Lamb', allergy: false },
      { name: 'Pork', allergy: false },
      { name: 'Seafood', allergy: false },
    ],
  },
  {
    category: 'Fruits',
    ingredients: [
      { name: 'Berries', allergy: true },
    ],
  },
  {
    category: 'Nuts',
    ingredients: [
      { name: 'Sesame', allergy: true },
      { name: 'Almond', allergy: false },
      { name: 'Walnuts', allergy: false },
      { name: 'Peanuts', allergy: true },
      { name: 'Tree nuts', allergy: true },
      { name: 'Ground Nuts', allergy: true },
      { name: 'Cashews', allergy: true },
      { name: 'Chest nuts', allergy: true },
      { name: 'Hazelnuts', allergy: true },
      { name: 'Pistachios', allergy: true },
      { name: 'Other', allergy: false },
    ],
  },
  {
    category: 'Other',
    ingredients: [
      { name: 'Tofu', allergy: true },
      { name: 'Soy', allergy: true },
      { name: 'Mayonnaise', allergy: true },
    ],
  },
];

export const DRINK_INGREDIENTS = [
  {
    category: 'Dairy',
    ingredients: [
      { name: 'Milk', allergy: true },
      { name: 'Yoghurt', allergy: true },
      { name: 'Cheese', allergy: true },
      { name: 'Cream', allergy: false },
    ],
  },
  {
    category: 'Fruits',
    ingredients: [
      { name: 'Berries', allergy: true },
    ],
  },
  {
    category: 'Nuts',
    ingredients: [
      { name: 'Nuts', allergy: true },
    ],
  },
  {
    category: 'Other',
    ingredients: [
      { name: 'Mint', allergy: false },
      { name: 'Alcohol', allergy: false },
    ],
  },
];


export const EXAMPLE_FOOD_ITEMS = [
  {
    id: '1',
    name: 'Chicken Thai Biriyani',
    category: 'Dinner',
    type: 'Food',
    price: 6.5,
    rating: 4.8,
    reviews: 1,
    distance: '0',
    deliveryMethods: ['Delivery'],
    image: require('../assets/images/Sushi.png'),
    description:
      'Chicken Thai Biriyani is a classic Thai dish that combines chicken, rice, vegetables, and a variety of spices. The dish is often served with rice vinegar sauce, sriracha, and a sweet chili sauce.',
    ingredients: [
      { id: '1', name: 'Salt' },
      { id: '2', name: 'Chicken' },
      { id: '3', name: 'Onion', allergy: true },
      { id: '4', name: 'Garlic' },
      { id: '5', name: 'Peppers', allergy: true },
      { id: '6', name: 'Ginger' },
      { id: '7', name: 'Broccoli' },
      { id: '8', name: 'Orange' },
      { id: '9', name: 'Walnut' },
    ],
  },
  {
    id: '2',
    name: 'Chicken Bhuna',
    category: 'Breakfast',
    type: 'Food',
    price: 13,
    rating: 4.9,
    reviews: 10,
    distance: '0',
    deliveryMethods: ['Pickup'],
    image: require('../assets/images/Sushi.png'),
    description:
      'Chicken Bhuna is a classic Indian dish that combines chicken, rice, and a variety of spices in one dish.',
    ingredients: [
      { id: '1', name: 'Salt' },
      { id: '2', name: 'Chicken' },
      { id: '3', name: 'Onion', allergy: true },
      { id: '4', name: 'Garlic' },
      { id: '5', name: 'Peppers', allergy: true },
    ],
  },
  {
    id: '3',
    name: 'Mazalichiken Halim',
    category: 'Lunch',
    type: 'Food',
    price: 25,
    rating: 4.9,
    reviews: 20,
    distance: '0',
    deliveryMethods: ['Delivery', 'Pickup'],
    image: require('../assets/images/Sushi.png'),
    description:
      'Mazalichiken Halim is a new dish that is an extension of our previous dishes and is made with a new secret sauce',
    ingredients: [
      { id: '5', name: 'Peppers', allergy: true },
      { id: '6', name: 'Ginger' },
      { id: '7', name: 'Broccoli' },
      { id: '8', name: 'Orange' },
      { id: '9', name: 'Walnut' },
    ],
  },
  {
    id: '4',
    name: 'Mango Lassi',
    category: 'All Day',
    type: 'Drink',
    price: 9.5,
    rating: 4.9,
    reviews: 10,
    distance: '0',
    deliveryMethods: ['Pickup'],
    image: require('../assets/images/Sushi.png'),
    description:
      'Chicken Bhuna is a classic Indian dish that combines chicken, rice, and a variety of spices in one dish.',
    ingredients: [
      { id: '1', name: 'Salt' },
      { id: '2', name: 'Chicken' },
      { id: '3', name: 'Onion', allergy: true },
      { id: '4', name: 'Garlic' },
      { id: '5', name: 'Peppers', allergy: true },
    ],
  },
];

export const EMPTY_FOOD_ITEM = {
  id: '',
  name: '',
  category: 'All Day',
  type: 'Food',
  price: 0,
  rating: 0,
  reviews: 0,
  distance: '0',
  deliveryMethods: ['Pickup'],
  image: '',
  description: '',
  ingredients: [],
}