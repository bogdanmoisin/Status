angular.module('statusieApp')
    .directive('drowpdownfilter', function () {
        return {
            templateUrl: '/templates/dropdownfilter.html',
            restrict: 'E',
            scope: {
                options: '='
            },
            priority: 10,
            replace: true,
            controller: function ($scope) {
                'use strict';

                $scope.$watch('options.selections', function (newValue, oldValue) {
                    if (!newValue) {
                        return;
                    }

                    if (newValue && !oldValue) {
                        //We need to assign it at this moment because if not the dropdown is not populated
                        $scope.selections = newValue;
                        $scope.allOptions = true;
                    }
                }, true);

                $scope.selectAll = function (evt) {
                    if (evt.target.tagName.toLowerCase() === 'input') {
                        $scope.allOptions = !$scope.allOptions;
                    }
                    evt.stopPropagation();
                };
            },
            link: function postLink(scope, element, attrs) {
                //find in jqLite only supports tagname search
                element.find('ul').on('click', function (evt) {
                    var tagName = evt.target.tagName.toLowerCase();
                    var classList = evt.target.parentElement.classList;
                    if (tagName === 'label') {
                        if (classList.contains('dynamic-option')) {
                            scope.$apply(function () {
                                if (scope.allOptions) {
                                    scope.allOptions = false;
                                }
                            });
                        }else if (classList.contains('dynamic-all')) {
                            scope.$apply(function () {
                                scope.allOptions = !scope.allOptions;
                                if (scope.allOptions) {
                                    _.forEach(scope.options.selections, function (option) {
                                        option.selected = false;
                                    });
                                }
                            });
                        }
                        evt.stopPropagation();
                    }else if(tagName === 'input') {
                        if (evt.target.parentElement.parentElement.classList.contains('dynamic-all')) {
                            scope.$apply(function () {
                                scope.allOptions = !scope.allOptions;
                                if (scope.allOptions) {
                                    _.forEach(scope.options.selections, function (option) {
                                        option.selected = false;
                                    });
                                }
                            });
                        }
                        evt.stopPropagation();
                    }
                });
            }
        };
    });