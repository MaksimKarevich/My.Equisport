module.exports = {

  //commands block
  '@disabled': false, // true - will disable this test
  "@tags": ["all", "profile", "positive"],
  //The block that will be launched before the browser starts
  before: function(browser) {
    console.log("Setting up... browser", typeof browser);
  },
  //The block that will be launched after the browser end working
  after: function(browser) {
    browser.end();
    console.log("Closing down... browser", typeof browser);
  },

  "Profile UserTests Positive": function(browser) {
    const url = "http://ec2-13-48-149-152.eu-north-1.compute.amazonaws.com/";
    const input = {
      username: "customer@email.com",
      password: "qwe123qwe"
    };
    //Page elements
    const elements = {
      email: 'input[placeholder="Enter your email here"]',
      password: 'input[placeholder="Enter your password here"]',
      textButtonLogin: ".Navigation__NavigationPanel-sc-1cwjzq8-1:nth-child(2) .Navigation__NavItem-sc-1cwjzq8-2:nth-child(1)",
      textButtonProfile: ".Navigation__NavigationPanel-sc-1cwjzq8-1:nth-child(2) .Navigation__NavItem-sc-1cwjzq8-2:nth-child(2)",
      buttonLogin: 'button[class="FormButton-yq5rye-0 etjSuT"]',
      buttonSave: 'button[class="FormButton-yq5rye-0 jvrgdz"]',
      textButtonLogout: ".Navigation__Dropdown-sc-1cwjzq8-3:nth-child(3)",
      searchField: 'input[placeholder="Search here"]',
      fieldCurPassword: 'input[placeholder="Current password"]',
      fieldNewPassword: 'input[placeholder="New password"]',
      fieldRepeatPassword: 'input[placeholder="Repeat password"]',
      messageSuccess: '.CustomerProfile__SuccessMessageContainer-sc-11t8w6m-4:nth-child(2)',
    };

    browser
      //Navigate to Forgot Password page
      .url(url)
      .waitForElementVisible(elements.textButtonLogin, 5000, false, function() {},
          "Login button is visible")
      .click(elements.textButtonLogin)
      .assert.urlContains("/auth/login","You are on the Login page")
      .waitForElementVisible(elements.email, 5000, false, function() {},
        "Email field is visible")
      .setValue(elements.email, input.username)
      .setValue(elements.password, input.password)
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.searchField, 5000, false, function() {},
        "Search field is visible")

	  //Navigate to Profile
      .click(elements.textButtonProfile)
      .waitForElementVisible(elements.fieldCurPassword, 5000, false, function() {},
        "Current password field is visible")
      .assert.urlContains("/profile","You are on the Profile page")

	  //Fill all fields with valid data
      .setValue(elements.fieldCurPassword, input.password)
      .setValue(elements.fieldNewPassword, input.password)
      .setValue(elements.fieldRepeatPassword, input.password)
      .click(elements.buttonSave)
      .waitForElementVisible(elements.messageSuccess, 5000, false, function() {},
            "Success message is visible")
      .assert.elementPresent(elements.messageSuccess,"A success message is shown")
      .assert.containsText(elements.messageSuccess,"Your password successfully updated!",
        "Password changed successfully")
      .click(elements.textButtonLogout)
      .waitForElementVisible(elements.textButtonLogin, 5000, false, function() {},
        "You are logged out"
      );
  },
};
