'use strict';

var sanitizeHtml = require('sanitize-html');
var DomParser = require('dom-parser');
var Remarkable = require('remarkable');
var mtools = require('markup-tools');

module.exports = {
    //export dependencies
    sanitizeHtml: sanitizeHtml,
    DomParser: DomParser,
    Remarkable: Remarkable,
    mtools: mtools
};
