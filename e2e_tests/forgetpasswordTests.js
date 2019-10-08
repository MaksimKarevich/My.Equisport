//.setValue(SELECTOR, ['', [browser.Keys.CONTROL, "a"]])
//.keys('\ue003')
// These elements used because .clearValue is not worked properly

module.exports = {
  "@tags": ["all", "forgot_password", "fpositive"],
  before: function(browser) {
    console.log("Setting up... browser", typeof browser);
  },

  after: function(browser) {
    console.log("Closing down... browser", typeof browser);
    browser.end();
  },

  "Forgot Password Tests": function(browser) {
    const url = "http://ec2-13-48-149-152.eu-north-1.compute.amazonaws.com";
    const nickname = "test" + Date.now();
    const emailDomain = "domain.com";
    const input = {
      username: "anyemail@email.com"
    };
    const elements = {
      errorMessage: ".AuthErrorMessage__AuthErrorMessageContainer-vy0jys-0",
      email: 'input[placeholder="Enter your email here"]',
      buttonRestore: ".FormButton-yq5rye-0.etjSuT",
      textButtonLogin: ".Navigation__NavigationPanel-sc-1cwjzq8-1:nth-child(2) .Navigation__NavItem-sc-1cwjzq8-2:nth-child(1)",
      textButtonForgot: '.LoginForm__ForgotPassword-sc-6jjc91-0.fudhHS:nth-child(6) a:nth-child(1)',
    };
    const message = {
      displayed: "The error message is displayed.",
      required: "The email field is required.",
      valid: "The email must be a valid email address.",
      couldNotSent: "Email could not sent to this email address.",
      present: "The error message is present",
      emailSent: 'div[class=\'FormHeader-sc-13q6vh5-0 fZirzj\']',
    };

    browser
      //Navigate to Forgot Password page
      .url(url)
      .waitForElementVisible(elements.textButtonLogin, 5000, false, function() {},
        "The Login button is present")
      .click(elements.textButtonLogin)
      .waitForElementVisible(elements.textButtonForgot, 5000, false, function() {},
        "The Forgot Password button is present")
      .click(elements.textButtonForgot)
      .assert.urlContains("/forgot-password","You are on the Forgot Password page")
      .waitForElementVisible(elements.email, 5000, false, function() {},
        "The Email field is present")

      //Negative tests for email field
      .click(elements.buttonRestore)
      .assert.attributeContains(elements.email, 'value', '')
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.required,
        "Result - " + message.required)

      .setValue(elements.email, nickname)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, nickname + "." + nickname)
      .assert.attributeContains(elements.email, 'value', nickname + "." + nickname)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, nickname + "@")
      .assert.attributeContains(elements.email, 'value', '@')
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, "@")
	  .assert.attributeContains(elements.email, 'value', '@')
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, nickname + "@domain")
	  .assert.attributeContains(elements.email, 'value', '@domain')
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
          message.present)
      .pause(1000)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.couldNotSent,
        "Result - " + message.couldNotSent)

      .setValue(elements.email, ".")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)
      .setValue(elements.email, "com")
        .assert.attributeContains(elements.email, 'value', 'com')
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .pause(1000)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.couldNotSent,
        "Result - " + message.couldNotSent)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, "." + nickname + "@" + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, nickname + ".@" + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, nickname + ".." + nickname + "@" + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, nickname + "@." + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, nickname + "@-" + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, nickname + "@domain-.com")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, nickname + "@domain..com")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, nickname + "@" + nickname + "@" + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, "#@%^%#$@#$@#.com")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, "Joe Smith" + nickname + "@" + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, nickname + "@" + emailDomain + "(Some text)")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {},
        message.present)
      .pause(1000)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.couldNotSent,
        "Result - " + message.couldNotSent)

      //Positive test for email field
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, input.username)
      .click(elements.buttonRestore)
      .waitForElementVisible(message.emailSent, 5000, false, function() {},
        message.present)
      .pause(1000)
      .assert.elementPresent(message.emailSent,"Succsess mesage is present")
      .assert.containsText(message.emailSent, "Email sent!",
        "Result - Email sent!");
  },
};
