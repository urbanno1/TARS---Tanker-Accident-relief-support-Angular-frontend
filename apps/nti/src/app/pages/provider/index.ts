import { LoginProvider } from './login';
import { RegisterProvider } from '../../users/providers/register';

export function providers()
{
    return [
        LoginProvider,
        RegisterProvider,
    ]
}