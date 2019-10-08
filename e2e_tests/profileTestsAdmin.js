//.setValue(SELECTOR, ['', [browser.Keys.CONTROL, "a"]])
//.keys('\ue003')
// These elements used because .clearValue is not worked properly
module.exports = {

	'@tags': ['all', 'profile', 'positive'],
	before: function (browser) {
		console.log('Setting up... browser', typeof browser);
	},
	after: function (browser) {
		console.log('Closing down... browser', typeof browser);
		browser.end();
	},

	'Profile AdminTests Positive': function (browser) {
		const url = 'http://ec2-13-48-149-152.eu-north-1.compute.amazonaws.com/';
		const input = {
			username: 'photographer@email.com',
			password: 'qwe123qwe'
		};

		//Elements block
		const elements = {
			email: 'input[placeholder="Enter your email here"]',
			password: 'input[placeholder="Enter your password here"]',
			textButtonLogin: '.Navigation__NavigationPanel-sc-1cwjzq8-1:nth-child(2) .Navigation__NavItem-sc-1cwjzq8-2:nth-child(1)',
			textButtonProfile: '.Navigation__NavigationPanel-sc-1cwjzq8-1:nth-child(2) .Navigation__NavItem-sc-1cwjzq8-2:nth-child(2)',
			buttonLogin: 'button[class="FormButton-yq5rye-0 etjSuT"]',
			searchField: 'input[placeholder="Search here"]',
			buttonSaveProfile: 'button[class="FormButton-yq5rye-0 Profile__SaveProfileButton-sc-1ndjmos-15 WOXPl"]',
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

		browser
		  //Navigate to Forgot Password page
		  .url(url)
		  .waitForElementVisible(elements.textButtonLogin, 5000, false, function () {},
			'Login button is visible')
		  .click(elements.textButtonLogin)
		  .assert.urlContains('/auth/login','You are on the Login page')
		  .waitForElementVisible(elements.email, 5000, false, function () {},
			'Email field is visible')
		  .setValue(elements.email, input.username)
		  .setValue(elements.password, input.password)
		  .click(elements.buttonLogin)
		  .waitForElementVisible(elements.searchField, 5000, false, function () {},
			'Search field is visible')

		  //Navigate to Profile
		  .click(elements.textButtonProfile)
		  .waitForElementVisible(elements.profileBody, 5000, false, function () {},
			'The profile page is loaded')
		  .assert.urlContains('/dashboard/profile','You are on the Dashboard Profile page')

		  //Fill all fields with valid data
		  .clearValue(profile.userName)
		  .setValue(profile.userName, 'User Name')
		  .clearValue(profile.userStreet)
		  .setValue(profile.userStreet, 'My Street')
		  .clearValue(profile.userZipCode)
		  .setValue(profile.userZipCode, '123456')
		  .clearValue(profile.userPhone)
		  .setValue(profile.userPhone, '937-99-92')
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
		  .setValue(profile.userPriceSmall, ['', [browser.Keys.CONTROL, "a"]])
		  .keys('\ue003')
		  .setValue(profile.userPriceSmall, '5')
		  .setValue(profile.userPriceMedium, ['', [browser.Keys.CONTROL, "a"]])
		  .keys('\ue003')
		  .setValue(profile.userPriceMedium, '10')
		  .setValue(profile.userPriceLarge, ['', [browser.Keys.CONTROL, "a"]])
		  .keys('\ue003')
		  .setValue(profile.userPriceLarge, '15')
		  .setValue(profile.userPriceOriginal, ['', [browser.Keys.CONTROL, "a"]])
		  .keys('\ue003')
		  .setValue(profile.userPriceOriginal, '3')
		  .setValue(profile.userPriceCommercial, ['', [browser.Keys.CONTROL, "a"]])
		  .keys('\ue003')
		  .setValue(profile.userPriceCommercial, '1')
		  .click(elements.buttonSaveProfile)
		  .waitForElementVisible(elements .messageSuccess, 5000, false, function () {},
			'A success message is displayed')
		  .assert.containsText(elements.messageSuccess, 'Profile successfully updated!',
		  'Profile successfully updated!')
	},
};
