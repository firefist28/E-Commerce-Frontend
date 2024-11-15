import './App.css';
import Nav from './component/Nav';
import Footer from './component/Footer';
import SignUp from './component/SignUp';
import Login from './component/Login'
import Products from './component/Products';
import AddProduct from './component/AddProduct'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateComponent from './component/PrivateComponent';
import UpdateProduct from './component/UpdateProduct';

function App() {
    return (
        <div className="App">
            {/* this is required as ahref for link */}
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route element={<PrivateComponent />} >
                        <Route path="/" element={<Products />} />
                        <Route path="/add" element={<AddProduct />} />
                        <Route path="/update/:id" element={<UpdateProduct />} />
                        <Route path="/logout" element={<h1>Logout Component</h1>} />
                        <Route path="/profile" element={<h1>Profile Component</h1>} />
                    </Route>

                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />

                </Routes>
            </BrowserRouter>

            <Footer />
        </div>
    );
}

export default App;
