import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const parseCost = (cost) => parseFloat(String(cost).replace('$', ''));

function CartItem({ onContinueShopping, onItemRemoved }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateItemTotal = (item) => parseCost(item.cost) * item.quantity;
  const calculateTotalAmount = () => items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    if (onItemRemoved) onItemRemoved(item.name);
  };

  const handleCheckoutShopping = () => alert('Functionality to be added for future reference');

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Add a plant to get started.</p>
      ) : (
        items.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <div>Unit cost: {item.cost}</div>
              <div className="cart-item-quantity">
                <button onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name}`}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name}`}>+</button>
              </div>
              <div>Subtotal: ${calculateItemTotal(item).toFixed(2)}</div>
            </div>
            <button className="cart-button cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        ))
      )}
      <div className="cart-total">Total: ${calculateTotalAmount().toFixed(2)}</div>
      <div className="cart-actions">
        <button className="cart-button" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="cart-button" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
