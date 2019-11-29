//.setValue(SELECTOR, ['', [browser.Keys.CONTROL, 'a']])
//.keys('\ue003')
// These elements used because .clearValue is not worked properly

module.exports = {
	'@tags': ['all', 'cart', 'positive'],
	before: function(browser) {
		console.log('Setting up... browser', typeof browser);
	},

	after: function(browser) {
		console.log('Closing down... browser', typeof browser);
		browser.end();
	},

	'Cart Positive Test': function(browser) {
		const url = 'http://localhost:3000/';
		const input = {
			username: 'customer@email.com',
			password: 'qwe123qwe'
		};
		const elements = {
			email: "input[placeholder='Enter your email here']",
			password: "input[placeholder='Enter your password here']",
			textButtonLogin: 'div.Navigation__NavigationPanel-sc-1cwjzq8-1.dlxCqy:nth-child(3) div.Navigation__NavItem-sc-1cwjzq8-2.dNnfdX:nth-child(1) > a:nth-child(1)',
			textButtonLogout: '.Navigation__Dropdown-sc-1cwjzq8-3:nth-child(3)',
			textButtonCart: 'a[href="/cart"]',
			buttonLogin: '.FormContainer-sc-1yympqn-0.dvhynU > div > button',
			filterItem: 'a[href="/search?filter=show_jumping"]',
			filterDressageItem: 'div > div > div div > svg[role="img"]',
			firstPhoto: '//body/div[1]/div[1]/div[2]/div[3]/div/div[1]/div[1]',
			btnCart: 'svg[data-icon="cart-plus"]',
			chooseSize: 'svg[data-icon="sort-down"]',
		};
		browser
		  //Navigate to profile
		  .url(url)
		  .waitForElementVisible(elements.textButtonLogin, 5000, 'Login button is visible')
		  .click(elements.textButtonLogin)
		  .assert.urlContains('/auth/login', 'You are on the Login page')
		  .waitForElementVisible(elements.email, 5000, 'Email field is visible')
		  .setValue(elements.email, input.username)
		  .setValue(elements.password, input.password)
		  .click(elements.buttonLogin)
		  .waitForElementVisible(elements.textButtonLogout, 5000, 'Logout button is visible')

		  //Add to Cart
		  .click(elements.filterItem)
		  .waitForElementVisible(elements.filterDressageItem, 5000, 'Filters are visible')
		  .useXpath()
		  .click(elements.firstPhoto)
		  .useCss()
		  .waitForElementVisible(elements.btnCart, 5000, 'You can add the photo to Cart')
		  .click(elements.btnCart)
		  .waitForElementNotPresent(elements.btnCart, 5000, 'The photo window is closed!')
		  .click(elements.textButtonCart)
		  .waitForElementVisible(elements.chooseSize, 5000, 'You have the photos in Cart :)')
		  .assert.urlContains('/cart', 'You are on the Cart page')
		  .click(elements.textButtonLogout)
		  .waitForElementVisible(elements.textButtonLogin, 5000, 'You are logged out')
	},
};
