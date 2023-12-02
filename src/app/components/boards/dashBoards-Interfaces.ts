
import { ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis } from "ngx-apexcharts"

export interface Top5Products {
    chartOptions: ApexChart;
    responsive: ApexResponsive[];
    pieOptions: ApexPlotOptions;
    labels: string[];
    series: number[];
}

export interface Top5ProductsPerHour {
    chartOptions: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    tooltips: ApexTooltip;
}

export interface AllProducts {
    chartOptions:ApexChart;
    series:ApexAxisChartSeries;
    xaxis: ApexXAxis;
}