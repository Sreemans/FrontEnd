import React from 'react'
import './Card.scss'
export default function Card(props) {

    return (
        <div className="Card">
            <div className="CardName" style={{ background: props.Color ? props.Color : "rgb(209, 202, 202)" }}>
                {props.Name ? props.Name : "Card Name"}
            </div>
        </div>
    )
}