export const initialState = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: ''
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "CLEAR_PROFILE":
      return initialState;
    default:
      return state;
  }
};
