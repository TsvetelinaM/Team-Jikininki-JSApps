const validator = {

        validationMessages : {
        VALUE_IS_NULL_OR_UNDEFINED : `Provided value is null or undefined`,
        VALUE_IS_NOT_A_STRING : `Provided value is not a string.`,
        VALUE_IS_EMPTY_OR_WHITESPACE : `Provided value is empty or whitespace.`,
        ONE_OF_VALUES_IS_EMPTY_OR_WHITESPACE : `One of provided values is empty or whitespace`,
        VALUE_LENGTH_IS_INVALID : `Provided string value length has to be between`,
        VALUE_IS_NOT_BOOLEAN : `Value is not boolean`,
        PASSWORDS_DO_NOT_MATCH : `Provided passwords do not match.`,
        PASSWORD_IS_INVALID : `Provided password is invalid (password has to contain at least one lower and upper case character, one digit and one special character).`,
        EMAIL_IS_INVALID : `Provided e-mail address is not valid.`,
        NO_ITEM_KEY_FOUND : `Selected item has no proper key attribute`
    },

    isNullOrUndefined(value) {
        if (typeof value === "undefined" || value === null)
            throw new Error(this.validationMessages.VALUE_IS_NULL_OR_UNDEFINED);
    },

    isString(value) {
        if (typeof value !== "string") 
            throw new Error(VALUE_IS_NOT_A_STRING);
    },

    isEmptyOrWhitespace(value) {
        let stringValue = value.toString();
        let whitespaceRegex = /^(\s)+$/;
        let isWhitespace = whitespaceRegex.test(stringValue);

        if (stringValue.length === 0 || isWhitespace) 
            throw new Error(this.validationMessages.VALUE_IS_EMPTY_OR_WHITESPACE);
    },

    isStringEmptyOrWhitespace(value) {
        validator.isString(value);

        let whitespaceRegex = /^(\s)+$/,
            isWhitespace = whitespaceRegex.test(value);

        if (value.length === 0 || isWhitespace) 
            throw new Error(this.validationMessages.VALUE_IS_EMPTY_OR_WHITESPACE);
    },

    isStringLengthBetween(value, min, max) {
        validator.isString(value);

        if (value.length < min || value.length > max)
            throw new Error(this.validationMessages.VALUE_LENGTH_IS_INVALID + " " + min + " " + max + " characters.");
    },

    areStringsEmptyOrWhitespace(...values) {
        if (values.some(str => validator.isStringEmptyOrWhitespace(str)))
            throw new Error(this.validationMessages.ONE_OF_VALUES_IS_EMPTY_OR_WHITESPACE);
    },

    isBoolean(value) {
        if (value !== true && value !== false) 
            throw new Error(this.validationMessages.VALUE_IS_NOT_BOOLEAN);
    },

    passwordMatch(password_1, password_2) {
        if (password_1 !== password_2)
            throw new Error(this.validationMessages.PASSWORDS_DO_NOT_MATCH);
    },

    isPasswordValid(password) {
        let validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/,
            isValid = validPasswordRegex.test(password);

        if  (!isValid)
            throw new Error(this.validationMessages.PASSWORD_IS_INVALID);
    },

    isEmailValid(email) {
        let validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            isValid = validEmailRegex.test(email);

        if (!isValid)
            throw new Error(this.validationMessages.EMAIL_IS_INVALID);
    },

    listItemHasKey(DOMelement) {
        console.log(DOMelement);
        let hasKeyAttribute = DOMelement.hasAttribute("item-key-attribute"),
            keyAttributeIsNotNull = DOMelement.getAttribute("item-key-attribute") !== "";
        
        if (!hasKeyAttribute && !keyAttributeIsNotNull)
            throw new Error(this.validationMessages.NO_ITEM_KEY_FOUND);
    }
}

export default validator;