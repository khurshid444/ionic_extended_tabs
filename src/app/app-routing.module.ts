import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IntroGuard } from './guards/intro.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
{
  path: 'tabs',
  loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  canLoad: [AuthGuard]
},
{
  path: 'tab4',
  loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
},
{
  path: 'intro',
  loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule),
},
{
  path: 'login',
  loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  canLoad: [IntroGuard, AutoLoginGuard] 
},
{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}
];
@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
