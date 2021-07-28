import React, { createContext } from 'react';
import './Home.css';
import bike from './Images/bike.png';
import car from './Images/car.png';
import bus from './Images/bus.png';
import train from './Images/train.png';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

export const VehicleContext = createContext();

const Home = () => {
    const history = useHistory();
    const [vehicle, setVehicle] = useState("");
    const handleClick = (passVehicle) => {
        const url = `/book/${passVehicle}`;
        history.push(url);
        console.log(url);
        setVehicle(passVehicle);
    }
    return (
        <div className="home-container">
            <div className="header-text">
                <h1>Chose your vehicle below</h1>
            </div>
        <div className="container">
            <div onClick={() => handleClick("bike")} className="box">
                <img src={bike} alt="" />
                <h2>BIKE</h2>
            </div>

            <div onClick={() => handleClick("car")} className="box">
                <img src={car} alt="" />
                <h2>CAR</h2>
            </div>

            <div onClick={() => handleClick("bus")} className="box">
                <img src={bus} alt="" />
                <h2>BUS</h2>
            </div>

            <div onClick={() => handleClick("train")} className="box">
                <img src={train} alt="" />
                <h2>TRAIN</h2>
            </div>
        </div>
        </div>
    );
};

export default Home;