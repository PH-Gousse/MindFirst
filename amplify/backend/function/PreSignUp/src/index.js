exports.handler = async (event) => {
    console.log('Pre Sign Up');
    event.response.autoConfirmUser = true;
    event.response.autoVerifyPhone = true;
    return event;
};
