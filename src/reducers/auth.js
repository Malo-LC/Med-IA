const initialState = {
    isLoggedIn: false,
    user: null,
    // Add more state properties here if needed
  };
  
const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      // Add more cases here if needed
      default:
        return state;
    }
  };
  
  export default authReducer;
  