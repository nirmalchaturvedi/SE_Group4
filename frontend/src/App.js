import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Products from './pages/Products';
import ContactUs from './pages/ContactUs';
import AdminLogin from './pages/admin'; // Add this
import AdminDashboard from './pages/AdminDashboard'; // Add this
import AddGreaseProductForm from './pages/AddGreaseProductForm';
import DeleteGreaseProductForm from './pages/DeleteGreaseProductForm';
import UpdateGreaseProductForm from './pages/UpdateGreaseProductForm';
import ReviewsPage from './pages/ReviewsPage';
import ReviewForm from './pages/ReviewForm';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path='/AdminDashboard' element={<AdminDashboard />} />
                <Route path="/addgreaseproduct" element={<AddGreaseProductForm />} />
                <Route path="/updategreaseproduct" element={<UpdateGreaseProductForm />} />
                <Route path="/deletegreaseproduct" element={<DeleteGreaseProductForm />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/ReviewsForm" element={<ReviewForm />} />
            </Routes>
        </Router>
    );
}

export default App;
