import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Banner from '../Banner/Banner'
import Product from '../Products/Product'
import Cart from '../Cart/Cart'
import Wishlist from '../Wishlist/Wishlist'
import OrderSummary from '../OrderSummary/OrderSummary'
import OrderPlace from '../OrderPlace/OrderPlace'
import product from '../Products/ProductList'

const Home = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [OrderPlaced, setOrderPlaced] = useState(false);
 // lazy initialization-lazy initialization avoids expensive work during re-renders by
 //  deferring initialization until the first actual use.
  const [cart, setCart] = useState(()=>{
    const storeCart = localStorage.getItem('cart');
    return storeCart ? JSON.parse(storeCart) : [] 
  });
  const [wishlist,setWishlist] = useState (()=>{
    const storeWishlist = localStorage.getItem('wishlist');
    return storeWishlist ? JSON.parse(storeWishlist) : []
  });

  //  total calculation
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const shippingFee = totalItems * 2;
  const orderTotal = subtotal + shippingFee;

  useEffect(() => {
    const changeNavbar = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', changeNavbar);

  }, [])

  // save Items to Localstorage 
     useEffect (()=>{
      localStorage.setItem('cart',JSON.stringify(cart));
      localStorage.setItem('wishlist',JSON.stringify(wishlist));
     },[cart,wishlist])


  // Handle scroll
  const handleScroll = () => {
    const section = document.getElementById('product-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }


  // Cart And Wishlist show Tab function
  const handlePanel = (tabName) => {
    setActivePanel(prev => (
      prev === tabName ? null : tabName
    ))

  }

  //  ClosePanel Function 
  const handleClose = () => setActivePanel(null)

  //  RemoveItem
  const removeItem = (product) => {
    setCart(cart.filter(item => item.id !== product.id))
  }

  // QuantityIncrement
  const quantityIncrement = (product) => {

    setCart(cart.map(item =>
      item.id === product.id ?
        { ...item, quantity: item.quantity + 1 } : item
    ))

  }

  // quantityDecrement
  const quantityDecrement = (product) => {

    setCart(cart.map(item =>
      item.id === product.id && item.quantity > 1 ?
        { ...item, quantity: item.quantity - 1 } : item
    ))

  }

  //  AddToCart function
  const addToCart = (product) => {
    const alreadyAdded = cart.find(item => item.id === product.id);
    if (alreadyAdded) {
      alert('Item is already in the cart')
      return;
    }

    setCart([...cart, { ...product, quantity: 1 }])
  }
     
    // wishlist function
     const addToWishlist = (product) =>{
         const isInWishlist = wishlist.some(item=> item.id === product.id);

         if(isInWishlist){
          setWishlist(wishlist.filter(item=> item.id !== product.id))
         }
         else{
          const addedDate = new Date().toLocaleString('en-GB')
          setWishlist([...wishlist,{...product,addedDate}])

         }
     }

      // clearwishlist 
      const clearWishlist = () =>{
        setWishlist([]);
      }

  return (
    <div>
      {/* navbar */}
      <Navbar handleScroll={handleScroll}
        setSearchTerm={setSearchTerm}
        isScrolled={isScrolled}
        handlePanel={handlePanel}
        totalItems={totalItems} 
        wishlist={wishlist}/>


      {/* Banner */}
      <Banner />

      {/* Product */}
      <Product
        searchTerm={searchTerm}
        addToCart={addToCart} 
        addToWishlist ={addToWishlist}
        wishlist={wishlist}
        />

      {/* cart tab */}
      <Cart
        activePanel={activePanel}
        handleClose={handleClose}
        cart={cart}
        removeItem={removeItem}
        quantityIncrement={quantityIncrement}
        quantityDecrement={quantityDecrement}
        subtotal={subtotal}
        shippingFee={shippingFee}
        orderTotal={orderTotal}
        setOrderSummary={setOrderSummary}

      />
      {/* wishlist tab */}
      <Wishlist
        activePanel={activePanel}
        handleClose={handleClose}
        wishlist ={wishlist}
        addToCart={addToCart}
        clearWishlist ={clearWishlist}
       />

      {/* orderSummary */}
      {

        orderSummary &&
        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          shippingFee={shippingFee}
          orderTotal={orderTotal}
          setOrderSummary={setOrderSummary}
          setOrderPlaced={setOrderPlaced}
          setCart={setCart}

        />
      }
      {/* OrderPlaced */}
      {
        OrderPlaced &&
        <OrderPlace
          setOrderPlaced={setOrderPlaced}

        />
      }
    </div>
  )
}

export default Home
