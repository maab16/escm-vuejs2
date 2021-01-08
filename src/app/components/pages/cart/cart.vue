<template>
  <div>
    <div class="container cart-page" v-if="!emptycartList">
      <div class="row">
        <div class="col-sm-12 col-md-8 col-lg-8">
          <div class="row no-gutters cart-title pb-0">
            <div class="col-7 col-sm-4 col-md-7">
              <h3 class="fw-400">
                Your cart items ({{orderList.length + requestList.length}})
                <p class="small">Last updated {{ format(updatedAt, 'MMMM Do, YYYY H:mm') }}
                  <a
                    href="javascript:void(0)"
                    class="pl-10"
                    @click="reloadcart()">
                  <img src="~@/assets/images/icons/refresh.svg" alt="refresh" />
                </a>
                </p>
              </h3>
            </div>
            <div class="col-2 col-sm-4 col-md-3 text-right">
            </div>
            <div class="col-3 col-sm-4 col-md-2 text-right">
              <a
                v-if="(orderList.length + requestList.length) > 0"
                href="javascript:void(0)"
                @click="emptyCart"
                class="text-primary">Empty Cart</a>
            </div>
          </div>
          <!-- cart order select List -->
          <div class="card add-cart-order" v-if="orderList.length > 0">
            <div class="card-header">
              <!-- Check All -->
              <div class="row">
                <div class="col-sm-12 col-md-8">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      @click="checkAll()"
                      v-model="ordercheck"
                      id="customCheck1"
                    />
                    <label
                      class="custom-control-label m-0 text-uppercase"
                      for="customCheck1"
                    >Selected Products ({{orderList.length}})</label>
                  </div>
                </div>
                <div class="col-md-2 d-none d-md-block d-lg-block d-xl-block">
                  <p class="text-center text-uppercase">Quantity</p>
                </div>
                <div class="col-md-2 d-none d-md-block d-lg-block d-xl-block">
                  <p class="text-right text-uppercase">Price</p>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Checkboxes list -->
              <ul class="add-cart-list list-group border-0 m-0" v-if="orderList.length > 0">
                <li
                  class="list-group-item border-0"
                  v-for="(item,i) in orderList"
                  :key="i"
                  :class="{ 'request-procuct-list' : item.availability === 0 }"
                >
                  <div class="request-space">
                    <div class="row">
                      <div class="col-md-8">
                        <label class="custom-check">
                          {{item.cas}}
                          <input
                            v-if="item.availability !== 0"
                            type="checkbox"
                            v-bind:value="item"
                            v-model="selectcheck"
                            @change="updateCheckall()"
                          />
                          <span class="checkmark"></span>
                        </label>
                        <div class="pl-20">
                          <p class="fw-600 pl-20">{{item.equation}}</p>
                          <p class="small pl-20 text-black">{{item.purity}} Pure</p>
                          <div class="order-list-test">
                            <p class="pl-20">
                              <span>Supplier:</span>
                              {{item.supplier}}
                            </p>
                            <p class="pl-20">
                              <span>Warehouse Location:</span>
                              {{item.warehouse}}
                            </p>
                            <div class="pl-20 d-md-flex d-lg-flex">
                              <p class="pr-20">
                                <span>Availability:</span>
                                {{item.availability}}
                              </p>
                              <p>
                                <span>Pack Size:</span>
                                {{item.packsize}}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-4">
                        <div class="row">
                          <div class="col-5 col-md-6">
                            <div class="cart-qty">
                              <p class="d-block d-md-none d-lg-none">Qty</p>
                               <div class="quantity-select">
                              <v-select
                                :searchable="false"
                                v-model="item.qty"
                                :options="getAvailableQty(item)"
                                size="sm"
                                @input="updateCartPrice(item)"
                              ></v-select>
                               </div>
                               <div>
                                 <a
                                    href="javascript:void(0)"
                                    class="text-primary"
                                    @click="removeItem(item)"
                                  >Remove</a>
                               </div>
                            </div>
                          </div>
                          <div class="col-7 col-md-6">
                            <div class="text-right">
                              <p class="texxt-black fw-600">{{ currency.toUpperCase() }} {{item[currency]}}</p>
                              <p class="small">In INR {{item.inr}}</p>
                            </div>
                          </div>
                          <div class="request-product text-left text-lg-right error-request ml-3 ml-lg-0 mt-2 mt-lg-0" v-if="item.availability === 0">
                            <button class="btn btn-primary" @click="showModal(item)">Request Product</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p
                      class="error-request text-danger pt-20"
                      v-if="item.availability === 0"
                    >This item is not available any more. You can request for the product or it will be automatically discarded during the checkout.</p>
                    <div class="border-bottom w-100 pt-10 pb-10"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- request order select List -->
          <div class="card add-cart-order" id="requestProducts" v-if="requestList.length > 0">
            <div class="card-header">
              <!-- Check All -->
              <div class="row">
                <div class="col-md-8">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      @click="RequestAll()"
                      v-model="requestCheck"
                      id="customCheck2"
                    />
                    <label
                      class="custom-control-label text-uppercase"
                      for="customCheck2"
                    >Requested Products ({{requestList.length}})</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Checkboxes list -->
              <ul class="add-cart-list list-group border-0 m-0">
                <li
                  class="list-group-item border-0"
                  v-for="item in requestList" :key="item.id">
                  <div class="row">
                    <div class="col-md-8">
                      <label class="custom-check mb-0">
                        {{item.orderno}}
                        <input
                          type="checkbox"
                          v-bind:value="item"
                          v-model="singleRequest"
                          @change="requestCheckall()"
                        />
                        <span class="checkmark"></span>
                      </label>
                      <div class="pl-20 pb-10">
                        <p class="fw-600 pl-20">{{item.equation}}</p>
                        <p class="fw-600 pl-20">{{item.cas}}</p>
                        <p class="small pl-20 text-black">{{item.purity}} Pure</p>
                        <p class="pl-20">
                          <span>Pack Size:</span>
                          {{item.packsize}}
                        </p>
                      </div>
                    </div>
                    <div class="col-5 col-md-2">
                      <div class="cart-qty">
                        <p class="d-block d-md-none d-lg-none">Qty</p>
                        <div class="quantity-select">
                          <b-form-input
                            :searchable="false"
                            v-model="item.qty"
                            size="sm"
                            type="number"
                            min="1"
                            max="99"
                          ></b-form-input>
                        </div>
                        <a
                          href="javascript:void(0)"
                          class="text-primary"
                          @click="removeItem(item, 'request')"
                        >Remove</a>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <p
                        class="pt-10"
                      >{{ item.description }}</p>
                    </div>
                  </div>
                  <div class="border-bottom w-100 pt-10 pb-10"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--selected order Summary  List -->
        <div class="col-md-4">
          <div class="cart-order-summary sticky-top">
            <app-summary></app-summary>
          </div>
        </div>
      </div>
    </div>
    <!-- empty cart -->
    <div v-else>
      <div>
        <app-empty></app-empty>
      </div>
    </div>
    <b-modal ref="my-modal" size="xl" class="p-0" centered hide-footer hide-header>
      <div class="d-block text-center results-order">
        <div class="card border-none m-0">
          <div class="row no-gutters">
            <div class="col-sm-3 col-md-2 col-lg-3">
              <div class="order-header text-left">
                <div class="order-test pb-15">
                  <b-badge pill variant="info" class="pl-s5 pr-s5">{{ requestItem.cas }}</b-badge>
                </div>
                <div class="order-test">
                  <h5>{{ requestItem.name }}</h5>
                  <p class="fw-500 pt-5s">{{ requestItem.equation }}</p>
                </div>
              </div>
            </div>
            <div class="col-sm-9 col-md-9 col-lg-9">
              <div class="card-body">
                <div class="row">
                  <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="order-select-list">
                      <div class="order-select">
                        <label>Pack Size</label>
                        <b-form-input
                          :searchable="false"
                          v-model="requestItem.packsize"
                          size="sm"
                        ></b-form-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="order-select-list">
                      <div class="order-select">
                        <label>Qty</label>
                        <b-form-input
                          :searchable="false"
                          v-model="requestItem.qty"
                          size="sm"
                          type="number"
                          min="1"
                          max="99"
                          :required="true"
                          :state="requestItem.qty > 99 || requestItem.qty < 1 ? false : true"
                        ></b-form-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="order-select-list">
                      <div class="order-select">
                        <label>Delivery Time</label>
                        <b-form-input
                          :searchable="false"
                          v-model="requestItem.delivery"
                          size="sm"
                        ></b-form-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="order-select-list">
                      <div class="order-select">
                        <label>Purity(%)</label>
                        <b-form-input
                          :searchable="false"
                          v-model="requestItem.purity"
                          size="sm"
                          type="number"
                          min="50"
                          max="100"
                          :required="true"
                          :state="requestItem.purity >= 50 && requestItem.purity <= 100 ? true : false"
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
                        v-model="requestItem.description"
                        :required="true"
                        :state="!requestItem.description ? false : true"
                      ></b-form-textarea>
                    </div>
                    <div class="text-right">
                      <button
                        class="btn btn-primary pl-10 pr-10"
                        @click="requestChange"
                        :class="{'disabled' : requestItem.qty > 99 || requestItem.qty < 1 || requestItem.purity < 50 || requestItem.purity > 100 || !requestItem.description}"
                      >Add request to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script src="./cart.js"></script>
<style src="./cart.scss" lang="scss" scoped />
