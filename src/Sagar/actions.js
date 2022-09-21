// // import _get from 'lodash/get';
// // import _isEmpty from 'lodash/isEmpty';
// import get from 'lodash/get';
// import isEmpty from 'lodash/isEmpty'; // remove _

// import services, { asyncRetry } from './services';
// // import {
// //   ALL_AUTO_LINES,
// //   BOAT_LINE,
// //   PROPERTY_LINES,
// //   PERSONAL_LINES,
// // } from '~onerisk/constants/transactionConstants';
// export const AUTO_LINES = ['010', '019'];
// export const MCY_LINE = '016';
// export const BOAT_LINE = '090';
// export const PUP_LINE = '088';
// export const VEHICLE_LINES = [...AUTO_LINES, MCY_LINE, BOAT_LINE];
// export const ALL_AUTO_LINES = [...AUTO_LINES, MCY_LINE];
// export const PROPERTY_LINES = ['032', '070', '071', '072', '078'];

// export const PERSONAL_LINES = [...AUTO_LINES, MCY_LINE, ...PROPERTY_LINES, PUP_LINE, BOAT_LINE]; 
// import {
//   selectGetCededFromSupportingPolicy,
//   selectGetPolicyTypeFromSupportingPolicy,
//   selectSupportingPolicies,
//   selectSupportingPolicyClaimNumbers,
//   selectUcvRequestPartyId,
// } from './selectors';
// import { selectTransactionType } from '../actions/selectors';
// // import { TRANSACTION_TYPES } from '~shared/constants/TransactionTypes';
// export const TRANSACTION_TYPES = {
//     NEW_BUSINESS: 'New Business',
//     CURP: 'Claims in the URP',
//     RENEWAL: 'Renewal',
//     LATE_PAY: 'Late Pay',
//     REINSTATEMENT: 'Reinstatement',
//   };
// import { selectPolicyNumber } from '../policy/selectors';
// import { selectQuoteOrPolicyStateCode } from '../selectors';
// import { selectPolicyTypeTranslationGetter } from '../selectors/cms/policy_type';
// import { isRecreationalVehicle, isWatercraft } from './utilities';

// export const MAP_UCV = 'MAP_UCV';
// export const MAP_EXPOSURES = 'MAP_EXPOSURES';
// export const TOGGLE_EXPOSURES_LOADING = 'TOGGLE_EXPOSURES_LOADING';
// export const MAP_SUPPORTING_POLICY_CLAIMS = 'MAP_SUPPORTING_POLICY_CLAIMS';
// export const TOGGLE_SUPPORTING_POLICY_CLAIMS_LOADING = 'TOGGLE_SUPPORTING_POLICY_CLAIMS_LOADING'; //prettier-ignore
// export const TOGGLE_NARRATIVE_HISTORY_LOADING =
//   'TOGGLE_NARRATIVE_HISTORY_LOADING';
// export const MAP_NARRATIVE_HISTORY = 'MAP_NARRATIVE_HISTORY';
// export const MAP_SUPPORTING_LINES = 'MAP_SUPPORTING_LINES';

// const mapUcvAction = ({ error, payload }) => ({
//   type: MAP_UCV,
//   error,
//   payload,
// });

// const mapExposuresAction = (exposures) => ({
//   type: MAP_EXPOSURES,
//   exposures,
// });

// const mapSupportingLinesAction = (payload) => ({
//   type: MAP_SUPPORTING_LINES,
//   payload,
// });

// const mapSupportingClaimsAction = (nextGenClaims) => ({
//   type: MAP_SUPPORTING_POLICY_CLAIMS,
//   nextGenClaims,
// });

// const maprenewalNarrativeHistoryAction = ({ error, payload }) => ({
//   type: MAP_NARRATIVE_HISTORY,
//   error,
//   payload,
// });

// const toggleExposuresLoadingAction = (bool) => ({
//   type: TOGGLE_EXPOSURES_LOADING,
//   isExposuresLoading: bool,
// });

