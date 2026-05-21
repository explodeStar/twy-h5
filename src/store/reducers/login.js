// import { ref } from "yup";

const initValue = {
    token: "",
    refreshToken: "",

}

export default function login(state = initValue, action) {
    console.log("login reducer", state, action);
    switch (action.type) {
        case "SET_TOKEN":
            return {
                ...state,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
            }
        default:
            return state;
    }   
}