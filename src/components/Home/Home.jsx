import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Banner from '../Banner/Banner'
import Product from '../Products/Product'
import Cart from '../Cart/Cart'
import Wishlist from '../Wishlist/Wishlist'

const Home = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePanel,setActivePanel] = useState(null);
  const [cart,setCart] = useState ([]);

  useEffect(() => {
     const  changeNavbar =()=>{
      setIsScrolled(window.scrollY > 10)
     }
       window.addEventListener('scroll',changeNavbar);

  }, [])

  // Handle scroll
  const handleScroll = () => {
    const section = document.getElementById('product-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }


  // Cart And Wishlist show Tab function
       const handlePanel = (tabName) =>{
        setActivePanel(prev=>(
          prev === tabName ? null :tabName
        ))

       }

      //  ClosePanel Function 
       const handleClose = () =>setActivePanel(null)

      //  AddToCart function
      const addToCart =(product)=>{
        const alreadyAdded = cart.find(item=> item.id === product.id);
          if(alreadyAdded){
            alert('Item is already in the cart')
            return;
          }
        
        setCart([...cart,product])
      }

  return (
    <div>
        {/* navbar */}
      <Navbar handleScroll={handleScroll}
        setSearchTerm={setSearchTerm} 
        isScrolled={isScrolled}
        handlePanel ={handlePanel}/>
        {/* Banner */}
      <Banner />
      {/* Product */}
      <Product
        searchTerm={searchTerm} 
         addToCart ={addToCart}/>
        {/* cart tab */}
        <Cart
         activePanel={activePanel}
         handleClose={handleClose}
         cart = {cart}     
         />
        {/* wishlist tab */}
        <Wishlist
        activePanel={activePanel}
          handleClose={handleClose}
         />
    </div>
  )
}

export default Home
