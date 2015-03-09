require([
    'jquery',
    'beautify',
    'controls/code-input',
    'code/code-provider',
    'regex-refactoring/regex-refactoring-engine',
    'ast-refactoring/ast-refactoring-engine'
], function ($, Beautify, CodeInputControl, CodeProvider, RegexRefactoringEngine, ASTRefactoringEngine) {
    'use strict';

    var code = CodeProvider.get([
            'introducePromise',
            'defaultInitializer',
            'removeRedundantConditional'
        ]),
        refactoringEngines = [
            new RegexRefactoringEngine(),
            new ASTRefactoringEngine()
        ],
        codeLeft = CodeInputControl.create('#code-left', code),
        codeRight = CodeInputControl.create('#code-right', code),
        btnRefactor = $('#btn-refactor'),
        refactor;

    refactor = function (code) {
        return _.reduce(refactoringEngines, function (refactoredCode, refactoringEngine) {
            return refactoringEngine.refactor(refactoredCode);
        }, code);
    };

    btnRefactor.click(function () {
        var codeToRefactor = codeLeft.getCode(),
            refactoredCode = refactor(codeToRefactor),
            beautifiedRefactoredCode = Beautify.js_beautify(refactoredCode);
        codeRight.setCode(beautifiedRefactoredCode);
    });
});
