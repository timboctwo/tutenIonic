import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { LoginService } from "../services/login/login.service";
import { StorageService } from "../services/storage/storage.service";
import { UserInterfaceElementsService } from "../services/ui/user-interface-elements.service";
import { AuthConstansts } from '../config/auth-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public mailPattern = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;

  public userCredentials = {
    email: '',
    password: '',
    app: 'APP_BCK',
  };

  constructor(
    private uiService: UserInterfaceElementsService,
    private router: Router,
    private loginService: LoginService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
  }

  login(){
    if(this.validateInputs()){
      this.uiService.showLoader();
      this.loginService.doLogin(this.userCredentials).subscribe((res : any) => {
        this.uiService.dismissLoader();
        console.log(res);
        if(res){
          this.storageService.store(AuthConstansts.AUTH, res);
          this.router.navigate(['home']);
        }else{
          this.uiService.showAlert(res.statusText);
        }
      },
      (error: any) => {
        this.uiService.dismissLoader();
        console.log(error);
        this.uiService.showAlert(error.error);
      });
    }
  }

  validateInputs(){
    let userEmail = this.userCredentials.email;
    let userPassword = this.userCredentials.password;
    var isCorrect = true;
    if(!(this.userCredentials.email && this.userCredentials.password && userEmail.length > 0 && userPassword.length > 0)){
      isCorrect = false;
    }else if(!this.mailPattern.test(userEmail)){
      this.uiService.showAlert('Ingresa una direccion de correo valida.');
      isCorrect = false;
    }
    console.log(isCorrect)
    return isCorrect;
  };

}
