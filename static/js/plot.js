(function updatePlot() {
    $.ajax({
        url:"/update_plot",
        success: function(data) {
            google.charts.load('current', {packages: ['corechart', 'bar']});
            google.charts.setOnLoadCallback(drawPlot);
            function drawPlot() {
                var plot = new google.visualization.DataTable();
                var values = data.data;
                var timestamps = data.timestamp;
                console.log(values);
                console.log(timestamps);
                plot.addColumn('string', 'Timestamp');
                plot.addColumn('number', 'Value');
                plot.addColumn({ role: 'style' });

                var rows = []

                for (let i = 0; i < values.length; i++) {
                    rows.push([timestamps[i], values[i], '#84EFCB']);
                }

                plot.addRows(rows);

                console.log(plot);

                var options = {
                    title: 'Your Data',
                    height: 700,
                    backgroundColor: {
                        fill:'#1D2B40'
                    },
                    bar: {groupWidth: "95%"},
                    legend: {position: "none"},
                    hAxis: {
                        textStyle: {
                            color: 'white'
                        },
                        viewWindow: {
                        min: [7, 30, 0],
                        max: [17, 30, 0],
                        }
                    },
                    vAxis: {
                        textStyle: {
                            color: 'white'
                        }
                    },
                    titleTextStyle: {
                        color: 'white'
                    },

                };
                var chart = new google.visualization.ColumnChart(
                    document.getElementById('plot')
                );
                chart.draw(plot, options);
            }
        },
        complete: function() {
            setTimeout(updatePlot, 2000);
        }
    });
})();