import React from 'react'
import Cell from './Cell';

export default class ExcelTable extends React.Component {
    state = {
        text: '',
        data: [
            { key: 'A1', value: 'A1Cell' },
            { key: 'A2', value: 'A1Cell' },
            { key: 'A3', value: 'A1Cell' },
            { key: 'A4', value: 'A1Cell' },
            { key: 'A5', value: 'A1Cell' }
        ]
    }
    getValue = () => {
        console.log(this);
        return this.state.text;
    }
    updateValue = (index, e) => {
        const data = this.state.data;
        data[index].value = e.target.value;
        this.setState({ data })
    }
    render() {
        return (
            <>
                {this.state.data.map((i, index) => <Cell key={i.key} index={index} updateValue={this.updateValue} value={i.value} />)}
            </>
        )
    }
}