// const toggleSupportingClaimsLoadingAction = (bool) => ({
//   type: TOGGLE_SUPPORTING_POLICY_CLAIMS_LOADING,
//   isSupportingPolicyClaimsLoading: bool,
// });

// const toggleRenewalNarrativeHistoryLoadingAction = (bool) => ({
//   type: TOGGLE_NARRATIVE_HISTORY_LOADING,
//   isRenewalNarrativeHistoryLoading: bool,
// });

// export const createUcvCallAndRetryAction = () => async (dispatch, getState) => {
//   const MAX_UCV_ATTEMPTS = 3;
//   const DELAY_BETWEEN_UCV_ATTEMPTS = 1337;

//   const partyId = selectUcvRequestPartyId(getState());
//   const transactionType = selectTransactionType(getState());
//   const policyNumber = selectPolicyNumber(getState());

//   try {
//     const ucvServiceCall = (() => {
//       switch (transactionType) {
//         case TRANSACTION_TYPES.RENEWAL:
//           return async () => services.ucvByPolicyNumber({ policyNumber }); // array of objects
//         default:
//           return async () => services.ucv({ partyId }); // single object
//       }
//     })();

//     const ucvResponse = await asyncRetry(
//       ucvServiceCall,
//       MAX_UCV_ATTEMPTS,
//       DELAY_BETWEEN_UCV_ATTEMPTS,
//     );

//     const ucvResponses =
//       ucvResponse instanceof Array ? ucvResponse : [ucvResponse];

//     const holdings = ucvResponses.flatMap((ucvResponse) =>
//       get(ucvResponse, 'RetrievePartyInfoRs.Holding', []),
//     );

//     if (isEmpty(holdings)) {
//       //TODO: log error from "successful" response
//       dispatch(mapUcvAction({ error: false }));
//     } else {
//       dispatch(mapUcvAction({ error: false, payload: holdings }));
//     }
//   } catch (err) {
//     dispatch(mapUcvAction({ error: true }));
//   }
// };

// export const createGetPolicyCallsAction = () => async (dispatch, getState) => {
//   dispatch(toggleExposuresLoadingAction(true));
//   //TODO: toggleSupportingClaimsLoadingAction?

//   const autoPayloads = [];
//   const boatPayloads = [];
//   const propertyPayloads = [];

//   const MAX_POLICY_ATTEMPTS = 3;
//   const DELAY_BETWEEN_POLICY_ATTEMPTS = 1337;
//   const policyTypeCmsTranslator = selectPolicyTypeTranslationGetter(getState());
//   const exposurePromises = selectSupportingPolicies(getState())
//     .filter((p) => p.status === 'A' && PERSONAL_LINES.includes(p.line))
//     .map(async (p) =>
//       asyncRetry(
//         async () => services.getPolicy('000000000000' + p.policyNumber),
//         MAX_POLICY_ATTEMPTS,
//         DELAY_BETWEEN_POLICY_ATTEMPTS,
//       )
//         .then((d) => {
//           if (!isEmpty(d)) {
//             const policyType = get(d, 'QuoteOrPolicy.Policy.PolicyTypeCd.SrcCd'); // prettier-ignore
//             return {
//               policyNumber: p.policyNumber,
//               controlNumber: get(d, 'QuoteOrPolicy.TransactionInfo[0].TransactionPriorControlNumber'), // prettier-ignore
//               line: p.line,
//               company: get(d, 'QuoteOrPolicy.Policy.CompanyProductCd.SrcCd'),
//               policyType,
//               policyForm: policyTypeCmsTranslator(policyType),
//               error: false,
//               data: d,
//             };
//           }

//           return {
//             policyNumber: p.policyNumber,
//             line: p.line,
//             error: true,
//           };
//         })
//         .catch((e) => ({
//           policyNumber: p.policyNumber,
//           line: p.line,
//           error: true,
//           message: e.message,
//         })),
//     );

