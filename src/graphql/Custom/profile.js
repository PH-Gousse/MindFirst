export const updateProfile = /* GraphQL */ `
    mutation UpdateProfile(
        $input: UpdateProfileInput!
        $condition: ModelProfileConditionInput
    ) {
        updateProfile(input: $input, condition: $condition) {
            id
            firstName
            lastName
            birthday
            gender
            interestedIn
            shortDescription
            photos {
                items {
                    id
                    profileID
                    key
                    position
                }
            }
            ageRange
            location
        }
    }
`;
