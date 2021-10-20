
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
    date: string,
    attachments: Array<string>;
    replyTo_id: string
}

type emoteObject = {
    emoteName: string,
    emoteURI: string 
}

interface emoteObjectExt extends emoteObject {
    indexOfEmote: number
}

type textFragmentObject = {
    type: "text",
    data: string
}
type emoteFragmentObject = {
    type: "emote",
    data: emoteObjectExt
}

export type {ChannelType, MessageType, emoteObject, emoteObjectExt, textFragmentObject, emoteFragmentObject};