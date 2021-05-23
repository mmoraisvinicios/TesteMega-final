import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContaService } from './conta.service';

describe('ContaService', () => {
  let service: ContaService;

  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContaService]
    });
    injector = getTestBed();
    httpMock= TestBed.get(HttpTestingController);
    service = TestBed.inject(ContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should Get', () => {
    
    let contas = [
      {
        contaId: 5
      }
    ];

    let result = service.Get().subscribe(contas => {
      expect(contas.length).toBe(1); 
    });

    const req = httpMock.expectOne("api/contas");
      expect(req.request.method).toBe("GET");
      req.flush(contas); 
  });


});
