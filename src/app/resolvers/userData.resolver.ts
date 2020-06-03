import { Injectable } from '@angular/core';
import { HomeService } from '../services/home/home.service';


@Injectable({
    providedIn : 'root'
})

export class UserDataResolver{
    constructor(private homeService: HomeService){}

    resolve(){
        return this.homeService.getUserData();
    }
}