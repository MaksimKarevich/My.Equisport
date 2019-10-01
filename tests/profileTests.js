module.exports = {
  "@tags": ["all", "profile", "positive"],
  before: function(browser) {
    console.log("Setting up... browser", typeof browser);
  },

  after: function(browser) {
    console.log("Closing down... browser", typeof browser);
    browser.end();
  },

  "Profile UserTests Positive": function(browser) {
    const url = "http://localhost:3000/";
    const nickname = "test" + Date.now();
    const emailDomain = "domain.com";
    const input = {
      username: "anyemail@email.com",
      password: "QWE123qwe"
    };
    const elements = {
      email: 'input[placeholder="Enter your email here"]',
      password: 'input[placeholder="Enter your password here"]',
      textButtonLogin:
        ".Navigation__NavigationPanel-sc-1cwjzq8-1:nth-child(2) .Navigation__NavItem-sc-1cwjzq8-2:nth-child(1)",
      textButtonProfile:
        ".Navigation__NavigationPanel-sc-1cwjzq8-1:nth-child(2) .Navigation__NavItem-sc-1cwjzq8-2:nth-child(2)",
      buttonLogin: ".FormButton-yq5rye-0.etjSuT",
      textButtonLogout: ".Navigation__Dropdown-sc-1cwjzq8-3:nth-child(3)"
    };

    browser
      //Navigate to Forgot Password page
      .url(url)
      .waitForElementVisible(
        elements.textButtonLogin,
        1000,
        false,
        function() {},
        "Login button is visible"
      )
      .click(elements.textButtonLogin)
      .assert.urlContains("/auth/login", "You are on the Login page")
      .waitForElementVisible(
        elements.email,
        1000,
        false,
        function() {},
        "Email field is visible"
      )
      .setValue(elements.email, input.username)
      .setValue(elements.password, input.password)
      .click(elements.buttonLogin)
      .waitForElementVisible(
        elements.textButtonProfile,
        2000,
        false,
        function() {},
        "Profile button is visible"
      )
      .click(elements.textButtonProfile)
      .waitForElementVisible(
        'input[placeholder="Current password"]',
        1000,
        false,
        function() {},
        "Current password field is visible"
      )
      .assert.urlContains("/profile", "You are on the Profile page")
      .setValue('input[placeholder="Current password"]', input.password)
      .setValue('input[placeholder="New password"]', input.password)
      .setValue('input[placeholder="Repeat password"]', input.password)
      .click(".FormButton-yq5rye-0")
      .assert.elementPresent(
        ".CustomerProfile__SuccessMessageContainer-sc-11t8w6m-4:nth-child(2)",
        "A success message is shown"
      )
      .assert.containsText(
        ".CustomerProfile__SuccessMessageContainer-sc-11t8w6m-4:nth-child(2)",
        "Your password successfully updated!",
        "Password changed successfully"
      )
      .click(elements.textButtonLogout)
      .waitForElementVisible(
        elements.textButtonLogin,
        1000,
        false,
        function() {},
        "You are logged out"
      );
  }
};
