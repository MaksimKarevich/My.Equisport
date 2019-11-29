//.setValue(SELECTOR, ['', [browser.Keys.CONTROL, 'a']])
//.keys('\ue003')
// These elements used because .clearValue is not worked properly

module.exports = {
  '@tags': ['all', 'forgot', 'positive'],
  before: function(browser) {
    console.log('Setting up... browser', typeof browser);
  },

  after: function(browser) {
    console.log('Closing down... browser', typeof browser);
    browser.end();
  },

  'Forgot Password Tests': function(browser) {
    const url = 'http://localhost:3000/';
    const nickname = 'test' + Date.now();
    const emailDomain = 'domain.com';
    const input = {
      username: 'customer@email.com'
    };
    const elements = {
      errorMessage: '.AuthErrorMessage__AuthErrorMessageContainer-vy0jys-0',
      email: "input[placeholder='Enter your email here']",
      buttonRestore: '.FormContainer-sc-1yympqn-0.dvhynU > div > button',
      textButtonLogin: 'a[href="/auth/login"]',
      textButtonForgot: 'a[href="/auth/forgot-password"]',
      emailSent: '//*[text()[contains(.,\'Email sent!\')]]',
    };
    const message = {
      displayed: 'The error message is displayed.',
      required: 'The email field is required.',
      valid: 'The email must be a valid email address.',
      couldNotSent: 'Email could not sent to this email address.',
      present: 'The error message is present',
    };

    browser
      //Navigate to Forgot Password page
      .url(url)
      .waitForElementVisible(elements.textButtonLogin, 5000, 'The Login button is present')
      .click(elements.textButtonLogin)
      .waitForElementVisible(elements.textButtonForgot, 5000, 'The Forgot Password button is present')
      .click(elements.textButtonForgot)
      .assert.urlContains('/forgot-password','You are on the Forgot Password page')
      .waitForElementVisible(elements.email, 5000, 'The Email field is present')

      //Negative tests for email field
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.required, 'Result - ' + message.required)

      .setValue(elements.email, nickname)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, nickname + '.' + nickname)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@')
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@domain')
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.couldNotSent, 'Result - ' + message.couldNotSent)

      .setValue(elements.email, '.')
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        'Result - ' + message.valid)
      .setValue(elements.email, 'com')
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.couldNotSent, 'Result - ' + message.couldNotSent)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, '.' + nickname + '@' + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '.@' + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '..' + nickname + '@' + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@.' + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@-' + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@domain-.com')
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@domain..com')
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@' + nickname + '@' + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, '#@%^%#$@#$@#.com')
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, 'Joe Smith' + nickname + '@' + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, 'Result - ' + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, nickname + '@' + emailDomain + '(Some text)')
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.couldNotSent, 'Result - ' + message.couldNotSent)

      //Positive test
      .setValue(elements.email, ['', [browser.Keys.CONTROL, 'a']])
      .keys('\ue003')
      .setValue(elements.email, input.username)
      .click(elements.buttonRestore)
      .pause(3000)
      .useXpath()
      .waitForElementVisible(elements.emailSent, 5000, message.present)
      .assert.elementPresent(elements.emailSent,'Succsess mesage is present')
      .assert.containsText(elements.emailSent, 'Email sent!', 'Result - Email sent!');
  },
};
