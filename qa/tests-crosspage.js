var Browser = require('zombie'),
    assert = require('chat').assert;
var browser;
suite('Cross-Page Tests', function () {
    setup(function () {
        browser = new Browser();
    });
    test('requesting a custom order from the pendants page should populate the referrer field', function (done) {
        var referrer = 'http://localhost:3000/products/pendants';
        browser.visit(referrer, function () {
            browser.clickLink('.requestCustomOrder', function () {
                assert(browser.field('referrer').value === referrer);
                done();

            });
        });
    });

    test('requesting a custom order from the earrings page should populate the referrer field', function (done) {
        var referrer = 'http://localhost:3000/products/earrings';
        browser.clickLink('.requestCustomOrder', function () {
            assert(browser.field('referrer').value === referrer);
            done();
        });
    });

    test('visiting the "request custom order" page directly should result in an empty referrer field', function (done) {
        browser.visit('http://localhost:3000/products/request-custom-order', function () {
            assert(browser.field('referrer').value === '');
            done();
        });
    });
});