import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';


import {Col, Row, Grid} from 'react-native-easy-grid';

import ItemAnswer from "../UI/ItemAnswer";

const HeaderItem = ({firstName}) => (
  <Grid>
    <Row>
      <Col size={3}>
        <Row style={styles.headerTextContainer}>
          <Text style={styles.headerText}>You</Text>
        </Row>
      </Col>
      <Col size={3}>
        <Row style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{firstName}</Text>
        </Row>
      </Col>
      <Col size={1}/>
    </Row>
  </Grid>
);

const AnswersListProfile = ({answers, photo, userId, firstName, navigation, route}) => {
  // console.log(props.answers);

  const items = answers.map((item) => {
    return <ItemAnswer key={item.questionId.toString()} data={item} userId={userId}
                       navigation={navigation}/>
  });

  return (
    <>
      <HeaderItem firstName={firstName}/>
      {items}
    </>
  );
}

const styles = StyleSheet.create({
  headerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20
  },
});

export default AnswersListProfile;
