<template>
  <div>
    <div v-show="items.availability !== 0">
      <!-- List Result header -->
      <div class="d-flex shodow-sm justify-content-between filter-sort">
        <div class="small">Showing {{items.length}} results
          <p class="small">Last updated {{ format(getLastSearch, 'MMMM Do, YYYY H:mm') }}
            <a
              href="javascript:void(0)"
              class="pl-10 pt-s5"
              @click="refreshItems()">
              <img src="~@/assets/images/icons/refresh.svg" alt="refresh" />
            </a>
          </p>
        </div>
        <div class="sort-filter d-flex align-items-center">
          <div class="pr-20 d-flex align-items-center">
            <span class="small pr-10">Sort By :</span>
           <v-select
            :searchable="false"
            v-model="filterOrders"
            :options="filterList"></v-select>
            <v-select
              :searchable="false"
              v-model="filterDirection"
              :options="directionList"></v-select>
          </div>
          <div class="filter-order">
            <p class="small" @click="filterSearch()">
              <span class="pr-10">
                <img src="~@/assets/images/icons/filter.svg" alt="filter" />
              </span>Filter
            </p>
          </div>
        </div>
      </div>
      <div
        class="container shodow-sm advance-filter filter-search"
        v-on-clickaway="sortfilter"
        v-if="filterSection"
      >
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <b-form-group id="input-group-3" label="Supplier :" label-for="input-3">
             <v-select
              :searchable="false"
              v-model="advancedOption.supplier"
              placeholder="Select Supplier"
              :options="options.suppliers"
              @input="updateFilterOption">
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                    <em class="sls-icons sls-16 arrow"></em>
                  </span>
                </template>
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-6 col-lg-3">
            <b-form-group id="input-group-4" label="Warehouse Location :" label-for="input-4">
             <v-select
              :searchable="false"
              v-model="advancedOption.warehouse"
              placeholder="Select Location"
              :options="options.warehouses"
              @input="updateFilterOption">
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                    <em class="sls-icons sls-16 arrow"></em>
                  </span>
                </template>
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-6 col-lg-3">
            <b-form-group id="input-group-5" label="Pack Size :" label-for="input-5">
             <v-select
              :searchable="false"
              v-model="advancedOption.packsize"
              placeholder="Select Pack"
              :options="options.packsizes"
              @input="updateFilterOption">
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                    <em class="sls-icons sls-16 arrow"></em>
                  </span>
                </template>
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-6 col-lg-3">
            <b-form-group id="input-group-6" label="Select Quantity :" label-for="input-6">
             <v-select
              :searchable="false"
              v-model="advancedOption.qty"
              placeholder="Select Quantity"
              :options="options.quantities"
              @input="updateFilterOption">
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                    <em class="sls-icons sls-16 arrow"></em>
                  </span>
                </template>
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-6 col-lg-3">
            <b-form-group id="input-group-7" label="Select Purity(%)" label-for="input-7">
             <v-select
              :searchable="false"
              v-model="advancedOption.purity"
              placeholder="Select Purity"
              :options="options.purities"
              @input="updateFilterOption">
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                    <em class="sls-icons sls-16 arrow"></em>
                  </span>
                </template>
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-6 col-lg-3">
            <b-form-group id="input-group-8" label="Expected Delivery Date" label-for="input-8">
             <v-select :searchable="false"
                v-model="advancedOption.delivery"
                placeholder="Select Delivery Date"
                :options="options.deliveries"
                @input="updateFilterOption">
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                    <em class="sls-icons sls-16 arrow"></em>
                  </span>
                </template>
              </v-select>
            </b-form-group>
          </div>
          <div class="ml-auto pr-15">
            <b-button variant="link text-primary" type="reset" @click="onReset($event)">Clear All</b-button>
            <button class="btn btn-primary" type="submit" @click="filterAdvancedSearch">Apply</button>
          </div>
        </div>
      </div>
    </div>
    <!-- add cart Alert -->
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="light"
      class="border shodow add-cart-alert"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>Added to Cart</p>
    </b-alert>
    <!-- list Result cards list -->
    <h2>Products</h2>
    <div v-for="(item, i) in items" :key="i">
      <div v-if="item.availability !== 0">
        <div class="results-order">
          <div class="card shadow">
            <div class="row no-gutters">
              <div class="col-sm-4 col-md-3 col-lg-3">
                <div class="order-header">
                  <div class="order-test">
                    <h5>{{item.cas}}</h5>
                    <p class="fw-500">{{item.name}}</p>
                  </div>
                  <div class="order-test">
                    <p class="fw-600">{{item.equation}}</p>
                    <p>{{item.purity}} Pure</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-8 col-md-9 col-lg-9">
                <div class="card-body">
                  <div class="row no-gutters">
                    <div class="col-sm-6 col-md-3">
                      <div class="order-list">
                        <div class="order-test">
                          <p>Supplier</p>
                          <p>{{item.supplier}}</p>
                        </div>
                        <div class="order-test">
                          <p>Warehouse Location</p>
                          <p>{{item.warehouse}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                      <div class="order-list">
                        <div class="order-test">
                          <p>Catalogue No.</p>
                          <p>{{item.catalogue}}</p>
                        </div>
                        <div class="order-test">
                          <p>Pack Size</p>
                          <p>{{item.packsize}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                      <div class="order-list">
                        <div class="order-test">
                          <p>Delivery Time</p>
                          <p>{{item.delivery}}</p>
                        </div>
                        <div class="order-test">
                          <p>Availability</p>
                          <p>{{item.availability}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                      <div class="select-quantity">
                        <div class="quantity-select">
                          <p class="ordersecondary">QTY :</p>
                         <v-select :searchable="false" v-model="item.qty" :options="getQuantities(item)"></v-select>
                        </div>
                        <div>
                          <p class="fw-500 text-black">${{item.usd}}</p>
                          <p class="ordersecondary pb-s5 fs-12">In INR: {{item.inr}}</p>
                        </div>
                      </div>
                      <div class="cart-button" v-if="can('cart.create')">
                        <button v-if="!item.isCart" class="btn btn-primary" @click="addToCart(item)">Add to cart</button>
                        <button v-if="item.isCart" class="btn btn-primary" @click="removeFromCart(item)">Remove from Cart</button>
                        <button v-if="item.isCart" class="btn btn-primary" @click="viewCart()">View cart</button>
                      </div>
                    </div>
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
<script src="./listResult.js"></script>
<style src="./listResult.scss" lang="scss"/>
