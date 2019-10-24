module.exports = {
  '@tags': ['all', 'login', 'positive'],
  before: function(browser) {
    console.log('Setting up... browser', typeof browser);
  },

  after: function(browser) {
    console.log('Closing down... browser', typeof browser);
    browser.end();
  },

  'Login Test Positive': function(browser) {
    const input = {
      username: 'customer@email.com',
      password: 'qwe123qwe'
    };
    const url = 'http://localhost:3000/';
    const elements = {
      email: "input[placeholder='Enter your email here']",
      password: "input[placeholder='Enter your password here']",
      textButtonLogin: 'div.Navigation__NavigationPanel-sc-1cwjzq8-1.dlxCqy:nth-child(3) div.Navigation__NavItem-sc-1cwjzq8-2.dNnfdX:nth-child(1) > a:nth-child(1)',
      textButtonLogout: '.Navigation__Dropdown-sc-1cwjzq8-3:nth-child(3)',
      buttonLogin: '.FormContainer-sc-1yympqn-0.dvhynU > div > button',
    };

    browser
      .url(url)
      .waitForElementVisible(elements.textButtonLogin, 5000, 'Login button is visible')
      .click(elements.textButtonLogin)
      .assert.urlContains('/auth/login', 'You are on the Login page')
      .waitForElementVisible(elements.email, 5000, 'Email field is visible')
      .setValue(elements.email, input.username)
      .setValue(elements.password, input.password)
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.textButtonLogout, 5000, 'Logout button is visible')
      .click(elements.textButtonLogout)
      .waitForElementVisible(elements.textButtonLogin, 5000, 'You are logged out'
      );
  },
};
