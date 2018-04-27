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
      expect(strs).to.equal('"Строка "\n"в кавычках"\n""\n"Многострочная строка "\n"строка\n    в экранированных\n    кавычках"\n""')
    })

    it('comments parse',function() {
      var comments = matches.filter(function(m) {return m.css == 'comments'})
        .map(function(m){return m.value})

      expect(comments.join(' ')).to.equal('// SYNTAX TEST "source.sdbl"')
    })

    it('value parse', function() {
      var values_ = matches.filter(function(m) {return m.css == 'value'})
        .map(function(m){return m.value}).join(' ').replace(/\s+/g, ' ').trim()

      expect(values_).to.equal('10 2 -100.10 0 0 0')
    })

    it('parameter parse',function() {
      var parameters = matches.filter(function(m) {return m.css == 'constants'})
        .map(function(m){return m.value}).join(' ').replace(/\s+/g, ' ').trim()

      expect(parameters).to.equal('&Параметр &а, &a,')
    })

    it ('keyword parse', function() {
      var keywords = matches.filter(function(m) {return m.css == 'keyword bold'})
        .map(function(m){return m.value}).join(' ').replace(/\s+/g, ' ').trim()
      expect(keywords)
        .to.equal('ВЫБРАТЬ ПЕРВЫЕ РАЗРЕШЕННЫЕ РАЗЛИЧНЫЕ как КАК как ВЫБОР КОГДА ТОГДА ИНАЧЕ КОНЕЦ ИЗ ЛЕВОЕ СОЕДИНЕНИЕ ПО ГДЕ И Между И BY')
    })

    it ('values parse', function() {
      var values = matches.filter(function(m) {return m.css == 'value bold'})
        .map(function(m){return m.value}).join(' ').replace(/\s+/g, ' ').trim()
      expect(values)
        .to.equal('Неопределено NULL Истина NULL,')
    })
  });
});
