angular.module ('stockUp', ['nvd3', 'btford.socket-io'])
    .controller('DashboardCtrl', function($scope, HttpService, $timeout, io) {
        $scope.stockData = [];
        $scope.statData = [];
        $scope.orderRule = 'ts';
        $scope.formattedData = {};
        $scope.index = 0;
        $scope.data = [
            {
                key: "OHLC",
                values: []
            }
        ];

        $scope.ITEM_INDEX = {
            TS: 0,
            OPEN: 1,
            HIGH: 2,
            LOW: 3,
            CLOSE: 4,
            VOLUME: 5
        };

        $scope.userOptions = [
            { title: 'Time (Down)', order: '-ts'},
            { title: 'Time (Up)'  , order: 'ts'},
            { title: 'Close (Down)' , order: '-close'},
            { title: 'Close (Up)', order: 'close'}
        ];

        // Graph options
        $scope.options = {
            chart: {
                type: 'stackedAreaChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function(d){ return d[0]; },
                y: function(d){ return d[1]; },
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                showControls: false,
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Years',
                    tickFormat: function(d) {
                        return d3.time.format("%x")(new Date(d))
                    }
                },
                yAxis: {
                    axisLabel: 'Closing index'
                }
            }
        };

        function generateDashboardTableData(data) {
            var item = {};
            var dataItem = data.split(',');
            item.ts = dataItem[$scope.ITEM_INDEX.TS];
            item.open = dataItem[$scope.ITEM_INDEX.OPEN];
            item.high = dataItem[$scope.ITEM_INDEX.HIGH];
            item.low = dataItem[$scope.ITEM_INDEX.LOW];
            item.close = dataItem[$scope.ITEM_INDEX.CLOSE];
            item.volume = dataItem[$scope.ITEM_INDEX.VOLUME];
            $scope.statData.push(item);
        }

        function generateChartData(data) {
            var dataItem = data.split(',');
            var ts = dataItem[$scope.ITEM_INDEX.TS] * 1;
            var year = new Date(ts).getFullYear();
            var month = new Date(ts).getMonth();
            var closeAt = dataItem[$scope.ITEM_INDEX.CLOSE] * 1;
            $scope.data[0].values.push([ts, closeAt]);

            // Create a map which will store
            // yearwise data for mapping
            if($scope.formattedData[year]) {
                if($scope.formattedData[year]) {
                    $scope.formattedData[year].push(closeAt);
                } else {
                    $scope.formattedData[year] = [closeAt];
                }
            } else {
                $scope.formattedData[year] = [];
            }
        }

        function formattedData() {
            // push formatted data into
            // graph data in [x-axis, y-axis] format
            for(var i in $scope.formattedData) {
                    var monthsData = _.values($scope.formattedData[i]);
                    for(var j = 0; j < monthsData.length; j++) {
                        $scope.data[0].values.push([i*1, monthsData[j]])
                    }
            }

        }

        function generateData(rawData) {
            var DATA_LIMIT = 10;
            var timeout = 1000;
            var len = rawData.length;
            for(var j = 0; j < rawData.length; j++) {
                generateDashboardTableData(rawData[j]);
                generateChartData(rawData[j]);
            }
            formattedData();
        }

        function getStockData() {
            HttpService.historical().then(function(resp) {
                // Displayed only first 200/1000 records
                var data = resp.data.slice(0, 1000);
                generateData(data);
            }, function (err) {
                console.log('Error while fetching data : ', err);
            });
        }

        getStockData();

        $scope.sortBy = function (order) {
            $scope.orderRule = order;
        };


        $scope.isActive= function (ts) {
            return $scope.newRow.indexOf(ts) > -1;
        };

        $scope.getSortClasses = function(index) {
            var SORT_CLASSES = {
                UP: 'glyphicon glyphicon-arrow-up',
                DOWN: 'glyphicon glyphicon-arrow-down'
            };

            if(index == 1) {
                if($scope.orderRule == 'ts') {
                    return SORT_CLASSES.UP;
                } else if($scope.orderRule == '-ts'){
                    return SORT_CLASSES.DOWN;
                }
            } else if(index == 2) {
                if($scope.orderRule == 'close') {
                    return SORT_CLASSES.UP;
                } else if($scope.orderRule == '-close'){
                    return SORT_CLASSES.DOWN;
                }
            }
        };

        io.on('add', function() {
            var newData = $scope.statData.slice($scope.index, $scope.index + 10);
            $scope.newRow = _.pluck(newData, 'ts');
            $scope.stockData = $scope.stockData.concat(newData);
            $scope.$apply();
            $scope.index += 10;
        }.bind(this));

    })
    .factory('HttpService', ['$http', function($http) {
        var BASE_API = 'http://kaboom.rksv.net/api/';
        return {
            get: function () {
                return $http.get(BASE_API);
            },
            historical: function () {
                return $http.get(BASE_API + 'historical');
            },
            subscribe: function () {
                // TODO API END POINT IS MISSING
                return $http.get(BASE_API + 'subscribe');
            },
            unsubscribe: function () {
                // TODO API END POINT IS MISSING
                return $http.get(BASE_API + 'unsubscribe');
            }
        }
    }])
    .factory('io', function ($window, $rootScope) {
        var _socket = $window.io('//localhost:3000');
        return {
            on: function(eventType, cb) {
                _socket.on(eventType, function() {
                    cb();
                    //NOTE: calling $apply will ensure that any model changes are reflected in the view
                    $rootScope.$apply();
                });
            },
            emit: function(eventType, data) {
                _socket.emit(eventType, data);
            }
        };
    });
