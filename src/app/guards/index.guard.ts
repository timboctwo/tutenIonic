import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { AuthConstansts } from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {

constructor(
  private storageService: StorageService, 
  private router: Router){}

  canActivate(): Promise<boolean>{
    return new Promise(resolve =>{
      this.storageService.get(AuthConstansts.AUTH).then(res =>{
       if(res){
        this.router.navigate(['home']);
         resolve(false);
       } else {
         resolve(true);
       }
      })
      .catch(err =>{
        resolve(false);
      })
    })
}
  
}
