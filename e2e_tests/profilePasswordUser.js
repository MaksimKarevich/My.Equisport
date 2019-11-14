module.exports = {

  //commands block
  '@disabled': false, // true - will disable this test
  '@tags': ['all', 'profile', 'positive', 'password'],
  //The block that will be launched before the browser starts
  before: function(browser) {
    console.log('Setting up... browser', typeof browser);
  },
  //The block that will be launched after the browser end working
  after: function(browser) {
    browser.end();
    console.log('Closing down... browser', typeof browser);
  },

  'Profile User password test': function(browser) {
    const url = 'http://localhost:3000/';
    const input = {
      username: 'customer@email.com',
      password: 'qwe123qwe'
    };
    //Page elements
    const elements = {
      email: "input[placeholder='Enter your email here']",
      password: "input[placeholder='Enter your password here']",
      textButtonLogin: '.Navigation__NavigationLayout-sc-1cwjzq8-0.iTelEJ > :nth-child(3) > :nth-child(1) > a',
      textButtonProfile: '.Navigation__NavigationPanel-sc-1cwjzq8-1.dlxCqy:nth-child(3) .Navigation__NavItem-sc-1cwjzq8-2.dNnfdX:nth-child(2) a:nth-child(1)',
      textButtonLogout: '.Navigation__Dropdown-sc-1cwjzq8-3:nth-child(3)',
      buttonLogin: '.FormContainer-sc-1yympqn-0.dvhynU > div > button',
      buttonSave: ':nth-child(4) > button.FormButton-yq5rye-0.iIbtse',
      searchField: "input[placeholder='Search here']",
      fieldCurPassword: "input[placeholder='Current password']",
      fieldNewPassword: "input[placeholder='New password']",
      fieldRepeatPassword: "input[placeholder='Repeat password']",
      messageSuccess: '.CustomerProfile__SuccessMessageContainer-sc-11t8w6m-4:nth-child(2)',
    };

    browser
      //Navigate to Forgot Password page
      .url(url)
      .waitForElementVisible(elements.textButtonLogin, 5000, 'Login button is visible')
      .click(elements.textButtonLogin)
      .assert.urlContains('/auth/login','You are on the Login page')
      .waitForElementVisible(elements.email, 5000, 'Email field is visible')
      .setValue(elements.email, input.username)
      .setValue(elements.password, input.password)
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.searchField, 5000, 'Search field is visible')

	  //Navigate to Profile
      .click(elements.textButtonProfile)
      .waitForElementVisible(elements.fieldCurPassword, 5000, 'Current password field is visible')
      .assert.urlContains('/profile','You are on the Profile page')

	  //Fill all fields with valid data
      .setValue(elements.fieldCurPassword, input.password)
      .setValue(elements.fieldNewPassword, input.password)
      .setValue(elements.fieldRepeatPassword, input.password)
      .click(elements.buttonSave)
      .click(elements.textButtonLogout)
      .waitForElementVisible(elements.textButtonLogin, 5000, 'You are logged out'
      );
  },
};
