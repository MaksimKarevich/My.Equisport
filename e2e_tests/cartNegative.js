module.exports = {
	'@tags': ['all', 'cart', 'negative'],
	before: function(browser) {
		console.log('Setting up... browser', typeof browser);
	},

	after: function(browser) {
		console.log('Closing down... browser', typeof browser);
		browser.end();
	},

	'Cart Negative Test': function(browser) {
		const url = 'http://localhost:3000/';
		const elements = {
			filterDressage: 'a[href="/search?filter=show_jumping"]',
			filterDressageItem: 'div > div > div div > svg[role="img"]',
			firstPhoto: '//body/div[1]/div[1]/div[2]/div[3]/div/div[1]/div[1]',
			btnCart: 'svg[data-icon="cart-plus"]',
			btnLogin: '//button[text()[contains(.,\'Log in\')]]',
		};


		browser
		  .url(url)
		  .waitForElementVisible(elements.filterDressage, 5000,
			'You are on the website Equisport')
		  .click(elements.filterDressage)
		  .waitForElementVisible(elements.filterDressageItem, 5000, 'Filters are visible')
		  .useXpath()
		  .click(elements.firstPhoto)
		  .useCss()
		  .waitForElementVisible(elements.btnCart, 5000, 'You can add the photo to Cart')
		  .click(elements.btnCart)
		  .useXpath()
		  .waitForElementVisible(elements.btnLogin, 5000,
			'You are not logged in. The login form is displayed.')
	},
};
