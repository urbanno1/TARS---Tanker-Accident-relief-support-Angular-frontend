import { LoginComponent } from './login/login';
import { Home } from './home/home';
import { DonateMoneyComponent } from './donate-money/donate-money';
export function pages() {
    return [
        Home,
        LoginComponent,
        DonateMoneyComponent,
    ];
}
