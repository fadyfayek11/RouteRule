import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveHistoryComponent } from './archive-history/archive-history.component';
import { LoginComponent } from './login/login.component';
import { RulesAddComponent } from './rules-add/rules-add.component';
import { RulesEditComponent } from './rules-edit/rules-edit.component';
import { RulesListComponent } from './rules-list/rules-list.component';

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
