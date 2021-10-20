import {MessageType} from "../../types"

type MessagesState = {
    reply_id: string
    messages: Array<MessageType>
} 

const InitialState: MessagesState = {
    reply_id: '',
    messages: []
}

type MessagesAction = {
    type: string,
    payload?: any
}

const MessagesReducer = (state = InitialState, action: MessagesAction) => {
    switch (action.type) {
        case "MESSAGES:SET_REPLY":
            return {...state, reply_id: action.payload};
        default: 
            return state;
    }
}

export default MessagesReducer;