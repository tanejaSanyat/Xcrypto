
import { BrowserRouter as Router , Routes,Route } from "react-router-dom"
import Header from "./Components/Header"
import Exchanges from "./Components/Exchanges"
import CoinDetails from "./Components/CoinDetails"
import Coins from "./Components/Coins"
import Home from "./Components/Home"
import Footer from "./Components/Footer"
const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/coins" element = {<Coins/>}/>
        <Route path="/exchanges" element = {<Exchanges/>}/>
        <Route path="/coins/:id" element = {<CoinDetails/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
