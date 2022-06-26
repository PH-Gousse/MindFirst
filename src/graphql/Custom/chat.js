export const createMessage = /* GraphQL */ `
    mutation CreateMessage(
        $input: CreateMessageInput!
        $condition: ModelMessageConditionInput
    ) {
        createMessage(input: $input, condition: $condition) {
            id
            content
            chatRoomId
            user {
                id
                status
                profile {
                    firstName
                }
            }
            chatRoom {
                id
            }
            createdAt
        }
    }
`;

export const onCreateMessage = /* GraphQL */ `
    subscription OnCreateMessage {
        onCreateMessage {
            id
            content
            chatRoomId
            user {
                id
                profile {
                    firstName
                }
                status
            }
            chatRoom {
                id
            }
            createdAt
        }
    }
`;
