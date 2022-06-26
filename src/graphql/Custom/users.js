export const userByPhoneNumber = /* GraphQL */ `
  query UserByPhoneNumber(
    $phoneNumber: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByPhoneNumber(
      phoneNumber: $phoneNumber
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          birthday
          gender
          interestedIn
          ageRange
          location
          shortDescription
          photos {
            items {
              id
              profileID
              key
              position
            }
          }
        }
      }
    }
  }
`;

export const getRankByUser = /* GraphQL */ `
  query GetRankByUser($userId: ID) {
    getRankByUser(userId: $userId) {
      userId
      percentage
      profile {
        id
        firstName
        lastName
        birthday
        location
        shortDescription
        gender
        interestedIn
        photos {
          items {
            id
            profileID
            key
            position
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      answerWithSameQuestions {
        questionId
        option1
        option2
        optionCurrentUser
        optionUser
      }
    }
  }
`;

export const messagesByChatRoom = /* GraphQL */ `
  query MessagesByChatRoom(
    $chatRoomId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChatRoom(
      chatRoomId: $chatRoomId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        userId
        chatRoomId
        user {
          id
          phoneNumber
          email
          isOnBoardingCompleted
          status
          profile {
            firstName
            photos {
              items {
                id
                profileID
                key
                position
              }
            }
          }
        }
        chatRoom {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      chatRoomUser {
        items {
          chatRoom {
            id
            chatRoomUsers {
              items {
                user {
                id
                  profile {
                    firstName
                    photos {
                      items {
                        id
                        key
                        position
                      }
                    }
                  }                 
                }
              }
            }
            lastMessageContent
            lastMessageUserId
          }
        }
        nextToken
      }
    }
  }
`;

export const getUserRankData = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            profile {
                id
                firstName
                lastName
                birthday
                gender
                interestedIn
                shortDescription
                photos {
                    items {
                        id
                        profileID
                        key
                        position
                    }
                    nextToken
                }
            }
            answers {
                items {
                    id
                    option {
                        label
                    }
                    question {
                        id
                        option1 {
                            label
                        }
                        option2 {
                            label
                        }
                    }
                    userID
                }
                nextToken
            }
        }
    }
`;
