/**
 * Created by ruiyun on 11/13/14.
 */

$(function() {
    // Set up the chart


    $.get('/api/caseByType', function (data) {
        //console.log(data);
        createChart('chart_case', data);
    });

    $.get('/api/caseByCountry', function (data) {
        createChart('chart_country', data);
    });

    $.get('/api/caseByReporterType', function (data) {
        createChart('chart_reporter_type', data);
    });

    $.get('/api/outcome', function (data) {
        createChart('chart_outcome', data);
    });

    var createChart = function(chartId, data) {

        var chart = new Highcharts.Chart({
            chart: {
                renderTo: chartId,
                type: 'column',
                margin: 75,
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    depth: 40
                }
            },
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,0f} / {point.stackTotal:,0f} ({point.percentage:.0f}%)'
            },
            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'Number of cases'
                }
            },
            xAxis: {
                //categories: ['10', '11', '12']
                categories: data.categories
            },
            /*
             series: [{name: 'DIR',  data: [12, 71.5, 106.4]},
             {name: 'EXP',  data: [12, 71.5, 106.4]},
             {name: 'PER',  data: [12, 71.5, 106.4]
             }]
             */
            series: data.series
        });

        var slider = $('#'+chartId).siblings('.sliders');

        var alphaSlider = slider.find('.R0');
        var betaSlider = slider.find('.R1');
        var alphaLabel = slider.find('.R0-value');
        var betaLabel = slider.find('.R1-value');

        function showValues() {
            alphaLabel.html(chart.options.chart.options3d.alpha);
            betaLabel.html(chart.options.chart.options3d.beta);
        }

        // Activate the sliders
        alphaSlider.on('change', function () {
            chart.options.chart.options3d.alpha = this.value;
            showValues();
            chart.redraw(false);
        });
        betaSlider.on('change', function () {
            chart.options.chart.options3d.beta = this.value;
            showValues();
            chart.redraw(false);
        });

        showValues();
    };
});