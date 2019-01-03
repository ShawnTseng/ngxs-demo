import { State, Action, StateContext } from '@ngxs/store';

/** 產品項目 */
class ProductItem {
    /** 產品名稱 */
    _name: string;

    /** 數量 */
    _quantity: number;

    /** 單價 */
    _price: number;

    constructor(name = 'item name') {
        this._name = name;
        this._quantity = 10;
        this._price = 10;
    }
}

/** 產品清單 */
export interface ProductStateModel {
    /** 所有產品資訊 */
    productList: Array<ProductItem>;
}

/** 新增產品 */
export class AddProduct {
    /** TODO: 釐清意義，官方沒有說明這個property的意義; action的名稱? */
    static readonly type = 'add product';

    /** 新增的產品項目 */
    productItem: ProductItem;

    constructor(name: string) {
        this.productItem = new ProductItem(name);
    }
}

/** 刪除產品 */
export class RemoveProduct {
    /** TODO: 釐清意義，官方沒有說明這個property的意義; action的名稱? */
    static readonly type = 'remove product';
}

/** 產品清單的狀態初始設定 */
@State<ProductStateModel>({
    name: 'product',
    defaults: {
        productList: []
    }
})

/** 產品清單的狀態管理 */
export class ProductState {
    /** 新增產品的邏輯 */
    @Action(AddProduct)
    addProduct({ getState, setState }: StateContext<ProductStateModel>, { productItem }: AddProduct) {
        const state = getState();
        setState({
            ...state,
            productList: [...state.productList, productItem]
        });
    }

    /** 刪除產品的邏輯 */
    @Action(RemoveProduct)
    removeProduct(ctx: StateContext<ProductStateModel>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            productList: state.productList.splice(0, state.productList.length - 1)
        });
    }
}