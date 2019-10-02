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
      buttonRestore: ".FormButton-yq5rye-0.etjSuT"
    };
    const message = {
      displayed: "The error message is displayed.",
      required: "The email field is required.",
      valid: "The email must be a valid email address.",
      couldNotSent: "Email could not sent to this email address.",
      present: "The error message is present"
    };

    browser
      //Navigate to Forgot Password page
      .url(url)
      .useXpath()
      .waitForElementVisible(
        '//a[contains(text(),"Login")]', 1000, false, function() {},
        "The Login button is present")
      .click('//a[contains(text(),"Login")]')
      .waitForElementVisible(
        '//a[contains(text(),"Forgot your password?")]', 1000, false, function() {},
        "The Forgot Password button is present")
      .click('//a[contains(text(),"Forgot your password?")]')
      .useCss()
      .assert.urlContains("/forgot-password",
        "You are on the Forgot Password page")
      .waitForElementVisible(elements.email, 1000, false, function() {},
        "The Email field is present")

      //Negative tests for email field
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.required,
        "Result - " + message.required)

      .setValue(elements.email, nickname)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, nickname + "." + nickname)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, nickname + "@")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .setValue(elements.email, "@")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, nickname + "@domain")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
          message.present)
        .pause(2000)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.couldNotSent,
        "Result - " + message.couldNotSent)

      .setValue(elements.email, ".")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)
      .setValue(elements.email, "com")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .pause(2000)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.couldNotSent,
        "Result - " + message.couldNotSent)

      .clearValue(elements.email)
      .setValue(elements.email, emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, "." + nickname + "@" + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, nickname + ".@" + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, nickname + ".." + nickname + "@" + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, nickname + "@." + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, nickname + "@-" + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, nickname + "@domain-.com")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, nickname + "@domain..com")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, nickname + "@" + nickname + "@" + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, "#@%^%#$@#$@#.com")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, "Joe Smith" + nickname + "@" + emailDomain)
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid,
        "Result - " + message.valid)

      .clearValue(elements.email)
      .setValue(elements.email, nickname + "@" + emailDomain + "(Some text)")
      .click(elements.buttonRestore)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {},
        message.present)
      .pause(2000)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.couldNotSent,
        "Result - " + message.couldNotSent)

      //Positive test for email field
      .clearValue(elements.email)
      .setValue(elements.email, input.username)
      .click(elements.buttonRestore)
      .pause(2000)
      .assert.elementPresent("div.FormWrapper-kv83pj-0.iqdvhj :nth-child(3)",
        "Succsess mesage is present")
      .assert.containsText(
          "div.FormWrapper-kv83pj-0.iqdvhj :nth-child(3)",
        "Email successfully sent to your email address. Follow instructions in email to complete password restoring.",
        "Result - Email successfully sent to your email address. Follow instructions in email to complete password restoring."
      );
  },
};
