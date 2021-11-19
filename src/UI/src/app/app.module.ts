import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioIndexComponent } from './components/usuario/usuario-index/usuario-index.component';
import { UsuarioService } from './services/usuario.service';
import { MenuComponent } from './navegacao/menu/menu.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SexoService } from './services/sexo.service';
import { UsuarioEditComponent } from './components/usuario/usuario-edit/usuario-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioIndexComponent,
    MenuComponent,
    UsuarioCreateComponent,
    UsuarioEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UsuarioService,
    SexoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
