define([
    'underscore',
    'regex-refactoring/js-syntax'
], function (_, JSSyntax) {
    'use strict';

    var ComplexRegex = function () {
        var self = this,
            addWhitespaces,
            addSimpleRegex,
            addGroup;

        this.expression = JSSyntax.whitespaces.expression;
        this.groupsCount = 1;
        this.groupNumbers = {};

        this.add = function (name, simpleRegex) {
            addGroup(name, simpleRegex);
            addSimpleRegex(simpleRegex);
            addWhitespaces();
            return this;
        };

        this.addMatch = function (name) {
            this.expression += '\\' + this.groupNumbers[name];
            addWhitespaces();
            return this;
        };

        this.addOptional = function (name, simpleRegex) {
            addGroup(name, simpleRegex);
            addSimpleRegex(simpleRegex);
            this.expression += '?';
            addWhitespaces();
            return this;
        };

        this.addUnnamed = function (simpleRegex) {
            addSimpleRegex(simpleRegex);
            addWhitespaces();
            return this;
        };

        this.addString = function (string) {
            this.expression += string;
        };

        this.end = function () {
            addSimpleRegex(JSSyntax.endLine);
            return this;
        };

        this.match = function (text) {
            var originalMatches = text.match(this.expression),
                groupNames = Object.keys(this.groupNumbers),
                matches = {};
            if (!originalMatches) {
                return null;
            }
            matches['code'] = originalMatches[0];

            _.each(groupNames, function (groupName) {
                var groupNumber = self.groupNumbers[groupName];
                matches[groupName] = originalMatches[groupNumber];
            });

            return matches;
        };

        addWhitespaces = function () {
            if (self.expression.length > 0) {
                addSimpleRegex(JSSyntax.whitespaces);
            }
        };

        addSimpleRegex = function (simpleRegex) {
            self.expression += simpleRegex.expression;
            self.groupsCount += simpleRegex.groupsCount;
        };

        addGroup = function (name, simpleRegex) {
            _.each(simpleRegex.groupNumbers, function (groupNumber, groupName) {
                var groupNameNotEmpty = groupName !== '',
                    suffix = groupNameNotEmpty ? '-' + groupName : '',
                    suffixedGroupName = name + suffix;
                self.groupNumbers[suffixedGroupName] = self.groupsCount + groupNumber;
            });
        };
    };

    return ComplexRegex;
});
