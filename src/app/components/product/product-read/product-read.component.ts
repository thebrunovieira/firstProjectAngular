import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[] = [];
  // productsBack: Product[] = [];
  displayedColumns = ['id', 'name', 'price', 'action'];
  productsLength: number = this.products.length;
  productsUrl: string = '/products';
  page: number | undefined = 1;

  constructor(
    private productService: ProductService,
    private router: Router
    ) { 

    }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products;
    })

    // this.productService.read().subscribe(productsBack => {
    //   this.productsBack = productsBack;
    // })
  }

  // firstPage(): void {
  //   this.productService.read('page', 1).subscribe(products => {
  //     this.products = products;
  //   })

  //   this.page = 1;
  // }

  // previousPage(): void {
  //   if(typeof this.page == 'number' && this.page != 1) {
  //     this.page --;
  //     this.productService.read('page', this.page).subscribe(products => {
  //       this.products = products;
  //     })
  //   }
  // }

  // nextPage(): void {
  //   let value = this.productsBack.length/7;
  //   value = Math.ceil(value);

  //   if(typeof this.page == 'number' && this.page != value) {
  //     this.page ++;
  //     this.productService.read('page', this.page).subscribe(products => {
  //       this.products = products;
  //     })
  //   }
  // }

  // lastPage(): void {
  //   let value = this.productsBack.length/7;
  //   value = Math.ceil(value);

  //   this.productService.read('page', value).subscribe(products => {
  //     this.products = products;
  //   })
  //   this.page = value
  // }

}