import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
      { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
      { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Removes mold spores and purifies the air.', cost: '$18' },
      { name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Adds humidity and removes toxins.', cost: '$20' },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?auto=format&fit=crop&w=600&q=70', description: 'Calming scent that helps with relaxation.', cost: '$20' },
      { name: 'Jasmine', image: 'https://cdn.pixabay.com/photo/2017/02/16/19/47/jasmine-2072821_1280.jpg', description: 'Sweet fragrance that lifts the mood.', cost: '$18' },
      { name: 'Rosemary', image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=600&q=70', description: 'Fragrant herb used in cooking and aromatherapy.', cost: '$15' },
      { name: 'Mint', image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=600&q=70', description: 'Refreshing leaves that repel pests.', cost: '$12' },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'Gel soothes burns and skin irritation.', cost: '$14' },
      { name: 'Echinacea', image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?auto=format&fit=crop&w=600&q=70', description: 'Traditionally used to support immunity.', cost: '$16' },
      { name: 'Chamomile', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=70', description: 'Flowers brewed into a calming tea.', cost: '$14' },
      { name: 'Calendula', image: 'https://images.unsplash.com/photo-1598880940371-c756e015faf1?auto=format&fit=crop&w=600&q=70', description: 'Petals used in skin-healing salves.', cost: '$13' },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const isAdded = (name) => addedToCart[name] || cartItems.some((i) => i.name === name);

  return (
    <div>
      <nav className="navbar">
        <a className="brand" onClick={() => setShowCart(false)}>Paradise Nursery</a>
        <div>
          <a onClick={() => setShowCart(false)}>Plants</a>
          <a className="cart-link" onClick={() => setShowCart(true)} aria-label="Shopping cart">
            🛒 Cart<span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        plantsArray.map((section) => (
          <section key={section.category}>
            <h2 className="category-title">{section.category}</h2>
            <div className="product-grid">
              {section.plants.map((plant) => (
                <div className="product-card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <p className="product-price">{plant.cost}</p>
                  <button
                    className="product-button"
                    disabled={isAdded(plant.name)}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {isAdded(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))
      ) : (
        <CartItem
          onContinueShopping={() => setShowCart(false)}
          onItemRemoved={(name) => setAddedToCart((prev) => ({ ...prev, [name]: false }))}
        />
      )}
    </div>
  );
}

export default ProductList;
