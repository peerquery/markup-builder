[![Pull requests](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/peerquery/markup-builder/pulls)
[![Build status](https://travis-ci.org/peerquery/markup-builder.svg?branch=master)](https://travis-ci.org/peerquery/markup-builder)
[![Dep tracker](https://david-dm.org/peerquery/markup-builder.svg)](https://david-dm.org/peerquery/markup-builder)
[![Codebase license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/peerquery/markup-builder/blob/master/LICENSE)

# Markup Builder
Markdown and HTML markup building tools.

## Installation

### Node.js

```javascript
npm install markup-builder --save
```

Use as:

```
const markup = require('markup-builder');
```

### Browser

```html
<script src="https://unpkg.com/markup-builder/dist/markup.min.js"></script>
```

## Usage

### Text tools
`markup.build` comes with 5 functions:

```javascript
const t = "**Lorem ipsum dolor sit amet**, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes,<script>alert('Quisque rutrum.')</script> nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder";
```

```javascript
//options object the configurations for the 'sanitize-html' module
//Find out more: https://github.com/punkave/sanitize-html#what-are-the-default-options
const options = {
    allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe' ],
    allowedAttributes: {
        a: [ 'href', 'name', 'target' ],
        // We don't currently allow img itself by default, but this
        // would make sense if we did
        img: [ 'src' ]
    },
    // Lots of these won't come up by default because we don't allow them
    selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
    // URL schemes we permit
    allowedSchemes: [ 'http', 'https', 'ftp', 'mailto' ],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
    allowProtocolRelative: true,
    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
};
```

#### `markup.build.text(text, options);`
Returns the text version of a `markdown` or `HTML` string input;

`options` is optional configurations object for `sanitize-html`.

```javascript
var text = markup.build.text(t, options);
console.log(text);

// " Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder"
```

#### `markup.build.html(text, options);`
Returns the html version of a `markdown` or `HTML` string input;

`options` is optional configurations object for `sanitize-html`.

```javascript
//inside async function
var html = await markup.build.html(t, options);
console.log(html);

//With promise API
markup.build.html(t).then(function(html, options){
    console.log(html);
});

// "<p><strong>Lorem ipsum dolor sit amet</strong>, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder</p>"
```

#### `markup.build.summary(text, count, options);`
Returns the text version of a `markdown` or `HTML` string input, trimmed to `count` or a default of 160 characters;

```javascript
//inside async function
var summary = await markup.build.summary(t/* , options */);
console.log(summary);

//With promise API
markup.build.summary(t).then(function(summary/* , options */){
    console.log(summary);
});

// "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturien..."
```

#### `markup.build.content(text, options, sane);`
Returns the full html version of a `markdown` or `HTML` string input; parsing hashtag, mentions, naked image links and naked youtube link.

```javascript
var options = {};
options.video = true; //default: true
options.account_scheme = '/@'; //default is: '/user'
options.hashtag_scheme = '/trends'; //default: '/trending'

//'sane' object is sanitize-html configurations
```
Example:
```javascript
//inside async function
var content = await markup.build.content(t, options );   //with about options object
console.log(content);

// "<p><strong>Lorem ipsum dolor sit amet</strong>, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum <a target="_blank" href="/@/sociis">@sociis</a> natoque <a target="_blank" href="/trends/penatibus "> #penatibus </a> et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,<iframe width="640" height="360" src="https://www.youtube.com/embed/sO_YEdTcVXc" frameborder="0" allowfullscreen></iframe> <a href="https://travis-ci.org/peerquery/markup-builder">https://travis-ci.org/peerquery/markup-builder</p></a>↵"

//With promise API
markup.build.content(t/*, options */).then(function(content){   //options is optional, using defaults
    console.log(content);
});

// "<p><strong>Lorem ipsum dolor sit amet</strong>, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum <a target="_blank" href="/user/sociis">@sociis</a> natoque <a target="_blank" href="/trending/penatibus "> #penatibus </a> et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,<iframe width="640" height="360" src="https://www.youtube.com/embed/sO_YEdTcVXc" frameborder="0" allowfullscreen></iframe> <a href="https://travis-ci.org/peerquery/markup-builder">https://travis-ci.org/peerquery/markup-builder</p></a>↵"
```

#### `markup.build.sanitize(text, options);`
Returns the sanitized version of the input string;

`options` is optional configurations object for `sanitize-html` and can be either `true` || `false`. Default is `true`

```javascript
//inside async function
var clean = await markup.build.sanitize(t/* , options */);
console.log(clean);

//With promise API
markup.build.sanitize(t/* , options */).then(function(clean){
    console.log(clean);
});

// "**Lorem ipsum dolor sit amet**, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder"
```

### Dependencies

Accessing dependencies:

```javascript
const remarkable = markup.dep.Remarkable;
const sanitize = markup.dep.sanitizeHtml;
const domparser = markup.dep.DomParser;
const mtools = markup.dep.mtools
```

## Known issues
Bundling with webpack may cause some non-breaking warning notifications on `different casting types`. This is caused by the `sanitize-html` module, but does not have invalidate or break the build.

## Contributions

Are welcome, particularly for enabling support for parsing content from *IPFS, DTube and other video sites*.
