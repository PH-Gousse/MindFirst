import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, VirtualizedList, RefreshControl} from 'react-native';
import {
  Text,
  Button,
  Divider,
  Box,
  Icon,
  HStack,
  VStack,
  IconButton,
} from "native-base";
import CustomColors from "../../contants/CustomColors";
import {Ionicons} from "@expo/vector-icons";
import {getAgeFromDate} from "../../helpers/utils";
import ExpoFastImage from "expo-fast-image";
import UrlConstants from "../../contants/UrlConstants";

const Item = ({
                navigation,
                userId,
                firstName,
                age,
                description,
                photo,
                location,
                percentage,
                photoEnabled,
              }) => {
  // console.log('Item photo', photo);
  let url = '';
  let cacheKey = '';
  if (photo) {
    url = `${UrlConstants.CLOUDFRONT}/${photo.key}`;
    cacheKey = photo.key.split('/')[1];
  }
    const ageInYear = getAgeFromDate(age);

  return (
    <VStack
      space={1}
    >
      <Pressable
        disabled={!photoEnabled}
        onPress={() => {
          navigation.navigate('MatchedProfileScreen', {
            rankedUserId: userId
          });
        }}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          }
        ]}
      >
        <HStack justifyContent='space-between' alignItems="center">
          <HStack alignItems="center">
            <Box>
              <Button variant={'unstyled'} isDisabled={!photoEnabled} onPress={(e) => {
                e.persist();
                navigation.navigate('MatchedProfileScreen', {
                  rankedUserId: userId
                });
              }}>
                {photo && photo.key && <ExpoFastImage uri={url} cacheKey={cacheKey} style={styles.image}/>}
              </Button>
            </Box>
            <Box>
              <Text fontSize="md" bold>{firstName} {ageInYear}</Text>
              <Text fontSize="sm">{location}</Text>
              <Text fontSize="sm" noOfLines={1}>{description}</Text>
            </Box>
          </HStack>
          <HStack>
            <HStack alignItems="center">
              <Text color="red.500">
                {percentage} %
              </Text>
              <Box>
                {photoEnabled &&
                  <IconButton
                    onPress={(e) => {
                      e.persist();
                      navigation.navigate('MatchedProfileScreen', {
                        rankedUserId: userId
                      });
                    }}
                    icon={
                      <Icon size={'sm'} as={<Ionicons name="arrow-forward"/>}/>
                    }
                  />
                }
                {!photoEnabled &&
                  <IconButton
                    isDisabled
                    variant={'unstyled'}
                    icon={
                      <Icon size={'sm'} color='white' as={<Ionicons name="arrow-forward"/>}/>
                    }
                  />
                }
              </Box>
            </HStack>
          </HStack>

        </HStack>
      </Pressable>
    </VStack>
  );
};
const Separator = () => <Divider/>;

const getItem = (_data, index) => {
  return _data[index];
};

const getItemCount = _data => _data.length;

const MatchesList = ({dataSource, navigation, getRankByUser}) => {
  const [isRefreshing, setIsRefreshing] = useState(true);
  // console.log('MatchesList props', dataSource);

  useEffect(() => {
    setIsRefreshing(false);
  }, []);


  return (
    <VirtualizedList
      data={dataSource}
      initialNumToRender={20}
      renderItem={({item}) => (
        <Item
          navigation={navigation}
          userId={item.userId}
          firstName={item.profile.firstName}
          age={item.profile.birthday}
          description={item.profile.shortDescription}
          location={item.profile.location}
          percentage={item.percentage}
          photoEnabled={item.percentage >= 40}
          photo={item.profile.photos.length >= 1 ? item.profile.photos[0] : null}
        />
      )}
      keyExtractor={item => item.userId.toString()}
      getItemCount={getItemCount}
      getItem={getItem}
      ItemSeparatorComponent={Separator}
      style={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            getRankByUser().then(() => {
              setIsRefreshing(false);
            })
          }}
          title="Pull to refresh"
          tintColor={CustomColors.primary200}
          titleColor={CustomColors.primary200}
        />
      }
    >
    </VirtualizedList>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white'
  },
  textPercentage: {
    color: CustomColors.red,
    fontSize: 14
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100
  }
});

export default MatchesList;
