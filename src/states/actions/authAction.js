import { authActions } from "../../constants/enums";

// Action creators
export const login = (user) => ({
    type: authActions.LOGIN,
    payload: user,
});

export const logout = () => ({
    type: authActions.LOGOUT,
});