'use strict';

//dependencies
const Remarkable = require('remarkable');
const md = new Remarkable({ html: true, breaks: true, linkify: false, typographer: false, quotes: '“”‘’', });
const DomParser = require('dom-parser');
const parser = new DomParser();
const sanitizeHtml = require('sanitize-html');

//helpers
const account_builder = require('../helpers/account');
const image_builder = require('../helpers/image');
const hashtag_builder = require('../helpers/hashtag');
const link_builder = require('../helpers/link');

module.exports = {
    text: function(text, options) {
        var html = md.render(text);
        var safeText = options ? sanitizeHtml(html, options) : sanitizeHtml(html);
        var htmlText = '<div id=\'main\'> ' + safeText + ' </div>';
        var dom = parser.parseFromString(htmlText);
        return dom.getElementById('main').textContent;
    },

    html: async function(text, options) {
        var html = md.render(text);
        var safeText = options ? sanitizeHtml(html, options) : sanitizeHtml(html);
        return safeText;
    },

    summary: function(text, count, options) {
        var html = md.render(text);
        var safeText = options ? sanitizeHtml(html, options) : sanitizeHtml(html);
        var htmlText = '<div id=\'main\'> ' + safeText + ' </div>';
        var dom = parser.parseFromString(htmlText);
        var textString = dom.getElementById('main').textContent;
        textString = textString.trim();
        return textString.substring(0, count || 160) + '... ';
    },

    sanitize: async function(text, options) {
        var safeText = options ? sanitizeHtml(text, options) : sanitizeHtml(text);
        return safeText;
    },

    content: async function(text, options, sane) {
        var settings = {};
        settings.safe = true;
        settings.video = true;
        settings.account_scheme = '/user';
        settings.hashtag_scheme = '/trending';
        var config = options || settings;
        var html = await md.render(text);
        var safeText = sane ? sanitizeHtml(html, sane) : sanitizeHtml(html);
        var image_build = await image_builder(safeText);
        var account_build = await account_builder(
            image_build,
            config.account_scheme.replace(/\/$/, '')
        ); //remove any potential traling '/'
        var hashtag_build = await hashtag_builder(
            account_build,
            config.hashtag_scheme.replace(/\/$/, '')
        ); //remove any potential traling '/'
        var link_build = await link_builder(hashtag_build, config.video);
        var content = link_build;
        return content;
    },
};
