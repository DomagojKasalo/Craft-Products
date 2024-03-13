import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ManufacturerList from './components/ManufacturerList';
import ManufacturerDetails from './components/ManufacturerDetails';
import CreateProduct from './components/CreateProduct';
import CreateManufacturer from './components/CreateManufacturer';
import EditProduct from './components/EditProduct';
import EditManufacturer from './components/EditManufacturer';
import Register from './components/Register';
import Login from './components/Login';
import { useAuth, isUserAdmin  } from './components/AuthContext.js'; 
import UserList from './components/UserList.js';
import UserDetails from './components/UserDetails.js';
import EditUser from './components/EditUser.js';
import ChangePassword from './components/changePassword.js';

function App() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <div className="container">
    <Router>
      {isAuthenticated ? <Navbar /> : null}
      <Switch>
        <Route path="/" exact>
          {isAuthenticated ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/products" component={isAuthenticated ? ProductList : Login} />
        <Route path="/product-details/:id" component={isAuthenticated ? ProductDetails : Login} />
        <Route path="/manufacturers" component={isAuthenticated ? ManufacturerList : Login} />
        <Route path="/manufacturer/:id" component={isAuthenticated ? ManufacturerDetails : Login} />
        <Route path="/create-product" component={isAuthenticated ? CreateProduct : Login} />
        <Route path="/create-manufacturer" component={isAuthenticated ? CreateManufacturer : Login} />
        <Route path="/edit-product/:id" component={isAuthenticated ? EditProduct : Login} />
        <Route path="/edit-manufacturer/:id" component={isAuthenticated ? EditManufacturer : Login} />
        <Route path="/users" component={isAuthenticated && isUserAdmin() ? UserList : Login} />
        <Route path="/user-details/:id" component={isAuthenticated ? UserDetails : Login} />
        <Route path="/edit-user/:id" component={isAuthenticated ? EditUser : Login} />
        <Route path="/change-password/:id" component={isAuthenticated ? ChangePassword : Login} />
        <Route path="/register" component={!isAuthenticated ? Register : Home} />
        <Route path="/login" component={!isAuthenticated ? Login : Home} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
