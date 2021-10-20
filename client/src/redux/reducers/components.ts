type ComponentsState = {
    emotesVisible: boolean
    popupVisible: boolean
    menuVisible: boolean
}

type ComponentsAction = {
    type: string
    payload?: any
}

const InitialState: ComponentsState = {
    emotesVisible: false,
    popupVisible: false,
    menuVisible: false
}

const componentsReducer = (state = InitialState, action: ComponentsAction): ComponentsState => {
    switch (action.type) {
        case "EMOTES:SET_VISIBLE":
            return {...state, emotesVisible: !state.emotesVisible};
        case "POPUP:SET_VISIBLE":
            return {...state, popupVisible: !state.popupVisible};
        case "MENU:SET_VISIBLE":
            return {...state, menuVisible: !(state.menuVisible)}
        default: 
            return state;
    }

}

export default componentsReducer;