import {storage} from '@/app/services/httpClient.js'
import Product from '@/Modules/Product/product.model'

const ENDPOINT = 'products'

class ProductEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  getProduct (params) {
    let item = null
    if (params.id) {
      this.all().forEach(product => {
        if (Number(product.id) === Number(params.id)) {
          item = product
        }
      })
    }
    return item
  }
  checkAvailable (params) {
    let {id} = params
    let products = this.all()
    let isAvailable = true
    products.forEach(product => {
      if (Number(product.id) === Number(id) && Number(product.availability) === 0) {
        isAvailable = false
      }
    })

    return isAvailable
  }
  checkAvailabilty (params) {
    let {carts} = params
    // console.log(carts)
    // carts = carts.filter(cart => {
    //   if (cart.id === 18) {
    //     cart.availability = 0
    //     return cart
    //   }
    //   return cart
    // })

    let products = this.all()
    let results = []
    carts.forEach(cart => {
      products.forEach(product => {
        let item = {...product}
        if (product.id === cart) {
          if (product.availability === 0) {
            item.availability = 0
            results.push(item)
            return
          }
          results.push(product)
        }
      })
    })
    return results
  }
  getProducts (data) {
    this.store(data)
    Product.insert({data: this.all()})
    return Product.query().withAllRecursive().get()
  }
  getSearchKeywords (params) {
    let {search, limit} = params
    const query = Product.query().withAllRecursive()
    if (search) {
      query.orWhere('name', (name) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
      query.orWhere('cas', (cas) => cas.toLowerCase().indexOf(search.toLowerCase()) > -1)
    }
    if (limit) {
      query.limit(limit)
    }

    return query.get()
  }
  getAdvancedSearchProducts (params) {
    let {data} = params
    console.log(data)
    const options = data.options
    const tags = data.tags
    const orderBy = data.orderBy
    const orderDirection = data.orderDirection != null ? data.orderDirection : 'desc'

    Product.insert({data: this.all()})
    const query = Product.query().withAllRecursive()
    if (tags.length > 0) {
      tags.map(tag => {
        if (tag !== null && tag.length > 0) {
          query.orWhere('cas', (value) => value.indexOf(tag) > -1)
          query.orWhere('name', (value) => value.indexOf(tag) > -1)
          query.orWhere('equation', (value) => value.indexOf(tag) > -1)
          query.orWhere('catalogue', (value) => value.indexOf(tag) > -1)
        }
      })
      if (orderBy != null) {
        query.orderBy(orderBy, orderDirection)
      }
      // if (options.supplier != null) {
      //   query.search(options.supplier, {
      //     caseSensitive: false,
      //     threshold: 0,
      //     keys: ['supplier']
      //   })
      // }
      // if (options.warehouse != null) {
      //   query.search(options.warehouse, {
      //     caseSensitive: false,
      //     threshold: 0,
      //     keys: ['warehouse']
      //   })
      // }
      // if (options.packsize != null) {
      //   query.search(options.packsize, {
      //     caseSensitive: false,
      //     threshold: 0,
      //     keys: ['packsize']
      //   })
      // }
      // if (options.purity != null) {
      //   query.search(options.purity, {
      //     caseSensitive: false,
      //     threshold: 0,
      //     keys: ['purity']
      //   })
      // }
      // if (options.delivery != null) {
      //   query.search(options.delivery, {
      //     caseSensitive: false,
      //     threshold: 0,
      //     keys: ['delivery']
      //   })
      // }

      if (process.env.SEARCH_LIMIT !== null) {
        // query.limit(process.env.SEARCH_LIMIT)
      }

      let products = query.get()

      if (options.purity != null) {
        let search = options.purity.toLowerCase().trim()
        products = products.filter(product => {
          let purity = product.purity.toLowerCase().trim()
          if (purity === search) {
            return product
          }
        })
      }

      if (options.qty != null) {
        products = products.filter(product => {
          if (product.availability >= options.qty) {
            product.qty = options.qty
            return product
          }
        })
      }

      if (options.packsize != null) {
        let search = options.packsize.toLowerCase().trim()
        products = products.filter(product => {
          let packsize = product.packsize.toLowerCase().trim()
          if (packsize === search) {
            return product
          }
        })
      }

      if (options.supplier != null) {
        let search = options.supplier.toLowerCase().trim()
        products = products.filter(product => {
          let supplier = product.supplier.toLowerCase().trim()
          if (supplier.indexOf(search) > -1) {
            return product
          }
        })
      }

      if (options.warehouse != null) {
        let search = options.warehouse.toLowerCase().trim()
        products = products.filter(product => {
          let warehouse = product.warehouse.toLowerCase().trim()
          if (warehouse.indexOf(search) > -1) {
            return product
          }
        })
      }

      if (options.delivery != null) {
        let search = options.delivery.toLowerCase().trim()
        products = products.filter(product => {
          let delivery = product.delivery.toLowerCase().trim()
          if (delivery.indexOf(search) > -1) {
            return product
          }
        })
      }

      return products
    }
  }
  getProductsByCas (cas) {
    return Product
      .query()
      .where('cas', cas)
      .get()
  }
  getAdavacedOptions (tags, option) {
    let purities = []
    let quantities = []
    let packsizes = []
    let suppliers = []
    let warehouses = []
    let deliveries = []

    if (tags.length > 0) {
      tags.forEach(tag => {
        let query = Product.query().where('cas', tag)

        if (option.purity != null) {
          query.where('purity', option.purity)
        }

        if (option.qty != null) {
          query.where('qty', option.qty)
        }

        if (option.packsize != null) {
          query.where('packsize', option.packsize)
        }

        if (option.supplier != null) {
          query.where('supplier', option.supplier)
        }

        if (option.warehouse != null) {
          query.where('warehouse', option.warehouse)
        }

        if (option.delivery != null) {
          query.where('delivery', option.delivery)
        }

        let products = query.get()

        if (products.length > 0) {
          products.map(product => {
            purities.push(product.purity)
            if (product.availability > 0) {
              quantities.push(product.availability)
            }
            packsizes.push(product.packsize)
            suppliers.push(product.supplier)
            warehouses.push(product.warehouse)
            deliveries.push(product.delivery)
          })
        }
      })
    }
    purities = purities.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    quantities = quantities.filter((value, index, self) => {
      return self.indexOf(value) === index
    }).sort()
    packsizes = packsizes.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    suppliers = suppliers.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    warehouses = warehouses.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    deliveries = deliveries.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    return {
      purities: purities,
      quantities: quantities,
      packsizes: packsizes,
      suppliers: suppliers,
      warehouses: warehouses,
      deliveries: deliveries
    }
  }
}

export default new ProductEntity()
