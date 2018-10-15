'use strict';

var xss = require('xss');
var DomParser = require('dom-parser');
var Remarkable = require('remarkable');
var mtools = require('markup-tools');

module.exports = {
    //export dependencies
    xss: xss,
    DomParser: DomParser,
    Remarkable: Remarkable,
    mtools: mtools
};
