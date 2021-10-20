import {ChannelType} from "../../types"

type channelState = {
    channelList: Array<ChannelType>
    currentChannel: Array<string>
}
type ChannelAction = {
    type: string
    payload?: any
}
const InitialState: channelState = {
    channelList: [],
    currentChannel: []
}

const channelReducer = (state = InitialState, action: ChannelAction): channelState => {
    switch (action.type) {
        case "CHANNELS:SET_CHANNELS":
            return {...state, channelList: [...state.channelList, ...action.payload]}
        case "CHANNELS:SET_CURRENT_CHANNEL_ID":
            return {...state, currentChannel: action.payload}
        default: 
            return state;
    }
}

export default channelReducer;