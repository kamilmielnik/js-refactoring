require([
    'jquery',
    'components/loader',
    'utils/application-status',
    'utils/string',
    'utils/knockout-bindings/code-mirror'
], function ($, componentsLoader, applicationStatus) {
    'use strict';

    componentsLoader.load(
        'home',
        'sidebar',
        'list-of-refactorings',
        'status-bar'
    );

    $(window).keyup(function (event) {
        var key = event.keyCode,
            escKeyCode = 27;
        if (key === escKeyCode) {
            $('.code-container').toggleClass('full-width');
            $('.sidebar').toggleClass('hidden');
        }
    });

    applicationStatus.ready();
});
