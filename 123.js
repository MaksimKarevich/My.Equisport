module.exports = {

    '@tags': ['test'],
    before: function (browser) {
        console.log('Setting up... browser', typeof browser)
    },

    after: function (browser) {
        console.log('Closing down... browser', typeof browser)
    },

    'Test Test': function (browser) {
        const url = 'http://localhost:3000/';
        const emailDomain = 'test.com';
        const nickname = 'test'+ Date.now();
        const input = {
            username: 'anyemail@email.com',
            password: 'QWE123qwe',
        };

        browser
            .url(url)
            .waitForElementVisible('input[placeholder="Search here"]')
            .setValue('input[placeholder="Search here"]', ' something')
            .assert.valueContains('input[placeholder="Search here"]', 'something')
            .clearValue('input[placeholder="Search here"]')
            .assert.attributeContains('input[placeholder="Search here"]', 'value', '')
    },
};
