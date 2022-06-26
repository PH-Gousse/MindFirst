/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChatRoomUserByUserId = /* GraphQL */ `
  subscription OnCreateChatRoomUserByUserId($userId: ID!) {
    onCreateChatRoomUserByUserId(userId: $userId) {
      id
      userId
      chatRoomId
      user {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageContent
        lastMessageUserId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      phoneNumber
      email
      isOnBoardingCompleted
      profile {
        id
        firstName
        lastName
        birthday
        gender
        interestedIn
        shortDescription
        photos {
          nextToken
        }
        ageRange
        location
        createdAt
        updatedAt
      }
      answers {
        items {
          id
          userID
          createdAt
          updatedAt
          answerQuestionId
          answerOptionId
        }
        nextToken
      }
      status
      chatRoomUser {
        items {
          id
          userId
          chatRoomId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      userProfileId
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      phoneNumber
      email
      isOnBoardingCompleted
      profile {
        id
        firstName
        lastName
        birthday
        gender
        interestedIn
        shortDescription
        photos {
          nextToken
        }
        ageRange
        location
        createdAt
        updatedAt
      }
      answers {
        items {
          id
          userID
          createdAt
          updatedAt
          answerQuestionId
          answerOptionId
        }
        nextToken
      }
      status
      chatRoomUser {
        items {
          id
          userId
          chatRoomId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      userProfileId
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      phoneNumber
      email
      isOnBoardingCompleted
      profile {
        id
        firstName
        lastName
        birthday
        gender
        interestedIn
        shortDescription
        photos {
          nextToken
        }
        ageRange
        location
        createdAt
        updatedAt
      }
      answers {
        items {
          id
          userID
          createdAt
          updatedAt
          answerQuestionId
          answerOptionId
        }
        nextToken
      }
      status
      chatRoomUser {
        items {
          id
          userId
          chatRoomId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      userProfileId
    }
  }
`;
export const onCreateBlockedUser = /* GraphQL */ `
  subscription OnCreateBlockedUser {
    onCreateBlockedUser {
      id
      blockerId
      blockeeId
      blocker {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      blockee {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      reason
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBlockedUser = /* GraphQL */ `
  subscription OnUpdateBlockedUser {
    onUpdateBlockedUser {
      id
      blockerId
      blockeeId
      blocker {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      blockee {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      reason
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBlockedUser = /* GraphQL */ `
  subscription OnDeleteBlockedUser {
    onDeleteBlockedUser {
      id
      blockerId
      blockeeId
      blocker {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      blockee {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      reason
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile {
    onCreateProfile {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      ageRange
      location
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile {
    onUpdateProfile {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      ageRange
      location
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile {
    onDeleteProfile {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      ageRange
      location
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePhoto = /* GraphQL */ `
  subscription OnCreatePhoto {
    onCreatePhoto {
      id
      profileID
      key
      position
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePhoto = /* GraphQL */ `
  subscription OnUpdatePhoto {
    onUpdatePhoto {
      id
      profileID
      key
      position
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePhoto = /* GraphQL */ `
  subscription OnDeletePhoto {
    onDeletePhoto {
      id
      profileID
      key
      position
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOption = /* GraphQL */ `
  subscription OnCreateOption {
    onCreateOption {
      id
      label
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOption = /* GraphQL */ `
  subscription OnUpdateOption {
    onUpdateOption {
      id
      label
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOption = /* GraphQL */ `
  subscription OnDeleteOption {
    onDeleteOption {
      id
      label
      createdAt
      updatedAt
    }
  }
`;
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
      id
      option1 {
        id
        label
        createdAt
        updatedAt
      }
      option2 {
        id
        label
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      questionOption1Id
      questionOption2Id
    }
  }
`;
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
      id
      option1 {
        id
        label
        createdAt
        updatedAt
      }
      option2 {
        id
        label
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      questionOption1Id
      questionOption2Id
    }
  }
`;
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
      id
      option1 {
        id
        label
        createdAt
        updatedAt
      }
      option2 {
        id
        label
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      questionOption1Id
      questionOption2Id
    }
  }
`;
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer {
    onCreateAnswer {
      id
      userID
      question {
        id
        option1 {
          id
          label
          createdAt
          updatedAt
        }
        option2 {
          id
          label
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        questionOption1Id
        questionOption2Id
      }
      option {
        id
        label
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      answerQuestionId
      answerOptionId
    }
  }
`;
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer {
    onUpdateAnswer {
      id
      userID
      question {
        id
        option1 {
          id
          label
          createdAt
          updatedAt
        }
        option2 {
          id
          label
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        questionOption1Id
        questionOption2Id
      }
      option {
        id
        label
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      answerQuestionId
      answerOptionId
    }
  }
`;
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer {
    onDeleteAnswer {
      id
      userID
      question {
        id
        option1 {
          id
          label
          createdAt
          updatedAt
        }
        option2 {
          id
          label
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        questionOption1Id
        questionOption2Id
      }
      option {
        id
        label
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      answerQuestionId
      answerOptionId
    }
  }
`;
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser {
    onCreateChatRoomUser {
      id
      userId
      chatRoomId
      user {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageContent
        lastMessageUserId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChatRoomUser = /* GraphQL */ `
  subscription OnUpdateChatRoomUser {
    onUpdateChatRoomUser {
      id
      userId
      chatRoomId
      user {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageContent
        lastMessageUserId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChatRoomUser = /* GraphQL */ `
  subscription OnDeleteChatRoomUser {
    onDeleteChatRoomUser {
      id
      userId
      chatRoomId
      user {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageContent
        lastMessageUserId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
      id
      chatRoomUsers {
        items {
          id
          userId
          chatRoomId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          userId
          chatRoomId
          createdAt
          updatedAt
        }
        nextToken
      }
      lastMessageContent
      lastMessageUserId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
      id
      chatRoomUsers {
        items {
          id
          userId
          chatRoomId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          userId
          chatRoomId
          createdAt
          updatedAt
        }
        nextToken
      }
      lastMessageContent
      lastMessageUserId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
      id
      chatRoomUsers {
        items {
          id
          userId
          chatRoomId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          userId
          chatRoomId
          createdAt
          updatedAt
        }
        nextToken
      }
      lastMessageContent
      lastMessageUserId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      content
      userId
      chatRoomId
      user {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageContent
        lastMessageUserId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      content
      userId
      chatRoomId
      user {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageContent
        lastMessageUserId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      content
      userId
      chatRoomId
      user {
        id
        phoneNumber
        email
        isOnBoardingCompleted
        profile {
          id
          firstName
          lastName
          birthday
          gender
          interestedIn
          shortDescription
          ageRange
          location
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
        userProfileId
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageContent
        lastMessageUserId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
