<template>
  <div class="loader" v-if="isLoading">
    <spinner></spinner>
  </div>
  <div v-else>
    <div class="container">
      <div class="order-filter-header">
        <p class="small mb-2">Last updated March 8th,2020; 19:00</p>
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
        <div class="d-flex align-items-center justify-content-end">
          <p class="pr-15 text-order fw-500">Export</p>
          <div class="filter-order d-flex justify-content-end pt-15 pb-15 pl-15">
            <p class="small" @click="filterSearch()">
              <span class="pr-10">
                <img src="~@/assets/images/icons/filter.svg" alt="filter" />
              </span>Filter
            </p>
          </div>
        </div>
        <div
          class="container shodow-sm advance-filter filter-search"
          v-on-clickaway="sortfilter"
          v-if="filterSection"
        >
          <b-form @submit="onSubmit" @reset="onReset">
            <div class="row">
              <div class="col-md-6 col-lg-3" v-if="!isCustomer">
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
              <div class="col-md-6 col-lg-3" v-if="!isManager && !isCustomer">
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
              <div class="col-md-6 col-lg-3" v-if="!isBuyingLead && !isCustomer">
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
              <div class="col-md-6 col-lg-3" v-if="isSupplierManager || isAdmin || isBuyingLead">
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
        <div class="card p-0 order-filter-list" v-else>
          <div class="card-body p-0">
            <b-table
              class="recent-orders recent-updates"
              stacked="md"
              striped
              hover
              sort-icon-left
              show-empty
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              :filterIncludedFields="filterOn"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              @filtered="onFiltered"
              :items="orders"
              :fields="fields"
            >
              <template v-slot:cell(cas)="data">
                <p class="d-none d-lg-block d-md-block d-xl-block">{{ data.value }}</p>
              </template>
              <template v-slot:cell(description)="data">
                <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                  <span class="tolltip-data">{{ data.value }}</span>
                  <span class="tooltiptext">{{ data.value }}</span>
                </div>
              </template>
              <template v-slot:cell(qty)="data">
                <p class="d-none d-lg-block d-md-block d-xl-block">{{ data.value }}</p>
              </template>
              <template v-slot:cell(customer)="row">
                <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                  <span class="tolltip-data">{{ row.item.user.organization.name }}</span>
                  <span class="tooltiptext">{{ row.item.user.organization.name }}</span>
                </div>
              </template>
              <template v-slot:cell(user)="data">
                <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                  <span class="tolltip-data">{{ data.value.fname }} {{ data.value.lname }}</span>
                  <span class="tooltiptext">{{ data.value.fname }} {{ data.value.lname }}</span>
                </div>
              </template>
              <template v-slot:cell(buying_lead)="row">
                <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                  <span class="tolltip-data" v-if="row.item.order.buying_lead">{{ row.item.order.buying_lead.fname }} {{ row.item.order.buying_lead.lname }}</span>
                  <span class="tooltiptext" v-if="row.item.order.buying_lead">{{ row.item.order.buying_lead.fname }} {{ row.item.order.buying_lead.lname }}</span>
                </div>
              </template>
              <template v-slot:cell(manager)="row">
                <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                  <span class="tolltip-data" v-if="row.item.order.manager">{{ row.item.order.manager.fname }} {{ row.item.order.manager.lname }}</span>
                  <span class="tooltiptext" v-if="row.item.order.manager">{{ row.item.order.manager.fname }} {{ row.item.order.manager.lname }}</span>
                </div>
              </template>
              <template v-slot:cell(internal_buyer)="row">
                <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                  <span class="tolltip-data" v-if="row.item.order.internal_buyer">{{ row.item.order.internal_buyer.fname }} {{ row.item.order.internal_buyer.lname }}</span>
                  <span class="tooltiptext" v-if="row.item.order.internal_buyer">{{ row.item.order.internal_buyer.fname }} {{ row.item.order.internal_buyer.lname }}</span>
                </div>
              </template>
              <template v-slot:cell(order_id)="data">
                <router-link class="d-none d-lg-block d-md-block d-xl-block" :to="'/order/order-detail/' + data.value">{{ data.value }}</router-link>
              </template>
              <template v-slot:cell(created_at)="row">
                <div class="d-none d-lg-block d-md-block d-xl-block">
                  <div class="status-icons d-flex justify-content-between">
                    <p>{{ format(row.item.created_at, 'MMM DD, YY') }}</p>
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
                        <b-nav-item>
                          <router-link class="dropdown-item" :to="'/order/order-detail/' + row.item.order.id">View Details</router-link>
                        </b-nav-item>
                      </b-dropdown>
                    </div>
                  </div>
                </div>
              </template>
            </b-table>
          </div>

          <div class="card-footer bg-g400 pt-s5 pb-s5">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <p class="pr-s5">Showing :</p>
                <div class="quantity-select">
                  <v-select :searchable="false" v-model="perPage" :options="pageOptions" size="sm"></v-select>
                </div>
              </div>

              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
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
</template>
<script src="./requestProduct.js"></script>
<style src="./requestProduct.scss" lang="scss" scoped />
