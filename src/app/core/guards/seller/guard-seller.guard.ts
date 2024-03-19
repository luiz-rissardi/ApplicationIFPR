import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountState } from '../../states/AccountState';
import { Account } from '../../models/AccountModel';
import { Injectable } from '@angular/core';
import { getAuthOfStorage } from '../../storage/sessionStorage';

@Injectable({
  providedIn: "root"
})
export class SellerGuard implements CanActivateChild {

  constructor(private accountState: AccountState, private route: Router) {
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const typeAccount = getAuthOfStorage();
    if (!typeAccount) {
      return this.validateNoAccountType();
    } else {
      return this.validateAccountType(typeAccount);
    }
  }

  private validateNoAccountType() {
    let isValid = false;
    this.accountState.onChangeAccount()
      .subscribe((account: Account) => {
        if (account.typeAccount == 2) {
          isValid = true;
        }
      })
    if(!isValid){
      this.route.navigate(["home/select-productss"])
    }
    return isValid;
  }

  private validateAccountType(typeAccount: number) {
    if (typeAccount == 2) {
      return true;
    } else {
      this.route.navigate(["home/select-productss"])
    }
  }

}