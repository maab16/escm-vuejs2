<template>
  <div>
    <div class="results-order" v-for="product in products" :key="product.id">
      <p
        class="text-center border-top p-15 fs-18"
        v-if="product.availability === 0"
      >Few products that you are searching for is currently not available. Request Sai Life Sciences to purchase for you.</p>
      <!-- add cart Alert -->
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="light"
        class="border shodow add-cart-alert2"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <p>Added to Cart</p>
      </b-alert>
      <div class="card shadow" v-if="product.availability === 0">
        <div class="row no-gutters">
          <div class="col-sm-3 col-md-3 col-lg-3">
            <div class="order-header">
              <div class="order-test pb-15">
                <b-badge pill variant="info" class="pl-s5 pr-s5">
                  {{product.cas?product.cas:product.name}}
                </b-badge>
              </div>
              <div class="order-test">
                <h5>{{product.name}}</h5>
                <p class="fw-500 pt-5s">{{product.purity}}</p>
              </div>
            </div>
          </div>
          <div class="col-sm-9 col-md-9 col-lg-9">
            <div class="card-body">
              <div class="row no-gutters">
                <div class="col-6 col-sm-6 col-md-6 col-lg-3">
                  <div class="order-select-list">
                    <div class="order-select">
                      <label>Pack Size</label>
                      <b-form-input
                        :searchable="false"
                        v-model="product.packsize"
                        size="sm"
                      ></b-form-input>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-6 col-md-6 col-lg-2">
                  <div class="order-select-list">
                    <div class="order-select">
                      <label>Qty</label>
                     <b-form-input
                      :searchable="false"
                      v-model="product.qty"
                      size="sm"
                      type="number"
                      min="1"
                      max="99"
                      :required="true"
                      :state="product.qty > 99 || product.qty < 1 ? false : true"
                    ></b-form-input>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-6 col-md-6 col-lg-4">
                  <div class="order-select-list">
                    <div class="order-select">
                      <label>Delivery Time</label>
                      <b-form-input
                        :searchable="false"
                        v-model="product.delivery"
                        size="sm"
                      ></b-form-input>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-6 col-md-6 col-lg-3">
                  <div class="order-select-list">
                    <div class="order-select">
                      <label>Purity(%)</label>
                      <b-form-input
                        :searchable="false"
                        v-model="product.purity"
                        size="sm"
                        type="number"
                        min="50"
                        max="100"
                        :required="true"
                        :state="product.purity >= 50 && product.purity <= 100 ? true : false"
                      ></b-form-input>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="order-message">
                    <b-form-textarea
                      id="textarea-no-resize"
                      placeholder="Specify more about this product"
                      rows="0"
                      class="test-order"
                      no-resize
                      v-model="product.description"
                      :required="true"
                      :state="!product.description ? false : true"
                    ></b-form-textarea>
                  </div>
                  <div class="text-right" v-if="can('cart.create')">
                    <button
                      :class="{'disabled' : product.qty > 99 || product.qty < 1 || product.purity < 50 || product.purity > 100 || !product.description}"
                      v-if="!product.isCart"
                      class="btn btn-primary pl-10 pr-10"
                      @click="addCartRequest(product)">Add request to cart</button>
                    <button v-if="product.isCart" class="btn btn-primary" @click="removeRequestFromCart(product)">Remove from Cart</button>
                    <button v-if="product.isCart" class="btn btn-primary" @click="viewCart()">View request to cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./requestOrder.js"></script>
<style src="./requestOrder.scss" lang="scss"/>
