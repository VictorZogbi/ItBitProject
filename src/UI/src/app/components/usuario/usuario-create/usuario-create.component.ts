import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Sexos } from 'src/app/models/sexos';
import { Usuario } from 'src/app/models/usuarios';
import { SexoService } from 'src/app/services/sexo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html'
})
export class UsuarioCreateComponent implements OnInit {

  public usuario : Usuario;
  public sexos : Sexos[]; 
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private usuarioService : UsuarioService,
    private sexoService : SexoService,
    private router: Router) {
    this.usuario = new Usuario;
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nome: [this.usuario.nome, [Validators.maxLength(200), Validators.minLength(3)]],
      dataNascimento: [this.usuario.dataNascimento, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.maxLength(100), Validators.email]],
      senha: [this.usuario.senha, [Validators.required,Validators.maxLength(30)]],
      sexoId: [this.usuario.sexoId, [Validators.required]],
    });

    this.sexoService.obterSexos()
      .subscribe(
        sexos => {
          this.sexos = sexos;
          console.log(sexos);
        },
        error => console.log(this.sexos)
      );
  }

  Salvar() {
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
        this.SalvarConfirm();
      } else if (result.isDenied) {
        Swal.fire('Cancelado', 'Procedimento cancelado, as informações estão preservadas', 'info')
      }
    });
  }

  private SalvarConfirm() {

    this.usuarioService.cadatrarUsuario(this.usuario)
      .subscribe(data => {
        if (!data.error) {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: "Procedimento realizado com sucesso."
          }).then((result) => {
            this.router.navigate(['/usuario-index']);
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
