import './Header.css'
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useContext } from 'react';
import { UserContext } from '../../App';



const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const handleClick = () => {
        history.push("/login");
    };
    return (
        <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkBtn">
                <i className="fas fa-bars"></i>
            </label>

            <label className="logo">Easy Ride <i className="fas fa-fighter-jet go"></i></label>
            <ul>
                <li>
                    <Link to="/home" className="link">Home</Link>
                </li>
                <li>
                    <Link to="/destination" className="link">Destination</Link>
                </li>
                <li>
                    <Link to="/blog" className="link">Blog</Link>
                </li>
                <li>
                    <Link to="/contact" className="link">Contact</Link>
                </li>
                          {
                                     loggedInUser.success ?      
                                     <Link to="/profile" className="dynamic-link"><i className="fas fa-user-tie"></i>  {loggedInUser.name}</Link> :
                                      <Button onClick={handleClick} variant="contained" color="secondary">Login</Button> 
                          }
                
            </ul>
        </nav>
    );
};

export default Header;