'use strict';

module.exports = function(text, video) {
    return (text || '').replace(
        /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
        function(match, space, url) {
            var hyperlink = url.split('<')[0];

            if (!hyperlink.match('^https?://'))
                hyperlink = 'http://' + hyperlink;

            if (video) {
                var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var matched = hyperlink.match(regExp);

                if (matched && matched[2].length == 11) {
                    var id = matched[2];

                    if (id)
                        return (
                            '<iframe width="640" height="360" src="https://www.youtube.com/embed/' +
                            id +
                            '" frameborder="0" allowfullscreen></iframe>'
                        );
                } else {
                    return space + '<a href="' + hyperlink + '">' + url + '</a>';
                }
            } else {
                return space + '<a href="' + hyperlink + '">' + url + '</a>';
            }
        }
    );
};
