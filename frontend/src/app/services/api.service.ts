import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.api_base_url

  constructor(private http: HttpClient) { }

  get options() {
    return {
      headers: {
        'Accept': "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
  }



  Login(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.apiUrl + '/user/login', data)
        .toPromise()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          reject(err.error);
        })
    })
  }

  Signup(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.apiUrl + '/user/signup', data)
        .toPromise()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          reject(err.error);
        })
    })
  }

  ProductList(data: any) {
    return new Promise<any>((resolve, reject) => {
      console.log(this.options);

      this.http.get(this.apiUrl + `/product/list?page=${data.page}`, this.options)
        .toPromise()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          reject(err.error);
        })
    })
  }

  FavouriteProductList(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.apiUrl + `/product/list/favourite?page=${data.page}`, this.options)
        .toPromise()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          reject(err.error);
        })
    })
  }

  AddToFavourite(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.apiUrl + '/product/add/favourite', data, this.options)
        .toPromise()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          reject(err.error);
        })
    })
  }

  RemoveFromFavourite(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.apiUrl + '/product/remove/favourite', data, this.options)
        .toPromise()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          reject(err.error);
        })
    })
  }

}