define([
    'jquery',
    'codemirror',
    'javascript',
    'matchbrackets',
    'show-hint',
    'javascript-hint',
    'fullscreen'
], function ($, CodeMirror) {
    'use strict';

    var CodeInputControl = function () {
        var createAndInitializeTextArea,
            createEditor;

        this.create = function (textAreaSelector, sourceCode) {
            var textArea = createAndInitializeTextArea(textAreaSelector, sourceCode),
                editor = createEditor(textArea),
                doc = editor.doc;

            return {
                setCode: function (code) {
                    doc.setValue(code);
                },

                getCode: function () {
                    return doc.getValue();
                }
            };
        };

        createAndInitializeTextArea = function (textAreaSelector, sourceCode) {
            var textArea = $(textAreaSelector);
            textArea.text(sourceCode);
            return textArea;
        };

        createEditor = function (textArea) {
            return CodeMirror.fromTextArea(textArea[0], {
                mode: 'javascript',
                theme: 'monokai',
                styleActiveLine: true,
                lineNumbers: true,
                indentWithTabs: true,
                indentUnit: 4,
                //readOnly: true,
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
        };
    };

    return new CodeInputControl();
});
