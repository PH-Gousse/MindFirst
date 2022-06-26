import React from 'react';
import {useSelector} from "react-redux";
import {ToastProvider} from 'react-native-toast-notifications'
import QuestionsSwiper from "../../components/game/QuestionsSwiper";

const GameScreen = ({navigation}) => {
  // console.log('GameScreen');
  const unansweredQuestions = useSelector((state) => state.currentUser.answers.unansweredQuestions);
  const questions = useSelector((state) => state.currentUser.questions);

  return (
    <ToastProvider
      placement="top"
      animationType='slide-in'
      animationDuration={250}
      duration={5000}
      normalColor="white"
      textStyle={{fontSize: 25, color: 'black'}}
      offsetTop={'45%'} // %50 - size of the toast / 2
      onPress={() => {
        // call the lambda
        console.log('GameScreen - ToastProvider onPress');
        navigation.navigate('Matches');
      }}
      onClose={() => {
        console.log('GameScreen - ToastProvider onClose');
      }}
    >
      <QuestionsSwiper unansweredQuestions={unansweredQuestions} allQuestions={questions}/>
    </ToastProvider>
  )
};

export default GameScreen;
