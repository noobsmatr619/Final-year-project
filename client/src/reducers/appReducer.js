import * as Type from '../actions/types';
const initialState = {
  token: localStorage.getItem('CRM_TOKEN'),
  isAuth: false,
  user: null,
  role: null,
  employees: [],
  staff: [],
  employeeOrder: [],
  employeeAndStaff: [],
  orderForStaff: [],
  myTeam: [],
  teams: [],
  processedOrder: 0,
  wipOrder: 0,
  plannedOrder: 0,
  empPieChart: {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0
  },
  weeklyOrdersPrice: 0,
  monthlyOrdersPrice: 0,
  yearlyOrdersPrice: 0,
  projects: [],
  accidents: [],
  locationAccidents: []
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_ACCIDENT:
      return {
        ...state,
        accidents: action.payload
      };
    case Type.GET_LOCATION_ACCIDENT:
      return {
        ...state,
        locationAccidents: action.payload
      };
    case Type.PIE_CHART_EMP_DATA:
      return {
        ...state,
        empPieChart: action.payload
      };
    case Type.WEEKLY_ORDER_PRICES:
      return {
        ...state,
        weeklyOrdersPrice: action.payload
      };
    case Type.MONTHLY_ORDER_PRICES:
      return {
        ...state,
        monthlyOrdersPrice: action.payload
      };
    case Type.YEARLY_ORDER_PRICES:
      return {
        ...state,
        yearlyOrdersPrice: action.payload
      };
    case Type.PROCESSED_ORDER:
      return {
        ...state,
        processedOrder: action.payload
      };
    case Type.PLANNED_ORDER:
      return {
        ...state,
        plannedOrder: action.payload
      };
    case Type.WIP_ORDER:
      return {
        ...state,
        wipOrder: action.payload
      };
    case Type.REGISTER_USER:
      localStorage.setItem('CRM_TOKEN', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuth: true
      };
    case Type.LOGIN_USER:
      localStorage.setItem('CRM_TOKEN', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuth: true
      };
    case Type.LOGOUT_USER:
      localStorage.removeItem('CRM_TOKEN');
      return {
        ...state,
        token: null,
        user: null,
        role: null,
        isAuthenticated: false
      };
    case Type.LOAD_USER:
      return {
        ...state,
        isAuth: true,
        role: action.payload.type,
        user: action.payload
      };
    case Type.GET_USER:
      return {
        ...state,
        employees: action.payload
      };
    case Type.GET_MY_TEAMS:
      return {
        ...state,
        myTeam: action.payload
      };
    case Type.GET_ALL_STAFF:
      return {
        ...state,
        staff: action.payload
      };
    case Type.GET_ALL_EMPLOYEE_STAFF:
      return {
        ...state,
        employeeAndStaff: action.payload
      };
    case Type.GET_ORDER_FOR_STAFF:
      return {
        ...state,
        orderForStaff: action.payload
      };
    case Type.GET_EMPLOYEE_ORDERS:
      return {
        ...state,
        employeeOrder: action.payload
      };
    case Type.GET_ALL_TEAM:
      return {
        ...state,
        teams: action.payload
      };
    case Type.GET_ALL_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    default:
      return state;
  }
};