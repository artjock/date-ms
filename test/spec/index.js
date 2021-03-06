/**
 * Dependencies.
 */

if ('undefined' != typeof require) {
    expect = require('expect.js');
    ms = require('../../');
}

// strings
describe('ms(string)', function(){

    it('should preserve ms', function () {
        expect( ms('100') ).to.be(100);
    });

    it('should convert from m to ms', function () {
        expect( ms('1m') ).to.be(60000);
    });

    it('should convert from h to ms', function () {
        expect( ms('1h') ).to.be(3600000);
    });

    it('should convert d to ms', function () {
        expect( ms('2d') ).to.be(172800000);
    });

    it('should convert s to ms', function () {
        expect( ms('1s') ).to.be(1000);
    });

    it('should convert ms to ms', function () {
        expect( ms('100ms') ).to.be(100);
    });

    it('should work with decimals', function () {
        expect( ms('1.5h') ).to.be(5400000);
    });

    it('should work with numbers starting with .', function () {
        expect( ms('.5ms') ).to.be(.5);
    });

    it('should support 2013-04-05 format', function(){
        expect( ms('2013-04-05') ).to.eql( 1365120000000 );
    });

    it('should support 2013-04-09T13:45+0400 format', function() {
        expect( ms('2013-04-09T13:45+0400') ).to.eql( 1365500700000 );
    });

    it('should support Thu May 16 2013 00:47:53 GMT+0400 (MSK) format', function() {
        expect( ms('Thu May 16 2013 00:47:53 GMT+0400 (MSK)') )
            .to.eql( 1368650873000 );
    });

    it('should return NaN if invalid string', function () {
        expect( isNaN(ms('☃')) ).to.be(true);
    });

    it('should return current date for empty string', function() {
        var now = +new Date();
        expect( ms('') ).to.eql( now );
    });
})

describe('ms(undefined)', function() {

    it('should return current date ts', function() {
        var now = +new Date();
        expect( ms() ).to.eql( now );
    });

});

describe('ms(null)', function() {

    it('should return current date for null', function() {
        var now = +new Date();
        expect( ms(null) ).to.eql( now );
    });

});

// numbers
describe('ms(number)', function(){

    it('should pass throught number', function() {
        expect( ms(500) ).to.eql( 500 );
    });

    it('should pass throught 0', function() {
        expect( ms(0) ).to.eql( 0 );
    });
})

// dates
describe('ms(date)', function(){

    it('should work with Date', function() {
        expect( ms(new Date('2013-10-10')) ).to.eql( +new Date('2013-10-10') );
    });
});

describe('ms.tz', function() {

    beforeEach(function() {
        this.tz = (new Date()).getTimezoneOffset() * 1000 * 60;
    });

    it('should return timezone offset', function() {
        expect( ms.tz ).to.eql( this.tz );
    });

    it('should be enumerable', function() {
        expect( ms ).to.have.key( 'tz' );
    });

    it('should not be writable', function() {
        ms.tz = 42;
        var f = function() { 'use strict'; ms.tz = 42; };

        expect( ms.tz ).to.eql( this.tz );
        expect( f ).to.throwError();
    });

});

describe('sod', function() {

    it('should return start of day', function() {
        expect( ms.sod( ms('2013-06-17T12:34:56Z') + ms.tz) )
            .to.eql( ms('2013-06-17T00:00:00Z') + ms.tz );
    });

    it('should should return NaN for unparsed value', function() {
        expect( isNaN( ms.sod('foo') ) ).to.be.ok();
    });

});
