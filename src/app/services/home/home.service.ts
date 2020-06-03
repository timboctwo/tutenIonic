import { Injectable } from '@angular/core';
import { TutenService } from '../tuten/tuten.service';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthConstansts } from '../../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public userData$ = new BehaviorSubject<any>(''); 

  constructor(
    private tutenService: TutenService,
    private storageService: StorageService,
    private router: Router
  ) { }

  getUserData(){
    this.storageService.get(AuthConstansts.AUTH).then(res => {
      this.userData$.next(res);
     });
  }

  getBookingList(userData: any): Observable<any>{
    return this.tutenService.get('user/'+userData.email+'/bookings?current=true', userData);
  }
}
