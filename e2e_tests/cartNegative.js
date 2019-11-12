module.exports = {
	'@tags': ['all', 'cart', 'negative', '1'],
	before: function(browser) {
		console.log('Setting up... browser', typeof browser);
	},

	after: function(browser) {
		console.log('Closing down... browser', typeof browser);
		browser.end();
	},

	'Forgot Password Tests': function(browser) {
		const url = 'http://localhost:3000/';
		const elements = {
			filterDressage: 'a[href="/search?filter=dressage"]',
			filterDressageItem: 'div > div > div div > svg[role="img"]',
			firstPhoto: 'div.PageContainer-sc-24iwb2-0.jYeKbh div.ContentContainer-ga6x55-0.iqRxKD div.PhotosGrid__PhotoGridContainer-ehyh62-0.iPoKrT div.PhotosGrid__ContentContainer-ehyh62-1.kSPiEo div.PhotosGrid__Row-ehyh62-2.hJLEkS div.PhotosGrid__Card-ehyh62-3.eNadmO:nth-child(1) div.PhotosGrid__PhotoWrapper-ehyh62-4.hKQLPD > div.PhotosGrid__Photo-ehyh62-5.eltQaN',
			btnCart: 'div.PageContainer-sc-24iwb2-0.jYeKbh div.ContentContainer-ga6x55-0.iqRxKD div.PhotosGrid__PhotoGridContainer-ehyh62-0.iPoKrT div.PreviewModal__PreviewModalContainer-qmxqix-0.fBZCgB div.PreviewModal__ModalBody-qmxqix-2.hJEPzE div.PreviewModal__PhotoPreview-qmxqix-3.hpxICA > div.PreviewModal__ShoppingCartContainer-qmxqix-7.fiDzIq:nth-child(5)',
			messWrong: 'body:nth-child(2) div:nth-child(1) div.AlertComponent__AlertContainer-sc-12m40mf-0.hnTmRp > div.AlertComponent__StyledAlert-sc-12m40mf-2.AlertComponent__ErrorAlert-sc-12m40mf-4.fXTLMq',
		};
		browser
		  .url(url)
		  .waitForElementVisible(elements.filterDressage, 5000)
		  .click(elements.filterDressage)
		  .waitForElementVisible(elements.filterDressageItem, 5000, 'Filters are visible')
		  .click(elements.firstPhoto)
		  .waitForElementVisible(elements.btnCart, 5000, 'You can add the photo to Cart')
		  .click(elements.btnCart)
		  .waitForElementVisible(elements.messWrong, 5000, 'You are not logged in')
		  .getText(elements.messWrong, function (result) {
			  console.log(result.value);
		  })
	},
};
