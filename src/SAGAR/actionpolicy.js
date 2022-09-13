import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Axios from 'axios';

// import { IO_POLICY_ERRORS } from './errorMessages';
export const IO_POLICY_ERRORS = {
    LENGTH_ERROR: 'Policy number must be 9 digits',
    NOT_FOUND: 'Policy data not found',
    INVALID_LINE: 'Your inspection could not be ordered because this policy is not Homeowners, Landlords or Mobile/Manufactured home policy line.',
    TERMINATED: 'An inspection cannot be ordered because this policy has been terminated for 30 days or more',
    VALIDATION_ERROR: 'Incorrect combination of input used to order your inspection – please check the fields above to ensure they are correct',
    ORDERING_ERROR: 'Something went wrong with your inspection order, please contact RMBC Myriad for further information about the status of this inspection',
    UNAVAILABLE: 'One or more services required to order your inspection appear to be down – please contact RMBC Myriad for more information regarding the status of your inspection order',
  };
  
/**
 * Returns (1) a thunk, for searching, which 'cancels' itself
 * if the stored policy number no longer matches the searched number, and
 * (2) a variable to track whether the thunk is still in progress
 *
 * const [search, loading] = useSearchPolicyAction();
 */
export const useSearchPolicyAction = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Memoizing search so it has referential stability for use in effects
  const searchPolicy = useCallback(
    (number) => {
      dispatch(createSearchPolicyAction(number, setLoading));
    },
    [dispatch],
  );

  return [searchPolicy, loading];
};

const createSearchPolicyAction = (number, setLoading) => async (
  dispatch,
  getState,
) => {
  const policyNumber = getState().singleInspection.policy.number;

  // If the policy is already pulled up, we are done.
  if (number === policyNumber) {
    return;
  }

  setLoading(true);
  dispatch({ type: 'singleInspection/policy/numberUpdated', data: number });

  const isSearchStale = () =>
    number !== getState().singleInspection.policy.number;

  try {
    const { data } = await Axios.get(
      `inspection-ordering/api/v1/model/${number}`,
    );

    if (isSearchStale()) {
      return;
    }

    dispatch({ type: 'singleInspection/policy/dataReceived', data });
  } catch (e) {
    if (isSearchStale()) {
      return;
    }

    const errorMessage =
      {
        404: IO_POLICY_ERRORS.NOT_FOUND,
        // 422: e.response.data,
        500: IO_POLICY_ERRORS.UNAVAILABLE,
      }[e.response && e.response.status] || IO_POLICY_ERRORS.UNAVAILABLE;

    dispatch({
      type: 'singleInspection/policy/notFound',
      error: true,
      data: errorMessage,
    });
  } finally {
    setLoading(false);
  }
};
