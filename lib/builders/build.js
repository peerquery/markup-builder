'use strict';

//dependencies
var  Remarkable = require('remarkable');
var  md = new Remarkable({ html: true, breaks: true, linkify: false, typographer: false, quotes: '“”‘’', });
var  DomParser = require('dom-parser');
var  parser = new DomParser();
var  sanitizeHtml = require('sanitize-html');
var  mtools = require('markup-tools');

module.exports = {
    text: function(text, options) {
        var html = md.render(String(text));
        var safeText = options ? sanitizeHtml(html, options) : sanitizeHtml(html);
        var htmlText = '<div id=\'main\'> ' + safeText + ' </div>';
        var dom = parser.parseFromString(htmlText);
        return dom.getElementById('main').textContent;
    },

    html: async function(text, options) {
        var html = md.render(String(text));
        var safeText = options ? sanitizeHtml(html, options) : sanitizeHtml(html);
        return safeText;
    },

    summary: function(text, count, options) {
        var html = md.render(String(text));
        var safeText = options ? sanitizeHtml(html, options) : sanitizeHtml(html);
        var htmlText = '<div id=\'main\'> ' + safeText + ' </div>';
        var dom = parser.parseFromString(htmlText);
        var textString = dom.getElementById('main').textContent;
        textString = textString.trim();
        return textString.substring(0, count || 160) + '... ';
    },

    sanitize: async function(text, options) {
        var safeText = options ? sanitizeHtml(String(text), options) : sanitizeHtml(String(text));
        return safeText;
    },

    content: async function(text, options, sanitize, video) {
        var settings = {};
        settings.account_scheme = '/user';
        settings.hashtag_scheme = '/trending';
        var config = options || settings;
        var html = await md.render(String(text));
        var safeText = sanitize ? sanitizeHtml(html, sanitize) : sanitizeHtml(html);
        var image_build = await mtools.build.images(safeText);
        var account_build = await mtools.build.mentions(
            image_build,
            config.account_scheme
        );
        var hashtag_build = await mtools.build.hashtags(
            account_build,
            config.hashtag_scheme
        );
        var link_build = video ? await mtools.build.links(hashtag_build, video) : await mtools.build.links(hashtag_build);
        var content = link_build;
        return content;
    },
};
