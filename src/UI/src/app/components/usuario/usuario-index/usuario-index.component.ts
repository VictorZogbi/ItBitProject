import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-index',
  templateUrl: './usuario-index.component.html',
})
export class UsuarioIndexComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  public usuarios: Usuario[];
  public nome: string;
  public ativo: boolean;

  ngOnInit(): void {
    this.usuarioService.obterUsuarios()
      .subscribe(
        usuarios => {
          this.usuarios = usuarios;
          console.log(usuarios);
        },
        error => console.log(error)
      );
  }

  deleteUser(usuario) {
    Swal.fire({
      icon: 'info',
      title: 'Deseja realizar essa operação ?',
      text: 'Você não será capaz de recuperar essas informações!',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sim, eu tenho!',
      denyButtonText: 'Não, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.DeleteConfirm(usuario.usuarioId);
      } else if (result.isDenied) {
        Swal.fire('Cancelado', 'Procedimento cancelado, as informações estão preservadas', 'info')
      }
    });
  }

  private DeleteConfirm(usuarioId) {
    this.usuarioService.deleteUsuario(usuarioId)
      .subscribe(data => {
        if (!data.error) {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: "Procedimento realizado com sucesso."
          }).then((result) => {
            location.reload();
          });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'erro no processamento',
            text: data.messages
          });
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Ocorreu um erro inesperado, por favor tente novamente. Se o erro persistir entre em contato com o suporte',
          text: error.message
        });
      }
      );
  }

  FiltroUsuario(){
    this.usuarioService.BuscarUsuario(this.nome, this.ativo)
      .subscribe(usuarios => {
        this.usuarios = usuarios;        
      }, error => {        
        console.log(error)
      });
  }

}
