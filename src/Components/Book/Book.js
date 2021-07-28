import React, { useState } from 'react';
import './Book.css';
import map from '../Home/Images/map.png';
import { MapContainer } from './MapContainer';
import { useForm } from 'react-hook-form';
import { createContext } from 'react';
import SearchResult from './SearchResult/SearchResult';
import { useParams } from 'react-router-dom';

export const InfoContext = createContext()

const Book = () => {
    const [info, setInfo] = useState({});
    const [success, setSuccess] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.vehicle = vehicle;
        setInfo(data);
        setSuccess(!success)
    };
    console.log(watch("example"));

    
    const {vehicle} = useParams();

    return (
        <InfoContext.Provider value={[info, setInfo]} >

            <div className="main-container">
                
                <div className="form-container">
                    {
                        success ?

                        <SearchResult/> 
                        : 
                        <form className="info-form" onSubmit={handleSubmit(onSubmit)}>

                        <p className="label">Pick from</p>
                        <input {...register("from", { required: true })} placeholder="From" className="input" />
                        {errors.name && <span className="errors">Name is required</span>}


                        <p className="label">Pick to</p>
                        <input {...register("to", { required: true })} placeholder="To" className="input" />
                        {errors.email && <span className="errors">Email is required</span>}

                        <p className="label">Date</p>
                        <input {...register("date", { required: true })} placeholder="Date" className="input" />
                        {errors.address && <span className="errors">Address is required</span>}

                        <p className="label">Phone</p>
                        <input {...register("phone", { required: true })} placeholder="Phone" className="input" />
                        {errors.phone && <span className="errors">Phone number is required</span>}

                        <input type="submit" className="submitBtn" value="Search" />
                    </form>
                    }
                </div>

                <div className="map-container">
                    <img src={map} alt="" className="item" />
                    {/* <MapContainer /> here should be the working map container*/}
                </div>
            </div>
        </InfoContext.Provider>
    );
};

export default Book;