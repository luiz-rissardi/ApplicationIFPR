import { Component, Input } from '@angular/core';
import { TopProductsSelling } from 'src/app/core/models/TopProductSelling';

@Component({
  selector: 'app-relatory',
  templateUrl: './relatory.component.html',
  styleUrls: ['./relatory.component.scss']
})
export class RelatoryComponent {
  @Input() totalPriceOfSales: number;
  @Input() productSelling: TopProductsSelling[];
}
