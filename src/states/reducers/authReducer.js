import { authActions } from "../../constants/enums";

const initialState = {
    //isAuthenticated: false,
    user: null, // Stores user details, including roles
};

// Reducer
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActions.LOGIN:
            return {
                ...state,
                //isAuthenticated: true,
                user: action.payload,
            };
        case authActions.LOGOUT:
            return {
                ...state,
                //isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;