
'use strict';

var chai = require('chai');
var expect = chai.expect;
var markup = require('../lib/index.js');
var _in  = '**Lorem ipsum dolor sit amet**, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes,<script>alert(\'Quisque rutrum.\')</script> nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder';

describe('BUILDER: text', function() {
    
    describe('builds plain text from markup', function() {
        it('returns plain text string', function(done) {
            
            var _out = ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes,&lt;script&gt;alert(\'Quisque rutrum.\')&lt;/script&gt; nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder\n ';
            
            var res = markup.build.text(_in);
            expect(res).to.equal(_out);
            done();
            
        });
    });
    
    describe('builds html text from markup', function() {
        it('returns html text string', function(done) {
            
            var _out = '<p><strong>Lorem ipsum dolor sit amet</strong>, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes,&lt;script&gt;alert(\'Quisque rutrum.\')&lt;/script&gt; nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder</p>\n';
            
            markup.build.html(_in).then(function(content){
            
                expect(content).to.equal(_out);
                done();
            
            });
            
        });
    });
    
    describe('builds text summary from markup', function() {
        it('returns text summary string', function(done) {
            
            var _out = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturien... ';
            
            var res = markup.build.summary(_in);
                
            expect(res).to.equal(_out);
            done();
            
        });
    });
    
    describe('builds full HTML markup from markup', function() {
        it('returns full HTML markup string', function(done) {
            
            var _out = '<p><strong>Lorem ipsum dolor sit amet</strong>, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum <a target="_blank" href="/user/sociis">@sociis</a> natoque <a target="_blank" href="/trending/penatibus"> #penatibus </a> et magnis dis parturient montes,&lt;script&gt;alert(\'Quisque rutrum.\')&lt;/script&gt; nascetur ridiculus mus. Donec quam felis, <a href="https://www.youtube.com/watch?v=sO_YEdTcVXc">https://www.youtube.com/watch?v=sO_YEdTcVXc</a> <a href="https://travis-ci.org/peerquery/markup-builder">https://travis-ci.org/peerquery/markup-builder</a></p>\n';
            
            markup.build.content(_in).then(function(content){
                
                expect(content).to.equal(_out);
                done();
                
            });
            
        });
    });
    
    describe('sanitizes markup or HTML', function() {
        it('returns sanitized markup string', function(done) {
            
            var _out = '**Lorem ipsum dolor sit amet**, consectetuer adipiscing elit. Aenean <i>commodo ligula eget</i> dolor. Aenean massa. Cum @sociis natoque #penatibus et magnis dis parturient montes,&lt;script&gt;alert(\'Quisque rutrum.\')&lt;/script&gt; nascetur ridiculus mus. Donec quam felis, https://www.youtube.com/watch?v=sO_YEdTcVXc https://travis-ci.org/peerquery/markup-builder';
            
            markup.build.sanitize(_in).then(function(content){
                
                expect(content).to.equal(_out);
                done();
                
            });
            
        });
    });
    
});
