import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import MobileMenu from "./components/MobileMenu";


function App() {
  const [name, setNAme] = useState('')
  let [total, setTotal] = useState(0)
  const history = useHistory();
  let [count, setCount] = useState(0)
  const [items, setItems] = useState([])
  const [items1, setItems1] = useState([])
  const [width, setWidth] = useState(null)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [window.innerWidth])

  const cartDisplay = () => {
    fetch("http://localhost:3000/cartItems")
      .then(res => res.json())
      .then(result =>
        setItems(result)
      )
    document.getElementById("cart_body").classList.add("cart_body_display")
    document.body.style.overflow = 'hidden'
  }
  const burgerContainer = useRef(null)
  const mobileMenu = useRef(null)

  const menuDisplay = () => {
      mobileMenu.current.classList.toggle("mobile_display")
  }
  if (width > 768) {
    mobileMenu.current.classList.remove("mobile_display")
    burgerContainer.current.classList.remove("open")
  }

  useEffect(() => {
    fetch("http://localhost:3000/cartItems")
      .then(res => res.json())
      .then(result =>
        setItems1(result)
      )
    if (items1 == 0) {
      setCount(0)
    }
  }, [items1])

  useEffect(() => {
    if (items !== []) {
      items.map(item => {
        setTotal(total += +item.price)
        setCount(total)
        setTotal(0)
      })
    } else {
      setCount(total)
    }
  }, [items])

  const updowntotal = () => {
    fetch("http://localhost:3000/cartItems")
      .then(res => res.json())
      .then(result =>
        setItems(result)
      )
  }

  return (
    <div className="App">
      <MobileMenu burgerContainer={burgerContainer} menuDisplay={menuDisplay} mobileMenu={mobileMenu} />
      <Cart count={count} updowntotal={updowntotal} items1={items} cartDislay={cartDisplay} />
      <Header burgerContainer={burgerContainer} menuDisplay={menuDisplay} onToggle={cartDisplay} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
