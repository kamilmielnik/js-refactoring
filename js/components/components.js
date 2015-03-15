define([
    'knockout'
], function (ko) {
    'use strict';

    var Components = function () {
        var loadTemplate;

        this.register = function (params) {
            var componentName = params.componentName,
                viewModel = params.viewModel;

            return loadTemplate(componentName).then(function (templateHTML) {
                ko.components.register(componentName, {
                    template: templateHTML,
                    viewModel: viewModel
                });
            });
        };

        loadTemplate = function (componentName) {
            var templateUrl = 'text!components/{componentName}/{componentName}.html'.format({
                componentName: componentName
            });

            return new Promise(function (fulfill) {
                require([templateUrl], fulfill);
            });
        };
    };

    return new Components();
});
