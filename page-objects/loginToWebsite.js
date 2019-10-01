module.exports = {
    url: 'https://afterthebest.com/auth/login',

    elements: {
        usernameInput: 'input[placeholder=Username]',
        passwordInput: 'input[placeholder=Password]',
        loginForm: '.card.p-4',
        websiteLogo: '.navbar-brand-full',
        submitButton: 'button[type=submit].btn.px-4',
        nickName: '#nick-name',
    },

    commands: [{
        submitLogin(){
            return this
                .click('@submitButton');
        },
        waitForLogin(){
            return this
                .waitForElementVisible('@loginForm', 2000, false, function () {}, 'Login form is visible')
        },

        waitForLogo(){
            return this
                .waitForElementVisible('@websiteLogo', 2000, false, function () {}, 'Website Logo is visible')
        },
        waitForNickname(){
            return this
                .waitForElementVisible('@nickName', 1000, false, function () {}, 'NickName field is displayed')
        },
        inputUsername(value){
            return this
                .setValue('@usernameInput',value)
        },
        inputPassword(value){
            return this
                .setValue('@passwordInput',value)
        },
        urlContain(value){
            return this
                .assert.urlContains('/profile', 'The profile page is open');
        }
    }]
};