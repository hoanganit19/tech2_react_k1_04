import logo from './logo.svg';
import './App.css';
import GlobalState from './context/GlobalState';
import About from './components/About';
import Products from './components/Products';
import Header from './components/Header';
import ShoppingCart from './components/ShoppingCart';
import Shop from './cart/Shop';

function App() {
  return (
    <>
      <Shop />
    </>
  );
}

export default App;
