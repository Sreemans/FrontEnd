import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Label } from 'mesh-component-library';
import FormInput from '../../components/FormInput';

import { useDebounce } from 'hooks/useDebounce';
// import { useState, useEffect } from 'react';

// export const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [delay, value]);

//   return debouncedValue;
// };

import { useSearchPolicyAction } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { IO_POLICY_ERRORS } from './errorMessages';
import { selectSourceErrorMessages } from '../source/selectors';
// import { createSelector } from 'reselect';

// export const selectSourceErrorMessages = createSelector(
//   (state) => state.singleInspection.source,
//   ({ type, sourceError, sourceErrorMessages }) => {
//     if (!sourceError) {
//       return [];
//     }
//     return sourceErrorMessages
//       .filter((e) => e.sourceType.code === type)
//       .map((e) => e.message);
//   },
// );


// need to decide if want to get rid of 'policy' local state
const PolicyField = ({ policy, setPolicy }) => {
  const debouncedPolicyNumber = useDebounce(policy, 500);

  const [inputErrorMessage, setInputErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sourceType = useSelector((state) => state.singleInspection.source.type);

  const policyErrorMessages = useSelector((state) => state.singleInspection.policy.errorMessages); // prettier-ignore
  const sourceErrorMessages = useSelector(selectSourceErrorMessages);

  // (O_O)
  useEffect(() => {
    const message = (() => {
      if (sourceErrorMessages.length) {
        return sourceErrorMessages[0];
      }
      if (policyErrorMessages.length) {
        return policyErrorMessages[0];
      }
      if (inputErrorMessage) {
        return inputErrorMessage;
      }
      return null;
    })();
    if (errorMessage !== message) {
      setErrorMessage(message);
    }
  }, [
    errorMessage,
    inputErrorMessage,
    policyErrorMessages,
    sourceErrorMessages,
    sourceType,
    debouncedPolicyNumber,
  ]);

  const [search, loading] = useSearchPolicyAction();
  const dispatch = useDispatch();

  useEffect(() => {
    if (![0, 9].includes(debouncedPolicyNumber.length)) {
      setInputErrorMessage(IO_POLICY_ERRORS.LENGTH_ERROR);
    } else {
      setInputErrorMessage('');
    }
    if (debouncedPolicyNumber.length === 0) {
      dispatch({ type: 'singleInspection/policy/cleared' });
    }
    if (debouncedPolicyNumber.length === 9) {
      search(debouncedPolicyNumber);
    }
  }, [debouncedPolicyNumber, dispatch, search]);

  const handleInput = (event) => {
    const trimmedVal = event.target.value.trim();
    if (trimmedVal.match(/\D/)) {
      return;
    }
    const policyNumber =
      policy.length === 0 && trimmedVal.length > 9
        ? trimmedVal.match(/0{0,6}?(\d{0,9})$/)[1]
        : trimmedVal;
    setPolicy(policyNumber);
  };

  return (
    <div>
      <Label htmlFor="policy" text="Policy" required />
      <FormInput
        id="policy"
        value={policy}
        isLoading={loading}
        onChange={handleInput}
        hasClear={!!policy && debouncedPolicyNumber.length >= 9 && !loading}
        onClear={() => { setPolicy(''); }} // prettier-ignore
        error={!!errorMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
};

PolicyField.propTypes = {
  policy: PropTypes.string.isRequired,
  setPolicy: PropTypes.func.isRequired,
};

export default React.memo(PolicyField);
