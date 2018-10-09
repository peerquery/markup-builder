'use strict';

const sanitizeHtml = require('sanitize-html');
const DomParser = require('dom-parser');
const Remarkable = require('remarkable');

module.exports = {
    //export dependencies
    sanitizeHtml: sanitizeHtml,
    DomParser: DomParser,
    Remarkable: Remarkable
};
