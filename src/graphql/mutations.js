/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createBlockedUser = /* GraphQL */ `
  mutation CreateBlockedUser(
    $input: CreateBlockedUserInput!
    $condition: ModelBlockedUserConditionInput
  ) {
    createBlockedUser(input: $input, condition: $condition) {
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
export const updateBlockedUser = /* GraphQL */ `
  mutation UpdateBlockedUser(
    $input: UpdateBlockedUserInput!
    $condition: ModelBlockedUserConditionInput
  ) {
    updateBlockedUser(input: $input, condition: $condition) {
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
export const deleteBlockedUser = /* GraphQL */ `
  mutation DeleteBlockedUser(
    $input: DeleteBlockedUserInput!
    $condition: ModelBlockedUserConditionInput
  ) {
    deleteBlockedUser(input: $input, condition: $condition) {
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
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
export const createPhoto = /* GraphQL */ `
  mutation CreatePhoto(
    $input: CreatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    createPhoto(input: $input, condition: $condition) {
      id
      profileID
      key
      position
      createdAt
      updatedAt
    }
  }
`;
export const updatePhoto = /* GraphQL */ `
  mutation UpdatePhoto(
    $input: UpdatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    updatePhoto(input: $input, condition: $condition) {
      id
      profileID
      key
      position
      createdAt
      updatedAt
    }
  }
`;
export const deletePhoto = /* GraphQL */ `
  mutation DeletePhoto(
    $input: DeletePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    deletePhoto(input: $input, condition: $condition) {
      id
      profileID
      key
      position
      createdAt
      updatedAt
    }
  }
`;
export const createOption = /* GraphQL */ `
  mutation CreateOption(
    $input: CreateOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    createOption(input: $input, condition: $condition) {
      id
      label
      createdAt
      updatedAt
    }
  }
`;
export const updateOption = /* GraphQL */ `
  mutation UpdateOption(
    $input: UpdateOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    updateOption(input: $input, condition: $condition) {
      id
      label
      createdAt
      updatedAt
    }
  }
`;
export const deleteOption = /* GraphQL */ `
  mutation DeleteOption(
    $input: DeleteOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    deleteOption(input: $input, condition: $condition) {
      id
      label
      createdAt
      updatedAt
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
export const createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $input: CreateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    createAnswer(input: $input, condition: $condition) {
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
export const updateAnswer = /* GraphQL */ `
  mutation UpdateAnswer(
    $input: UpdateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    updateAnswer(input: $input, condition: $condition) {
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
export const deleteAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $input: DeleteAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    deleteAnswer(input: $input, condition: $condition) {
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
export const createChatRoomUser = /* GraphQL */ `
  mutation CreateChatRoomUser(
    $input: CreateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    createChatRoomUser(input: $input, condition: $condition) {
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
export const updateChatRoomUser = /* GraphQL */ `
  mutation UpdateChatRoomUser(
    $input: UpdateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    updateChatRoomUser(input: $input, condition: $condition) {
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
export const deleteChatRoomUser = /* GraphQL */ `
  mutation DeleteChatRoomUser(
    $input: DeleteChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    deleteChatRoomUser(input: $input, condition: $condition) {
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
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
