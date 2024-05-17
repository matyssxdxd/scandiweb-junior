import './App.css';
import { Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<CategoryPage category={"all"} />}/>
        <Route path='/clothes' element={<CategoryPage category={"clothes"} />}/>
        <Route path='/tech' element={<CategoryPage category={"tech"} />}/>
        <Route path='product/:productId' element={<Product />}/>
      </Routes>
    </>
  );
}

export default App;
