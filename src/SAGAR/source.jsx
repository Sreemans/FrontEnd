import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { Label } from 'mesh-component-library';
import RadioOption from '../../components/RadioOption';
import { useDispatch, useSelector } from 'react-redux';

const RadioHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SourceOptions = () => {
  const sourceRef = useRef();

  const sources = useSelector((state) => state.singleInspection.source.types);
  const sourceType = useSelector((state) => state.singleInspection.source.type);
  const dispatch = useDispatch();

  /**
   * Set the appropriate input as checked.
   * Then, style the input with a darker border.
   */
  useEffect(() => {
    const buttons = sourceRef.current.children;
    Array.from(buttons).forEach((b) => {
      const input = b.getElementsByTagName('input')[0];
      const isChecked = input.value === sourceType;
      input.checked = isChecked;
      b.style.borderColor = isChecked ? '#6b7789' : '#ccc'; // eslint-disable-line no-param-reassign
    });
  }, [sourceType]);

  return (
    <div>
      <Label htmlFor="radio-holder" text="Source Type" required />
      <RadioHolder id="radio-holder" ref={sourceRef}>
        {sources.map(({ code, description, disabled }) => (
          <RadioOption
            key={code}
            name="source"
            value={code}
            disabled={disabled}
            onClick={() => {
              dispatch({
                type: 'singleInspection/source/updated',
                data: code,
              });
            }}
          >
            {description}
          </RadioOption>
        ))}
      </RadioHolder>
    </div>
  );
};

export default React.memo(SourceOptions);
