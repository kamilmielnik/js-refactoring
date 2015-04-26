require([
    'jquery',
    'components/loader',
    'utils/string',
    'utils/knockout-bindings/code-mirror'
], function ($, componentsLoader) {
    'use strict';

    componentsLoader.load(
        'home',
        'sidebar',
        'list-of-refactorings',
        'dialog'
    );

    $(window).keyup(function (event) {
        var key = event.keyCode,
            escKeyCode = 27;
        if (key === escKeyCode) {
            $('.code-container').toggleClass('full-width');
            $('.sidebar').toggleClass('hidden');
        }
    });
});
