import logo from './logo.svg';
import './App.css';
import GlobalState from './context/GlobalState';
import About from './components/About';
import Products from './components/Products';
import Header from './components/Header';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <>
      <h1>Global State</h1>

      <GlobalState>
          {/* <About />
          <Products /> */}
          <Header />
          <ShoppingCart />
      </GlobalState>
    </>
  );
}

export default App;
