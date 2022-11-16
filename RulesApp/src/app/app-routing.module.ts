import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveHistoryComponent } from './components/archive-history/archive-history.component';
import { LoginComponent } from './components/login/login.component';
import { RulesListComponent } from './components/rules-list/rules-list.component';

const routes: Routes = [
{path:"",component:LoginComponent},

{path:"list",component:RulesListComponent },

{path:"History",component:ArchiveHistoryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
