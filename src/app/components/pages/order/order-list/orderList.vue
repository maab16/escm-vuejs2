<template>
  <div>
    <div class="loader" v-if="isLoading">
      <spinner></spinner>
    </div>
    <div v-else>
      <div class="container">
        <div class="order-filter-header">
          <p class="small">Last updated March 8th,2020; 19:00</p>
          <div class="row">
            <div class="col-6 col-sm-6 col-md-3">
              <div v-on:click="orderFilterKey = 'all'">
                <div class="card border-left-light shadow-sm">
                  <div class="text-center">
                    <p class="fs-18 fw-500">{{orders.length}}</p>
                    <p>Total Orders</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-sm-6 col-md-3">
              <div v-on:click="orderFilterKey = 'success'">
                <div
                  class="card border-left-info shadow-sm"
                  :class="{ 'bg-info': orderFilterKey == 'success' }"
                >
                  <div class="text-center">
                      <p
                        class="fs-18 fw-500"
                        :class="{ 'text-light': orderFilterKey == 'success' }"
                      >{{ successfulOrders }}</p>
                    <p :class="{ 'text-light': orderFilterKey == 'success' }">Successful</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-sm-6 col-md-3">
              <div v-on:click="orderFilterKey = 'sls'">
                <div
                  class="card border-left-primary shadow-sm"
                  :class="{ 'bg-primary': orderFilterKey == 'sls' }"
                >
                  <div class="text-center">
                      <p
                        class="fs-18 fw-500"
                        :class="{ 'text-light': orderFilterKey == 'sls' }"
                      >{{ slsOrders }}</p>
                    <p :class="{ 'text-light': orderFilterKey == 'sls' }">Placed with SLS</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-sm-6 col-md-3">
              <div v-on:click="orderFilterKey = 'complete'">
                <div
                  class="card border-left-success shadow-sm"
                  :class="{ 'bg-success': orderFilterKey == 'complete' }"
                >
                  <div class="text-center">
                      <p
                        class="fs-18 fw-500"
                        :class="{ 'text-light': orderFilterKey == 'complete' }"
                      >{{ completedOrders }}</p>
                    <p :class="{ 'text-light': orderFilterKey == 'complete' }">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <b-form-group class="mb-0 order-search-filter">
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Search your orders"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <div class="filter-order d-flex justify-content-end pt-15 pb-15">
            <p class="small" @click="filterSearch()">
              <span class="pr-10">
                <img src="~@/assets/images/icons/filter.svg" alt="filter" />
              </span>Filter
            </p>
          </div>
          <div
            class="container shodow advance-filter filter-search"
            v-on-clickaway="sortfilter"
            v-if="filterSection"
          >
            <b-form @submit="onSubmit" @reset="onReset">
              <div class="row">
                <div v-if="isCustomerUser" class="col-md-6 col-lg-3">
                  <b-form-group id="input-group-2" label="Delivery Location :" label-for="input-2">
                    <b-form-select
                      :searchable="false"
                      v-model="address"
                      placeholder="Select Delivery Location"
                      :options="addresses"
                    >
                      <template #open-indicator="{ attributes }">
                        <span v-bind="attributes">
                          <em class="sls-icons sls-16 arrow"></em>
                        </span>
                      </template>
                    </b-form-select>
                  </b-form-group>
                </div>
                <div v-if="!isCustomer" class="col-md-6 col-lg-3">
                  <b-form-group id="input-group-3" label="Customer :" label-for="input-3">
                    <b-form-select
                      :searchable="false"
                      v-model="customer"
                      placeholder="Select Customer"
                      :options="customers"
                    >
                      <template #open-indicator="{ attributes }">
                        <span v-bind="attributes">
                          <em class="sls-icons sls-16 arrow"></em>
                        </span>
                      </template>
                    </b-form-select>
                  </b-form-group>
                </div>
                <div v-if="isSupplierManager || isAdmin || isBuyingLead || isInternalBuyer" class="col-md-6 col-lg-3">
                  <b-form-group id="input-group-4" label="Project Manager :" label-for="input-4">
                    <b-form-select
                      :searchable="false"
                      v-model="projectManager"
                      placeholder="Select Project Manager"
                      :options="projectManagers"
                    >
                      <template #open-indicator="{ attributes }">
                        <span v-bind="attributes">
                          <em class="sls-icons sls-16 arrow"></em>
                        </span>
                      </template>
                    </b-form-select>
                  </b-form-group>
                </div>
                <div v-if="isSupplierManager || isAdmin" class="col-md-6 col-lg-3">
                  <b-form-group id="input-group-5" label="Buying Lead :" label-for="input-5">
                    <b-form-select
                      :searchable="false"
                      v-model="buyingLead"
                      placeholder="Select Buying Lead"
                      :options="buyingLeads"
                    >
                      <template #open-indicator="{ attributes }">
                        <span v-bind="attributes">
                          <em class="sls-icons sls-16 arrow"></em>
                        </span>
                      </template>
                    </b-form-select>
                  </b-form-group>
                </div>
                <div v-if="isSupplierManager || isAdmin || isBuyingLead" class="col-md-6 col-lg-3">
                  <b-form-group id="input-group-6" label="Internal Buyer :" label-for="input-6">
                    <b-form-select
                      :searchable="false"
                      v-model="internalBuyer"
                      placeholder="Select Internal Buyer"
                      :options="internalBuyers"
                    >
                      <template #open-indicator="{ attributes }">
                        <span v-bind="attributes">
                          <em class="sls-icons sls-16 arrow"></em>
                        </span>
                      </template>
                    </b-form-select>
                  </b-form-group>
                </div>
                <div class="col-md-6 col-lg-3">
                  <div class="filter-datepicker">
                    <label class="date-label mb-0" for="datepicker-dateformat2">From</label>
                    <b-form-datepicker
                      id="datepicker-dateformat2"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                      locale="en"
                      v-model="from"
                      :max="to"
                      :hide-header="true"
                    ></b-form-datepicker>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <div class="filter-datepicker">
                    <label class="date-label mb-0" for="datepicker-dateformat2">To</label>
                    <b-form-datepicker
                      id="datepicker-dateformat3"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                      locale="en"
                      v-model="to"
                      :min="from"
                      :hide-header="true"
                    ></b-form-datepicker>
                  </div>
                </div>
                <div class="mt-2 ml-auto pr-15">
                  <b-button variant="link text-primary" type="reset">Clear All</b-button>
                  <button class="btn btn-primary" type="submit">Apply</button>
                </div>
              </div>
            </b-form>
          </div>
        </div>

        <div>
          <div class="loader" v-if="isSearchLoading">
            <spinner></spinner>
          </div>
          <div class="card p-0 order-filter-list mb-3" v-else>
            <div class="card-body p-0">
              <b-table
                class="recent-orders recent-updates"
                stacked="md"
                striped
                hover
                show-empty
                sort-icon-left
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filterIncludedFields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
                :items="ordersList"
                :fields="isCustomer ? customer_fields : fields"
              >
                <template v-slot:cell(order_number)="data">
                  <a class="d-none d-lg-block d-md-block d-xl-block fs-16" href="javascript:void(0)">
                    <router-link class="dropdown-item" :to="{name: 'order-detail', params: {id: data.item.id}}">{{ data.item.order_number }}</router-link>
                  </a>
                </template>
                <template v-slot:cell(user)="data">
                  <div v-if="data.value" class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value.fname + ' ' + data.value.lname }}</span>
                    <span class="tooltiptext">{{ data.value.fname + ' ' + data.value.lname }}</span>
                  </div>
                </template>
                <template v-slot:cell(manager)="data">
                  <div v-if="data.value" class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value.fname + ' ' + data.value.lname }}</span>
                    <span class="tooltiptext">{{ data.value.fname + ' ' + data.value.lname }}</span>
                  </div>
                </template>
                <template v-slot:cell(buying_lead)="data">
                  <div v-if="data.value" class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value.fname + ' ' + data.value.lname }}</span>
                    <span class="tooltiptext">{{ data.value.fname + ' ' + data.value.lname }}</span>
                  </div>
                </template>
                <template v-slot:cell(internal_buyer)="data">
                  <div v-if="data.value" class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value.fname + ' ' + data.value.lname }}</span>
                    <span class="tooltiptext">{{ data.value.fname + ' ' + data.value.lname }}</span>
                  </div>
                </template>
                <template v-slot:cell(address)="data">
                  <p class="d-none d-lg-block d-md-block d-xl-block">{{ data.value.line1 }}</p>
                </template>
                <template v-slot:cell(updated_at)="data">
                  <p class="d-none d-lg-block d-md-block d-xl-block">{{ format(data.value, 'MMM DD, YYYY') }}</p>
                </template>
                <template v-slot:cell(status)="data">
                  <div class="d-none d-lg-block d-md-block d-xl-block">
                    <div class="status-icons d-flex justify-content-between">
                      <div v-if="data.value === 'successful'" class="status-order">
                        <p>
                          <span class="status bg-info"></span>Successful
                        </p>
                      </div>
                      <div v-if="data.value==='completed'" class="status-order">
                        <p>
                          <span class="status bg-success"></span>
                          Completed
                        </p>
                      </div>
                      <div v-if="data.value==='sls'" class="status-order">
                        <p>
                          <span class="status bg-primary"></span>
                          Placed with SLS
                        </p>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-slot:cell(meta)="row">
                  <div class="">
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
                      <b-nav-item>
                        <router-link class="dropdown-item" :to="'/order/order-detail/' + row.item.id">View Details</router-link>
                      </b-nav-item>
                    </b-dropdown>
                  </div>
                </template>
              </b-table>
            </div>

            <div class="card-footer bg-g400 pt-s5 pb-s5">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <p class="pr-s5 d-none d-sm-block">Showing :</p>
                  <div class="quantity-select">
                    <v-select :searchable="false" v-model="perPage" :options="pageOptions" size="sm"></v-select>
                  </div>
                </div>

                <b-pagination
                  v-model="currentPage"
                  :total-rows="orderFilter.length"
                  :per-page="perPage"
                  size="sm"
                  class="my-0"
                ></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-if="orders.length < 1">
        <div class="no-orders align-items-center justify-content-around">
          <div class="text-center">
            <img src="~@/assets/images/noorders.svg" alt="noorders" style="width: 50%;max-width: 100%;display: block;margin: 0px auto;" />
          </div>
          <div class="text-center pt-30">
            <p class="fw-500 pb-15">You have no orders to display. Start placing orders now!</p>
            <router-link class="btn btn-primary" to="home">order now</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./orderList.js"></script>
<style src="./orderList.scss" lang="scss" scoped />
