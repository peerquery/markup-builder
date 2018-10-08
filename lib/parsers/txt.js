'use strict';

//dependencies
const Remarkable = require('remarkable');
const md = new Remarkable({ html: true, breaks: true, linkify: false, typographer: false, quotes: '“”‘’', });
const DomParser = require('dom-parser');
const parser = new DomParser();
const jsEnv = require('browser-or-node');

const createDOMPurify = require('dompurify');
var DOMPurify = require('dompurify');

try {
    // JSDOM does not bundle to browser
    const { JSDOM } = require('jsdom');
    
    if (jsEnv.isNode) {
        const windo = (new JSDOM('')).window;
        DOMPurify = createDOMPurify(windo);
    }
        
} catch (e) {
    console.log('Cannot require JSDOM');
    //console.log(e);
}

//helpers
const account_builder = require('../helpers/account');
const image_builder = require('../helpers/image');
const hashtag_builder = require('../helpers/hashtag');
const link_builder = require('../helpers/link');

module.exports = {
    text: function(html) {
        var mdText = md.render(html);
        var safeText = DOMPurify.sanitize(mdText, { SAFE_FOR_JQUERY: true });
        var htmlText = '<div id=\'main\'> ' + safeText + ' </div>';
        var dom = parser.parseFromString(htmlText);
        return dom.getElementById('main').textContent;
    },

    html: async function(text, safe) {
        var html = md.render(text);
        if (safe !== false) {
            return await DOMPurify.sanitize(html, { SAFE_FOR_JQUERY: true });
        } else {
            return await DOMPurify.sanitize(html);
        }
    },

    summary: function(html, count) {
        var mdText = md.render(html);
        var safeText = DOMPurify.sanitize(mdText, { SAFE_FOR_JQUERY: true });
        var htmlText = '<div id=\'main\'> ' + safeText + ' </div>';
        var dom = parser.parseFromString(htmlText);
        var textString = dom.getElementById('main').textContent;
        textString = textString.trim();
        return textString.substring(0, count || 160) + '... ';
    },

    sanitize: async function(html, safe) {
        if (safe !== false) {
            return await DOMPurify.sanitize(html, { SAFE_FOR_JQUERY: true });
        } else {
            return await DOMPurify.sanitize(html);
        }
    },

    content: async function(text, options) {
        var settings = {};
        settings.safe = true;
        settings.video = true;
        settings.account_scheme = '/user';
        settings.hashtag_scheme = '/trending';

        var config = options || settings;

        var mdText = await md.render(text);
        var safeText;
        if (config.safe !== false) {
            safeText = await DOMPurify.sanitize(mdText, {
                SAFE_FOR_JQUERY: true,
            });
        } else {
            safeText = await DOMPurify.sanitize(mdText);
        }
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
