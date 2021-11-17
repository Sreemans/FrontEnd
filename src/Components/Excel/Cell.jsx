import React, { useCallback, useState } from 'react';
require('./Cell.scss')
export default function Cell(props) {
    const [value, setValue] = useState(props.value);
    const [selected, setSelected] = useState('');


    const updateValue = useCallback((e) => {
        setValue(e.target.value);
        props.updateValue(props.index, e)
    })
    const onSelect = useCallback(() => setSelected(true))
    const onDeselect = useCallback(() => setSelected(false))
    return (
        <input
            type="text"
            style={{ border: selected ? '1px solid red' : '1px solid' }}
            onChange={updateValue}
            onClick={onSelect}
            onBlur={onDeselect}
            value={value}
        />
    )
}