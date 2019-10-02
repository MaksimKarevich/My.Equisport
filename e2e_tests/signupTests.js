module.exports = {
  "@tags": ["all", "signup", "spositive"],
  before: function(browser) {
    console.log("Setting up... browser", typeof browser);
  },

  after: function(browser) {
    console.log("Closing down... browser", typeof browser);
    browser.end();
  },

  "Sign Up Tests Positive": function(browser) {
    const url = "http://ec2-13-48-149-152.eu-north-1.compute.amazonaws.com";
    const emailDomain = "test.com";
    const nickname = "test" + Date.now();
    const input = {
      username: nickname + "@" + emailDomain,
      password: "QWE123qwe"
    };

    browser
      //Navigate to SignUp page
      .url(url)
      .useXpath()
      .waitForElementVisible(
        '//a[text()="Sign Up"]', 1000, false, function() {},
        "The SignUp button is present")
      .click('//a[text()="Sign Up"]')
      .waitForElementVisible(
        '//input[@placeholder="Enter your email here"]', 1000, false, function() {},
        "The Email field is present")
      .useCss()
      .assert.urlContains("/auth/signup", "You are on the SignUp page")

      .setValue('input[placeholder="Enter your email here"]', input.username)
      .setValue('input[placeholder="Enter your password here"]', input.password)
      .setValue('input[placeholder="Repeat your password"]', input.password);
  },
};
