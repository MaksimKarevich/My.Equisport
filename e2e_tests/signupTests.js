module.exports = {
  '@tags': ['all', 'signup', 'positive', '6'],
  before: function(browser) {
    console.log('Setting up... browser', typeof browser);
  },

  after: function(browser) {
    console.log('Closing down... browser', typeof browser);
    browser.end();
  },

  'Sign Up Tests Positive': function(browser) {
    const url = 'http://localhost:3000/';
    const emailDomain = 'test.com';
    const nickname = 'test' + Date.now();
    const input = {
      username: nickname + '@' + emailDomain,
      password: 'QWE123qwe'
    };
    const elements = {
      textButtonSignUp: '.dlxCqy:nth-child(3) .Navigation__NavItem-sc-1cwjzq8-2.dNnfdX:nth-child(2) a:nth-child(1)',
      fieldEmail: 'input[placeholder="Enter your email here"]',
      fieldPassword: 'input[placeholder="Enter your password here"]',
      fieldRepeatPassword: 'input[placeholder="Repeat your password"]',
      buttonSignUp: '.FormContainer-sc-1yympqn-0.dvhynU > div > button',
      buttonLogout: '.Navigation__Dropdown-sc-1cwjzq8-3:nth-child(3)',
    };

    browser
      //Navigate to SignUp page
      .url(url)
      .waitForElementVisible(elements.textButtonSignUp, 5000, 'The SignUp button is present')
      .click(elements.textButtonSignUp)
      .waitForElementVisible(elements.fieldEmail, 5000, 'The Email field is present')
      .assert.urlContains('/auth/signup', 'You are on the SignUp page')

      //Fill the fields with valid data
      .setValue(elements.fieldEmail, input.username)
      .setValue(elements.fieldPassword, input.password)
      .setValue(elements.fieldRepeatPassword, input.password)
      .click(elements.buttonSignUp)
      .waitForElementVisible(elements.buttonLogout, 5000, 'Logout button is visible')
  },
};
