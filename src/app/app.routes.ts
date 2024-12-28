import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { TerrorComponent } from './components/terror/terror.component';
import { AnimeComponent } from './components/anime/anime.component';
import { AccionComponent } from './components/accion/accion.component';
import { DeporteComponent } from './components/deporte/deporte.component';
import { ComediaComponent } from './components/comedia/comedia.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'terror', component: TerrorComponent },
    { path: 'comedia', component: ComediaComponent },
    { path: 'anime', component: AnimeComponent },
    { path: 'accion', component: AccionComponent },
    { path: 'deporte', component: DeporteComponent },
    { path: '**', component: NotFoundComponent },

];
