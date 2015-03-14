require([
    'components/loader',
    'utils/string',
    'utils/knockout-bindings/code-mirror'
], function (componentsLoader) {
    'use strict';

    componentsLoader.load('home', 'sidebar');
});
