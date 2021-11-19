import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './components/usuario/usuario-edit/usuario-edit.component';
import { UsuarioIndexComponent } from './components/usuario/usuario-index/usuario-index.component';

const routes: Routes = [
  { path: '', redirectTo: '/usuario-index', pathMatch: 'full' },
  { path: 'usuario-index', component: UsuarioIndexComponent },
  { path: 'usuario-create', component: UsuarioCreateComponent },
  { path: 'usuario-edit/:id',component: UsuarioEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
