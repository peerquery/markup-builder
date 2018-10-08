[![Pull requests](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/peerquery/markup-builder/pulls)
[![Build status](https://travis-ci.org/peerquery/markup-builder.svg?branch=master)](https://travis-ci.org/peerquery/markup-builder)
[![Dep tracker](https://david-dm.org/peerquery/markup-builder.svg)](https://david-dm.org/peerquery/markup-builder)
[![Codebase license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/peerquery/markup-builder/blob/master/LICENSE)

# Markup tools
Markdown and HTML markup tools.

## Installation

### Node.js

`npm install markup-builder --save`

Use as: `const markup = require('markup-builder');`

### Browser

```html
<script src="https://unpkg.com/markup-builder/dist/markup.min.js"></script>
```

## Usage

### Text tools
`markup.txt` comes with 5 functions:

```javascript
const t = "**Lorem ipsum dolor sit amet**, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes,<script>alert('Quisque rutrum.')</script> nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder";
```

#### `markup.txt.text(text);`
Returns the text version of a `markdown` or `HTML` string input;

```javascript
var text = markup.txt.text(t);
console.log(text);

// " Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder"
```

#### `markup.txt.html(text, safe);`
Returns the html version of a `markdown` or `HTML` string input;

`safe` is for `SAFE_FOR_JQUERY` and can be either `true` || `false`. Default is `true`

```javascript
//inside async function
var html = await markup.txt.html(t, true);
console.log(html);

//With promise API
markup.txt.html(t).then(function(html){
    console.log(html);
});

// "<p><strong>Lorem ipsum dolor sit amet</strong>, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder</p>"
```

#### `markup.txt.summary(text, count);`
Returns the text version of a `markdown` or `HTML` string input, trimmed to `count` or a default of 160 characters;

```javascript
//inside async function
var summary = await markup.txt.summary(t, 8);
console.log(summary);

//With promise API
markup.txt.summary(t).then(function(summary){
    console.log(summary);
});

// "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturien..."
```

#### `markup.txt.content(text, options);`
Returns the full html version of a `markdown` or `HTML` string input; parsing hashtag, mentions, naked image links and naked youtube link.

```javascript
var options = {};
options.safe = true; //default: true
options.video = true; //default: true
options.account_scheme = '/@'; //default is: '/user'
options.hashtag_scheme = '/trends'; //default: '/trending'
```
Example:
```javascript
//inside async function
var content = await markup.txt.content(t/*, options_object */);   //options is optional
console.log(content);

//With promise API
markup.txt.content(t/*, options_object */).then(function(content){   //options is optional
    console.log(content);
});

// "<p><strong>Lorem ipsum dolor sit amet</strong>, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum <a target="_blank" href="/user/sociis">@sociis</a> natoque <a target="_blank" href="/trending/penatibus "> #penatibus </a> et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,<iframe width="640" height="360" src="https://www.youtube.com/embed/sO_YEdTcVXc" frameborder="0" allowfullscreen></iframe> <a href="https://travis-ci.org/peerquery/markup-builder">https://travis-ci.org/peerquery/markup-builder</p></a>↵"
```

#### `markup.txt.sanitize(text, safe);`
Returns the sanitized version of the input string;

`safe` is for `SAFE_FOR_JQUERY` and can be either `true` || `false`. Default is `true`

```javascript
//inside async function
var clean = await markup.txt.sanitize(t);
console.log(clean);

//With promise API
markup.txt.sanitize(t).then(function(clean){
    console.log(clean);
});

// "**Lorem ipsum dolor sit amet**, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder"
```

### Image tools
`markup.img.get(text, number, ext)`

**With argument**

```javascript

const markup = require('markup-builder');

var post = ' www.image1.png http://www.image2.jpg www.image3.svg www.image4.png http://www.image5.jpg www.image6.svg';

//Image type supports a trailing '.' to the extension
markup.img.get(post, 2, '.png');
//is the same as
markup.img.get(post, 2, 'png');

//Examples

console.log(markup.img.get(post, null, 'jpg'));
//'http://www.image2.jpg'

console.log(markup.img.get(post, 1, '.png'));
//'www.image4.png'

console.log(markup.img.get(post, 0, 'svg'));
//'www.image3.svg'

console.log(markup.img.get(post, 1, '.svg'));
//'www.image6.svg'

```

**Without argument**

`var thumbnail = markup.img.get(post);`

Th will return the first image `jpe?g|bmp|svg|png|gif|tif|tiff` from the `post` string.


### Dependencies

Accessing dependencies:

```javascript
const remarkable = markup.dep.Remarkable;
const dompurify = markup.dep.DOMPurify;
const jsdom = markup.dep.JSDOM; // do not require in/for browser
const domparser = markup.dep.DomParser;
```

## Contributions

Are welcome, particularly for enabling support for parsing content from *IPFS, DTube and other video sites*.
