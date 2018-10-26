'use strict';

//dependencies
var  Remarkable = require('remarkable');
var  md = new Remarkable({ html: true, breaks: true, linkify: false, typographer: false, quotes: '“”‘’', });
var  DomParser = require('dom-parser');
var  parser = new DomParser();
var  xss = require('xss');
var  mtools = require('markup-tools');

module.exports = {
    text: function(text, options) {
        var html = md.render(String(text));
        var safeText = options ? xss(html, options) : xss(html);
        var htmlText = '<div id=\'main\'> ' + safeText + ' </div>';
        var dom = parser.parseFromString(htmlText);
        return dom.getElementById('main').textContent;
    },

    html: async function(text, options) {
        var html = md.render(String(text));
        var safeText = options ? xss(html, options) : xss(html);
        return safeText;
    },

    summary: function(text, count, options) {
        var html = md.render(String(text));
        var safeText = options ? xss(html, options) : xss(html);
        var htmlText = '<div id=\'main\'> ' + safeText + ' </div>';
        var dom = parser.parseFromString(htmlText);
        var textString = dom.getElementById('main').textContent;
        var stripedLines = textString.replace(/\r?\n|\r/g, ' ').trim();
        return stripedLines.substring(0, count || 160) + '... ';
    },

    sanitize: async function(text, options) {
        var safeText = options ? xss(String(text), options) : xss(String(text));
        return safeText;
    },

    content: async function(text, options, sanitize, video) {
        var settings = {};
        settings.account_scheme = '/user';
        settings.hashtag_scheme = '/trending';
        var config = options || settings;
        
        var image_build = await mtools.build.images(String(text));
        var account_build = await mtools.build.mentions(
            image_build,
            config.account_scheme
        );
        var hashtag_build = await mtools.build.hashtags(
            account_build,
            config.hashtag_scheme
        );
        
        var link_build = video ? await mtools.build.links(hashtag_build, video) : await mtools.build.links(hashtag_build);
        var html = await md.render(link_build);
        var safeText = sanitize ? xss(html, sanitize) : xss(html);
        var data = safeText;
        
        return data;
    },
};
