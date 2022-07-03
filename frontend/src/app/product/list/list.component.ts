import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  productList: Array<any> = []
  total: any
  pageNumber: any = 1;
  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProductList()
  }

  getProductList() {
    let data = {
      page: this.pageNumber,
    }
    this.apiService.ProductList(data)
      .then((response) => {
        console.log(response);
        this.productList = response.data.productList;
        this.total = response.data.total;
      }).catch((error) => {
        console.error(error);
      })
  }

  addToFavourite(data: any) {
    this.apiService.AddToFavourite(data)
      .then((response) => {
        console.log(response);
        this.toastr.success(response.message)
      }).catch((error) => {
        console.error(error);
        this.toastr.error(error.message)
      })
  }

  getItemPage(pageNumber: any) {
    this.pageNumber = pageNumber;
    this.getProductList();
  }

}
