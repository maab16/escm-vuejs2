<template>
  <div>
    <div class="cart-summary">
      <div class="card">
        <div class="card-header">
          <p class="text-center text-uppercase">Cart Summary</p>
        </div>
        <div class="card-body">
          <div
            class="d-flex justify-content-between pb-20"
            v-for="(placelist, i) in getCheckList()"
            :key="i"
          >
            <div class="text-left">
              <p class="text-black">{{placelist.cas}}</p>
              <p class="text-order2 fs-14">{{placelist.packsize}} x {{ placelist.qty }}</p>
            </div>
            <div class="text-right">
              <p> {{ currency.toUpperCase() }} {{ (placelist[currency] * (placelist.qty > 1 ? placelist.qty : 1)).toFixed(2)}}</p>
              <p class="text-order2 fs-14">In INR {{ (placelist.inr * (placelist.qty > 1 ? placelist.qty : 1)).toFixed(2)}}</p>
            </div>
          </div>
          <div v-if="!order">
          <router-link to="/cart">
            <div class="d-flex justify-content-between pb-10">
              <p class="text-danger">No. of Available Products</p>
              <p class="text-danger">{{getCheckList().length}}</p>
            </div>
          </router-link>
          <router-link :to="{ path: '/cart', hash: '#requestProducts' }">
            <div class="d-flex justify-content-between pb-10">
              <p class="text-danger">No. of Requested Products</p>
              <p class="text-danger">{{requestList.length}}</p>
            </div>
          </router-link>
          </div>
          <div class="border-bottom"></div>
          <div v-if="order">
            <div class="pt-10 d-flex align-items-center justify-content-between">
              <p class="fw-400 text-black">No. of Available Products</p>
              <p class="fw-400 text-black">{{getCheckList().length}}</p>
            </div>
            <div class="pt-10 d-flex align-items-center justify-content-between">
              <p class="fw-400 text-black">No. of Requested Products</p>
              <p class="fw-400 text-black">{{requestList.length}}</p>
            </div>
          </div>
          <div class="pt-10 d-flex align-items-center justify-content-between">
            <p class="fw-400 text-black">Total Products:</p>
            <p class="fw-400 text-black">{{getCheckList().length + requestList.length}}</p>
          </div>
          <div class="pt-10 pb-10 d-flex align-items-center justify-content-between">
            <p class="fw-400 text-black">Cart Amount:</p>
            <p class="fw-500 text-black"> {{ currency.toUpperCase() }} {{ total }}</p>
          </div>
          <div class="card p-10 card-note">
            <p class="small pb-10 text-black fw-500">Please note:</p>
            <p
              class="small pb-10"
            >The above total cart amount does not include the cost of the products requested to order.</p>
            <p
              class="small pb-10"
            >The above costs are based on information provided by vendors and are subjected to change.</p>
            <p
              class="small"
            >In case any product becomes unavailable by the time the order is placed, Sai Life Sciences team would order it for you.</p>
          </div>
          <div class="Sticky-place-bottom">
            <div v-if="can('order.create')">
              <div class="pt-10 pb-10" v-if="!order && getCheckList().length > 0">
                <b-button block variant="primary" @click="checkout()">Proceed to checkout</b-button>
              </div>
              <div class="pt-10 pb-10" v-if="!order && getCheckList().length < 1 && requestList.length > 0">
                <b-button block variant="primary" @click="checkoutNotify()">Proceed to notify</b-button>
              </div>
              <div class="pt-10 pb-10" v-if="!order && (getCheckList().length + requestList.length) < 1">
                <b-button block variant="primary" disabled @click="checkout()">Proceed to checkout</b-button>
              </div>
              <div class="pt-10 pb-10" v-if="order">
                <b-button block variant="primary" :disabled="getCheckList().length + requestList.length < 1" @click="confirmModal()">Place order</b-button>
              </div>
            </div>
          <p class="small">*Order once placed cannot be cancelled</p>
          <p  class="small">*Standard currency value applied
            <span class="fw-500 text-black">(1 USD = 73.14 INR, 1 EUR = 82.81 INR)</span></p>
        </div>
        </div>
      </div>
    </div>
    <!-- Confirm Availability -->
    <b-modal ref="confirm-modal" size="sm"  centered  hide-footer hide-header>
      <div class="d-block text-center">
       <em class="sls-icons sls-50 loaber"></em>
       <p class="text-black fw-500">Confirming availability...</p>
      </div>
    </b-modal>
  </div>
</template>
<script src="./cartSummary.js"></script>
<style src="./cartSummary.scss" lang="scss" scoped />
