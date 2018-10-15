[![Pull requests](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/peerquery/markup-builder/pulls)
[![Build status](https://travis-ci.org/peerquery/markup-builder.svg?branch=master)](https://travis-ci.org/peerquery/markup-builder)
[![Dep tracker](https://david-dm.org/peerquery/markup-builder.svg)](https://david-dm.org/peerquery/markup-builder)
[![Codebase license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/peerquery/markup-builder/blob/master/LICENSE)

# Markup Builder
Markdown and HTML markup building tools. Built on [XSS](https://www.npmjs.com/package/xss), [Remarkable](https://www.npmjs.com/package/remarkable), [DOMParser](https://www.npmjs.com/package/dom-parser) and [Markup tools](https://www.npmjs.com/package/markup-tools).

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
//options object the configurations for the 'xss' module
//Find out more: https://www.npmjs.com/package/xss#custom-filter-rules
const 
// only tag a and its attributes href, title, target are allowed
var options = {
  whiteList: {
    a: ["href", "title", "target"]
  }
};
// With the configuration specified above, the following HTML:
// <a href="#" onclick="hello()"><i>Hello</i></a>
// would become:
// <a href="#">Hello</a>

```

#### `markup.build.text(text, options);`
Returns the text version of a `markdown` or `HTML` string input;

`options` is optional configurations object for `xss`.

```javascript
var text = markup.build.text(t, options);
console.log(text);

// " Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes,&lt;script&gt;alert(\'Quisque rutrum.\')&lt;/script&gt; nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder\n "
```

#### `markup.build.html(text, options);`
Returns the html version of a `markdown` or `HTML` string input;

`options` is optional configurations object for `xss`.

```javascript
//inside async function
var html = await markup.build.html(t, options);
console.log(html);

//With promise API
markup.build.html(t).then(function(html, options){
    console.log(html);
});

// "<p><strong>Lorem ipsum dolor sit amet</strong>, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes,&lt;script&gt;alert(\'Quisque rutrum.\')&lt;/script&gt; nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder</p>\n"
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

#### `markup.build.content(text, config, options);`
Returns the full html version of a `markdown` or `HTML` string input; parsing hashtag, mentions, naked image links and naked youtube link.

```javascript
var config = {};
config.video = true; //default: true
config.account_scheme = '/@'; //default is: '/user'
config.hashtag_scheme = '/trends'; //default: '/trending'

//'options' object is xss configurations
```
Example:
```javascript
//inside async function
var content = await markup.build.content(t /*,config, options*/ );   //with about options object
console.log(content);

//With promise API
markup.build.content(t /*,config, options*/).then(function(content){   //options is optional, using defaults
    console.log(content);
});

// "<p><strong>Lorem ipsum dolor sit amet</strong>, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum <a target="_blank" href="/user/sociis">@sociis</a> natoque <a target="_blank" href="/trending/penatibus "> #penatibus </a> et magnis dis parturient montes,&lt;script&gt;alert(\'Quisque rutrum.\')&lt;/script&gt; nascetur ridiculus mus. Donec quam felis, <a href="https://www.youtube.com/watch?v=sO_YEdTcVXc">https://www.youtube.com/watch?v=sO_YEdTcVXc</a> <a href="https://travis-ci.org/peerquery/markup-builder">https://travis-ci.org/peerquery/markup-builder</p></a>\n"

```

#### `markup.build.sanitize(text, options);`
Returns the sanitized version of the input string;

`options` is optional configurations object for `xss` and can be either `true` || `false`. Default is `true`

```javascript
//inside async function
var clean = await markup.build.sanitize(t/* , options */);
console.log(clean);

//With promise API
markup.build.sanitize(t/* , options */).then(function(clean){
    console.log(clean);
});

// "**Lorem ipsum dolor sit amet**, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes,&lt;script&gt;alert(\'Quisque rutrum.\')&lt;/script&gt; nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder"
```

### Dependencies

Accessing dependencies:

```javascript
const remarkable = markup.dep.Remarkable;
const xss = markup.dep.xss;
const domparser = markup.dep.DomParser;
const mtools = markup.dep.mtools
```

## Contributions

Are welcome.
