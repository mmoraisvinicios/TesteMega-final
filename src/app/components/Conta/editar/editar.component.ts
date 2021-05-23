import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Conta } from 'src/app/models/Conta';
import { ContaService } from 'src/app/services/conta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Banco } from 'src/app/models/Banco';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {

  conta: Observable<Conta>;
  contaId: number;
  formulario: any;
  erros: string[];
  bancos: Banco[];

  constructor(private router: Router, private route: ActivatedRoute, private contaService: ContaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    const contaId = this.route.snapshot.params.id;

    this.contaService.GetBancos().subscribe(resultado => {
      this.bancos = resultado;
    });

    this.contaService.GetById(contaId).subscribe(resultado => {
      this.formulario = new FormGroup({
        contaId: new FormControl(contaId),
        nome: new FormControl(resultado.nome, [Validators.required]),
        numeroConta: new FormControl(resultado.numeroConta, [Validators.required]),
        numeroAgencia: new FormControl(resultado.numeroAgencia, [Validators.required]),
        codigoBanco: new FormControl(resultado.codigoBanco, [Validators.required]),
        documento: new FormControl(resultado.documento, [Validators.required]),
        dataAbertura: new FormControl(resultado.dataAbertura)
      });
    });
  }

  get propriedades() {
    return this.formulario.controls;
  }

  SalvarFormulario(): void {
    const conta = this.formulario.value;
    this.contaService.Atualizar(conta.contaId, conta).subscribe(resultado => {
      this.router.navigate(['conta/listagemConta']);
      this.snackBar.open("Conta atualizada com sucesso!", '', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top' });
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

  AbrirDialog(mensagem: string[]): void {
    this.dialog.open(MensagemComponent, {
      data: {
        mensagens: mensagem
      }
    });
  }


  getErrorMessage(controle: string) {

    if (this.formulario.get(controle).hasError('required')) {
      return 'O campo é obrigatório';
    }

    return null;
  }

}
