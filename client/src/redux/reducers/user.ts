type UserState = {
    username: string
}

const InitialState: UserState = {
    username: "Anon"
}
type UserAction = {
    type: string,
    payload: string
}
const userReducer = (state = InitialState, action:UserAction): UserState => {
    switch (action.type) {
        case "USERS:SET_USERNAME":
            return{...state, username: action.payload};
        default:
            return state
    }
}
export default userReducer;