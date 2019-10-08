//.setValue(SELECTOR, ['', [browser.Keys.CONTROL, "a"]])
//.keys('\ue003')
// These elements used because .clearValue is not worked properly

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
    const nickname = "test" + Date.now();
    const input = {
      username: "customer@email.com",
      password: "qwe123qwe"
    };
    const elements = {
      errorMessage: ".AuthErrorMessage__AuthErrorMessageContainer-vy0jys-0",
      email: 'input[placeholder="Enter your email here"]',
      password: 'input[placeholder="Enter your password here"]',
      buttonLogin: "button.FormButton-yq5rye-0.etjSuT",
      textButtonLogout: ".Navigation__Dropdown-sc-1cwjzq8-3:nth-child(3)",
      textButtonLogin: ".Navigation__NavigationPanel-sc-1cwjzq8-1:nth-child(2) .Navigation__NavItem-sc-1cwjzq8-2:nth-child(1)"
    };
    const message = {
      displayed: "The error message is displayed.",
      emailRequired: "The email field is required.",
      passwordRequired: "The password field is required.",
      valid: "The email must be a valid email address.",
      present: "The error message is present",
      wrongEmailOrPassword: "Wrong email or password",
    };

    browser
      //Navigate to Login page
      .url(url)
      .waitForElementVisible(elements.textButtonLogin, 5000, false, function() {},
        "The Login button is present")
      .click(elements.textButtonLogin)
      .waitForElementVisible(elements.email, 5000, false, function() {},
        "The Email field is present")
      .assert.urlContains("/auth/login", "You are on the Login page")

      //Send empty form
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {}, message.present)
      .assert.containsText(elements.errorMessage, message.emailRequired, message.emailRequired)
      .assert.containsText(elements.errorMessage, message.passwordRequired, message.passwordRequired)

      //Fill the email field with invalid data
      .setValue(elements.email, nickname)
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {}, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, message.valid)
      .assert.containsText(elements.errorMessage, message.passwordRequired, message.passwordRequired)

      //Fill the password field with invalid data
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.password, "q")
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {}, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.emailRequired, message.emailRequired)

      //Fill both field with invalid data
      .setValue(elements.email, nickname)
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {}, message.present)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.valid, message.valid)

      //Login with incorrect password
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, input.username)
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.errorMessage, 5000, false, function() {}, message.present)
      .pause(500)
      .assert.elementPresent(elements.errorMessage, message.displayed)
      .assert.containsText(elements.errorMessage, message.wrongEmailOrPassword, message.wrongEmailOrPassword)

      //Login with correct data
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.password, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.email, input.username)
      .setValue(elements.password, input.password)
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.textButtonLogout, 5000, false, function () {},
        'You are logged in')
      .assert.elementPresent(elements.textButtonLogout, 'The Logout button is present')
      .click(elements.textButtonLogout)
      .waitForElementVisible(elements.textButtonLogin, 5000, false, function () {},
        'You are logged out')
  },
};
