import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemContasComponent } from '../app/components/Conta/listagem-contas/listagem-contas.component';
import { NovoComponent } from '../app/components/Conta/novo/novo.component';
import { EditarComponent } from '../app/components/Conta/editar/editar.component';

const routes: Routes = [
  { path : "conta/listagemConta", component: ListagemContasComponent}, 
  { path : "conta/novo", component: NovoComponent}, 
  { path : "conta/editar/:id", component: EditarComponent}, 
  { path: '', redirectTo: '/conta/listagemConta', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
