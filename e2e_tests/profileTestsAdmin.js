//.setValue(SELECTOR, ['', [browser.Keys.CONTROL, 'a']])
//.keys('\ue003')
// These elements used because .clearValue is not worked properly
module.exports = {

	'@tags': ['all', 'profile', 'positive'],
	before: function (browser) {
		console.log('Setting up... browser', typeof browser);
	},
	after: function (browser) {
		browser.end();
		console.log('Closing down... browser', typeof browser);
	},

	'Profile AdminTests Positive': function (browser) {
		const url = 'http://localhost:3000/';
		const input = {
			username: 'photographer@email.com',
			password: 'qwe123qwe'
		};
		//Elements block
		const elements = {
			email: 'input[placeholder="Enter your email here"]',
			password: 'input[placeholder="Enter your password here"]',
			textButtonLogin: 'div.Navigation__NavigationPanel-sc-1cwjzq8-1.dlxCqy:nth-child(3) div.Navigation__NavItem-sc-1cwjzq8-2.dNnfdX:nth-child(1) > a:nth-child(1)',
			textButtonProfile: '.Navigation__NavigationPanel-sc-1cwjzq8-1.dlxCqy:nth-child(3) .Navigation__NavItem-sc-1cwjzq8-2.dNnfdX:nth-child(2) a:nth-child(1)',
			buttonLogin: '.FormContainer-sc-1yympqn-0.dvhynU > div > button',
			searchField: 'input[placeholder="Search here"]',
			buttonSaveProfile: '.Profile__SaveProfileButtonWrapper-sc-1ndjmos-14.izFoPo > button',
			messageSuccess: 'div[class="Profile__SuccessMessage-sc-1ndjmos-17 bjlJXu"]',
			profileBody: 'div[class = "Profile__ProfileContainer-sc-1ndjmos-0 fMnNiO"]'
		};

		//Profile fields block
		const profile = {
			userName: 'input[name="name"]',
			userStreet: '#address_street',
			userZipCode: '#address_zip',
			userPhone: '#address_phone',
			userCity: '#address_city',
			userCountry: '#address_country',
			userCompName: '#company_name',
			userCompVat: '#company_vat',
			userCompReg: '#company_reg_no',
			userPayPal: '#paypal_email',
			userPriceSmall: '#price_sm',
			userPriceMedium: '#price_md',
			userPriceLarge: '#price_lg',
			userPriceOriginal: '#price_og',
			userPriceCommercial: '#price_com',
		};

		function getRandom() {
			return Math.floor(Math.random() * 2500) + 1;
		}

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
		  .waitForElementVisible(elements.profileBody, 5000, 'The profile page is loaded')
		  .assert.urlContains('/dashboard/profile','You are on the Dashboard Profile page')

		  //Fill all fields with valid data
		  .clearValue(profile.userName)
		  .setValue(profile.userName, 'User Name ' + Date.now())
		  .clearValue(profile.userStreet)
		  .setValue(profile.userStreet, 'My Street')
		  .clearValue(profile.userZipCode)
		  .setValue(profile.userZipCode, Date.now() + 99)
		  .clearValue(profile.userPhone)
		  .setValue(profile.userPhone, '+1 ' + Date.now())
		  .clearValue(profile.userCity)
		  .setValue(profile.userCity, 'My City')
		  .clearValue(profile.userCountry)
		  .setValue(profile.userCountry, 'My Country')
		  .clearValue(profile.userCompName)
		  .setValue(profile.userCompName, 'My Company Name')
		  .clearValue(profile.userCompVat)
		  .setValue(profile.userCompVat, '987654321')
		  .clearValue(profile.userCompReg)
		  .setValue(profile.userCompReg, '134679')
		  .clearValue(profile.userPayPal)
		  .setValue(profile.userPayPal, input.username)

		  //Fill the prices fields
		  .setValue(profile.userPriceSmall, ['', [browser.Keys.CONTROL, 'a']])
		  .keys('\ue003')
		  .setValue(profile.userPriceSmall, getRandom())
		  .setValue(profile.userPriceMedium, ['', [browser.Keys.CONTROL, 'a']])
		  .keys('\ue003')
		  .setValue(profile.userPriceMedium, getRandom())
		  .setValue(profile.userPriceLarge, ['', [browser.Keys.CONTROL, 'a']])
		  .keys('\ue003')
		  .setValue(profile.userPriceLarge, getRandom())
		  .setValue(profile.userPriceOriginal, ['', [browser.Keys.CONTROL, 'a']])
		  .keys('\ue003')
		  .setValue(profile.userPriceOriginal, getRandom())
		  .setValue(profile.userPriceCommercial, ['', [browser.Keys.CONTROL, 'a']])
		  .keys('\ue003')
		  .setValue(profile.userPriceCommercial, getRandom())
		  .click(elements.buttonSaveProfile)
		  .waitForElementVisible(elements .messageSuccess, 5000, 'A success message is displayed')
		  .assert.containsText(elements.messageSuccess, 'Profile successfully updated!',
		  'Profile successfully updated!')
	},
};
