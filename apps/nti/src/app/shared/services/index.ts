import { SharedService } from './shared'
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth-interceptor';
import { GenericProfile } from './generic-profile/generic-profile';
import { GenericDonor } from './generic-donor/generic-donor';

export function services()
{
    return[
        SharedService,
        AuthGuard,
        AuthInterceptor,
        GenericProfile,
        GenericDonor,
    ]
}