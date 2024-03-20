import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CommandFacade } from 'src/app/facades/Command';

@Component({
  selector: 'app-inactive-command',
  templateUrl: './inactive-command.component.html',
  styleUrls: ['./inactive-command.component.scss']
})
export class InactiveCommandComponent {
  
  phoneControl: FormControl;

  constructor(
    formBuild: FormBuilder,
    private commandFacade: CommandFacade
  ) {
    this.phoneControl = formBuild.control([])
  }

  inactive(){
    const phone = this.phoneControl.value;
    this.commandFacade.inactiveCommand(phone);
  }
}
