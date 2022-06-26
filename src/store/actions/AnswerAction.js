import {createAsyncThunk} from "@reduxjs/toolkit";
import {API, graphqlOperation} from "aws-amplify";
import {getAnswer, getOption, getQuestion} from "../../graphql/queries";
import {createAnswer, updateAnswer} from "../../graphql/mutations";

export const addAnswerAPI = createAsyncThunk(
  'answerSlice/create/answer',
  async (answerInput, {getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading, id, answers: {answeredQuestions, answeredQuestionsId}} = getState().currentUser;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    try {
      // console.log('answeredQuestions*', answeredQuestions);
      /**
       * Check if the answer already exists for the current user and the questions
       * If the answer already exists: update the answer with the new option otherwise do nothing
       * If the answer doesn't exist: add a new answer
       */

      const answerFound = answeredQuestions.find(answer => answer.question.id === answerInput.answerQuestionId);
      // console.log('addAnswerAPI - answerFound', answerFound);
      if (answerFound) {
        // console.log('IS FOUND');
        if (answerFound.option.id !== answerInput.answerOptionId) {
          // console.log('OPTIONS ARE DIFFERENT');

          const originalAnswer = await API.graphql(graphqlOperation(getAnswer, {id: answerFound.id}));
          // console.log('addAnswerAPI - originalAnswer', originalAnswer.data.getAnswer);

          const option = await API.graphql(graphqlOperation(getOption, {id: answerInput.answerOptionId}));
          // console.log('addAnswerAPI - option', option.data.getOption);

          const updatedAnswer = await API.graphql(graphqlOperation(updateAnswer, {input: {id: answerFound.id, answerOptionId: option.data.getOption.id}}));
          // console.log('addAnswerAPI - updatedAnswer', updatedAnswer.data.updateAnswer);

          return updatedAnswer.data.updateAnswer;
        }
        // console.log('OPTIONS ARE THE SAME');
        return null;
      }
      // console.log('IS NOT FOUND');
      const option = await API.graphql(graphqlOperation(getOption, {id: answerInput.answerOptionId}));
      // console.log('addAnswerAPI option', option);

      const question = await API.graphql(graphqlOperation(getQuestion, {id: answerInput.answerQuestionId}));
      // console.log('addAnswerAPI question', question);

      const answerModel = {
        userID: id,
        answerOptionId: option.data.getOption.id,
        answerQuestionId: question.data.getQuestion.id
      };

      const newAnswer = await API.graphql(graphqlOperation(createAnswer, {input: answerModel}));

      return newAnswer.data.createAnswer;
    } catch (err) {
      console.log('Error add answer:', err);
      return rejectWithValue([], err);
    }
  }
)
