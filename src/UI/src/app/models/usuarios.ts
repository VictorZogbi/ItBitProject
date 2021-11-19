import { Sexos } from "./sexos";

export class Usuario {
    usuarioId: number;
    nome: string;
    dataNascimento: Date;
    email: string;
    senha: string;
    ativo: boolean;
    sexoId: number;
    sexo: Sexos;
}