import {API, graphqlOperation} from "aws-amplify";
import {listQuestions} from "../../graphql/Custom/questions";


export const getAllQuestions = async () => {
  let items = [];
  let nextToken = null;

  do {
    const {data: {listQuestions: {items: nextItems, nextToken: nextNextToken}}} = await API.graphql(graphqlOperation(listQuestions, {nextToken}))
    items = items.concat(nextItems)
    nextToken = nextNextToken
  } while (nextToken)

  return items;

  //   return [{
//     "id": "c3676a89-9409-47db-8e7b-8f80849517f1",
//     "option1": {
//     "id": "69bd1450-ce28-43e4-9d28-cda27e30b92f",
//     "label": "Desktop",
//   },
//     "option2": {
//     "id": "143ecad5-595f-4391-bb89-32636a4ed576",
//       "label": "Laptop",
//   },
// }]
}
