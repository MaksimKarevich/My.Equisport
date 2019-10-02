module.exports = {
  "@tags": ["all", "login", "negative"],

  before: function(browser) {
    console.log("Setting up... browser", typeof browser);
  },

  after: function(browser) {
    console.log("Closing down... browser", typeof browser);
    browser.end();
  },

  "Login Tests Negative": function(browser) {
    const url = "http://ec2-13-48-149-152.eu-north-1.compute.amazonaws.com/";
    const emailDomain = "test.com";
    const nickname = "test" + Date.now();
    const input = {
      username: "anyemail@email.com",
      password: "QWE123qwe"
    };
    const elements = {
      errorMessage: ".AuthErrorMessage__AuthErrorMessageContainer-vy0jys-0", //Error message
      email: 'input[placeholder="Enter your email here"]', //Email field
      password: 'input[placeholder="Enter your password here"]', //Password field
      buttonLogin: "button.FormButton-yq5rye-0.etjSuT", //Button Login
      buttonLogout: '//div[contains(text(),"Logout")]', //Button Logout
      textButtonLogin: ".Navigation__NavigationPanel-sc-1cwjzq8-1:nth-child(2) .Navigation__NavItem-sc-1cwjzq8-2:nth-child(1)" //Text button Login
    };
    const message = {
      displayed: "The error message is displayed.",
      emailRequired: "The email field is required.",
      passwordRequired: "The password field is required.",
      valid: "The email must be a valid email address.",
      present: "The error message is present"
    };

    browser
      //Navigate to Login page
      .url(url)
      .waitForElementVisible(elements.textButtonLogin, 1000, false, function() {},
        "The Login button is present")
      .click(elements.textButtonLogin)
      .waitForElementVisible(elements.email, 1000, false, function() {},
        "The Email field is present")
      .assert.urlContains("/auth/login", "You are on the Login page")

      //Send empty form
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {}, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.emailRequired, message.emailRequired)
      .assert.containsText(elements.errorMessage, message.passwordRequired, message.passwordRequired)

      //FIll the email field with invalid data > clear
      .setValue(elements.email, nickname)
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {}, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, message.valid)
      .assert.containsText(elements.errorMessage, message.passwordRequired, message.passwordRequired
    )
      .clearValue(elements.email)

      //FIll the password field with invalid data > clear
      .setValue(elements.password, "q")
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.errorMessage, 1000, false, function() {}, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .pause(10000)
      .assert.containsText(elements.errorMessage, message.emailRequired, message.emailRequired)
      .clearValue(elements.password)

      //Login with correct data
      .clearValue(elements.email)
      .clearValue(elements.password)
      .setValue(elements.email, input.username)
      .setValue(elements.password, input.password)
      .click(elements.buttonLogin)
      .useXpath()
      .waitForElementVisible(elements.buttonLogout)
      .assert.elementPresent(elements.buttonLogout)
      .click(elements.buttonLogout);
  },
};
