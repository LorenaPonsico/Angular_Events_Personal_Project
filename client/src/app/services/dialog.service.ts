import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomComponent } from '../components/dialog-custom/dialog-custom.component';
import { Dialog } from '../models/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor( private matDialog: MatDialog  ) { }

  openDialogCustom(data: Dialog){
   return this.matDialog.open(DialogCustomComponent, {data})
  }
}
