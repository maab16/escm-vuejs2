<template>
  <div>
    <div class="container cart-page">
      <div class="cart-title checkout-title">
        <h3 class="fw-400">
          <a href="javascript:void(0)">
                <router-link to="/cart">
                  <span>
                    <em class="sls-icons sls-24 back-arrow"></em>
                  </span>
                </router-link>
              </a>
          Checkout</h3>
        <div class="text-left">
          <p class="text-order2 fs-18">To ensure all orders are placed Successfully,</p>
           <p class="text-order2 fs-18">place order within <span class="text-primary fs-24">{{countDown}} sec</span></p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="card checkout-list">
            <div class="card-header">
              <h4 class="fw-400 text-uppercase">Choose Delivery Address</h4>
            </div>
            <div class="card-body">
              <b-form-group>
                <b-form-radio
                v-for="(address, index) in addresses"
                :key="index"
                v-model="delivery"
                name="address1"
                :value="address.id">
                  <div class="address">
                    <p>{{ address.line1 }}</p>
                    <p
                      class="gray-500"
                      v-for="(line, index) in lines = address.line2.split(',')"
                      :key="index">{{ line }} {{ lines.length - 1 > index ? ',' : '.' }}</p>
                  </div>
                </b-form-radio>
                <div class="border-bottom my-3"></div>
              </b-form-group>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <app-summary class="sticky-top"></app-summary>
        </div>
      </div>
    </div>
    <b-modal ref="my-modal" size="sm"  centered  hide-footer hide-header>
      <div class="d-block text-center">
       <em class="sls-icons sls-50 loaber"></em>
       <p class="text-black fw-500">Checking availability...</p>
      </div>
    </b-modal>
  </div>
</template>
<script src="./checkout.js"></script>
<style src="./checkout.scss" lang="scss" scoped />
