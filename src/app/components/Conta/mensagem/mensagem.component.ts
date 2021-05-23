import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {
  erros: string[];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.erros = this.route.snapshot.params.mensagem;
  }
}
