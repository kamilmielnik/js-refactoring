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
            var observableCode = valueAccessor(),
                textEditor = CodeMirror.fromTextArea(element, {
                    mode: 'javascript',
                    theme: 'monokai',
                    styleActiveLine: true,
                    lineNumbers: true,
                    indentWithTabs: true,
                    indentUnit: 4,
                    //readOnly: true,
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


            textEditor.on('blur', function (codeMirror) {
                observableCode(codeMirror.getValue());
            });

            ko.computed(function () {
                textEditor.setValue(observableCode());
            });
        }
    };
});
