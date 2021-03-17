import { toast } from 'react-toastify';
import * as Type from './types';
import { get, post, put, deleteApi } from '../api';
export const getEmployeeOrders = () => async (dispatch) => {
  try {
    const res = await get(`/orders/getEmployeeOrders`);
    dispatch({
      type: Type.GET_EMPLOYEE_ORDERS,
      payload: res.data
    });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
export const getEmployeeOrdersForStaffPage = () => async (dispatch) => {
  try {
    const res = await get(`/orders/getEmployeeOrdersForStaffPage`);
    dispatch({
      type: Type.GET_ORDER_FOR_STAFF,
      payload: res.data
    });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
export const getStaff = () => async (dispatch) => {
  try {
    const res = await get(`/auth/getStaff`);
    dispatch({
      type: Type.GET_ALL_STAFF,
      payload: res.data
    });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
export const getEmployeeAndStaff = () => async (dispatch) => {
  try {
    const res = await get(`/auth/getEmployeeAndStaff`);
    dispatch({
      type: Type.GET_ALL_EMPLOYEE_STAFF,
      payload: res.data
    });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
export const updatePaymentStatus = (state) => async (dispatch) => {
  post('/auth/updatePaymentStatus', { id: state })
    .then((response) => {
      toast.success('Payment is Paid');
      dispatch(getEmployeeAndStaff());
      dispatch(getStaff());
    })
    .catch((error) => {
      toast.error(error.response.data.error);
    });
};
export const updateToVip = (data) => async (dispatch) => {
  try {
    await post('/orders/updateOrderStatus', data);
    dispatch(getEmployeeOrders());
  } catch (error) {
    console.log(error);
  }
};

export const processedOrder = () => async (dispatch) => {
  try {
    debugger;
    const res = await get(`/orders/processedOrder`);
    dispatch({
      type: Type.PROCESSED_ORDER,
      payload: res.data
    });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
export const wipOrder = () => async (dispatch) => {
  try {
    debugger;
    const res = await get(`/orders/wipOrder`);
    dispatch({
      type: Type.WIP_ORDER,
      payload: res.data
    });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
export const plannedOrder = () => async (dispatch) => {
  try {
    debugger;
    const res = await get(`/orders/plannedOrder`);
    dispatch({
      type: Type.PLANNED_ORDER,
      payload: res.data
    });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
export const pieChartOrders = () => async (dispatch) => {
  try {
    debugger;
    const res = await get(`/orders/pieChartOrders`);
    dispatch({
      type: Type.PIE_CHART_EMP_DATA,
      payload: res.data
    });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
export const weeklyOrdersPrice = () => async (dispatch) => {
  try {
    debugger;
    const res = await get(`/orders/weeklyOrdersPrice`);
    dispatch({
      type: Type.WEEKLY_ORDER_PRICES,
      payload: res.data
    });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
export const monthlyOrdersPrice = () => async (dispatch) => {
  try {
    debugger;
    const res = await get(`/orders/monthlyOrdersPrice`);
    dispatch({
      type: Type.MONTHLY_ORDER_PRICES,
      payload: res.data
    });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
export const yearlyOrdersPrice = () => async (dispatch) => {
  try {
    debugger;
    const res = await get(`/orders/yearlyOrdersPrice`);
    dispatch({
      type: Type.YEARLY_ORDER_PRICES,
      payload: res.data
    });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
export const updateOrderDone = (data) => async (dispatch) => {
  try {
    await post('/orders/updateOrderStatus', data);
    dispatch(getEmployeeOrders());
  } catch (error) {
    console.log(error);
  }
};
export const updateOrderAcceptOrReject = (data) => async (dispatch) => {
  try {
    await post('/orders/updateOrderStatus', data);
    dispatch(getEmployeeOrders());
  } catch (error) {
    console.log(error);
  }
};
export const completedProject = (data) => async (dispatch) => {
  try {
    const res = get('/projects/completedProject');
    dispatch({
      type: Type.COMPLETED_PROJECTS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
