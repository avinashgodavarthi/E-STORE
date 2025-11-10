import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Products.css";

function Products() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch Product Data
  async function fetchData() {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Add to Cart
  function handleAddToCart(item) {
    const alreadyInCart = cart.find((cartItem) => cartItem.id === item.id);
    if (alreadyInCart) {
      toast.info("⚠️ This item is already in your cart!");
    } else {
      setCart([...cart, { ...item, quantity: 1, payment: "UPI" }]);
      toast.success("🛒 Added to cart successfully!");
    }
  }

  // Remove from Cart
  function handleRemoveFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
    toast.info("🗑️ Item removed from cart!");
  }

  // Update Quantity
  function updateCartQuantity(id, action) {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  }

  // Buy Now
  function handleBuyNow(item) {
    const alreadyOrdered = orders.find((order) => order.id === item.id);
    if (!alreadyOrdered) {
      setOrders([...orders, item]);
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
      toast.success(`✅ Order placed successfully using ${item.payment}!`);
    } else {
      toast.info("⚠️ This item is already in your orders!");
    }
  }

  // Change Payment Method
  function handlePaymentChange(id, method) {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, payment: method } : item
      )
    );
  }

  return (
    <div className="app">
      <ToastContainer position="top-right" />

      {/* Header */}
      <header className="header">
        <h1 className="logo">🛒 E-STORE</h1>
        <input
          type="text"
          className="search-box"
          placeholder="Search for products..."
        />
      </header>

      {/* Products Section */}
 
      <section className="products-section">
        <h2 className="section-title">🛍️ Products</h2>
        <div className="product-grid">
          {data.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image} alt={item.title} className="product-image" />
              <div className="product-details">
                <h3 className="product-title">{item.title}</h3>
                <p className="product-category">{item.category}</p>
                <p className="product-price">₹ {(item.price * 83).toFixed(2)}</p>
                <button
                  className="add-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Cart Section */}
      <h2 className="section-title">🛒 Cart</h2>
      <div className="cart-section">
        {cart.length === 0 ? (
          <p className="empty-text">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-details">
                <h4>{item.title}</h4>
                <p>₹ {(item.price * 83 * item.quantity).toFixed(2)}</p>

                {/* Quantity */}
                <div className="quantity-controls">
                  <button onClick={() => updateCartQuantity(item.id, "decrease")}>
                    ➖
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.id, "increase")}>
                    ➕
                  </button>
                </div>

                {/* Payment */}
                <div className="payment-method">
                  <label>Payment: </label>
                  <select
                    value={item.payment}
                    onChange={(e) =>
                      handlePaymentChange(item.id, e.target.value)
                    }
                  >
                    <option value="UPI">UPI</option>
                    <option value="Card">Credit/Debit Card</option>
                    <option value="COD">Cash on Delivery</option>
                  </select>
                </div>

                {/* Buy Now */}
                <button className="buy-btn" onClick={() => handleBuyNow(item)}>
                  Buy Now
                </button>
              </div>

              {/* Remove */}
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Orders Section */}
      <h2 className="section-title">📦 Orders</h2>
      <div className="orders-section">
        {orders.length === 0 ? (
          <p className="empty-text">No orders placed yet.</p>
        ) : (
          orders.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ₹ {(item.price * 83 * item.quantity).toFixed(2)}</p>
                <p>Payment: 💳 {item.payment}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 E-STORE — Shop smart, live better ❤️</p>
      </footer>
    </div>
  );
}

export default Products;
