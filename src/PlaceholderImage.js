import React from 'react';
import placeholder from './img/PlaceholderImage.png';

export function PlaceholderImage(props) {
    return (
        <div className="centerSlim" style={{marginTop: `100px`, marginBottom: `100px`}}>
            <img src={placeholder} height={props.height} width='100%'/>
        </div>
        );

}