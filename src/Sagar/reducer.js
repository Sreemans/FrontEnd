// import { defaultProductsState } from './state';
export const defaultProductsState = {
  activeDetailsClientIds: [],
  details: [],
};
// import {
//   CRV_PRODUCTS_ADD_ACTIVE_CLIENT_ID,
//   CRV_PRODUCTS_REPLACE_ACTIVE_CLIENT_ID,
//   CRV_PRODUCTS_REMOVE_ACTIVE_CLIENT_ID,
//   CRV_PRODUCTS_LOAD_DETAILS_START,
//   CRV_PRODUCTS_LOAD_DETAILS_SUCCESS,
//   CRV_PRODUCTS_LOAD_DETAILS_ERROR,
//   CRV_PRODUCTS_REPLACE_DETAILS_LIST,
// } from './actions';
export const CRV_PRODUCTS_ADD_ACTIVE_CLIENT_ID =
  "CRV_PRODUCTS_ADD_ACTIVE_CLIENT_ID";
export const CRV_PRODUCTS_REPLACE_ACTIVE_CLIENT_ID =
  "CRV_PRODUCTS_REPLACE_ACTIVE_CLIENT_ID";
export const CRV_PRODUCTS_REMOVE_ACTIVE_CLIENT_ID =
  "CRV_PRODUCTS_REMOVE_ACTIVE_CLIENT_ID";
export const CRV_PRODUCTS_LOAD_DETAILS_START =
  "CRV_PRODUCTS_LOAD_DETAILS_START";
export const CRV_PRODUCTS_LOAD_DETAILS_SUCCESS =
  "CRV_PRODUCTS_LOAD_DETAILS_SUCCESS";
export const CRV_PRODUCTS_LOAD_DETAILS_ERROR =
  "CRV_PRODUCTS_LOAD_DETAILS_ERROR";
export const CRV_PRODUCTS_REPLACE_DETAILS_LIST =
  "CRV_PRODUCTS_REPLACE_DETAILS_LIST";

function replaceProductDetailsData(
  allProductDetailsList,
  productClientId,
  replacer
) {
  const productDetailsWithReplacedOne = allProductDetailsList.map(
    (detailsData) => {
      if (detailsData.productClientId !== productClientId) {
        return detailsData;
      }
      return replacer(detailsData);
    }
  );

  return productDetailsWithReplacedOne;
}

export function productsReducer(
  state = defaultProductsState,
  { type, payload }
) {
  switch (type) {
    // this action should only happen when you want to remove all data about details of products and replace it with fresh one (without any details loaded yet)
    case CRV_PRODUCTS_REPLACE_DETAILS_LIST:
      return {
        ...state,
        activeDetailsClientIds: [payload.choosenProductClientId],
        details: payload.detailsList,
      };
    case CRV_PRODUCTS_ADD_ACTIVE_CLIENT_ID:
      return {
        ...state,
        activeDetailsClientIds: [
          ...state.activeDetailsClientIds,
          payload.productClientId,
        ],
      };
    case CRV_PRODUCTS_REPLACE_ACTIVE_CLIENT_ID:
      return {
        ...state,
        activeDetailsClientIds: payload.productClientIds,
      };
    case CRV_PRODUCTS_REMOVE_ACTIVE_CLIENT_ID:
      return {
        ...state,
        activeDetailsClientIds: state.activeDetailsClientIds.filter(
          (productClientId) => productClientId !== payload.productClientId
        ),
      };
    case CRV_PRODUCTS_LOAD_DETAILS_START:
      return {
        ...state,
        details: replaceProductDetailsData(
          state.details,
          payload.productClientId,
          (productDetails) => ({
            ...productDetails,
            error: null,
            isLoading: true,
          })
        ),
      };
    case CRV_PRODUCTS_LOAD_DETAILS_SUCCESS:
      return {
        ...state,
        details: replaceProductDetailsData(
          state.details,
          payload.productClientId,
          (productDetails) => ({
            ...productDetails,
            isLoading: false,
            isLoaded: true,
            error: null,
            detailsData: payload.data,
          })
        ),
      };
    case CRV_PRODUCTS_LOAD_DETAILS_ERROR:
      return {
        ...state,
        details: replaceProductDetailsData(
          state.details,
          payload.productClientId,
          (productDetails) => ({
            ...productDetails,
            isLoading: false,
            isLoaded: false,
            error: payload.error,
          })
        ),
      };
    default:
      return state;
  }
}
