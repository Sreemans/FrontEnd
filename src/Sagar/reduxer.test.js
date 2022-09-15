import {
  productsReducer,
  CRV_PRODUCTS_ADD_ACTIVE_CLIENT_ID,
  CRV_PRODUCTS_REPLACE_ACTIVE_CLIENT_ID,
  CRV_PRODUCTS_REMOVE_ACTIVE_CLIENT_ID,
  CRV_PRODUCTS_LOAD_DETAILS_START,
  CRV_PRODUCTS_LOAD_DETAILS_SUCCESS,
  CRV_PRODUCTS_LOAD_DETAILS_ERROR,
  CRV_PRODUCTS_REPLACE_DETAILS_LIST,
} from "./reducer";
const actions = [
  {
    actionName: CRV_PRODUCTS_ADD_ACTIVE_CLIENT_ID,
    payload: { productClientId: "ID" },
  },
  {
    actionName: CRV_PRODUCTS_REPLACE_ACTIVE_CLIENT_ID,
    payload: { productClientIds: [] },
  },
  {
    actionName: CRV_PRODUCTS_REMOVE_ACTIVE_CLIENT_ID,
    payload: { productClientId: "890" },
    state: { activeDetailsClientIds: ["890"], details: [] },
  },
  {
    actionName: CRV_PRODUCTS_LOAD_DETAILS_START,
    state: {
      details: [
        {
          productClientId: "100",
        },
        {
          productClientId: "200",
        },
      ],
    },
    payload: { productClientId: "100" },
  },
  {
    actionName: CRV_PRODUCTS_LOAD_DETAILS_SUCCESS,
    payload: {
      productClientId: "100",
      data: [],
    },
    state: {
      details: [
        {
          productClientId: "100",
        },
        {
          productClientId: "200",
        },
      ],
    },
  },
  {
    actionName: CRV_PRODUCTS_LOAD_DETAILS_ERROR,
    payload: {
      productClientId: "100",
      error: "",
    },
    state: {
      details: [
        {
          productClientId: "100",
        },
        {
          productClientId: "200",
        },
      ],
    },
  },
  {
    actionName: CRV_PRODUCTS_REPLACE_DETAILS_LIST,
    payload: { choosenProductClientId: "chosen Id", detailsList: [] },
  },
  {},
];
describe("testing products reducer", () => {
  it("testing each case", () => {
    actions.forEach((action) => {
      const expected = "object";
      const received = productsReducer(action.state, {
        type: action.actionName,
        payload: action.payload,
      });
      expect(typeof received).toBe(expected);
    });
  });
});
