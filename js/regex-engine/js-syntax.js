define([
    'regex-engine/simple-regex'
], function (SimpleRegex) {
    'use strict';

    var JSSyntax = function () {
        this.endLine = new SimpleRegex('$');
        this.semicolon = new SimpleRegex(';');
        this.semicolonOrComma = new SimpleRegex('(;|,)', 1, 0);
        this.assignment = new SimpleRegex('=');
        this.comparison = new SimpleRegex('(===?)', 1, 0);
        this.inverseComparison = new SimpleRegex('(!==?)', 1, 0);
        this.whitespaces = new SimpleRegex('\\s*');
        this.var = new SimpleRegex('(var\\s+)', 1, 0);
        this.variableName = new SimpleRegex('([a-zA-Z_$][\\.a-zA-Z_\\$0-9]*)', 1, 0);
        this.reference = new SimpleRegex('([a-zA-Z_$]([.]?[a-zA-Z_$][a-zA-Z_$0-9]*)*(\\[[^\\]]*\\])*)', 3, 0);
        this.trueOrFalse = new SimpleRegex('(true|false)', 1, 0);
        this.falsyValue = new SimpleRegex('(undefined|null|0|false|NaN|void\\s*\\([^\\s]+\\)|void\\s+[^\\s]+|\'\'|"")', 1, 0);
        this.optional = new SimpleRegex('\\?');
        this.ternary = new SimpleRegex(':');
        this.anything = new SimpleRegex('([^\\.\\$\\^]*)', 1, 0);
        this.anythingBesidesSemicolon = new SimpleRegex('([^\\.\\$\\^;]*)', 1, 0);
        this.anythingBesidesSemicolonAndComma = new SimpleRegex('([^\\.\\$\\^;,]*)', 1, 0);
        this.ifStart = new SimpleRegex('if\\s*\\(');
        this.function = new SimpleRegex('function');
        this.argumentsListStart = new SimpleRegex('\\(');
        this.argumentsListEnd = new SimpleRegex('\\)');
        this.fourOrMoreArguments = new SimpleRegex('\\s*(\\S+\\s*,\\s*){3,}\\S+');
        this.ifEnd = new SimpleRegex('\\)');
        this.else = new SimpleRegex('else');
        this.blockStart = new SimpleRegex('\\{');
        this.blockEnd = new SimpleRegex('\\}');
        this.todoComment = new SimpleRegex('.*((\\/\\/\\s*[tT][oO]\\s*[dD][oO].*)|(\\/\\*\\s*[tT][oO]\\s*[dD][oO].*[\\w\\W]*\\*\\/))', 3, 0);
        this.duplicatedCode = new SimpleRegex('[\\s(](([ \\r\\t\\f\\S]{3,}\\n){2,}[ \\r\\t\\f\\S]{3,})[\\s\\S]*\\1', 2, 0);
    };

    return new JSSyntax();
});
