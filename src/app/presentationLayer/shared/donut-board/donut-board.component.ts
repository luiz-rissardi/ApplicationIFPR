import { Component } from '@angular/core';
import { Top5Products } from '../../components/dash-boards/Interface-boards/dashBoards-Interfaces';

@Component({
  selector: 'app-donut-board',
  templateUrl: './donut-board.component.html',
  styleUrls: ['./donut-board.component.scss']
})
export class DonutBoardComponent {

  private isMobile = window.innerWidth < 500 ? "400px" : "500px";


  public top5Products: Top5Products = {
    chartOptions: {
      height: this.isMobile,
      width: this.isMobile,
      fontFamily: "monospace",
      id: "teste",
      type: "donut",
    },
    pieOptions:{
      pie:{
        donut:{
          labels:{
            name:{
              show:true,
            },
            value:{
              color:"blue"
            }
          }
        }
      }
    },
    responsive: [{
      breakpoint: 300,
      options: {
        legend: {
          position: ''
        }
      }
    }],
    labels: ['cachorro-quente', 'refrigerante', 'pastel', 'espetinho', ' quentão'],
    series: [332, 820, 243, 165, 422]
  }

}
