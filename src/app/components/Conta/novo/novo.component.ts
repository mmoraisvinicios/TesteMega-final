import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContaService } from 'src/app/services/conta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Banco } from 'src/app/models/Banco';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {

  formulario: any;
  erros: string[];
  bancos: Banco[];
  
  constructor(private contaService: ContaService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.contaService.GetBancos().subscribe(resultado => {
        this.bancos = resultado;
    });

    this.erros = [];
    this.formulario = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      numeroConta: new FormControl(null, [Validators.required]),
      numeroAgencia: new FormControl(null, [Validators.required]),
      codigoBanco: new FormControl(null, [Validators.required]),
      documento: new FormControl(null, [Validators.required])
    });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  SalvarFormulario(): void {

    if (!this.formulario.valid)
      return;

    const conta = this.formulario.value;

    this.contaService.Criar(conta).subscribe(resultado => {
      this.router.navigate(['conta/listagemConta']);
      this.snackBar.open("Conta criada com sucesso!", '', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top' });
    }, (e) => {
      for (const campo in e.error) { 
        if (e.error.hasOwnProperty(campo)) {
          this.erros.push(e.error[campo][0].errorMessage);
        }
      }
      this.AbrirDialog(this.erros);
    });
  }

  Voltar() {
    this.router.navigate(["/conta/listagemConta"]);
  }

  getErrorMessage(controle: string) {

    if (this.formulario.get(controle).hasError('required')) {
      return 'O campo é obrigatório';
    }

    return null;
  }

  
  AbrirDialog(mensagem: string[]): void {
    this.dialog.open(MensagemComponent, {
      data: {
        mensagens: mensagem
      }
    });
  }
}