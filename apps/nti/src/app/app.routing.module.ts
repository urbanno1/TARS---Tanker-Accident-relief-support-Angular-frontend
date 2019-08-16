import { Routes, RouterModule, PreloadingStrategy } from '@angular/router';
import { NgModule } from '@angular/core';
import {AppCustomPreloader} from './custom.strategy';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { ForbiddenContainer } from './shared/components/forbidden/forbidden';
import { Home } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { DonateMoneyComponent } from './pages/donate-money/donate-money';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'login', component: LoginComponent },
    { path: 'donate-money', component: DonateMoneyComponent },
    { path: 'forbidden', component: ForbiddenContainer, canActivate: [AuthGuard] },

    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        data: { preload: true}
    },
    {
        path: 'users',
        loadChildren: 'app/users/users.module#UsersModule',
        data: { preload: true }
    },
    {
        path: 'staff',
        loadChildren: 'app/staff/staff.module#StaffModule',
        data: { preload: true }
    },
    {
        path: 'student',
        loadChildren: 'app/student/student.module#StudentModule',
        data: { preload: true }
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: AppCustomPreloader })],
    providers: [AppCustomPreloader]
})
export class NtiRoutes { }
