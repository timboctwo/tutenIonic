import { Injectable } from '@angular/core';
import { TutenService } from '../tuten/tuten.service';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstansts } from '../../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private tutenService: TutenService,
    private storageService: StorageService,
    private router: Router
    ) {}

  doLogin(userCredentials: any): Observable<any>{
    return this.tutenService.put('user/'+userCredentials.email, userCredentials);
  }

  logout(){
    this.storageService.removeItem(AuthConstansts.AUTH).then(res => {
      this.router.navigate([''])
    });
  }
}
