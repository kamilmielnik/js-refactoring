define([
    'underscore',
    'knockout',
    'components/components'
], function (_, ko, components) {
    'use strict';

    var Loader = function () {
        var loadComponent;

        this.load = function () {
            var componentsNames = arguments,
                loadPromises = _.map(componentsNames, loadComponent);
            Promise.all(loadPromises).then(function () {
                ko.applyBindings();
            });
        };

        loadComponent = function (componentName) {
            var componentUrl = 'components/{componentName}/{componentName}'.format({
                componentName: componentName
            });

            return new Promise(function (fulfill) {
                require([componentUrl], function (component) {
                    components.register(component).then(function () {
                        fulfill();
                    });
                });
            });
        };
    };

    return new Loader();
});
