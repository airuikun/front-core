import React, { PropTypes } from 'react';
import { fetchMainChartData , deleteLineChart } from '../actions/main';
import ReactDOM from 'react-dom';

class Trend extends React.Component {

  componentDidMount() {
        //this.renderChart()
        this.props.dispatch(fetchMainChartData())
  }

  componentDidUpdate(prevProps) {
        console.log('Did update', prevProps, this.props)

        if(prevProps.main.pv && prevProps.main.pv === this.props.main.pv) {
            return
        }

        this.renderChart(this.props.main.pv, this.props.main.uv, this.props.main.legends)
        
  }



  renderChart(pv=[], uv=[], legends=[]) {
        var chartDiv = this.refs.interchart;
 
        var t = pv;
        var n = uv;
        var r = legends;
   
        const blue = "#348fe2"
        const green = "#00acac";

    $.plot(chartDiv, [{
            data: t,
            label: "Page Views",
            color: blue,
            lines: {
                show: true,
                fill: false,
                lineWidth: 2
            },
            points: {
                show: true,
                radius: 3,
                fillColor: "#fff"
            },
            shadowSize: 0
        }, {
            data: n,
            label: "Visitors",
            color: green,
            lines: {
                show: true,
                fill: false,
                lineWidth: 2
            },
            points: {
                show: true,
                radius: 3,
                fillColor: "#fff"
            },
            shadowSize: 0
        }], {
            xaxis: {
                ticks: r,
                tickDecimals: 0,
                tickColor: "#ddd"
            },
            yaxis: {
                ticks: 10,
                tickColor: "#ddd",
                min: 0,
                max: 400
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#ddd",
                borderWidth: 1,
                backgroundColor: "#fff",
                borderColor: "#ddd"
            },
            legend: {
                labelBoxBorderColor: "#ddd",
                margin: 10,
                noColumns: 1,
                show: true
            }
        });
  }


  render() {

    if(this.props.main.chartShow) {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-inverse" data-sortable-id="index-1">
                            <div className="panel-heading">
                                <div className="panel-heading-btn">
                                    <a href="javascript:;" className="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i className="fa fa-repeat" onClick={() => this.props.dispatch(fetchMainChartData())}></i></a>
                                    <a href="javascript:;" className="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i className="fa fa-times" onClick={() => this.props.dispatch(deleteLineChart())}></i></a>
                                </div>
                                <h4 className="panel-title">Website Analytics (Last 7 Days)</h4>
                            </div>
                            <div className="panel-body">
                                <div id="interactive-chart" className="height-sm" ref="interchart"></div>
                            </div>
                            <div className="panel-footer text-right">
                                <a href="/mock/export/uv" className="btn btn-info btn-sm">Export UV</a>
                                <a href="/mock/export/pv" className="btn btn-primary btn-sm m-l-5">Export PV</a>
                            </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
  }
}

export default Trend
