define([
    'underscore',
    'knockout',
    'beautify',
    'components/list-of-refactorings/refactoring-entry'
], function (_, ko, Beautify, RefactoringEntry) {
    'use strict';

    return {
        componentName: 'sidebar',

        viewModel: function (params) {
            var self = this,
                codeToRefactor = params.codeToRefactor,
                outputCode = params.outputCode,
                refactoringEngines = params.refactoringEngines;

            this.refactoringEntries = ko.observableArray([
                new RefactoringEntry('Introduce Promise', 34, 41),
                new RefactoringEntry('Remove Redundant Conditional', 43, 49),
                new RefactoringEntry('Introduce Promise Chain', 34, 34)/*,
                new RefactoringEntry('Introduce Promise', 34, 41),
                new RefactoringEntry('Remove Redundant Conditional', 43, 49),
                new RefactoringEntry('Introduce Promise Chain', 34, 34),
                new RefactoringEntry('Introduce Promise', 34, 41),
                new RefactoringEntry('Remove Redundant Conditional', 43, 49),
                new RefactoringEntry('Introduce Promise Chain', 34, 34),
                new RefactoringEntry('Introduce Promise', 34, 41),
                new RefactoringEntry('Remove Redundant Conditional', 43, 49),
                new RefactoringEntry('Introduce Promise Chain', 34, 34),
                new RefactoringEntry('Remove Redundant Conditional', 43, 49),
                new RefactoringEntry('Introduce Promise Chain', 34, 34),
                new RefactoringEntry('Remove Redundant Conditional', 43, 49),
                new RefactoringEntry('Introduce Promise Chain', 34, 34),
                new RefactoringEntry('Remove Redundant Conditional', 43, 49),
                new RefactoringEntry('Introduce Promise Chain', 34, 34),
                new RefactoringEntry('Remove Redundant Conditional', 43, 49),
                new RefactoringEntry('Introduce Promise Chain', 34, 34),
                new RefactoringEntry('Introduce Promise', 34, 41),
                new RefactoringEntry('Remove Redundant Conditional', 43, 49),
                new RefactoringEntry('Introduce Promise Chain', 34, 34),
                new RefactoringEntry('Remove Redundant Conditional', 43, 49),
                new RefactoringEntry('Introduce Promise Chain', 34, 34),
                new RefactoringEntry('Remove Redundant Conditional', 43, 49),
                new RefactoringEntry('Introduce Promise Chain', 34, 34),
                new RefactoringEntry('Remove Redundant Conditional', 43, 49),
                new RefactoringEntry('Introduce Promise Chain', 34, 34)*/
            ]);

            this.isAnySelected = ko.computed(function () {
                return _.any(self.refactoringEntries(), function (refactoringEntry) {
                    return refactoringEntry.isSelected();
                });
            });

            this.analyze = function () {
                window.alert('analyze');
                /* TODO: implement me */
            };

            this.refactor = function () {
                var refactoredCode = _.reduce(refactoringEngines, function (refactoredCode, refactoringEngine) {
                        return refactoringEngine.refactor(refactoredCode);
                    }, codeToRefactor()),
                    beautifiedRefactoredCode = Beautify.js_beautify(refactoredCode);
                outputCode(beautifiedRefactoredCode);
            };
        }
    };
});
