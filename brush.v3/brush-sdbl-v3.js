/**
 * Brush http://github.com/leoniv/brush-sdbl
 * for SyntaxHighlighter http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 * Copyright (C) 2018 Leonid Vlasov.
 *
 * Dual licensed under the MIT and GPL licenses.
 */
;;(function()
{
  typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

  function Brush()
  {
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

      var functions = ' Значение Value'
        + ' ДатаВремя DateTime'
        + ' Тип Type'
        + ' Подстрока Substring'
        + ' Год Year'
        + ' Квартал Quarter'
        + ' Месяц Month'
        + ' ДеньГода DayOfYear'
        + ' День Day'
        + ' Неделя Week'
        + ' ДеньНедели Weekday'
        + ' Час Hour'
        + ' Минута Minute'
        + ' Секунда Second'
        + ' НачалоПериода BeginOfPeriod'
        + ' КонецПериода EndOfPeriod'
        + ' ДобавитьКДате DateAdd'
        + ' РазностьДат DateDiff'
        + ' Сумма Sum'
        + ' Среднее Avg'
        + ' Минимум Min'
        + ' Максимум Max'
        + ' Количество Count'
        + ' ЕстьNULL IsNULL'
        + ' Представление Presentation'
        + ' ПредставлениеСсылки RefPresentation'
        + ' ТипЗначения ValueType'

    var r = SyntaxHighlighter.regexLib;

    this.getKeywordsUTF8 = function(str){
      const results = str
        .replace(/^\s+|\s+$/g, '')
        .replace(/\s+/g, '|');

      const _b = '[^a-zA-Zа-яА-Я\.#&\(\)]'
      return "(^|"+_b+"|=)?(?:"+results+")(?:"+_b+"|;|$)"
    }

    this.regexList = [
        {
          regex: regexLib.singleLineCComments,
          css: 'comments'
        },
        {
          regex: /("|^\s*\|)((?!\"\").)*?(\"|$)/gm,
          css: 'string'
        },
        {
          regex: /&\S+/g,
          css: 'constants'
        },
        {
          regex: /-?\b[\d\.]+\b/g,
          css: 'value'
        },
        {
          regex: new RegExp(this.getKeywordsUTF8(keywords), 'gmi'),
          css: 'keyword bold'
        }
        ,{
          regex: new RegExp(this.getKeywordsUTF8(values), 'gmi'),
          css: 'values bold'
        }
        ,{
          regex: new RegExp(this.getKeywordsUTF8(operators), 'gmi'),
          css: 'color1 bold'
        }
        ,{
          regex: new RegExp(this.getKeywordsUTF8(functions), 'gmi'),
          css: 'color2 bold'
        }
      ];

    this.forHtmlScript(r.scriptScriptTags);
  };

  Brush.prototype  = new SyntaxHighlighter.Highlighter();
  Brush.aliases  = ['sdbl'];

  SyntaxHighlighter.brushes.JScript = Brush;

  typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
