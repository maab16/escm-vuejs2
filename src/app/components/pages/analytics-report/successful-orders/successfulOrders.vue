<template>
  <div>
    <div class="container analytics-orders">
      <div class="row no-gutters">
        <div class="col-md-6 col-lg-6">
          <div class="text-left pt-20 pb-20">
            <p class="text-black text-uppercase">
              <a href="javascript:void(0)">
                <router-link to="/analytics">
                  <span>
                    <em class="sls-icons sls-24 back-arrow"></em>
                  </span>
                </router-link>
              </a>
              Successful Orders
            </p>
          </div>
        </div>
        <div class="col-md-6 col-lg-6">
          <div class="pt-10">
            <div class="d-flex align-items-center justify-content-end">
              <a href="#" class="pr-15 text-order fw-500">Export</a>
              <div class="filter-order d-flex justify-content-end pt-15 pb-15 pl-15">
                <p class="small" @click="filterSearch()">
                  <span class="pr-10">
                    <img src="~@/assets/images/icons/filter.svg" alt="filter" />
                  </span>Filter
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="container shodow-sm advance-filter filter-search"
          v-on-clickaway="sortfilter"
          v-if="filterSection"
        >
          <b-form @submit="onSubmit" @reset="onReset">
            <div class="row">
              <div class="col-md-6 col-lg-3">
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
              <div class="col-md-6 col-lg-3">
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
              <div class="col-md-6 col-lg-3" v-if="!isBuyingLead">
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
              <div class="col-md-6 col-lg-3">
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
      <div class="row pb-30">
        <div class="col-md-12">
          <div class="loader" v-if="isLoading">
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
                <template v-slot:cell(id)="data">
                  <a
                    class="d-none d-lg-block d-md-block d-xl-block"
                    :href="'/order/order-detail/' + data.value"
                  >{{ data.value }}</a>
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
                <template v-slot:cell(buying_lead)="data">
                  <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value.fname }} {{ data.value.lname }}</span>
                    <span class="tooltiptext">{{ data.value.fname }} {{ data.value.lname }}</span>
                  </div>
                </template>
                <template v-slot:cell(internal_buyer)="data">
                  <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value.fname }} {{ data.value.lname }}</span>
                    <span class="tooltiptext">{{ data.value.fname }} {{ data.value.lname }}</span>
                  </div>
                </template>
                <template v-slot:cell(address)="data">
                  <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value.line1 }}</span>
                    <span class="tooltiptext">{{ data.value.line1 }}</span>
                  </div>
                </template>
                <template v-slot:cell(created_at)="data">
                  <p class="d-none d-lg-block d-md-block d-xl-block">{{ format(data.value, 'MMM DD, YYYY') }}</p>
                </template>
                <template v-slot:cell(status)="row">
                  <div class="d-none d-lg-block d-md-block d-xl-block">
                    <div class="status-order d-flex justify-content-between">
                      <p> <span class="status bg-info"></span> {{row.item.status}}</p>
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
                            <router-link
                              class="dropdown-item"
                              :to="'/order/order-detail/' + row.item.id"
                            >View Details</router-link>
                          </b-nav-item>
                        </b-dropdown>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-slot:cell(actions)="row">
                  <b-card class="d-block d-md-none d-lg-none">
                    <router-link to="/order/order-detail/1000123456716">
                      <div v-for="(list, key) in row" :key="key">
                        <div class="d-flex align-items-center justify-content-between">
                          <div class>
                            <a
                              class="pb-10"
                              :href="'/order/order-detail/1000123456716'"
                            >{{ list.orderNo }}</a>
                            <p class="fw-500">{{list.Customers}}</p>
                          </div>
                          <div class="status-mobile">
                            <p v-if="list.status" class="completed bg-info"> Successful</p>
                            <p v-if="list.status == false" class="portical">P completed</p>
                          </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                          <p>{{list.Delivery}}</p>
                          <p>{{list.date}}</p>
                        </div>
                      </div>
                    </router-link>
                  </b-card>
                </template>
              </b-table>
            </div>

            <div class="card-footer bg-g400 pt-s5 pb-s5">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <p class="pr-s5">Showing :</p>
                  <div class="quantity-select">
                    <b-form-select
                      :searchable="false"
                      v-model="perPage"
                      :options="pageOptions"
                      size="sm"
                    ></b-form-select>
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
    </div>
  </div>
</template>
<script src="./successfulOrders.js"></script>
<style src="./successfulOrders.scss" lang="scss" scoped/>
