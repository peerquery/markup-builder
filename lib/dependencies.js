'use strict';

const DOMPurify = require('dompurify');
const Remarkable = require('remarkable');
const DomParser = require('dom-parser');
var JSDOM = null;

try {
    // JSDOM does not bundle to browser
    JSDOM = require('jsdom');
} catch (e) {
    console.log('Cannot require JSDOM');
    //console.log(e);
}

module.exports = {
    //export dependencies
    dompurify: DOMPurify,
    jsdom: JSDOM,
    domparser: DomParser,
    remarkable: Remarkable,
};
