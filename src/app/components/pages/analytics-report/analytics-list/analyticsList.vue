<template>
  <div>
    <!-- <div class="loader" v-if="isLoading">
      <spinner></spinner>
    </div> -->
    <!-- <div v-else> -->
      <div class="container">
        <div class="analytics-reports">
          <div class="row">
            <div class="col-6 col-sm-6 col-md-6 col-lg-3">
              <router-link to="/analytics/successful-orders">
              <div class="card border-left-info shodow">
                <div class="text-center">
                  <h3 class="fw-500">{{ successfulOrders.length }}</h3>
                  <p>Successful</p>
                </div>
              </div>
              </router-link>
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-lg-3">
              <router-link to="/analytics/placed-sls-orders">
              <div class="card border-left-primary shodow-sm">
                <div class="text-center">
                  <h3 class="fw-500">{{ slsOrders.length }}</h3>
                  <p>Placed With SLS</p>
                </div>
              </div>
              </router-link>
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-lg-3">
              <router-link to="/analytics/completed-orders">
              <div class="card border-left-success shodow-sm">
                <div class="text-center">
                  <h3 class="fw-500">{{ completedOrders.length }}</h3>
                  <p>Completed</p>
                </div>
              </div>
              </router-link>
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-lg-3">
              <router-link to="/analytics/unavailable-products">
              <div class="card border-left-brown shodow-sm">
                <div class="text-center">
                  <h3 class="fw-500">{{ pendingOrders.length }}</h3>
                  <p>Products Pending For Purchase</p>
                </div>
              </div>
              </router-link>
            </div>
          </div>
        </div>
        
        <div class="analytics-orders">
          <p class="text-order text-uppercase pb-10">orders</p>
          <div class="row">
            <div class="col-md-8">
              <div class="loader" v-if="isCustomerOrder">
                <spinner></spinner>
              </div>
              <div v-else class="card">
                <b-table
                  class="recent-orders analytics-list"
                  striped
                  hover
                  :per-page="perPage"
                  :items="customerOrders"
                  :fields="fields"
                >
                  <template v-slot:cell(name)="data">
                    <p>{{ data.value }}</p>
                  </template>
                  <template v-slot:cell(total)="row">
                    <p>{{ row.item.orders.length }}</p>
                  </template>
                  <template v-slot:cell(successful)="data">
                    <div class="status-icons">
                      <p>
                        <span class="status-box bg-info"></span>
                        {{data.value.length}}
                      </p>
                    </div>
                  </template>
                  <template v-slot:cell(sls)="data">
                    <div class="status-icons">
                      <p>
                        <span class="status-box bg-primary"></span>
                        {{data.value.length}}
                      </p>
                    </div>
                  </template>
                  <template v-slot:cell(completed)="data">
                    <div class="status-icons">
                      <p>
                        <span class="status-box bg-success"></span>
                        {{data.value.length}}
                      </p>
                    </div>
                  </template>
                  <template v-slot:cell(pending)="data">
                    <div class>
                      <div class="status-icons d-flex justify-content-between">
                        <P>
                          <span class="status-box bg-brown"></span>
                          {{data.value.length}}
                        </P>
                        <div class="text-right">
                          <b-dropdown
                            size="sm"
                            dropleft
                            text="Drop-Left"
                            variant="link"
                            toggle-class="text-decoration-none"
                            no-caret
                            class="p-0"
                          >
                            <template v-slot:button-content class="p-0">
                              <em class="sls-icons sls-24 order-details"></em>
                            </template>
                            <b-dropdown-item class="p-0">View Details</b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </div>
                  </template>
                </b-table>
                <div class="card-footer bg-g300 p-10 text-right">
                  <a href="javascript:void(0)" @click="viewmore()" class="text-primary">View more</a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="loader" v-if="isPopularProducts">
                <spinner></spinner>
              </div>
              <div v-else class="card popular-products">
                <div class="card-header">
                  <p class="small text-order">
                    POPULAR PRODUCTS
                    <span
                      class="frequently small"
                      v-b-tooltip.hover.right="'Frequently and mostly ordered products'"
                    >I</span>
                  </p>
                </div>
                <div class="card-body">
                  <ul class="list-group">
                    <li class="list-group-item" v-for="product in popularProducts" :key="product.id">
                      <p class="text-order fw-500">{{product.cas}} ( orders: {{product.orders.length}} )</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <p>{{product.name}}</p>
                        <p>{{product.equation}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="order-chart pt-20">
          <div class="row">
            <div class="col-md-8">
              <div class="loader" v-if="isCompanyDistributionData">
                <spinner></spinner>
              </div>
              <div v-else class="card">
                <div class="card-header">
                  <div class="row">
                    <div class="col-md-6">
                      <p class="text-order">Orders Vs Time</p>
                    </div>
                    <div class="col-md-6">
                      <b-form-select
                        :searchable="false"
                        v-model="ordersTime"
                        placeholder="Select Customer"
                        class="assign-lead"
                        :options="ordersTimes"
                        style="flex: 1"
                      >
                        <template #open-indicator="{ attributes }">
                          <span v-bind="attributes">
                            <em class="sls-icons sls-16 arrow"></em>
                          </span>
                        </template>
                      </b-form-select>
                    </div>
                  </div>
                </div>
                <div class="card-body bar-chart">
                  <BarChart></BarChart>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-header">
                  <p class="text-order">Companies distribution</p>
                </div>
                <div class="card-body">
                  <pie-chart v-if="chartData.labels" :data="chartData"></pie-chart>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-20">
          <div class="row">
            <div class="col-md-8">
              <div class="loader" v-if="isUnavailableProducts">
                <spinner></spinner>
              </div>
              <div v-else class="card">
                <div class="card-header">
                  <p class="text-order">Unavailable Products</p>
                  <p class="small text-order2">Popular products that go outofstock frequently.</p>
                </div>
                <div class="card-body line-chart">
                  <BarChart2></BarChart2>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="loader" v-if="isUnavailableProducts">
                <spinner></spinner>
              </div>
              <div v-else class="card popular-products">
                <div class="card-header">
                  <p class="small text-order">List of products not available currently</p>
                </div>
                <div class="card-body">
                  <ul class="list-group">
                    <li class="list-group-item" v-for="product in getUnavailableProducts" :key="product.id">
                      <p class="text-order fw-500">{{product.cas}}</p>
                      <div class="d-flex justify-content-between align-items-center">
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="order-chart pt-20">
          <div class="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header">
                  <p class="text-order">Buyers Vs Orders</p>
                </div>
                <div class="card-body bar-chart">
                  <BarChart3></BarChart3>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="loader" v-if="isCompanyDataByBuyer">
                <spinner></spinner>
              </div>
              <div v-else class="card popular-products">
                <div class="card-header">
                  <p class="small text-order">List of companies for which the buyer placed orders</p>
                </div>
                <div class="card-body">
                  <ul class="list-group">
                    <li class="list-group-item" v-for="company in getBuyerCompanyData" :key="company.id">
                      <div class="d-flex justify-content-between align-items-center">
                        <p>{{company.name}}</p>
                        <p>{{company.total}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>
<script src="./analyticsList.js"></script>
<style src="./analyticsList.scss" lang="scss" scoped/>
