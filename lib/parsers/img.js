'use strict';

module.exports = {
    get: function(text, image_number, type) {
        var regex;
        if (type) {
            type = (type[0] == '.') ? type.substr(1) : type;    //remove any leading '.' characters, so '.png' becomes 'png'
            if (['jpeg', 'jpg', 'png', 'gif', 'svg', 'bmp', 'tif', 'tiff' ].indexOf(type) == -1) return '';
            regex = new RegExp('([a-z\-_0-9\/\:\.]*\.(' + type + '))', 'gi');
        } else {
            regex = /([a-z\-_0-9\/\:\.]*\.(jpe?g|bmp|svg|png|gif|tif|tiff))/gi;
        }
        var num = image_number || 0;
        try {
            var src = text.match(regex)[num];
            if (src) return src;
            return '';
        } catch (err) {
            //console.log(err);
            return '';
        }
    },
};
