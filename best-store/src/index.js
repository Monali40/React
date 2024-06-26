import React from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout';
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './Pages/Contact';
import NotFound from './Pages/NotFound';
import ProductList from './Pages/admin/products/ProductList';
function App()
{
  return(
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin/products' element={<ProductList />} />
        <Route path='/*' element={<NotFound />} />

    </Routes>
    <Footer />
     </BrowserRouter>
  )
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