//   // Resolve all the promises (and thereby their 'then' and 'catch' methods)
//   await Promise.all(exposurePromises).then((exposures) => {
//     return exposures.forEach((exposure) => {
//       if (BOAT_LINE.includes(exposure.line)) {
//         if (isRecreationalVehicle(exposure)) {
//           exposure.line = '096';
//           autoPayloads.push(exposure);
//         } else if (isWatercraft(exposure)) {
//           exposure.line = '096';
//           boatPayloads.push(exposure);
//         } else {
//           boatPayloads.push(exposure);
//         }
//       } else if (ALL_AUTO_LINES.includes(exposure.line)) {
//         autoPayloads.push(exposure);
//       } else if (PROPERTY_LINES.includes(exposure.line)) {
//         propertyPayloads.push(exposure);
//       }
//     });
//   });

//   dispatch(mapSupportingLinesAction({ autoPayloads, boatPayloads, propertyPayloads })); // prettier-ignore
  
//   //call the reducer with the resulting payloads and merge them back into the store?
//   //called before supporting claims actions so they already have payload data in store
//   dispatch(mapExposuresAction({ autoPayloads, boatPayloads, propertyPayloads })); //prettier-ignore
//   dispatch(toggleExposuresLoadingAction(false));
// };

// export const createGetSupportingClaimsCallsAction = () => async (
//   dispatch,
//   getState,
// ) => {
//   dispatch(toggleSupportingClaimsLoadingAction(true));

//   const transactionType = selectTransactionType(getState());
//   const policyClaimNumbers = selectSupportingPolicyClaimNumbers(getState()); // prettier-ignore
//   const getPolicyTypeFromSupportingPolicy = selectGetPolicyTypeFromSupportingPolicy(getState()); // prettier-ignore
//   const getCededFromSupportingPolicy = selectGetCededFromSupportingPolicy(getState()); //prettier-ignore
//   const supportingPolicyClaims = [];

//   Object.values(policyClaimNumbers).forEach(
//     ({ policyNumber, line, company, state, claims }) => {
//       const policyType = getPolicyTypeFromSupportingPolicy(policyNumber);
//       const ceded = getCededFromSupportingPolicy(policyNumber);
//       claims.forEach(({ claimNumber }) =>
//         supportingPolicyClaims.push(
//           asyncRetry(async () => services.nextGenV2(claimNumber), 3, 1337)
//             .then((d) => ({
//               policyNumber,
//               claimNumber,
//               line,
//               policyType,
//               transactionType,
//               company,
//               state,
//               ceded,
//               data: d,
//             }))
//             .catch((e) => ({
//               policyNumber,
//               claimNumber,
//               line,
//               policyType,
//               transactionType,
//               company,
//               state,
//               ceded,
//               data: e.message,
//               error: true,
//             })),
//         ),
//       );
//     },
//   );

//   // todo figure out if we need to filter out failed claims???
//   await Promise.all(supportingPolicyClaims).then((claims) => {
//     dispatch(mapSupportingClaimsAction(claims));
//   });

//   dispatch(toggleSupportingClaimsLoadingAction(false));
// };

// export const createRenewalNarrativeHistoryCallAction = () => async (
//   dispatch,
//   getState,
// ) => {
//   const MAX_ACTIVITY_HISTORY_ATTEMPTS = 3;
//   const DELAY_BETWEEN_ACTIVITY_HISTORY_ATTEMPTS = 1337;
//   const data = {
//     state: selectQuoteOrPolicyStateCode(getState()),
//     policyNumber: selectPolicyNumber(getState()),
//   };

//   try {
//     dispatch(toggleRenewalNarrativeHistoryLoadingAction(true));
//     const narrativeHistoryResponse = await asyncRetry(
//       async () => services.renewalNarrativeHistory(data),
//       MAX_ACTIVITY_HISTORY_ATTEMPTS,
//       DELAY_BETWEEN_ACTIVITY_HISTORY_ATTEMPTS,
//     );
//     dispatch(maprenewalNarrativeHistoryAction({ error: false, payload: narrativeHistoryResponse})); //prettier-ignore
//   } catch (err) {
//     dispatch(maprenewalNarrativeHistoryAction({ error: true }));
//   } finally {
//     dispatch(toggleRenewalNarrativeHistoryLoadingAction(false));
//   }
// };
