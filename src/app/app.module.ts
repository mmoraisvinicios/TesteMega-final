import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';   
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import {ContaService} from '../app/services/conta.service';
import {ListagemContasComponent} from '../app/components/Conta/listagem-contas/listagem-contas.component';
import { NovoComponent } from '../app/components/Conta/novo/novo.component';
import { EditarComponent } from '../app/components/Conta/editar/editar.component';
import { ConfirmaExclusaoComponent } from '../app/components/Conta/confirma-exclusao/confirma-exclusao.component';
import { MensagemComponent } from '../app/components/Conta/mensagem/mensagem.component';

@NgModule({
  declarations: [AppComponent, ListagemContasComponent, NovoComponent, EditarComponent, ConfirmaExclusaoComponent,MensagemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],

  providers: [
    ContaService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
