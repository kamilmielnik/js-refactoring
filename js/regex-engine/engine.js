define([
    'regex-engine/smells/list'
], function (codeSmellsList) {
    'use strict';

    var RegexEngine = function () {
        this.analyze = function (code) {
            var smells = [];

            _(codeSmellsList).each(function (codeSmell) {
                var analysisResults = codeSmell.analyze(code);
                smells = _(smells).concat(analysisResults);
            });

            return smells;
        };
    };

    return RegexEngine;
});
