import validator from "validator";

describe("Validator tests", () => {
    const   testNum = testNum,
            testBool = true,
            testObj = { property : "property "};


    describe("isString method", () => {

        it("expect `isString()` to be a function", () => {
            expect(validator.isString).to.be.a("function");
        });

        it("expect `isString()` to throw when a number is passed", () => {
            expect(() => validator.isString(testNum)).to.throw()
        });

        it("expect `isString()` to throw when a boolean is passed", () => {
            expect(() => validator.isString(testBool)).to.throw();
        });

        it("expect `isString()` to throw when a object is passed", () => {
            expect(() => validator.isString(testObj)).to.throw();
        });

        it("expect `isString()` not to throw when a string is passed", () => {
            expect(() => validator.isString("string")).not.to.throw();
        });
    });

    describe("isStringEmptyOrWhitespace method", () => {
        it("expect `isStringEmptyOrWhitespace()` to be a function", () => {
            expect(() => validator.isStringEmptyOrWhitespace).to.be.a("function");
        });

        it("expect `isStringEmptyOrWhitespace()` to throw when a number is passed", () => {
            expect(() => validator.isStringEmptyOrWhitespace(testNum)).to.throw();
        });

        it("expect `isStringEmptyOrWhitespace()` to throw when a boolean is passed", () => {
            expect(() => validator.isStringEmptyOrWhitespace(testBool)).to.throw();
        });

        it("expect `isStringEmptyOrWhitespace()` to throw when a object is passed", () => {
            expect(() => validator.isStringEmptyOrWhitespace(testObj)).to.throw();
        });

        it("expect `isStringEmptyOrWhitespace()` to throw when an empty string is passed", () => {
            expect(() => validator.isStringEmptyOrWhitespace("")).to.throw();
        });

        it("expect `isStringEmptyOrWhitespace()` to throw when a whitespace string is passed", () => {
            expect(() => validator.isStringEmptyOrWhitespace("            ")).to.throw();
        });

        it("expect `isStringEmptyOrWhitespace()` not to throw when a string is passed", () => {
            expect(() => validator.isStringEmptyOrWhitespace("string")).not.to.throw();
        });
    });

    describe("isStringLengthBetween method", () => {
        const minLength = 2;
        const maxLength = 5;

        const validString = "abcd";
        const tooShortString = "a";
        const tooLongString = "abcdefghijk";

        it("expect `isStringLengthBetween()` to be a function", () => {
            expect(() => validator.isStringLengthBetween).to.be.a("function");
        });

        it("expect `isStringLengthBetween()` to throw when passed string is too short", () => {
            expect(() => validator.isStringLengthBetween(tooShortString, minLength, maxLength)).to.throw();
        });        

        it("expect `isStringLengthBetween()` to throw when a whitespace string is passed", () => {
            expect(() => validator.isStringLengthBetween(tooLongString, minLength, maxLength)).to.throw();
        });

        it("expect `isStringLengthBetween()` not to throw when a valid string is passed", () => {
            expect(() => validator.isStringLengthBetween(validString, minLength, maxLength)).not.to.throw();
        });
    });

    describe ("passwordMatch method", () => {
        const password_1 = "abc123";
        const password_2 = "abc123";
        const wrongpassword = "123abc";

        it("expect `passwordMatch()` to be a function", () => {
            expect(() => validator.passwordMatch).to.be.a("function");
        });

        it("expect `passwordMatch()` to throw when first password passed doesn\'t match", () => {
            expect(() => validator.passwordMatch(wrongpassword, password_1)).to.throw();
        });

        it("expect `passwordMatch()` to throw when second password passed doesn\'t match", () => {
            expect(() => validator.passwordMatch(password_1, wrongpassword)).to.throw();
        });
        
        it("expect `passwordMatch()` not to throw when passwords passed match", () => {
            expect(() => validator.passwordMatch(password_1, password_2)).not.to.throw();
        });
    });

    describe ("isPasswordValid method", () => {
        const validPassword = "abcABC123";
        const passwordWithoutCapitals = "abc123";
        const passwordWithoutLowers = "ABC123";
        const passwordWithoutNumbers = "abcABC";

        it("expect `isPasswordValid()` to be a function", () => {
            expect(() => validator.isPasswordValid).to.be.a("function");
        });

        it("expect `isPasswordValid()` to throw when empty password is passed", () => {
            expect(() => validator.isPasswordValid("")).to.throw();
        });

        it("expect `isPasswordValid()` to throw when password without capitals is passed", () => {
            expect(() => validator.isPasswordValid(passwordWithoutCapitals)).to.throw();
        });
        
        it("expect `isPasswordValid()` to throw when password without lowers is passed", () => {
            expect(() => validator.isPasswordValid(passwordWithoutLowers)).to.throw();
        });

        it("expect `isPasswordValid()` to throw when password without numbers is passed", () => {
            expect(() => validator.isPasswordValid(passwordWithoutNumbers)).to.throw();
        });

        it("expect `isPasswordValid()` not to throw when valid password (i.e. with at least one lower, capital, digit and special character) is passed", () => {
            expect(() => validator.isPasswordValid(validPassword)).not.to.throw();
        });
    });

    describe ("isEmailValid method", () => {
        const   validEmail = "muszelka_123@onet.pl",
                emailWithoutName = "@onet.pl",
                emailWithoutDomain = "muszelka_123@",
                emailWithoutDomainName = "muszelka_123@.pl",
                emailWithoutAt = "muszelka_123onet.pl",
                emailWithSpecialCharacters = "!@#$%^&*()@onet.pl",
                emailWithTwoAts = "muszelka_123@@onet.pl";

        it("expect`isEmailValid()` to throw when email without name is passed", () =>{
            expect(() => validator.isEmailValid(emailWithoutName)).to.throw();
        });

        it("expect`isEmailValid()` to throw when email without domain is passed", () =>{
            expect(() => validator.isEmailValid(emailWithoutDomain)).to.throw();
        }); 

        it("expect`isEmailValid()` to throw when email without domain name is passed", () =>{
            expect(() => validator.isEmailValid(emailWithoutDomainName)).to.throw();
        }); 

        it("expect`isEmailValid()` to throw when email without `at` is passed", () =>{
            expect(() => validator.isEmailValid(emailWithoutAt)).to.throw();
        }); 

        it("expect`isEmailValid()` to throw when email with special characters in name is passed", () =>{
            expect(() => validator.isEmailValid(emailWithSpecialCharacters)).to.throw();
        }); 

        it("expect`isEmailValid()` to throw when email with two ats is passed", () =>{
            expect(() => validator.isEmailValid(emailWithTwoAts)).to.throw();
        }); 

        it("expect`isEmailValid()` not to throw when valid email is passed", () =>{
            expect(() => validator.isEmailValid(emailWithTwoDomains)).to.throw();
        }); 
    });
});