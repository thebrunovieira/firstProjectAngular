import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products";
  limit = "?_limit="
  paginate = "&_page=";

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient    
    ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "right",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Error! Action not completed!", true);
    return EMPTY;
  }

  read(): Observable<Product[]> {
    
    return this.http.get<Product[]>(`${this.baseUrl}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
    
    // condition: 'page'| 'id' | undefined, parameter: number | undefined

    // if (typeof parameter != 'number') {
    //   return this.http.get<Product[]>(`${this.baseUrl}`);
    // } else {
    //   if (condition == 'page') {
    //     return this.http.get<Product[]>(`${this.baseUrl}${this.limit}7${this.paginate}${parameter}`)
    //   } else {
    //     return this.http.get<Product[]>(`${this.baseUrl}/${parameter}`);
    //   }
    // }
  }

  readById(id: string | null): Observable<Product> {
    if (id == null) {
      id = '';
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number | undefined): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
}
