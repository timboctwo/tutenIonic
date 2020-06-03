import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceElementsService {
  private isLoading = false; 
  private alert = null;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController
    ) {}

  async showAlert(message: string) {
    this.alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención',
      message: message,
      buttons: ['OK']
    });
    await this.alert.present();
  }

  async showLoader() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: 'crescent',
      translucent: true,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismissLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}
