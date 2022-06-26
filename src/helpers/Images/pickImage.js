import * as ImagePicker from "expo-image-picker";

const pickImageHelper = async (input) => {
  return ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.5,
  });
}

export default pickImageHelper;

