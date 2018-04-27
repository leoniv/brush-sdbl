var chai = require('chai');
var expect = chai.expect;
var match = require('syntaxhighlighter-match');
var Brush = require('./brush');
var sample = require('fs').readFileSync('./sample.txt', 'utf8');

describe('brush-sdbl', function() {

  var instance = null;

  before(function() {
    instance = new Brush();
  });

  it('has populated code sample', function() {
    expect(sample).to.not.match(/^Populate/);
  });

  describe('instance', function() {
    it('has `regexList`', function() {
      expect(instance).to.have.property('regexList');
    });
  });

  describe('parsing', function() {
    var matches = null;

    before(function() {
      matches = match.applyRegexList(sample, instance.regexList);
    });

    it('can parse', function() {
      expect(matches).to.have.length.above(0);
    });

    it('string parse', function() {
      var strs = matches.filter(function(m) {return m.css == 'string'})
        .map(function(m) {return m.value}).join("\n")
      expect(strs).to.equal('FIXME')
    })

    it('comments parse',function() {
      var comments = matches.filter(function(m) {return m.css == 'comments'})
        .map(function(m){return m.value})

      expect(comments).to.equal('FIXME')
      })
    })

    it('value parse', function() {
      var values = matches.filter(function(m) {return m.css == 'value'})
        .map(function(m){return m.value}).join("\n")

      expect(values.join(' ')).to.equal('FIXME')
    })

    it('parameter parse',function() {
      var parameters = matches.filter(function(m) {return m.css == 'color3'})
        .map(function(m){return m.value})

      expect(parameters.join(' ')).to.equal('FIXME')

      preprocessor.forEach(function(com) {
        expect(com).to.match(/^\s*(&)/)
      })
    })

    it ('keyword parse', function() {
      var keywords = matches.filter(function(m) {return m.css == 'keyword bold'})
        .map(function(m){return m.value})
      expect(keywords.join(" ")).to.equal('FIXME')
    })

    it ('values parse', function() {
      var values = matches.filter(function(m) {return m.css == 'value bold'})
        .map(function(m){return m.value})
      expect(values.join(" ")).to.equal('FIXME')
    })

    it ('operators parse', function() {
      var operators = matches.filter(function(m) {return m.css == 'color1 bold'})
        .map(function(m){return m.value})
      expect(operators.join(" ")).to.equal('FIXME')
    })

    it ('functions parse', function() {
      var functions = matches.filter(function(m) {return m.css == 'color0 bold'})
        .map(function(m){return m.value})
      expect(functions.join(" ")).to.equal('FIXME')
    })
  });
});
