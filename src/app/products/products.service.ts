import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {

  constructor(private http: Http) { }

  getAllProducts(){

    console.log("aa " + this.http.get('/api/posts')
      .map(res => res.json()));

    return this.http.get('/api/posts')
      .map(res => res.json());
  }

}
