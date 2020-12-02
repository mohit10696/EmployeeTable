import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignerComponent } from './designer/designer.component';
import { DeveloperComponent } from './developer/developer.component';

const appRoute:Routes =  [
  // { path : '' , component : AppComponent},
  { path : 'developer' , component : DeveloperComponent},
  { path : 'designer' , component : DesignerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
