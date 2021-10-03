
type ChannelType = {
    _id: string
    author: string
    name: string
    imgUrl: string
    date: string
}
type MessageType = {
    _id: string
    chat_id: string
    author: string
    text: string
    date: string
}

export type {ChannelType, MessageType};