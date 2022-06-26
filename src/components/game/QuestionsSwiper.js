import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';

import {
  Button,
  Text,
  Center
} from 'native-base';
import { Cache } from 'aws-amplify';
import CustomColors from "../../contants/CustomColors";
import {useDispatch} from "react-redux";
import { useToast } from "react-native-toast-notifications";
import {addAnswerAPI} from "../../store/actions/AnswerAction";
import {randomNumber} from "../../helpers/utils";
import {MAX_NUMBER_NUDGE, MIN_NUMBER_NUDGE} from "../../contants/GeneralConstants";
import {getRankByUserAPI} from "../../store/actions/UserAction";


let itemIndex;
Cache.getItem('qs_itemIndex').then(value => {
  // console.log('qs_itemIndex value', value);
  if (value !== null) {
    itemIndex = value
  } else {
    Cache.setItem('qs_itemIndex', 0);
    itemIndex = 0;
  }
});

const QuestionsSwiper = ({unansweredQuestions, allQuestions}) => {
  // console.log('QuestionsSwiper RE-RENDERED');
  // console.log('QuestionsSwiper - allQuestions:', allQuestions);
  // console.log('QuestionsSwiper - unansweredQuestions', unansweredQuestions);
  // console.log('QuestionsSwiper - itemIndex', itemIndex);
  const dispatch = useDispatch();
  let isEndOfUnanswered = unansweredQuestions.length === 0;
  let question = isEndOfUnanswered ? allQuestions[itemIndex] : unansweredQuestions[0];
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
  const [countAnswers, setCountAnswers] = useState(1);
  const [randomNumberNudge, setRandomNumberNudge] = useState(randomNumber(MIN_NUMBER_NUDGE, MAX_NUMBER_NUDGE));
  const isMountedVal = useRef(1);
  const toast = useToast();

  const getRankByUser = () => {
    return dispatch(getRankByUserAPI());
  };

  useEffect(() => {
    isMountedVal.current = 1;

    return () => {
      isMountedVal.current = 0;
    };
  });

  const addAnswer = async (input) => {
    try {
      await dispatch(addAnswerAPI(input));

      setCountAnswers(count => count + 1);
      // console.log(countAnswers);
      // console.log(randomNumberNudge);
      // console.log(countAnswers % randomNumberNudge);

      if (countAnswers % randomNumberNudge === 0) {
        toast.show("The ranking evolved! \nCheck your Match 🔥");
        setRandomNumberNudge(randomNumber(MIN_NUMBER_NUDGE, MAX_NUMBER_NUDGE));
        setCountAnswers(1);
        getRankByUser();
      }
    } catch (err) {
      console.log('addAnswer error:', err);
    }
  };

  const onPressHandler = (question, option) => {
    // console.log('onPressHandler question', question.id);
    // console.log('onPressHandler option', option.label);
    setIsButtonsDisabled(true);

    const answerInput = {
      answerQuestionId: question.id,
      answerOptionId: option.id
    }

    addAnswer(answerInput).then(r => {
      if (!isEndOfUnanswered) {
          if (unansweredQuestions.length === 0) {
            isEndOfUnanswered = true;
            itemIndex = 0;
          }
      } else {
        if (itemIndex < allQuestions.length) {
          itemIndex = itemIndex + 1;
          if (itemIndex === allQuestions.length) {
            itemIndex = 0;
          }
        }
      }
      Cache.setItem('qs_itemIndex', itemIndex);
      if (isMountedVal.current) {
        setIsButtonsDisabled(false);
      }
    });
  };

  return (
    <Center style={styles.twoButtons}>
      <Button style={{...styles.button, ...styles.firstButton}} onPress={(e) => {
        e.persist();
        if (!isButtonsDisabled) {
          onPressHandler(question, question.option1);
        }
      }}>
        <Text fontSize={"6xl"} style={{...styles.textButton, ...styles.firstText}}>{question.option1.label}</Text>
      </Button>
      <Button style={{...styles.button, ...styles.secondButton}} onPress={(e) => {
        e.persist();
        if (!isButtonsDisabled) {
          onPressHandler(question, question.option2);
        }
      }}>
        <Text fontSize={"6xl"} style={{...styles.textButton, ...styles.secondText}}>{question.option2.label}</Text>
      </Button>
    </Center>
  );
};

const styles = StyleSheet.create({
  twoButtons: {},
  button: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  firstButton: {
    backgroundColor: CustomColors.first
  },
  secondButton: {
    backgroundColor: CustomColors.second
  },
  textButton: {
    textAlign: 'center',
  },
  firstText: {
    color: CustomColors.second
  },
  secondText: {
    color: CustomColors.first
  }
});

export default QuestionsSwiper;
