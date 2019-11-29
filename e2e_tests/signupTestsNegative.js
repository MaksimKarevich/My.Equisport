//.setValue(SELECTOR, ['', [browser.Keys.CONTROL, 'a']])
//.keys('\ue003')
// These elements used because .clearValue is not worked properly

module.exports = {
  '@tags': ['all', 'signup', 'negative', '7'],
  before: function(browser) {
    console.log('Setting up... browser', typeof browser);
  },

  after: function(browser) {
    console.log('Closing down... browser', typeof browser);
    browser.end();
  },

  'Sign Up Tests Negative': function(browser) {
    const url = 'http://localhost:3000/';
    const emailDomain = 'test.com';
    const nickname = 'test' + Date.now();
    const input = {
      username: nickname + '@' + emailDomain,
      password: 'QWE123qwe'
    };
    const elements = {
      errorMessage: '.AuthErrorMessage__AuthErrorMessageContainer-vy0jys-0',
      email: "input[placeholder='Enter your email here']",
      password: "input[placeholder='Enter your password here']",
      passwordRepeat: "input[placeholder='Repeat your password']",
      textButtonSignUp: 'a[href="/auth/signup"]',
      buttonSignUp: '.FormContainer-sc-1yympqn-0.dvhynU > div > button',
    };
    const message = {
      displayed: 'The error message is displayed.',
      emailRequired: 'The email field is required.',
      passwordRequired: 'The password field is required.',
      valid: 'The email must be a valid email address.',
      characters6: 'The password must be at least 6 characters.',
      numAndLet: 'Password must contain numbers and letters.',
      doesNotMatch: 'The password confirmation does not match.',
      present: 'The error message is present',
    };

    browser
      //Navigate to SignUp page
      .url(url)
      .waitForElementVisible(elements.textButtonSignUp, 5000, 'The SignUp button is present')
      .click(elements.textButtonSignUp)
      .waitForElementVisible(elements.email, 5000, 'The Email field is present')
      .assert.urlContains('/auth/signup', 'You are on the SignUp page')

      //Send empty form
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.emailRequired, message.emailRequired)
      .assert.containsText(elements.errorMessage, message.passwordRequired, message.passwordRequired)

      //FIll the email field with invalid data
      .setValue(elements.email, nickname)
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, message.valid)
      .assert.containsText(elements.errorMessage, message.passwordRequired, message.passwordRequired)

      //FIll the password field with invalid data
      .setValue(elements.password, 'a')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, message.valid)
      .assert.containsText(elements.errorMessage, message.doesNotMatch, message.doesNotMatch)
      .assert.containsText(elements.errorMessage, message.characters6, message.characters6)
      .assert.containsText(elements.errorMessage, message.numAndLet, message.numAndLet)

      //FIll the repeat password field with invalid data
      .setValue(elements.passwordRepeat, 'a')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, message.valid)
      .assert.containsText(elements.errorMessage, message.characters6, message.characters6)
      .assert.containsText(elements.errorMessage, message.numAndLet, message.numAndLet)

      //Clear the email field
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.emailRequired, message.emailRequired)
      .assert.containsText(elements.errorMessage, message.characters6, message.characters6)
      .assert.containsText(elements.errorMessage, message.numAndLet, message.numAndLet)

      //Clear the password field and set email
      .setValue(elements.password, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, 'email')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, message.valid)
      .assert.containsText(elements.errorMessage, message.passwordRequired, message.passwordRequired)

      //all clear
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.password, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.passwordRepeat, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')

      //Valid password and different invalid emails
      .setValue(elements.password, input.password)
      .setValue(elements.passwordRepeat, input.password)
      //String
      .setValue(elements.email, 'email.domain.com')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)
      //Missing address
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, '@domain.com')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)
      //Missing domain 1
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, 'email@')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)
      //Missing domain 2
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, 'email@domain')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)
      //Missing domain 3
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, 'email@domain.')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,'Result - ' + message.valid)
      //First dot in address
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, '.' + input.username)
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,'Result - ' + message.valid)
      //Last dot in address
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, 'test.@' + emailDomain)
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,'Result - ' + message.valid)
      //Double dot in address
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, 'test..@' + emailDomain)
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,'Result - ' + message.valid)
      //First dash in domain
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@-domain.com')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,'Result - ' + message.valid)
      //Last dash in domain
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@domain-.com')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,'Result - ' + message.valid)
      //First dot in domain
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@.domain.com')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,'Result - ' + message.valid)
      //Last(double) dot in domain
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@domain..com')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,'Result - ' + message.valid)
      //Double @ @
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@@' + emailDomain)
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000,  message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,'Result - ' + message.valid)
      //Garbage
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, 'te\'(),:;<>@[\]st@domain.com')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,'Result - ' + message.valid)
      //Copy-paste from address book
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, 'Joe Smith <' + input.username + '>')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,'Result - ' + message.valid)
      //Superfluous text
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, input.username + '(Joe Smith)')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,'Result - ' + message.valid)
      //Fill email with valid data and invalid passwords
      .clearValue(elements.email)
      .clearValue(elements.password)
      .clearValue(elements.passwordRepeat)
      .setValue(elements.email, input.username)
      .setValue(elements.password, input.password)
      //Passwords does not match
      .setValue(elements.passwordRepeat, 'a')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.doesNotMatch,'Result - ' + message.doesNotMatch)
      //Passwords only letters - 5 characters
      .setValue(elements.password, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.passwordRepeat, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.passwordRepeat, 'TestT')
      .setValue(elements.password, 'TestT')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.numAndLet,'Result - ' + message.numAndLet)
      .assert.containsText(elements.errorMessage, message.characters6,'Result - ' + message.characters6)
      //Passwords only letters - 6 characters
      .setValue(elements.passwordRepeat, 'e')
      .setValue(elements.password, 'e')
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.numAndLet,'Result - ' + message.numAndLet)
      //Passwords only numerical - 6 characters
      .setValue(elements.password, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.passwordRepeat, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.passwordRepeat, '123456')
      .setValue(elements.password, '123456')
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.numAndLet,'Result - ' + message.numAndLet)
      //all clear
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.password, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.passwordRepeat, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')

      .setValue(elements.email, 'customer@email.com')
      .setValue(elements.password, input.password)
      .setValue(elements.passwordRepeat, input.password)
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, 'The email has already been taken.','Result - The email has already been taken.')
  },
};
