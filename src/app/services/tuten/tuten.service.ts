import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TutenService {

  constructor(private http: HttpClient) { }

  put(serviceName: string, data: any){
    const headers = new HttpHeaders(
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'App': data.app,
        'Password': data.password

      }
    );

    const options = {headers: headers, WithCredentials: false};
    const url = environment.apiUrl + serviceName;
    return this.http.put(url, {}, options);
  }

  get(serviceName: string, data: any){
    const headers = new HttpHeaders(
      {   
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': data.token,
        'Adminemail': data.emailAdmin, 
        'App': data.app,
      }
    );
    const options = {headers: headers, WithCredentials: false};
    const url = environment.apiUrl + serviceName;
    return this.http.get(url, options);
  }
}
