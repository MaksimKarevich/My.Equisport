module.exports = {

	'@tags': ['all', 'profile', 'positive', 'password'],
	before: function (browser) {
		console.log('Setting up... browser', typeof browser);
	},
	after: function (browser) {
		browser.end();
		console.log('Closing down... browser', typeof browser);
	},

	'Profile Photographer password test': function (browser) {
		const url = 'http://localhost:3000/';
		const input = {
			username: 'photographer@email.com',
			password: 'qwe123qwe',
		};
		//Elements block
		const elements = {
			email: 'input[type="email"]',
			password: 'input[type="password"]',
			textButtonLogin: 'a[href="/auth/login"] ',
			textButtonProfile: 'a[href="/dashboard/profile"]',
			buttonLogin: '.FormContainer-sc-1yympqn-0.dvhynU > div > button',
			textButtonLogout: '.Navigation__Dropdown-sc-1cwjzq8-3:nth-child(3)',
			buttonSave: 'div.DashboardContainer-z2wv56-0.hsffSl div.DashboardContentContainer-eu3wdv-0.eoYPbF div.Profile__ProfileContainer-sc-1ndjmos-0.fMnNiO div.Profile__AdvancedInfoContainer-sc-1ndjmos-2.iOaeDZ div.ChangePasswordForm__Section-sc-13rwukv-1.gFHSSJ:nth-child(1) div.ChangePasswordForm__SectionContent-sc-13rwukv-3.bexnnq div.ChangePasswordForm__Column-sc-13rwukv-4.jaYxSo:nth-child(2) div.ChangePasswordForm__Item-sc-13rwukv-5.kyuRIY:nth-child(2) > button.FormButton-yq5rye-0.ChangePasswordForm__SaveButton-sc-13rwukv-7.erLXVE',
			messageSuccess: ':nth-child(1) .Profile__ProfileContainer-sc-1ndjmos-0.fMnNiO > .Profile__SuccessMessage-sc-1ndjmos-18.bFqXkN',
			dropChange: 'div.DashboardContainer-z2wv56-0.hsffSl div.DashboardContentContainer-eu3wdv-0.eoYPbF div.Profile__ProfileContainer-sc-1ndjmos-0.fMnNiO div.Profile__MainInfoContainer-sc-1ndjmos-1.gJJxmS div.Profile__ChangePasswordWrapper-sc-1ndjmos-5.fBakpv > div.Profile__ChangePasswordButton-sc-1ndjmos-19.kpJyTK',
		};
		//Profile fields block
		const profile = {
			userName: 'input[name="name"]',
			userPassword: '#password',
			userNewPassword: '#new_password',
			userRepeatPassword: '#repeat_password',
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

		  //Set the new password//.useXpath()
		  .click(elements.dropChange)
		  .setValue(profile.userPassword, input.password)
		  .setValue(profile.userNewPassword, input.password)
		  .setValue(profile.userRepeatPassword, input.password)
		  .click(elements.buttonSave)
		  .waitForElementVisible(elements .messageSuccess, 5000, 'A success message is displayed')
		  .assert.containsText(elements.messageSuccess, 'Password updated!',
		  'Password updated!')
	},
};
