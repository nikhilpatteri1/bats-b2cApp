angular.module('chartfactory', [])
.factory('ChartFactory', function () {
    return {
        solidGaugeChart: {
            data: solidGaugeChartData
        },
    }

    function solidGaugeChartData(widgetId, color, value, min, max, unit){
        var gaugeOptions = {
            chart: {type: 'solidgauge'},title: null,
            pane: {size: '100%', startAngle: -135, endAngle: 135,
                background: {backgroundColor: '#EEE', 
                innerRadius: '80%', outerRadius: '80%', shape: 'arc'}
            },tooltip: {enabled: false},
            yAxis: {
                stops: [[0.9, color]],tickLength : 1,
                lineWidth: 0, minorTickInterval: 0, tickAmount: 0,
                title: { y: 0 }, labels: { y: 110 }
            },
            plotOptions: {solidgauge: {dataLabels: { y: 0, borderWidth: 0, useHTML: true}}}
        };
        var chartSpeed = Highcharts.chart(widgetId, Highcharts.merge(gaugeOptions, {
            yAxis: { min: min, max: max, title: {text: ''}}, credits: { enabled: false},
            series: [{name: 'Speed',data: [value],
                dataLabels: {format: '<div class="vsdSolidGaugeMarker">'+unit+'</div>'},
            }]

        }));

    }

     function solidGaugeChartDataLiveTracking(widgetId, color, value, min, max, unit){
        var gaugeOptions = {
            chart: {type: 'solidgauge'},title: null,
            pane: {size: '100%', startAngle: -135, endAngle: 135,
                background: {backgroundColor: '#EEE', 
                innerRadius: '180%', outerRadius: '180%', shape: 'arc'}
            },tooltip: {enabled: false},
            yAxis: {
                stops: [[0.9, color]],tickLength : 1,
                lineWidth: 0, minorTickInterval: 0, tickAmount: 0,
                title: { y: 0 }, labels: { y: 110 }
            },
            plotOptions: {solidgauge: {dataLabels: { y: 0, borderWidth: 0, useHTML: true}}}
        };
        var chartSpeed = Highcharts.chart(widgetId, Highcharts.merge(gaugeOptions, {
            yAxis: { min: min, max: max, title: {text: ''}}, credits: { enabled: false},
            series: [{name: 'Speed',data: [value],
                dataLabels: {format: '<div class="vsdSolidGaugeMarker">'+unit+'</div>'},
            }]

        }));

    }
});