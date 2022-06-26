export const getAllSameQuestions = (currentUserAnswers, userAnswers) => {
  // console.log('getAllSameQuestions');

  const numberAnsweredCurrentUser = currentUserAnswers.length;
  const numberAnsweredUser = userAnswers.length;

  let commonQuestions = [];

  for (let i = 0; i < numberAnsweredCurrentUser; i++) {
    for (let j = 0; j < numberAnsweredUser; j++) {
      if (currentUserAnswers[i].question.id === userAnswers[j].question.id) {
        const commonQuestion = {
          questionId: currentUserAnswers[i].question.id,
          option1: userAnswers[j].question.option1.label,
          option2: userAnswers[j].question.option2.label,
          optionCurrentUser: currentUserAnswers[i].option.label,
          optionUser: userAnswers[j].option.label,
        };
        commonQuestions.push(commonQuestion);
      }
    }
  }
  return commonQuestions;
}

export const computePercentageMatching = (commonQuestions) => {
  const sameAnswers = commonQuestions.filter(question => {
    return question.optionCurrentUser === question.optionUser;
  });

  // console.log('commonQuestions', commonQuestions);
  let percentage = sameAnswers.length / commonQuestions.length * 100;

  if (commonQuestions.length === 0) {
    percentage = 0;
  }

  return Math.round(percentage);
};
