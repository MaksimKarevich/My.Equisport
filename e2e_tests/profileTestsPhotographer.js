//.setValue(SELECTOR, ['', [browser.Keys.CONTROL, 'a']])
//.keys('\ue003')
// These elements used because .clearValue is not worked properly
module.exports = {

	'@tags': ['all', 'profile', 'positive', '9'],
	before: function (browser) {
		console.log('Setting up... browser', typeof browser);
	},
	after: function (browser) {
		browser.end();
		console.log('Closing down... browser', typeof browser);
	},

	'Profile Photographer Tests Positive': function (browser) {
		const url = 'http://localhost:3000/';
		const input = {
			username: 'photographer@email.com',
			password: 'qwe123qwe',
		};
		const today = new Date().toLocaleString();
		//Elements block
		const elements = {
			email: 'input[type="email"]',
			password: 'input[type="password"]',
			textButtonLogin: 'a[href="/auth/login"] ',
			textButtonProfile: 'a[href="/dashboard/profile"]',
			buttonLogin: '.FormContainer-sc-1yympqn-0.dvhynU > div > button',
			textButtonLogout: '.Navigation__Dropdown-sc-1cwjzq8-3:nth-child(3)',
			buttonSaveProfile: '.Profile__SaveProfileButtonWrapper-sc-1ndjmos-15 > .FormButton-yq5rye-0',
			messageSuccess: ':nth-child(1) .Profile__ProfileContainer-sc-1ndjmos-0.fMnNiO > .Profile__SuccessMessage-sc-1ndjmos-18.bFqXkN',
		};
		function getRandom() {
			return Math.floor(Math.random() * 2500) + 1;
		}
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
			userCompNo: '#company_reg_no',
			userPayPal: '#paypal_email',
			userPriceSmall: '#price_sm',
			userPriceMedium: '#price_md',
			userPriceLarge: '#price_lg',
			userPriceOriginal: '#price_og',
			userPriceCommercial: '#price_com',
		};
		const faker = require('faker');
		const randomData = {
			randomStreet: faker.address.streetAddress(),
			randomZip: faker.address.zipCode(),
			randomPhone: faker.phone.phoneNumber(),
			randomCity: faker.address.city(),
			randomCountry: faker.address.country(),
			randomCompName: faker.company.companySuffix() + '. ' + faker.company.companyName(),
			randomCompNumber: faker.random.number(),
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
		  .waitForElementVisible(elements.textButtonLogout, 5000, 'You are logged in')

		  //Navigate to Profile
		  .click(elements.textButtonProfile)
		  .waitForElementVisible(profile.userName, 5000, 'The profile page is loaded')
		  .assert.urlContains('/dashboard/profile','You are on the Dashboard Profile page')

		  //Fill all fields with valid data
		  .setValue('input[type="file"]', require('path').resolve('/home/maksimk/Downloads/pic_03.png'))
		  .clearValue(profile.userName)
		  .setValue(profile.userName, 'Test User ' + today)
		  .clearValue(profile.userStreet)
		  .setValue(profile.userStreet, randomData.randomStreet)
		  .clearValue(profile.userZipCode)
		  .setValue(profile.userZipCode, randomData.randomZip)
		  .clearValue(profile.userPhone)
		  .setValue(profile.userPhone, randomData.randomPhone)
		  .clearValue(profile.userCity)
		  .setValue(profile.userCity, randomData.randomCity)
		  .clearValue(profile.userCountry)
		  .setValue(profile.userCountry, randomData.randomCountry)
		  .clearValue(profile.userCompName)
		  .setValue(profile.userCompName, randomData.randomCompName)
		  .clearValue(profile.userCompVat)
		  .setValue(profile.userCompVat, randomData.randomCompNumber)
		  .clearValue(profile.userCompNo)
		  .setValue(profile.userCompNo, randomData.randomCompNumber)
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
