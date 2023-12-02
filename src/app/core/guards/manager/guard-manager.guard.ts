import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Injectable } from '@angular/core';
import { AccountState } from '../../states/AccountState';
import { Account } from '../../models/AccountModel';
import { getAuthOfStorage } from '../../storage/sessionStorage';


@Injectable({
  providedIn: "root"
})
export class ManagerGuard implements CanActivateChild {

  constructor(private accountState: AccountState, private route: Router) { }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const typeAccount = getAuthOfStorage();
    if (!typeAccount) {
      return this.validateNoAccountType();
    } else {
      return this.validateAccountType(typeAccount);
    }
  }

  private validateAccountType(typeAccount: number) {
    if (typeAccount == 1) {
      return true;
    } else {
      this.route.navigate(["home/manager"])
    }
  }

  private validateNoAccountType() {
    let isValid = false
    this.accountState.onChangeAccount()
      .subscribe((account: Account) => {
        if (account.typeAccount == 1) {
          isValid = true;
        }
      })
    if (!isValid) {
      this.route.navigate(["home/manager"])
    }
    return isValid
  }

}