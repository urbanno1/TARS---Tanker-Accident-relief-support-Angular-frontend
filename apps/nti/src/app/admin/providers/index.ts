import { DashboardProvider } from "./dashboard";
import { StateProvider } from "./state";

export function providers()
{
    return [
        DashboardProvider,
        StateProvider
    ]
}