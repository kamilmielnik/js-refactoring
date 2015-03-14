define([
    'knockout'
], function (ko) {
    'use strict';

    var Components = function () {
        var loadTemplate;

        this.register = function (params) {
            var controlName = params.controlName,
                viewModel = params.viewModel;

            return loadTemplate(controlName).then(function (templateHTML) {
                ko.components.register(controlName, {
                    template: templateHTML,
                    viewModel: viewModel
                });
            });
        };

        loadTemplate = function (controlName) {
            var templateUrl = 'text!components/{controlName}/{controlName}.html'.format({
                controlName: controlName
            });

            return new Promise(function (fulfill) {
                require([templateUrl], fulfill);
            });
        };
    };

    return new Components();
});
