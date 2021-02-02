export class Message {
    id?: string;
    receiverId?: string;
    senderId?: string;
    timestamp?: Date;
    itemId?: string;
    content?: string;
    read?: boolean;
    receiverPseudo?: string;
    senderPseudo?: string
}