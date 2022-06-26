import React, {useCallback, useEffect, useState} from 'react';
import {Center, Spinner} from 'native-base';
import ChatList from "../../components/chat/ChatList";
import {useDispatch, useSelector} from "react-redux";
import {API, graphqlOperation} from "aws-amplify";
import {onCreateChatRoomUserByUserId} from "../../graphql/subscriptions";
import {getChatRoomsByUserIdAPI} from "../../store/actions/ChatAction";

const ChatListScreen = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useSelector((state) => state.currentUser);
  const {chatRoomUsers} = useSelector((state) => state.chat);

  const chatRoomUsersArray = Object.values(chatRoomUsers);
  // console.log('ChatListScreen - chatRoomUsers', chatRoomUsers);
  // console.log('ChatListScreen - chatRoomUsersArray', chatRoomUsersArray);


  const getChatRoomsByUserId = async (id) => {
    return dispatch(getChatRoomsByUserIdAPI(id));
  }

  /**
   * Whenever a new chat room user is created, we need to update the chat room list
   * to be removed from here and put into the main page -> then update the state chatRoomUsers that will update the list
   */
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateChatRoomUserByUserId, {userId: id})
    ).subscribe({
      next: (data) => {
        // console.log('onCreateChatRoomUserByUserId data = ', data.value.data);
        // console.log('onCreateChatRoomUserByUserId data id = ', id);
        const newChatRoomUser = data.value.data.onCreateChatRoomUserByUserId;

        if (newChatRoomUser.user.id !== id) {
          return;
        }

        setIsLoading(true);
        getChatRoomsByUserId(id).then(r => {
          console.log('getChatRoomsByUserId', r);
          setIsLoading(false);
        });
      },
      error: error => console.error('Subscription - onCreateChatRoomUserByUserId', error.error)
    });

    return () => subscription.unsubscribe();
  }, []);


  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner color="warning.500"/>
      </Center>
    )
  }

  return (
    <ChatList {...props} dataSource={chatRoomUsersArray} currentUserId={id} getChatRoomsByUserId={getChatRoomsByUserId}/>
  );
}

export default ChatListScreen;
