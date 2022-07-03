import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent implements OnInit {

  productList: Array<any> = []
  total: any
  pageNumber: any = 1;
  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getFavouriteProductList()
  }

  getFavouriteProductList() {
    let data = {
      page: this.pageNumber,
    }
    this.apiService.FavouriteProductList(data)
      .then((response) => {
        console.log(response);
        this.productList = response.data.productList;
        this.total = response.data.total;
      }).catch((error) => {
        console.error(error);
      })
  }

  removeFromFavourite(data: any) {
    this.apiService.RemoveFromFavourite(data)
      .then((response) => {
        console.log(response);
        this.toastr.success(response.message)
        this.getFavouriteProductList()
      }).catch((error) => {
        console.error(error);
      })
  }

  getItemPage(pageNumber: any) {
    this.pageNumber = pageNumber;
    this.getFavouriteProductList();
  }

}
