import { Component } from '@angular/core';
import { Store, Select } from "@ngxs/store";
import { AddProduct, ProductStateModel, RemoveProduct } from "src/app/product/product.state";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** 取得產品清單資料,有兩種寫法,這是其中一種 */
  @Select('product.productList') productList: Observable<ProductStateModel>;

  constructor(private store: Store) { }

  /** 新增產品 */
  addProduct(name: string) {
    this.store.dispatch(new AddProduct(name));
  }

  /** 刪除產品 */
  removeProduct() {
    this.store.dispatch(new RemoveProduct());
  }
}
