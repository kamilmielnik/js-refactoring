define([
    'underscore',
    'knockout',
    'beautify',
    'utils/parser',
    'utils/application-status',
    'components/list-of-refactorings/refactoring-entry'
], function (_, ko, Beautify, parser, applicationStatus, RefactoringEntry) {
    'use strict';

    var componentStates = {
        ready: 'ready',
        analysing: 'analysing',
        analysisDone: 'analysisDone'
    };

    return {
        componentName: 'sidebar',

        viewModel: function (params) {
            var codeToRefactor = params.codeToRefactor,
                outputCode = params.outputCode,
                refactoringEngines = params.refactoringEngines,
                possibleRefactorings = ko.observableArray(),
                analyze,
                refactor;

            this.state = ko.observable(componentStates.ready);

            this.refactoringEntries = ko.computed(function () {
                return _(possibleRefactorings()).sortBy('startLine').map(function (possibleRefactoring) {
                    return new RefactoringEntry(possibleRefactoring);
                });
            });

            this.noRefactoringsSelected = ko.computed(function () {
                return !_(this.refactoringEntries()).any(function (refactoringEntry) {
                    return refactoringEntry.isSelected();
                });
            }.bind(this));

            this.analyze = function () {
                if (this.state() === componentStates.ready) {
                    analyze();
                } else if (this.state() === componentStates.analysisDone) {
                    refactor();
                }
            };

            analyze = function () {
                this.state(componentStates.analysing);
                possibleRefactorings.removeAll();
                try {
                    parser.parse(codeToRefactor());
                    _(refactoringEngines).each(function (refactoringEngine) {
                        var foundRefactorings = refactoringEngine.analyze(codeToRefactor()) || [];
                        possibleRefactorings(possibleRefactorings().concat(foundRefactorings));
                    }.bind(this));
                    this.state(componentStates.analysisDone);
                    applicationStatus.ready();
                } catch (error) {
                    this.state(componentStates.ready);
                    applicationStatus.error(error);
                }
            }.bind(this);

            refactor = function () {
                var refactoredCode = codeToRefactor(),
                    doneRefactorings = [],
                    beautifiedRefactoredCode;

                _(this.refactoringEntries()).each(function (refactoringEntry) {
                    var analysisResult = refactoringEntry.analysisResult();
                    if (refactoringEntry.isSelected() && refactoringEntry.isAutomaticRefactoringPossible()) {
                        refactoredCode = refactoredCode.replace(analysisResult.matchedCode, analysisResult.refactor());
                        doneRefactorings.push(analysisResult);
                    }
                });

                beautifiedRefactoredCode = Beautify.js_beautify(refactoredCode);
                outputCode(beautifiedRefactoredCode);
                possibleRefactorings.removeAll(doneRefactorings);
                this.state(componentStates.ready);
            }.bind(this);

            codeToRefactor.subscribe(function () {
                this.state(componentStates.ready);
            }.bind(this));
        }
    };
});
