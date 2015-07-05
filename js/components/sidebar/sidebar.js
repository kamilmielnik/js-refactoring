define([
    'underscore',
    'knockout',
    'beautify',
    'utils/parser',
    'utils/application-status',
    'components/list-of-smells/smell-entry'
], function (_, ko, Beautify, parser, applicationStatus, SmellEntry) {
    'use strict';

    var componentStates = {
        ready: 'ready',
        analysing: 'analysing',
        analysisDone: 'analysisDone'
    };

    return {
        componentName: 'sidebar',

        viewModel: function (params) {
            var codeToAnalyze = params.codeToAnalyze,
                outputCode = params.outputCode,
                engines = params.engines,
                smells = ko.observableArray(),
                analyze,
                refactor;

            this.state = ko.observable(componentStates.ready);

            this.smellEntries = ko.computed(function () {
                return _(smells()).sortBy('startLine').map(function (smell) {
                    return new SmellEntry(smell);
                });
            });

            this.noRefactoringsSelected = ko.computed(function () {
                return !_(this.smellEntries()).any(function (smellEntry) {
                    return smellEntry.isSelected();
                });
            }.bind(this));

            this.automaticRefactoringPossible = ko.computed(function () {
                return _(this.smellEntries()).any(function (smellEntry) {
                    return smellEntry.isAutomaticRefactoringPossible();
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
                applicationStatus.startAction();
                this.state(componentStates.analysing);
                smells.removeAll();
                try {
                    parser.parse(codeToAnalyze());
                    _(engines).each(function (engine) {
                        var foundSmells = engine.analyze(codeToAnalyze()) || [];
                        smells(smells().concat(foundSmells));
                    }.bind(this));
                    this.state(componentStates.analysisDone);
                    applicationStatus.ready();
                } catch (error) {
                    this.state(componentStates.ready);
                    applicationStatus.error(error);
                }
            }.bind(this);

            refactor = function () {
                var refactoredCode = codeToAnalyze(),
                    doneRefactorings = [],
                    beautifiedRefactoredCode;

                applicationStatus.startAction();

                _(this.smellEntries()).each(function (smellEntry) {
                    var analysisResult = smellEntry.analysisResult();
                    if (smellEntry.isSelected() && smellEntry.isAutomaticRefactoringPossible()) {
                        refactoredCode = refactoredCode.replace(analysisResult.matchedCode, analysisResult.refactor());
                        doneRefactorings.push(analysisResult);
                    }
                });

                beautifiedRefactoredCode = Beautify.js_beautify(refactoredCode);
                outputCode(beautifiedRefactoredCode);
                smells.removeAll(doneRefactorings);
                this.state(componentStates.ready);
                applicationStatus.ready();
            }.bind(this);

            codeToAnalyze.subscribe(function () {
                this.state(componentStates.ready);
            }.bind(this));
        }
    };
});
