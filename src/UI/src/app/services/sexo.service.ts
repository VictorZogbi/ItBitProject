import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/app/environment";
import { Sexos } from "../models/sexos";


@Injectable()
export class SexoService {

    constructor(private http: HttpClient) { }

    protected UrlServiceV1: string = environment.apiUrl + "/Sexo";

    obterSexos(): Observable<Sexos[]> {       
        return this.http.get<Sexos[]>(this.UrlServiceV1 + "/ObterTodos");
    }
}