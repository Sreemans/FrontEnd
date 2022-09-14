import axios from 'axios';

export const getAssociations = async (dispatch, getState) => {
  try {
    dispatch({
      type: 'association/isLoading',
      payload: true,
    });
    const { data } = await axios.get(
      `/lmr/api/association/${getState().association.currentPage -
        1}?productIds=${getState().association.products}&eventTypes=${
        getState().association.eventTypes
      }&templateIds=${getState().association.templateIds}`,
      {
        validateStatus: (status) => status < 400, // Reject only if the status code is greater than or equal to 500
      },
    );
    dispatch({
      type: 'association/retrieve',
      payload: data,
    });
  } catch (err) {
    const  message  = 'Unable to retrieve results. Please narrow down your selection.';
    dispatch({
      type: 'association/retrieveFailure',
      // payload: err.response.data.message,
      payload: message,
      error: true,
    });
  }
};

export const saveAssociations = async (dispatch, getState) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: '/lmr/api/association',
      data: getState().association.associationRecords,
      validateStatus: (status) => status < 400,
    });
    dispatch(getAssociations);
    if (!data.error) {
      dispatch({
        type: 'association/saveSuccess',
        payload: data,
      });
    } else {
      dispatch({
        type: 'association/saveFailure',
        payload: data,
      });
    }
  } catch (err) {
    dispatch({
      type: 'association/saveFailure',
      payload: { data: err.response.data.message },
    });
  }
};

export const updateAssociations = async (dispatch, getState) => {
  try {
    dispatch({
      type: 'association/isLoading',
      payload: true,
    });
    const { data } = await axios({
      method: 'put',
      url: '/lmr/api/association',
      data: getState().association.associations,
      validateStatus: (status) => status < 400,
    });
    dispatch({
      type: 'association/saveSuccess',
      payload: data,
    });
    dispatch(getAssociations);
  } catch (err) {
    dispatch({
      type: 'association/saveFailure',
      payload: err.response.data.message,
      error: true,
    });
  }
};

export const exportToExcelAssociation = async (dispatch, getState) => {
  try {
    dispatch({
      type: 'association/isLoading',
      payload: true,
    });
    const response = await axios({
      method: 'get',
      url: `/lmr/api/association/export-to-excel?productIds=${
        getState().association.products
      }&eventTypes=${getState().association.eventTypes}&templateIds=${
        getState().association.templateIds
      }`,
      responseType: 'arraybuffer',
      validateStatus: (status) => status < 400,
    });
    const fileName = response.headers['content-disposition'].split(
      'filename=',
    )[1];
    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
    dispatch({
      type: 'association/isLoading',
      payload: false,
    });
  } catch (err) {
    const decodedString = String.fromCharCode.apply(
      null,
      new Uint8Array(err.response.data),
    );
    const { message } = JSON.parse(decodedString);
    dispatch({
      type: 'association/exportFailure',
      payload: message,
    });
  }
};

export const deleteAssociations = async (dispatch, getState) => {
  try {
    dispatch({
      type: 'association/isLoading',
      payload: true,
    });
    const { data } = await axios({
      method: 'delete',
      url: `/lmr/api/association/?associations=${
        getState().association.selectedRecords
      }`,
      data: getState().association.associations,
      validateStatus: (status) => status < 400,
    });
    dispatch({
      type: 'association/deleteSuccess',
      payload: data,
    });
    dispatch(getAssociations);
  } catch (err) {
    dispatch({
      type: 'association/deleteFailure',
      payload: err.response.data.message,
      error: true,
    });
  }
};
