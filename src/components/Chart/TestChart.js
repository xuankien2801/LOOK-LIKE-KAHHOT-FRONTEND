import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

// This component is used by the CorrectPercentageChart component
// to render a graph of results
class TestChart extends Component {
  constructor (props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: props.labels,
          title: {
            text: props.xTitle
          }
        },
        yaxis: {
          title: {
            text: props.yTitle
          },
          labels: {
            show: true,
            formatter: function (val) {
              return val + props.format;
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + props.format;
          },
          style: {
            fontSize: '12px',
            colors: ['#304758']
          }
        },
        title: {
          text: props.title,
          align: 'center',
        },
        style: {
          width: '100%',
        },
      },
      series: [
        {
          name: props.series,
          data: props.data
        }
      ]
    };
  }

  render () {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="100%"
              aria-label='Information chart'
            />
          </div>
        </div>
      </div>
    );
  }
}

TestChart.propTypes = {
  data: PropTypes.array,
  labels: PropTypes.array,
  title: PropTypes.string,
  format: PropTypes.string,
  series: PropTypes.string,
  xTitle: PropTypes.string,
  yTitle: PropTypes.string,
}
export default TestChart;