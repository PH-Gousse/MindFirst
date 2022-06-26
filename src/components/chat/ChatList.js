import React, {useEffect, useState} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {Box, Text, Pressable, HStack, VStack, Button, Divider, Icon, WarningTwoIcon, Modal} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import UrlConstants from "../../contants/UrlConstants";
import ExpoFastImage from "expo-fast-image";
import {getRankByUserAPI, getRankProfileByUserIdAPI} from "../../store/actions/UserAction";
import {useDispatch} from "react-redux";
import {Ionicons} from "@expo/vector-icons";
import {blockText, blockTitle} from "../../contants/BlockReportConstants";
import {createBlockedUserAPI} from "../../store/actions/BlockedUserAction";
import {getChatRoomsByUserIdAPI} from "../../store/actions/ChatAction";
import CustomColors from "../../contants/CustomColors";

const ItemChat = ({navigation, chatRoomId, lastMessage, yourTurn, userId, firstName, photoKey, dispatch}) => {
  // console.log('ItemChat RE-RENDER')
  const url = `${UrlConstants.CLOUDFRONT}/${photoKey}`;
  const cacheKey = photoKey.split('/')[1];
  // console.log('lastMessage', lastMessage)
  // console.log('yourTurn', yourTurn)
  return (
    <VStack
      space={1}
      bg="white"
    >
      <Pressable
        onPress={() => {
          navigation.navigate('ChatScreen', {
            chatRoomId: chatRoomId,
            photo: photoKey
          });
        }}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          }
        ]}
      >
        <HStack justifyContent='space-between' alignItems="center">
          <HStack alignItems="center" justifyContent='space-between'>
            <Box>
              <Button variant={'unstyled'} onPress={async (e) => {
                e.persist();
                await dispatch(getRankProfileByUserIdAPI(userId));
                navigation.navigate('MatchedProfileScreen', {
                  rankedUserId: userId
                });
              }}>
                {photoKey && <ExpoFastImage uri={url} cacheKey={cacheKey} style={styles.image}/>}
              </Button>
            </Box>
            <Box>
              <Text fontSize="lg" bold>{firstName}</Text>
              {lastMessage && <Text fontSize="sm" mt={1}>{(lastMessage)}</Text>}
            </Box>
          </HStack>
          <Box mr={5}>
            {yourTurn && <Text fontSize="xs" bold>Your turn</Text>}
          </Box>
        </HStack>
      </Pressable>
    </VStack>
  );
};

const RenderHiddenItem = ({currentUserId, userId, dispatch}) => {
  const [showModal, setShowModal] = useState(false);
  const [isBlockModal, setIsBlockModal] = useState(false);

  return (
    <>
      <HStack flex="1" justifyContent={'flex-start'}>
        <Pressable
          bg={"gray.200"}
          w="70"
          justifyContent="center"
          onPress={() => {
            // console.log('Block')
            setShowModal(true)
            setIsBlockModal(true)
          }}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Icon as={<Ionicons name="hand-right-outline"/>} color="black" size="5"/>
            <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
              Block
            </Text>
          </VStack>
        </Pressable>
      </HStack>

      <Modal isOpen={showModal} onClose={setShowModal} size={'lg'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{blockTitle}</Modal.Header>
          <Modal.Body>
            <Text>{blockText}</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false)
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={async () => {
                  setShowModal(false)
                  // console.log('Block - userId', userId)
                  // console.log('Block - currentUserId', currentUserId)
                  const blockedUser = {
                    blockeeId: userId,
                    blockerId: currentUserId
                  }
                  await dispatch(createBlockedUserAPI(blockedUser));
                  await dispatch(getChatRoomsByUserIdAPI(currentUserId));
                  await dispatch(getRankByUserAPI(currentUserId))
                }}
              >
                Confirm
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

const onRowDidOpen = (rowKey) => {
  // console.log('This row opened', rowKey);
};

const Separator = () => <Divider/>;

const ChatList = ({dataSource, currentUserId, navigation, getChatRoomsByUserId}) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(true);

  // console.log('ChatList props', props);

  useEffect(() => {
    setIsRefreshing(false);
  }, []);

  return (
    <SwipeListView
      data={dataSource}
      initialNumToRender={4}
      renderItem={({item, index}) => {
        const otherUser = currentUserId !== item.chatRoomUsers.items[0].user.id ? item.chatRoomUsers.items[0].user : item.chatRoomUsers.items[1].user;
        return (
          <ItemChat
            navigation={navigation}
            chatRoomId={item.id}
            lastMessage={item.lastMessageContent}
            yourTurn={item.lastMessageUserId ? currentUserId !== item.lastMessageUserId : null}
            userId={otherUser.id}
            firstName={otherUser.profile.firstName}
            photoKey={otherUser.profile.photos.items[0].key}
            dispatch={dispatch}
          />
        )
      }}
      renderHiddenItem={({item, index}) => {
        const otherUser = currentUserId !== item.chatRoomUsers.items[0].user.id ? item.chatRoomUsers.items[0].user : item.chatRoomUsers.items[1].user;
        return (
          <RenderHiddenItem currentUserId={currentUserId} userId={otherUser.id} dispatch={dispatch}/>
        )
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            getChatRoomsByUserId(currentUserId).then(() => {
              setIsRefreshing(false);
            })
          }}
          title="Pull to refresh"
          tintColor={CustomColors.primary200}
          titleColor={CustomColors.primary200}
        />
      }
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={Separator}
      disableLeftSwipe={true}
      leftOpenValue={70}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      onRowDidOpen={onRowDidOpen}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    borderRadius: 100
  },
  list: {
    backgroundColor: 'white'
  },
});

export default ChatList;
