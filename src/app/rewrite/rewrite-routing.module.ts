import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewriteComponent } from './rewrite.component';

const routes: Routes = [{ path: '', component: RewriteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewriteRoutingModule { }
