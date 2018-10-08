'use strict';

module.exports = function(text) {
    return text.replace(
        /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif|bmp|svg|tif|tiff)(?!["\)]))/gi,
        image => {
            return '<img src="' + image + '">' + '<br/>';
        }
    );
};
