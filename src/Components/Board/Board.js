import React, { Component } from 'react';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faceIndex: 0,
            textBoxValue:""
        }
        // this.setState({ faceIndex: faceIndex + 1 }) 
    }
    render() {
        const { faceIndex, textBoxValue } = this.state;
        return (
            <input type='text' value={textBoxValue}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        let s = `B${faceIndex}`;
                        this.setState({ [s]: textBoxValue, faceIndex: faceIndex + 1, textBoxValue: "" })
                    }
                }}
                name={`B${faceIndex}`}
                onChange={(e) => this.setState({ textBoxValue: e.target.value })} />
        )
    }
}