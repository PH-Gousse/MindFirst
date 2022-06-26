import React from "react";
import {StyleSheet} from "react-native";
import {DraggableGrid} from 'react-native-draggable-grid';
import {Box, Center, Icon, IconButton} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import ExpoFastImage from "expo-fast-image";
import UrlConstants from "../../contants/UrlConstants";

const PicturesGrid = ({photos, onReorder, onRemove}) => {
  console.log('PicturesGrid RENDERED');
  console.log('PicturesGrid photos', photos);

  const _renderItem = (photo) => {
    const url = `${UrlConstants.CLOUDFRONT}/${photo.key}`;
    const cacheKey = photo.key.split('/')[1];
    return (
      <Center
        key={photo.key}
      >
        <Box>
          <ExpoFastImage
            uri={url}
            cacheKey={cacheKey}
            style={styles.image}
          />
        </Box>
        <Box mt={-10} ml={100}>
          <IconButton
            variant={'ghost'}
            icon={
              <Icon size={'sm'} color='white' as={<Ionicons name="close"/>}/>
            }
            onPress={async (e) => {
              e.persist();
              onRemove(photo);
            }}
          />
        </Box>
      </Center>
    );
  }

  return (
    <DraggableGrid
      numColumns={2}
      renderItem={_renderItem}
      data={photos}
      onDragRelease={(photos) => {
        onReorder(photos);
      }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    borderRadius: 8,
  }
});

export default PicturesGrid;
