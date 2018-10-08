'use strict';

module.exports = function(text, scheme) {
    return text.replace(/(^|\s)(#[-a-z\d]+)/gi, tag => {
        if (/#[\d]+$/.test(tag)) return tag; // Don't allow numbers to be tags
        const space = /^\s/.test(tag) ? tag[0] : '';
        const tag2 = tag.trim().substring(1);
        const tagLower = tag2.toLowerCase();
        return (
            space +
            '<a target="_blank" href="' +
            scheme +
            '/' +
            tagLower +
            ' ">' +
            tag +
            ' </a>'
        );
    });
};
