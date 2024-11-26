import './App.css';
import Nav from './component/Nav';
import Footer from './component/Footer';
import SignUp from './component/SignUp';
import Login from './component/Login'
import Products from './component/Products';
import AddProduct from './component/AddProduct'
import PageNotFound from './component/PageNotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UpdateProduct from './component/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import ProtectedRoute from './routes/ProtectedRoute';
import { store, persistor } from './states/store';
import Unauthorized from './component/Unauthorized';
import { roles } from './constants/enums';
import { PersistGate } from 'redux-persist/es/integration/react';
import PublicRoutes from './routes/PublicRoutes';
import { About } from './component/About';
import { Profile } from './component/Profile';
import { Cart } from './component/Cart';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <Nav />
                        <Routes>
                            <Route element={<PublicRoutes />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/signUp" element={<SignUp />} />
                            </Route>
                            <Route path="/unauthorized" element={<Unauthorized />} />


                            {/* ProtectedRoutes */}
                            {['/products', '/'].map((path) => (
                                <Route
                                    key={path}
                                    path={path}
                                    element={
                                        <ProtectedRoute roles={[roles.USER, roles.ADMIN]}>
                                            <Products />
                                        </ProtectedRoute>
                                    }
                                />
                            ))}
                            <Route
                                path="/myProfile"
                                element={
                                    <ProtectedRoute roles={[roles.USER, roles.ADMIN]}>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/add"
                                element={
                                    <ProtectedRoute roles={[roles.ADMIN]}>
                                        <AddProduct />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/cart/:id"
                                element={
                                    <ProtectedRoute roles={[roles.USER]}>
                                        <Cart />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/update/:id"
                                element={
                                    <ProtectedRoute roles={[roles.ADMIN]}>
                                        <UpdateProduct />
                                    </ProtectedRoute>
                                }
                            />

                            <Route path="/about" element={<About />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </BrowserRouter>

                    <ToastContainer position="top-right" />
                    <Footer />
                </PersistGate>
            </Provider>
        </div>
    );
}

export default App;
