import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TakePhotoComponent } from './Photo/take-photo/take-photo.component';


const routes: Routes = [
  {path:'',pathMatch:'full',component:TakePhotoComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
