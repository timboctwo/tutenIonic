import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';
import { UserInterfaceElementsService } from '../services/ui/user-interface-elements.service';
import { HomeService } from '../services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public tableParam = '';
  public maxValue:number;
  public minValue:number;
  public searchValue = '';

  userData:any;
  rawBookingResponse = [];
  displayedBookingList:any;
  originalData = [];

  constructor(
    private uiService: UserInterfaceElementsService,
    private router: Router,
    private homeService: HomeService,
    private storageService: StorageService
    ) {}

  ngOnInit(){
     this.homeService.userData$.subscribe((res: any) =>{
        this.userData = res;
        if(this.userData){
          this.getBookingData();
        }
     })
  }

  getBookingData(){

    this.uiService.showLoader();

    let userParams = {
      email : 'contacto@tuten.cl',
      emailAdmin : this.userData.email,
      token : this.userData.sessionTokenBck,
      app : 'APP_BCK'
    }

    this.homeService.getBookingList(userParams).subscribe((res : any) => {
      this.uiService.dismissLoader();
      if(res.length > 0){
        this.rawBookingResponse = res;
        this.formatBookingList();
      }else{
        console.log(res.length);
        this.uiService.showAlert('Uno de los parametros es incorrecto')
      }
    },
    (error: any) => {
      this.uiService.dismissLoader();
      console.log(error);
      this.uiService.showAlert(error.error);
    });
  }

  formatBookingList(){
    this.rawBookingResponse.forEach(element => {
      var formatedBooking = {
        bookingId : element.bookingId,
        cliente : element.tutenUserClient.firstName,
        fechaCreacion : this.getDate(element.bookingTime),
        direccion : JSON.parse(element.bookingFields).location.streetAddress,
        precio : element.bookingPrice
      };
      this.originalData.push(formatedBooking);
    });
    this.restoreDisplayedData();
    console.log(this.displayedBookingList);
  }

  getDate(time: string){
    var date = new Date(time);
    var formattedDate =  date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
    return formattedDate;
  }

  restoreDisplayedData(){
    this.displayedBookingList = JSON.parse(JSON.stringify(this.originalData));
    console.log('Reload Data');
  }

  chekTableParamSelected(){
    if(this.tableParam.length > 0 ){
      return true;
    }else{
      this.uiService.showAlert("Selecciona una tabla para continuar");
      return false;
    }
  }

  checkMinAndMaxValuesSetted(){
    if((this.maxValue === null || this.minValue === null) &&(!isNaN(this.maxValue) && !isNaN(this.minValue))){
      this.uiService.showAlert("Los campos para la comparacion seben ser numericos y no estar vacios.");
      return false;
    }else{
      return true;
    }
  }

  comparationFilter(){
    if(this.chekTableParamSelected() && this.checkMinAndMaxValuesSetted()){
      this.restoreDisplayedData();
      this.displayedBookingList = this.displayedBookingList.filter((booking) => {
          switch (this.tableParam) {
            case 'bookingId':
              return booking.bookingId >= this.maxValue && booking.bookingId <= this.minValue;
            case 'price':
              return booking.precio >= this.maxValue && booking.precio <= this.minValue;
            default:
              return;
          }
      })
    }
  }

  searchFilter(){
    if(this.chekTableParamSelected()){  
      if(this.searchValue == null || this.searchValue.length == 0){
        this.uiService.showAlert('Ingresa un parametro para realizar la busqueda');
      }else{
        this.displayedBookingList = this.displayedBookingList.filter((booking) => {
          switch (this.tableParam) {
            case 'bookingId':
              return booking.bookingId == this.searchValue;
            case 'price':
              return booking.precio == this.searchValue;
            default:
              return;
          }
        })
      }
    }
  }

}
