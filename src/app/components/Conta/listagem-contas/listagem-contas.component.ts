import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table'; 
import { Observable } from 'rxjs'; 
import { ContaService } from 'src/app/services/conta.service';
import {startWith, map} from 'rxjs/operators';
import {MatPaginator } from '@angular/material/paginator';
import {MatSort} from  '@angular/material/sort'; 
import { ConfirmaExclusaoComponent } from '../confirma-exclusao/confirma-exclusao.component';

@Component({
  selector: 'app-listagem-contas',
  templateUrl: './listagem-contas.component.html',
  styleUrls: ['./listagem-contas.component.css']
})

export class ListagemContasComponent implements OnInit {

  contas = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();
  opcoesConta : string[] = [];
  textoEncontrado: Observable<string[]>;

  @ViewChild(MatPaginator, {static : true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static : true})
  sort: MatSort;

  constructor(private contaService: ContaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.contaService.Get().subscribe(resultado => 
      {
        resultado.forEach(c => {  
          this.opcoesConta.push(c.nome); 
          this.opcoesConta.push(c.numeroConta); 
          this.opcoesConta.push(c.numeroAgencia);  
          this.opcoesConta.push(c.situacao); 
        })
        this.contas.data = resultado; 
        
        this.opcoesConta = this.opcoesConta.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        });
        
        this.contas.paginator = this.paginator;
        this.contas.sort = this.sort;
      });

      this.displayedColumns = this.ExibirColunas();
  
      this.textoEncontrado = this.autoCompleteInput.valueChanges.pipe(startWith(''),map(nome=> this.Filtrar(nome)) );

    }

  ExibirColunas() : string[]{
      return ['codigoBanco','numeroConta', 'numeroAgencia', 'nome', 'situacao', 'acoes'];
  }

  AbrirDialog(contaId: number, nome: string): void{
    this.dialog.open(ConfirmaExclusaoComponent, {
      data:{
        contaId: contaId, 
        nome: nome
      }
    }).afterClosed().subscribe(resultado => {
      if(resultado === true){
        this.contaService.Get().subscribe(dados => {
          this.contas.data = dados;
        });

          this.displayedColumns = this.ExibirColunas();
        }
    });
  }

  Filtrar(texto: string): string[]{
    if(texto.trim().length >= 4){
      this.contaService.Filtrar(texto.trim().toLowerCase()).subscribe(resultado => {
          this.contas.data = resultado;
      });
    }else{
      if(texto === ''){
        this.contaService.Get().subscribe(resultado => {
          this.contas.data = resultado;
        });
      }
    }

    return this.opcoesConta.filter(c =>
      c.toLowerCase().includes(texto.toLowerCase()));
  } 
} 