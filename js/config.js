(function () {
    'use strict';

    var config = {
        waitSeconds: 0,
        baseUrl: 'js',
        deps: [
            'escodegen',
            'estraverse',
            'main'
        ],
        paths: {
            'jquery': 'lib/jquery-2.1.1',
            'underscore': 'lib/underscore',
            'knockout': 'lib/knockout',
            'text': 'lib/text',
            'json': 'lib/json',
            'esprima': 'lib/esprima',
            'estraverse': 'lib/estraverse',
            'escodegen': 'lib/escodegen.browser',
            'beautify': 'lib/beautify',

            /* codemirror & addons */
            'codemirror': 'lib/codemirror',
            'javascript': 'lib/javascript',
            'matchbrackets': 'lib/matchbrackets',
            'show-hint': 'lib/show-hint',
            'javascript-hint': 'lib/javascript-hint',
            'fullscreen': 'lib/fullscreen'
        },
        shim: {
            'underscore': {
                exports: '_'
            },
            'estraverse': {
                exports: 'estraverse'
            },
            'escodegen': {
                deps: ['estraverse'],
                exports: 'escodegen'
            },
            'QUnit': {
                exports: 'QUnit',
                init: function () {
                    QUnit.config.autoload = false;
                    QUnit.config.autostart = false;
                }
            }
        }
    };

    if (window.unitTests) {
        config.paths['QUnit'] = 'test/lib/qunit';
        config.deps.pop();
        config.deps.push('main-unit-tests');
    }

    require.config(config);
}());
