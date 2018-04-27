var BrushBase = require('brush-base');
var regexLib = require('syntaxhighlighter-regex').commonRegExp;

function Brush() {
  var keywords = 'Выбрать Разрешенные Различные Select Allowed Distinct'
    + ' Первые Как ПустаяТаблица Top As EpmtyTable'
    + ' Поместить Уничтожить Из Into Drop From'
    + ' Объединить Все Union All Где Имеющие Where Having'
    + ' Автоупорядочивание Итоги Autoorder Totals'
    + ' Сгруппировать Group Упорядочить Order Общие Overall'
    + ' Только Only Иерархия Hierarchy'
    + ' Периодами Индексировать Выразить Возр Убыв Спецсимвол'
    + ' Periods Index Cast Asc Desc Escape'
    + ' Для Изменения For Update Of По By'

  var values = 'Неопределено Undefined Истина True Ложь False NULL'

  var operators = 'Выбор Когда Тогда Иначе Конец Case When Then Else'
    + ' End НЕ И ИЛИ В Между Подобно Левое Left Правое Right'
    + ' Полное Full Внешнее Outer Соединение Join Внутреннее Inner'
    + ' NOT AND OR In Between Like'

  var types = 'Число Number Строка String Дата Date'

  // \b - word boundary doesn't work with utf-8
  this.getKeywordsUTF8 = function(str){
    const results = str
      .replace(/^\s+|\s+$/g, '')
      .replace(/\s+/g, '|');

    const _b = '[^a-zA-Zа-яА-Я\.#&\(\)]'
    return "(^|"+_b+"|=)?(?:"+results+")(?:"+_b+"|;|$)"
  }

  this.regexList = [
      { regex: regexLib.singleLineCComments, css: 'comments' }
      ,{ regex: regexLib.multiLineDoubleQuotedString, css: 'string' }
      ,{ regex: /&\S+/g, css: 'constants' }
      ,{ regex: /-?\b[\d\.]+\b/g, css: 'value' }
      ,{ regex: new RegExp(this.getKeywordsUTF8(keywords), 'gmi'), css: 'keyword bold' }
      ,{ regex: new RegExp(this.getKeywordsUTF8(types), 'gmi'), css: 'constants' }
      ,{ regex: new RegExp(this.getKeywordsUTF8(values), 'gmi'), css: 'value bold' }
      ,{ regex: new RegExp(this.getKeywordsUTF8(operators), 'gmi'), css: 'keyword bold' }
    ];
};

Brush.prototype = new BrushBase();
Brush.aliases = ['sdbl'];
module.exports = Brush;
