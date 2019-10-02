module.exports = {
  "@tags": ["all", "login", "lpositive"],
  before: function(browser) {
    console.log("Setting up... browser", typeof browser);
  },

  after: function(browser) {
    console.log("Closing down... browser", typeof browser);
    browser.end();
  },

  "Login Test Positive": function(browser) {
    const input = {
      username: "anyemail@email.com",
      password: "QWE123qwe"
    };
    const url = "http://ec2-13-48-149-152.eu-north-1.compute.amazonaws.com";
    const elements = {
      email: 'input[placeholder="Enter your email here"]', //Email field
      password: 'input[placeholder="Enter your password here"]', //Password field
      textButtonLogin: ".Navigation__NavigationPanel-sc-1cwjzq8-1:nth-child(2) .Navigation__NavItem-sc-1cwjzq8-2:nth-child(1)", //Text button Login
      textButtonLogout: ".Navigation__Dropdown-sc-1cwjzq8-3:nth-child(3)", //Text button Logout
      buttonLogin: ".FormButton-yq5rye-0.etjSuT" //Button Login
    };

    browser
      .url(url)
      .waitForElementVisible(elements.textButtonLogin, 1000, false, function() {},
        "Login button is visible")
      .click(elements.textButtonLogin)
      .assert.urlContains("/auth/login", "You are on the Login page")
      .waitForElementVisible(elements.email, 2000, false, function() {},
        "Email field is visible")
      .setValue(elements.email, input.username)
      .setValue(elements.password, input.password)
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.textButtonLogout, 2000, false, function() {},
        "Logout button is visible")
      .click(elements.textButtonLogout)
      .waitForElementVisible(elements.textButtonLogin, 1000, false, function() {},
        "You are logged out"
      );
  },
};
