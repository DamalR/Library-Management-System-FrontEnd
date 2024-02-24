import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { ViewAllBooksComponent } from './page/view-all-books/view-all-books.component';
import { RegisterComponent } from './page/register/register.component';
import { ViewAllBorrowersComponent } from './page/view-all-borrowers/view-all-borrowers.component';

export const routes: Routes = [
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"view-all-books",
        component:ViewAllBooksComponent
    },
    {
        path:"sign-up",
        component:RegisterComponent

    },
    {
        path:"view-all-borrowers",
        component:ViewAllBorrowersComponent
    }
];
