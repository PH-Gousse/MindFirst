/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getBlockedUser = /* GraphQL */ `
  query GetBlockedUser($id: ID!) {
    getBlockedUser(id: $id) {
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
export const listBlockedUsers = /* GraphQL */ `
  query ListBlockedUsers(
    $filter: ModelBlockedUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlockedUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        blockerId
        blockeeId
        blocker {
          id
          phoneNumber
          email
          isOnBoardingCompleted
          status
          createdAt
          updatedAt
          userProfileId
        }
        blockee {
          id
          phoneNumber
          email
          isOnBoardingCompleted
          status
          createdAt
          updatedAt
          userProfileId
        }
        reason
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPhoto = /* GraphQL */ `
  query GetPhoto($id: ID!) {
    getPhoto(id: $id) {
      id
      profileID
      key
      position
      createdAt
      updatedAt
    }
  }
`;
export const listPhotos = /* GraphQL */ `
  query ListPhotos(
    $filter: ModelPhotoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getOption = /* GraphQL */ `
  query GetOption($id: ID!) {
    getOption(id: $id) {
      id
      label
      createdAt
      updatedAt
    }
  }
`;
export const listOptions = /* GraphQL */ `
  query ListOptions(
    $filter: ModelOptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        label
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
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
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAnswer = /* GraphQL */ `
  query GetAnswer($id: ID!) {
    getAnswer(id: $id) {
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
export const listAnswers = /* GraphQL */ `
  query ListAnswers(
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        question {
          id
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
      nextToken
    }
  }
`;
export const getChatRoomUser = /* GraphQL */ `
  query GetChatRoomUser($id: ID!) {
    getChatRoomUser(id: $id) {
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
export const listChatRoomUsers = /* GraphQL */ `
  query ListChatRoomUsers(
    $filter: ModelChatRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRoomUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        chatRoomId
        user {
          id
          phoneNumber
          email
          isOnBoardingCompleted
          status
          createdAt
          updatedAt
          userProfileId
        }
        chatRoom {
          id
          lastMessageContent
          lastMessageUserId
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
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
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
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          createdAt
          updatedAt
          userProfileId
        }
        chatRoom {
          id
          lastMessageContent
          lastMessageUserId
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
      nextToken
    }
  }
`;
export const blockedUserByBlocker = /* GraphQL */ `
  query BlockedUserByBlocker(
    $blockerId: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBlockedUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    blockedUserByBlocker(
      blockerId: $blockerId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        blockerId
        blockeeId
        blocker {
          id
          phoneNumber
          email
          isOnBoardingCompleted
          status
          createdAt
          updatedAt
          userProfileId
        }
        blockee {
          id
          phoneNumber
          email
          isOnBoardingCompleted
          status
          createdAt
          updatedAt
          userProfileId
        }
        reason
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const blockedUserByBlockee = /* GraphQL */ `
  query BlockedUserByBlockee(
    $blockeeId: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBlockedUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    blockedUserByBlockee(
      blockeeId: $blockeeId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        blockerId
        blockeeId
        blocker {
          id
          phoneNumber
          email
          isOnBoardingCompleted
          status
          createdAt
          updatedAt
          userProfileId
        }
        blockee {
          id
          phoneNumber
          email
          isOnBoardingCompleted
          status
          createdAt
          updatedAt
          userProfileId
        }
        reason
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const answerByUser = /* GraphQL */ `
  query AnswerByUser(
    $userID: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    answerByUser(
      userID: $userID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        question {
          id
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
      nextToken
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
          createdAt
          updatedAt
          userProfileId
        }
        chatRoom {
          id
          lastMessageContent
          lastMessageUserId
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
