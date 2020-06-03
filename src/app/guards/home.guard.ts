import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { AuthConstansts } from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(public storageService: StorageService, private router: Router){}

  canActivate(): Promise<boolean>{
      return new Promise(resolve =>{
        this.storageService.get(AuthConstansts.AUTH).then(res =>{
         if(res){
           resolve(true);
         } else {
           this.router.navigate([''])
           resolve(false);
         }
        })
        .catch(err =>{
          resolve(false);
        })
      })
  }
  
}
