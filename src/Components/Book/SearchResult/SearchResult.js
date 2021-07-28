import React, { useContext } from 'react';
import './SearchResult.css';
import { InfoContext } from '../Book';
import bike from '../../Home/Images/bike.png';
import car from '../../Home/Images/car.png';
import bus from '../../Home/Images/bus.png';
import train from '../../Home/Images/train.png';
import { useParams } from 'react-router-dom';
import fakeData from './fakeData';

const SearchResult = () => {
    const { vehicle } = useParams();
    const result = fakeData.filter(data => data.category === vehicle)
    console.log(result);
    // const imgUrl = `fakeData.${vehicle}`;

    const [info, setInfo] = useContext(InfoContext);
    return (
        <div className="search-container">
            <div className="distance">
                <h2 className="distance-item">{info.from}</h2>
                <p className="distance-item">To</p>
                <h2 className="distance-item">{info.to}</h2>
            </div>
                {
                    result.map(data => <div className="category">
                        <img src={data.logo} alt="" style={{ maxWidth: "80px" }} className="category-item 1" />
                        <h3 className="category-item 2">{data.category}</h3>
                        <i className="fas fa-user-friends category-item 3"></i>
                        <h3 className="category-item 4">{data.available}</h3>
                        <h3 className="category-item 5">$ {data.cost}</h3>
                    </div>)
                }

            </div>
    );
};

export default SearchResult;