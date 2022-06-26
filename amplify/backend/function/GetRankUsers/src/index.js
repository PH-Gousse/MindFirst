const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const {print} = graphql;

const API_URL = process.env.GRAPHQL_ENDPOINT || 'http://192.168.0.19:20002/graphql';
const API_KEY = process.env.GRAPHQL_API_KEY || 'da2-fakeApiId123456';

console.log('API_URL', API_URL);
console.log('API_KEY', API_KEY);

const listUsers = gql`
    query listUsers {
        listUsers {
            items {
                id
                profile {
                    id
                    firstName
                    birthday
                    ageRange
                    gender
                    interestedIn
                    location
                    shortDescription
                }
                answers {
                    items {
                        id
                        option {
                            label
                        }
                        question {
                            id
                            option1 {
                                label
                            }
                            option2 {
                                label
                            }
                        }
                        userID
                    }
                    nextToken
                }
            }
        }
    }
`;

const getAgeFromDate = (birthdateInput) => {
    if (!birthdateInput) return null;
    console.log('getAgeFromDate - birthdateInput:', birthdateInput);
    const [dd, mm, yyyy] = birthdateInput.split("/");
    const birthDate = new Date(`${yyyy}-${mm}-${dd}`);
    console.log('getAgeFromDate - birthDate:', birthDate);
    const currentDate = new Date();
    const diff = currentDate - birthDate; // This is the difference in milliseconds
    // Divide by 1000*60*60*24*365.25
    return Math.floor(diff / 31557600000);
}

const findCurrentUser = (currentUserId, listUsers) => {
    return listUsers.find(user => user.id === currentUserId);
}

const getAllSameQuestions = (currentUserAnswers, userAnswers) => {
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

const computePercentageMatching = (userId, commonQuestions) => {
    const sameAnswers = commonQuestions.filter(question => {
        return question.optionCurrentUser === question.optionUser;
    });

    // console.log('commonQuestions', commonQuestions);
    let percentage = sameAnswers.length / commonQuestions.length * 100;

    if (commonQuestions.length === 0) {
        percentage = 0;
    }

    return {
        userId: userId,
        percentage: Math.round(percentage)
    };
};

const isUserInAgeRange = (currentUserAge, currentUserAgeRange, user) => {
    let isUserInRange = false;
    let isCurrentUserInRange = false;
    const userAge = getAgeFromDate(user.profile.birthday);

    if (!currentUserAge || isNaN(currentUserAge)) {
        console.error(`currentUserAge: ${currentUserAge} is not a number`);
        return false;
    }
    if (!currentUserAgeRange) {
        console.error(`currentUserAgeRange: ${currentUserAgeRange} is not defined`);
        currentUserAgeRange = [18,90]; // Default if not set
    }
    if (!userAge || isNaN(userAge)) {
        console.error(`userAge: ${userAge} is not a number`);
        return false;
    }
    if (!user.profile.ageRange) {
        console.error(`user.profile.ageRange: ${user.profile.ageRange} is not defined`);
        return false;
    }

    if (userAge >= currentUserAgeRange[0] && userAge <= currentUserAgeRange[1]) {
        isUserInRange = true;
    }

    if (currentUserAge >= user.profile.ageRange[0] && currentUserAge <= user.profile.ageRange[1]) {
        isCurrentUserInRange = true;
    }

    return isUserInRange && isCurrentUserInRange;
}

const isCompatible = (currentUser, user) => {
    if (currentUser.profile.interestedIn === 'everyone' && user.profile.interestedIn === 'everyone') {
        return true;
    }

    if (currentUser.profile.interestedIn === 'everyone' && user.profile.interestedIn === currentUser.profile.gender) {
        return true;
    }

    if (currentUser.profile.interestedIn === user.profile.gender) {
        if (user.profile.interestedIn === currentUser.profile.gender || user.profile.interestedIn === 'everyone') {
            return true;
        }
    }

    return false;
}

const isSameLocation = (currentUser, user) => {
    if (currentUser.profile && currentUser.profile.location && user.profile && user.profile.location) {
        return currentUser.profile.location === user.profile.location;
    }
    return false;
}

const createTheRankObjectForTheCurrentUser = (currentUser, listUsers) => {
    const ranks = [];
    const currentUserAge = getAgeFromDate(currentUser.profile.birthday);

    // Loop through every users
    listUsers.forEach(user => {
        console.log('user=', user);
        if (currentUser.id !== user.id) { // Exclude the current user from the ranking list
            if (isSameLocation(currentUser, user)) {
                if (isCompatible(currentUser, user)) { // Exclude non compatible
                    if (isUserInAgeRange(currentUserAge, currentUser.profile.ageRange, user)) {
                        // console.log('currentUser answers', currentUser.answers.items);
                        // console.log('listUsers answers', listUsers[2].answers.items);
                        const answerWithSameQuestions = getAllSameQuestions(currentUser.answers.items, user.answers.items);

                        // console.log('answerWithSameQuestions', answerWithSameQuestions[0].question);
                        // console.log('answerWithSameQuestions length', answerWithSameQuestions.length);

                        const {userId, percentage} = computePercentageMatching(user.id, answerWithSameQuestions);
                        const currentDate = new Date();
                        const rank = {
                            userId: userId,
                            percentage: percentage,
                            profile: {
                                id: user.profile.id,
                                firstName: user.profile.firstName,
                                birthday: user.profile.birthday,
                                shortDescription: user.profile.shortDescription,
                                location: user.profile.location,
                                createdAt: currentDate,
                                updatedAt: currentDate
                            },
                            answerWithSameQuestions: answerWithSameQuestions.slice(0, 10)
                        }
                        console.log('rank', rank);
                        ranks.push(rank);
                    }
                }
            }
        }
    });


    return ranks;

}

const getCallGraphQL = async (query) => {
    try {
        const graphqlData = await axios({
            url: API_URL,
            method: 'post',
            headers: {
                'x-api-key': API_KEY
            },
            data: {
                query: print(query),
            }
        });
        return graphqlData.data.data;
    } catch (err) {
        console.log('error posting to appsync: ', err);
    }
}

exports.handler = async (event) => {
    const userId = event.arguments.userId;

    // console.log(event);
    try {
        const result = await getCallGraphQL(listUsers);
        // console.log('result', result.listUsers.items);

        const currentUser = findCurrentUser(userId, result.listUsers.items);
        const ranks = createTheRankObjectForTheCurrentUser(currentUser, result.listUsers.items);

        ranks.sort((rank1, rank2) => rank2.percentage - rank1.percentage);
        // console.log('ranks', ranks);

        // console.log('currentUser', currentUser);


        return ranks;
    } catch (err) {
        throw err;
    }
};
