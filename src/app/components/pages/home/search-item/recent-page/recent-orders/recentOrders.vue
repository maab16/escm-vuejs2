<template>
  <div>
    <div class="loader" v-if="isLoading">
      <spinner></spinner>
    </div>
    <div v-else>
      <div class v-if="orders.length > 0">
        <div class="row">
          <div class="col-md-8 col-lg-9">
            <div class="card p-0 order-filter-list">
              <div class="card-body p-0">
                <b-table
                  class="recent-orders recent-updates"
                  stacked="md"
                  hover
                  show-empty
                  :items="orders"
                  :fields="isCustomer ? customer_fields : internal_fields"
                >
                  <template v-slot:cell(order_number)="data">
                    <a class="d-none d-lg-block d-md-block d-xl-block" href="javascript:void(0)">
                      <router-link :to="'/order/order-detail/' + data.item.id">{{ data.item.order_number }}</router-link>
                    </a>
                  </template>
                  <template v-slot:cell(address)="data">
                    <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value.line1 }}</span>
                      <span class="tooltiptext">{{ data.value.line1 }}</span>
                    </div>
                  </template>
                  <template v-slot:cell(user)="data">
                    <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value.fname }} {{ data.value.lname }}</span>
                      <span class="tooltiptext">{{ data.value.fname }} {{ data.value.lname }}</span>
                    </div>
                  </template>
                  <template v-slot:cell(manager)="data">
                    <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value.fname }} {{ data.value.lname }}</span>
                      <span class="tooltiptext">{{ data.value.fname }} {{ data.value.lname }}</span>
                    </div>
                  </template>
                  <template v-slot:cell(created_at)="data">
                    <p class="d-none d-lg-block d-md-block d-xl-block">{{ format(data.value, 'MMM DD, YY') }}</p>
                  </template>
                  <template v-slot:cell(status)="data">
                    <div class="d-none d-lg-block d-md-block d-xl-block">
                      <div class="status-icons d-flex justify-content-between">
                        <div v-if="data.value === 'successful'" class="status-order">
                          <P>
                            <span class="status bg-info"></span>Successful
                          </P>
                        </div>
                        <div v-if="data.value==='completed'" class="status-order">
                          <P>
                            <span class="status bg-success"></span>
                            Completed
                          </P>
                        </div>
                        <div v-if="data.value==='sls'" class="status-order">
                          <P>
                            <span class="status bg-primary"></span>
                            Placed with SLS
                          </P>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-slot:cell(actions)="row">
                    <b-card class="d-block d-md-none d-lg-none">
                      <div v-for="(list, key) in row" :key="key">
                        <div class="d-flex align-items-center justify-content-between">
                          <a>{{list.orderNo}}</a>
                          <div class="status-mobile">
                            <p v-if="list.status== 'successful'" class="completed">Successful</p>
                            <p v-if="list.status== 'completed'" class="portical">Completed</p>
                            <p v-if="list.status== 'sls'" class="sls">Placed with SLS</p>
                          </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                          <p>{{list.Customers}}</p>
                          <p>{{list.date}}</p>
                        </div>
                      </div>
                    </b-card>
                  </template>
                </b-table>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-lg-3">
            <div class>
              <pie-chart :data="chartData" :options="chartOptions" :fields="isCustomer ? customer_fields : internal_fields"></pie-chart>
              <h5 class="text-center pt-10">Order Distribution</h5>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="no-orders d-flex align-items-center justify-content-around">
          <div>
            <img src="~@/assets/images/noorders.svg" alt="noorders" />
          </div>
          <div class="text-center">
            <p class="fw-500 pb-15">You have no orders to display. Start placing orders now!</p>
            <button class="btn btn-primary" @click="goToSearch()">order now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./recentOrders.js"></script>
<style src="./recentOrders.scss" lang="scss" scoped />
