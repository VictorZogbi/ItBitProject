import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/app/environment";
import { Observable } from "rxjs";
import { Usuario } from "../models/usuarios";
import { Result } from "../models/result";

@Injectable()
export class UsuarioService {

    constructor(private http: HttpClient) { }

    protected UrlServiceV1: string = environment.apiUrl + "/Usuarios";

    obterUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.UrlServiceV1 + "/ObterTodos");
    }

    obterUsuario(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(this.UrlServiceV1 + "/ObterUsuario/" + id);
    }

    BuscarUsuario(nome: string = "", ativo: boolean = true): Observable<Usuario[]> {
        const params = new HttpParams()
            .set('nome', nome)
            .set('ativo', ativo);
        return this.http.get<Usuario[]>(this.UrlServiceV1 + "/BuscarUsuario", {params});
    }

    cadatrarUsuario(usuario: Usuario): Observable<Result> {
        return this.http.post<Result>(this.UrlServiceV1 + "/Adicionar", usuario);
    }

    deleteUsuario(id: number): Observable<Result> {
        return this.http.delete<Result>(this.UrlServiceV1 + "/Excluir/" + id);
    }

    editarUsuario(id: number, usuario: Usuario): Observable<Result> {
        return this.http.put<Result>(this.UrlServiceV1 + "/Atualizar/" + id, usuario);
    }
}