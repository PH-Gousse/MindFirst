import React from "react";
import {StyleSheet,} from "react-native";
import CustomColors from "../../contants/CustomColors";
import {Text, Icon, HStack, VStack, Box} from "native-base";
import {getAgeFromDate} from "../../helpers/utils";

const MainInfoProfile = ({name, age, description, location = null, percentage = null}) => {
  const ageInYear = getAgeFromDate(age);
  return (
    <VStack space={1}>
      <HStack justifyContent='space-between' alignItems="center" px={10} py={5}>

        <Box>
          {name && <Text fontSize="xl" bold>{name} <Text>{ageInYear}</Text></Text>}
          {description && <Text pt={2}>{description}</Text>}
          {location && <Text>{location}</Text>}
        </Box>

        {percentage !== null &&
        <Box>
          <Text fontSize="xl" color='red.500'>{percentage} %</Text>
        </Box>
        }
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({});

export default MainInfoProfile;
