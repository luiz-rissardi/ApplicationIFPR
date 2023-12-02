import { Component } from '@angular/core';
import { AllProducts } from '../dashBoards-Interfaces';

@Component({
  selector: 'app-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.scss']
})
export class TotalSalesComponent {

  private isMobile = window.innerWidth < 500 ? "300px" : "500px";

  public teste: AllProducts = {
    chartOptions: {
      height: this.isMobile,
      width: this.isMobile,
      fontFamily: "monospace",
      id: "teste",
      type: "bar",
    },
    series: [{
      name: 'Vendas',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125,30, 40, 45, 50, 49, 60, 70, 91, 125]
    }],
    xaxis: {
      categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro','Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro']
    }
  }
}
