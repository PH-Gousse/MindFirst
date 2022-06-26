import {API, graphqlOperation} from "aws-amplify";
import {answerByUser} from "../../graphql/queries";
import {listQuestions} from "../../graphql/Custom/questions";

/**
 * Todo query and not scan the answers per user
 * @param userId
 * @returns {Promise<*>}
 */
export const getAllAnswers = async (userId) => {
  let items = [];
  let nextToken = null;

  do {
    const {data: {answerByUser: {items: nextItems, nextToken: nextNextToken}}} = await API.graphql(graphqlOperation(answerByUser, {userID: userId, nextToken}))
    items = items.concat(nextItems)
    nextToken = nextNextToken
  } while (nextToken)

  return items;
}
