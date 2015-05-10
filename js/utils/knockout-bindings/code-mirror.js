define([
    'knockout',
    'codemirror',
    'javascript',
    'matchbrackets',
    'show-hint',
    'javascript-hint',
    'fullscreen',
    'simplescrollbars'
], function (ko, CodeMirror) {
    'use strict';

    ko.bindingHandlers.codeMirror = {
        init: function (element, valueAccessor) {
            var hasInputChangedBecauseOfUser = false,
                observableCode = valueAccessor(),
                textEditor = CodeMirror.fromTextArea(element, {
                    mode: 'javascript',
                    theme: 'monokai',
                    styleActiveLine: true,
                    lineNumbers: true,
                    indentWithTabs: true,
                    indentUnit: 4,
                    scrollbarStyle: 'overlay',
                    matchBrackets: true,
                    extraKeys: {
                        'Ctrl-Space': 'autocomplete',
                        'Alt-Enter': function (cm) {
                            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
                        },
                        'Esc': function (cm) {
                            if (cm.getOption('fullScreen')) {
                                cm.setOption('fullScreen', false);
                            }
                        }
                    }
                });

            textEditor.on('change', function (codeMirror) {
                hasInputChangedBecauseOfUser = true;
                observableCode(codeMirror.getValue());
                hasInputChangedBecauseOfUser = false;
            });

            observableCode.subscribe(function () {
                if (!hasInputChangedBecauseOfUser) {
                    textEditor.setValue(observableCode());
                }
            });
        }
    };

    ko.bindingHandlers.codeMirrorReadOnly = {
        init: function (element, valueAccessor, allBindings) {
            var firstLineNumberBinding = allBindings().firstLineNumber;

            CodeMirror.fromTextArea(element, {
                mode: 'javascript',
                theme: 'monokai',
                firstLineNumber: firstLineNumberBinding ? firstLineNumberBinding() : 1,
                lineNumbers: true,
                indentWithTabs: true,
                indentUnit: 4,
                readOnly: true,
                cursorBlinkRate: -1,
                scrollbarStyle: 'overlay'
            });

        }
    };
});
