import { Component } from '@angular/core';
import { ApexAxisChartSeries } from 'ngx-apexcharts';
import { Top5ProductsPerHour } from '../dashBoards-Interfaces';
@Component({
  selector: 'app-line-board',
  templateUrl: './line-board.component.html',
  styleUrls: ['./line-board.component.scss']
})
export class LineBoardComponent {

  private isMobile = window.innerWidth < 500 ? "300px" : "500px";

  public teste: Top5ProductsPerHour = {
    chartOptions: {
      height: this.isMobile,
      width: "95%",
      fontFamily: "monospace",
      id: "teste",
      type: "line",
    },
    xaxis: {
      categories: [
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        // Adicione mais nomes de meses aqui
      ],
    },
    stroke: {
      curve: 'smooth',
    },
    tooltips: {
      x: {
        format: "dd MMM yyyy"
      }
    },

  }

  chartSeries: ApexAxisChartSeries = [
    {
      name: "cachorro-quente",
      data: [
        20, 30, 504, 32
      ],
    },
    {
      name: "refrigerante",
      data: [
        53, 434, 73, 98, 95, 201
      ],
    }
  ]
}
