import { Generator, Context } from '@abw/react-context-generator'
import { sleep } from '@abw/badger-utils'

const sampleProducts = [
  { id: 'foo', name: 'The Foo Product' },
  { id: 'bar', name: 'The Bar Product' },
  { id: 'baz', name: 'The Baz Product' },
];

class Products extends Context {
  static initialState = {
    ready:    false,
    loading:  false,
    products: [ ],
  }
  static actions     = "selectProduct";
  static debug       = true;
  static debugPrefix = 'Products > ';
  static debugColor  = 'orangered'

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts() {
    this.debug("loadProducts()");
    this.setState({ loading: "Loading..." });

    sleep(1000).then(
      () => this.setState({
        loading: false,
        products: [ ...sampleProducts ],
        productById: sampleProducts.reduce(
          (byId, product) => {
            byId[product.id] = product;
            return byId
          },
          { }
        )
      })
    )
  }

  selectProduct(id) {
    this.debug(`selectProduct(${id})`);
    const index = this.state.productById || { };
    const product = index[id];
    this.setState({ product });
  }

  //-----------------------------------------------------------------------------
  // Render
  //-----------------------------------------------------------------------------
  getRenderProps() {
    const context = this.getContext();

    return {
      Products: context,
      products: context.products,
      product:  context.product,
    };
  }
}

export default Generator(Products);
