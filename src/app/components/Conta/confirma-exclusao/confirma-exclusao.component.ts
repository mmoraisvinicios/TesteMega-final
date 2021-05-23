import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContaService } from 'src/app/services/conta.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirma-exclusao',
  templateUrl: './confirma-exclusao.component.html',
  styleUrls: ['./confirma-exclusao.component.css']
})
export class ConfirmaExclusaoComponent implements OnInit {
  constructor(@Inject (MAT_DIALOG_DATA) public dados: any, 
  private contaService: ContaService,
  private snackBar : MatSnackBar,
  private router : Router, private route: ActivatedRoute){  }

  ExcluirConta(contaId: number): void {
      this.contaService.Excluir(contaId).subscribe(resultado => {
        this.snackBar.open("conta excluída com sucesso!", '', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top' });
      });
    }

    
  ngOnInit(): void { 
    
  }

}
