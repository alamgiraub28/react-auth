import React from 'react';
import { Link } from 'react-router-dom';
import css from './RiderName.css';

const RiderName = (props) => {
    const {title, image} =props.riderName;

    return (
        <div class="card card-custom text-center" >
        <img src={image} class="card-img-top mt-2 img-custom" alt="..."></img>
        <div class="card-body">
          <h5 class="card-title text-center">{title}</h5>
          <Link to={"/search/" + title}><a href="#" class="btn btn-primary">Select your Rider</a></Link>
        </div>
      </div>
    );
};

export default RiderName;