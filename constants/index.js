export const categories = [
  { id: 1, name: 'Pizza', image: require('../assets/images/pizzaIcon.png') },
  { id: 2, name: 'Sweets', image: require('../assets/images/sweetsIcon.png') },
  { id: 3, name: 'Burger', image: require('../assets/images/burgerIcon.png') },
  { id: 4, name: 'Italian', image: require('../assets/images/italianIcon.png') },
  { id: 5, name: 'Chinese', image: require('../assets/images/chineseIcon.png') },
  { id: 6, name: 'Noodles', image: require('../assets/images/noodlesIcon.png') },
]

export const featured = {
  id: 1, title: 'Hot and Spicy', description: 'soft and tender fried chicken', restaurants: [
    { id: 5, name: 'Papa Mohns', image: require('../assets/images/pizza.png'), description: 'Hot and Spicy Pizzas', lng: 35.234491, lat: 31.776685, address: '834 second street', stars: 5, ratings: '5.4k', category: 'Fast Food', dishes: [{ name: 'pizza', image: require('../assets/images/pizzaDish.png'), description: 'hot cheesy garlic pizza', price: 10 }, { name: 'garlic bread', image: require('../assets/images/pizzaDish.png'), description: 'cheesy garlic bread', price: 5 }] },
    { id: 4, name: 'Papa Mohns', image: require('../assets/images/pizza.png'), description: 'Hot and Spicy Pizzas', lng: 35.234491, lat: 31.776685, address: '734 second street', stars: 4.3, ratings: '4.4k', category: 'Fast Food', dishes: [{ name: 'pizza', image: require('../assets/images/pizzaDish.png'), description: 'hot cheesy garlic pizza', price: 10 }, { name: 'garlic bread', image: require('../assets/images/pizzaDish.png'), description: 'cheesy garlic bread', price: 5 }] },
    { id: 3, name: 'Papa Lohns', image: require('../assets/images/pizza.png'), description: 'Hot and Spicy Pizzas', lng: 35.234491, lat: 31.776685, address: '634 second street', stars: 3.8, ratings: '3.4k', category: 'Fast Food', dishes: [{ name: 'pizza', image: require('../assets/images/pizzaDish.png'), description: 'hot cheesy garlic pizza', price: 10 }, { name: 'garlic bread', image: require('../assets/images/pizzaDish.png'), description: 'cheesy garlic bread', price: 5 }] },
    { id: 2, name: 'Papa Kohns', image: require('../assets/images/pizza.png'), description: 'Hot and Spicy Pizzas', lng: 35.234491, lat: 31.776685, address: '534 second street', stars: 2.6, ratings: '2.4k', category: 'Fast Food', dishes: [{ name: 'pizza', image: require('../assets/images/pizzaDish.png'), description: 'hot cheesy garlic pizza', price: 10 }, { name: 'garlic bread', image: require('../assets/images/pizzaDish.png'), description: 'cheesy garlic bread', price: 5 }] },
    { id: 1, name: 'Papa Johns', image: require('../assets/images/pizza.png'), description: 'Hot and Spicy Pizzas', lng: 35.234491, lat: 31.776685, address: '434 second street', stars: 1.1, ratings: '1.4k', category: 'Fast Food', dishes: [{ name: 'pizza', image: require('../assets/images/pizzaDish.png'), description: 'hot cheesy garlic pizza', price: 10 }, { name: 'garlic bread', image: require('../assets/images/pizzaDish.png'), description: 'cheesy garlic bread', price: 5 }] },
  ]
}