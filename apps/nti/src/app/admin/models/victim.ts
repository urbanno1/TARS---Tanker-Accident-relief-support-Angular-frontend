import { Country } from './country';
import { State } from './state';
import { City } from './city';
import { Lga } from './lga';

export interface Victim {
    Country?: Country;
    State?: State;
    City?: City;
    Lga?: Lga;
    IncidentType?: string;
    IncidentDate?: string;
    IncidentDescription?: string;
    CreatedDate?: any;
    HomeAddress?: string;
    firstName?:string;
}

