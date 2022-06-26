import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Center, Spinner} from 'native-base';
import {GiftedChat} from 'react-native-gifted-chat'
import {useDispatch, useSelector} from "react-redux";
import {createMessageAPI, getMessageFromChatRoomAPI, updateChatRoomLastMessage} from "../../store/actions/ChatAction";
import {API, graphqlOperation} from "aws-amplify";
import {onCreateMessage} from "../../graphql/Custom/chat";

const ChatScreen = props => {
  console.log('ChatScreen - props', props.route.params);
  const {chatRoomId, photo} = props.route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const {id} = useSelector((state) => state.currentUser);
  const {firstName} = useSelector((state) => state.profile);
  const [messages, setMessages] = useState([]);

  // console.log('ChatScreen - messages', messages);

  const getMessagesByChatRoom = useCallback(async (chatRoomId) => {
      return dispatch(getMessageFromChatRoomAPI(chatRoomId));
    },
    [chatRoomId],
  );


  useEffect(() => {
    getMessagesByChatRoom(chatRoomId).then(r => {
      setMessages(r.payload);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: ({value}) => {
        // console.log('onCreateMessage data', value);
        // console.log('onCreateMessage data.value.data', value.data);
        const newMessage = value.data.onCreateMessage;

        if (newMessage.chatRoomId !== chatRoomId) {
          console.log("Message is in another room!")
          return;
        }
        if (newMessage.user.id === id) {
          console.log("Message from the current user");
          return;
        }

        const msg = {
          _id: newMessage.id,
          text: newMessage.content,
          createdAt: newMessage.createdAt,
          user: {
            _id: newMessage.user.id,
            name: newMessage.user.profile.firstName,
            avatar: null,
          },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [msg]))
      },
      error: error => console.error('Subscription - onCreateMessage', error)
    });

    return () => subscription.unsubscribe();
  }, [])

  const onSend = (messages = []) => {
    console.log('useCallback - messages', messages);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

    const messageInput = {
      content: messages[0].text,
      userId: id,
      chatRoomId: chatRoomId
    }

    const createMessage = async (messageInput) => {
      console.log('createMessage - messageInput', messageInput);
      await dispatch(createMessageAPI(messageInput));
    };

    createMessage(messageInput).then();

  }

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner color="warning.500"/>
      </Center>
    )
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: id,
        avatar: null,
        name: firstName
      }}
      renderUsernameOnMessage={true}
      alignTop={true}
      initialText={''}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  }
});

export default ChatScreen;
