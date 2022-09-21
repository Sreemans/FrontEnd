// import services, { asyncRetry } from '~onerisk/services';
import services, { asyncRetry } from "./services";
import createSelector from "reselect";
// import { selectPolicyNumber } from '~onerisk/store/policy/selectors';
const getPolicyRoot = (state) => state.policy;

export const selectPolicyNumber = () => 0;

export const DELETE_PROFILES = "DELETE_PROFILES";
export const CREATE_PROFILES = "CREATE_PROFILES";
export const UPDATE_CURRENT_PROFILE = "UPDATE_CURRENT_PROFILE";
export const UPDATE_CURRENT_RULE = "UPDATE_CURRENT_RULE";
export const MAP_PROFILES = "MAP_PROFILES";

const mapRenewalProfileAction = ({ error, profile }) => ({
  type: MAP_PROFILES,
  error,
  profile,
});

export function deleteProfiles() {
  return { type: DELETE_PROFILES };
}

export function createProfiles(profiles) {
  return { type: CREATE_PROFILES, profiles };
}

export function updateCurrentProfile(profileIndex) {
  return { type: UPDATE_CURRENT_PROFILE, profileIndex };
}

export function updateCurrentRule(rule) {
  return { type: UPDATE_CURRENT_RULE, rule };
}

export const createRenewalProfilesCallsAction =
  () => async (dispatch, getState) => {
    const MAX_PROFILES_ATTEMPTS = 3;
    const DELAY_BETWEEN_PROFILES_ATTEMPTS = 1337;

    try {
      const profileResponse = await asyncRetry(
        async () => services.getRenewalProfiles(selectPolicyNumber(getState())),
        MAX_PROFILES_ATTEMPTS,
        DELAY_BETWEEN_PROFILES_ATTEMPTS
      );
      dispatch(
        mapRenewalProfileAction({ error: false, profile: profileResponse })
      );
    } catch (err) {
      dispatch(mapRenewalProfileAction({ error: true }));
    }
  };
