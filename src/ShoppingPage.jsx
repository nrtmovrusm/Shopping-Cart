import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import './ShoppingPage.css'

const Shopping = () => {
  const { count, setCount } = useOutletContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json()
      })
      .then((response) => setProducts(response))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const calculateTotalQuantity = (cart) => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    setCount(calculateTotalQuantity(cart))
  }, [cart, setCount]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>

  const handleAddToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

      // Product already exists in cart but need to update quantity
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity = quantity;
        return updatedCart;
      } else {
        // Product doesn't exist, add it to the cart
        const updatedCart = [...prevCart, { id: product.id, quantity }];
        return updatedCart;
      }
    });
  };

  return (
    products && (
      <>
        <div className='productsDisplay'>
          {products.map((product) => {
            return (
              <div className='productCard' key={product.id}>
                <h4>{product.title}</h4>
                <div className='ratingContainer'>
                  <div className='rating'>Rating: {product.rating.rate}</div>
                  <div className='ratingNo'>Total Reviews: {product.rating.count}</div>
                </div>
                <div className='productDesc'>{product.description}</div>
                <img src={product.image}></img>
                <div className='price'>{product.price}</div>
                <label htmlFor='quantity'>Quantity: </label>
                <input 
                  name='quantity' 
                  type='number' 
                  step='1' 
                  defaultValue='1'
                  id={`quantity-${product.id}`}
                >
                </input>
                <button className='addToCart' onClick={()=> {
                  const quantity = parseInt(document.getElementById(`quantity-${product.id}`).value, 10);
                  handleAddToCart(product, quantity);
                }}>Add to Cart</button>
              </div>
            )
          })}
        </div>
      </>
    )
  );
};
  
  export default Shopping