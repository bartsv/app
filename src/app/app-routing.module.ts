import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change', component: ChangePasswordComponent },

];
  const routerModuleWithProviders: ModuleWithProviders<RouterModule> =
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    );

  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
      routerModuleWithProviders
    ],
    exports: [
      RouterModule
    ]
  })
export class AppRoutingModule { }
