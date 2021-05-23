import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banco } from '../models/Banco';
import { Conta } from '../models/Conta';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  url: string = 'api/contas';

  constructor(private http: HttpClient) {

   }

   Get() : Observable<Conta[]>{
     return this.http.get<Conta[]>(this.url);
   };

   GetById(contaId: number) : Observable<Conta>{
     const apiUrl =`${this.url}/${contaId}`;
     return this.http.get<Conta>(apiUrl);
   }

   Criar(conta: Conta) : Observable<any>{
      return this.http.post<Conta>(this.url, conta, httpOptions);
   }

   Atualizar(contaId: number, conta: Conta) : Observable<any>{
     const apiUrl = `${this.url}/${contaId}`;
     return this.http.put<Conta>(apiUrl, conta, httpOptions);
   };

   Excluir(contaId : number) : Observable<any>{
    const apiUrl = `${this.url}/${contaId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
   }

   Filtrar(texto: string) : Observable<Conta[]>{
     const apiUrl = `${this.url}/filtrar/${texto}`;
     return this.http.get<Conta[]>(apiUrl);
   }

   GetBancos(): Observable<Banco[]>{
    const apiUrl = `${this.url}/lista-bancos`;
    return this.http.get<Banco[]>(apiUrl);
  }
}
