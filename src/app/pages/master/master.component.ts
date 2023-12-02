import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models/AccountModel';
import { AccountState } from 'src/app/core/states/AccountState';
import { ShoppingCartState } from 'src/app/core/states/ShoppingCartState';
import { getAuthOfStorage } from 'src/app/core/storage/sessionStorage';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  public isAdminAccount: boolean = false;
  public activeShoppingCart:boolean = false;

  constructor(
    private accountState: AccountState,
    private shoppingCartState: ShoppingCartState
  ) {}

  ngOnInit(): void {
    this.isAdminAccount = getAuthOfStorage() == 1 ? true : false;
    this.accountState.onChangeAccount()
      .subscribe((account: Account) => {
        this.isAdminAccount = account.typeAccount == 1 ? true : false;
      })

    this.shoppingCartState.onChangeShoppingCart()
      .subscribe(data => {
        this.activeShoppingCart = data.size > 0;
      })
  }

}
