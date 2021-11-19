import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sexos } from 'src/app/models/sexos';
import { Usuario } from 'src/app/models/usuarios';
import { SexoService } from 'src/app/services/sexo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html'
})
export class UsuarioEditComponent implements OnInit {

  public usuario: Usuario;
  public sexos: Sexos[];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private sexoService: SexoService,
    private router: Router,
    private route: ActivatedRoute) {
    this.usuario = new Usuario;
  }

  ngOnInit(): void {

    let userId = this.route.snapshot.paramMap.get('id');
    this.usuarioService.obterUsuario(Number(userId))
      .subscribe(
        usuarios => {
          this.usuario = usuarios;
          console.log(usuarios);
        },
        error => console.log(error)
      );


    this.form = this.formBuilder.group({
      nome: [this.usuario.nome, [Validators.maxLength(200), Validators.minLength(3)]],
      dataNascimento: [this.usuario.dataNascimento, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.maxLength(100), Validators.email]],
      senha: [this.usuario.senha, [Validators.required, Validators.maxLength(30)]],
      sexoId: [this.usuario.sexoId, [Validators.required]],
      ativo: [this.usuario.ativo, [Validators.required]],
    });

    this.sexoService.obterSexos()
      .subscribe(
        sexos => {
          this.sexos = sexos;
          console.log(sexos);
        },
        error => console.log(this.sexos)
      )
  }

  Salvar(usuarioId) {
    if (!this.form.valid) return;

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
        this.SalvarConfirm(usuarioId);
      } else if (result.isDenied) {
        Swal.fire('Cancelado', 'Procedimento cancelado, as informações estão preservadas', 'info')
      }
    });
  }

  private SalvarConfirm(usuarioId) {

    this.usuarioService.editarUsuario(usuarioId,this.usuario)
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
}

