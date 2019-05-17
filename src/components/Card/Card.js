import React from 'react';

import classes from './Card.module.css';

const Card = props => {
    return(
        <figure onClick={props.clicked} className={classes.Card}>
            <img src={props.src} alt={props.title}/>
            <figcaption className={classes.CardTitle}>{props.title}</figcaption>
        </figure>
    );
};

export default Card;