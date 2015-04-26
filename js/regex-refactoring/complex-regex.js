define([
    'underscore',
    'regex-refactoring/js-syntax'
], function (_, JSSyntax) {
    'use strict';

    var ComplexRegex = function () {
        var self = this,
            addSimpleRegex,
            addGroup,
            buildMatches;

        this.expression = ''; //TODO: this is not encapsulated only because of debugging purposes
        this.groupsCount = 1;
        this.groupNumbers = {};

        this.add = function (name, simpleRegex) {
            addGroup(name, simpleRegex);
            addSimpleRegex(simpleRegex);
            return this;
        };

        this.addMatch = function (name) {
            this.expression += '\\' + this.groupNumbers[name];
            return this;
        };

        this.addOptional = function (name, simpleRegex) {
            addGroup(name, simpleRegex);
            addSimpleRegex(simpleRegex);
            this.expression += '?';
            return this;
        };

        this.whitespaces = function () {
            if (this.expression.length > 0) {
                addSimpleRegex(JSSyntax.whitespaces);
            }
            return this;
        };

        this.addUnnamed = function (simpleRegex) {
            addSimpleRegex(simpleRegex);
            return this;
        };

        this.addString = function (string) {
            this.expression += string;
            return this;
        };

        this.end = function () {
            addSimpleRegex(JSSyntax.endLine);
            return this;
        };

        this.match = function (text) {
            var matchOneRegex = new RegExp(this.expression),
                originalMatches = text.match(matchOneRegex),
                matches = buildMatches(originalMatches);

            return matches;
        };

        this.matchAll = function (text) {
            var matchAllRegex = new RegExp(this.expression, 'g'),
                allMatches = [],
                originalMatches;

            do {
                originalMatches = matchAllRegex.exec(text);
                if (originalMatches) {
                    allMatches.push(originalMatches);
                    if (originalMatches.index === matchAllRegex.lastIndex) {
                        ++matchAllRegex.lastIndex;
                    }
                }
            } while (originalMatches);

            return _(allMatches).map(buildMatches);
        };

        addSimpleRegex = function (simpleRegex) {
            self.expression += simpleRegex.expression;
            self.groupsCount += simpleRegex.groupsCount;
        };

        addGroup = function (name, simpleRegex) {
            _(simpleRegex.groupNumbers).each(function (groupNumber, groupName) {
                var groupNameNotEmpty = groupName !== '',
                    suffix = groupNameNotEmpty ? '-' + groupName : '',
                    suffixedGroupName = name + suffix;

                self.groupNumbers[suffixedGroupName] = self.groupsCount + groupNumber;
            });
        };

        buildMatches = function (originalMatches) {
            if (!originalMatches) {
                return null;
            }

            var matches = {},
                groupNames = Object.keys(self.groupNumbers);

            matches.code = originalMatches[0];
            matches.index = originalMatches.index;

            _(groupNames).each(function (groupName) {
                var groupNumber = self.groupNumbers[groupName];
                matches[groupName] = originalMatches[groupNumber];
            });

            return matches;
        };
    };

    return ComplexRegex;
});
