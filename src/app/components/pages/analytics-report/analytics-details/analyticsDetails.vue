<template>
    <div>
      <div class="container analytics-orders">
        <div class="row no-gutters">
            <div class="col-md-12 col-lg-8">
              <div class="text-left pt-20 pb-20 d-flex justify-content-between">
                <p class="text-black text-uppercase">
                  <a href="javascript:void(0)">
                    <router-link to="/analytics">
                      <span>
                        <em class="sls-icons sls-24 back-arrow"></em>
                      </span>
                    </router-link>
                  </a>
                  Customer ORDER DETAILS
                </p>
              </div>
            </div>
          </div>
        <div class="row pb-30">
          <div class="col-md-12">
            <div class="card">
              <b-table
                class="recent-orders analytics-list"
                striped
                hover
                :items="orders"
                :fields="fields"
              >
                <template v-slot:cell(name)="data">
                  <p>{{ data.value }}</p>
                </template>
                <template v-slot:cell(total)="row">
                  <div class="status-icons">
                    <p>
                      <span class="status-box bg-info"></span>
                      {{row.item.orders.length}}
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
                <template v-slot:cell(sls)="data">
                  <div class="status-icons">
                    <p>
                      <span class="status-box bg-primary"></span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script src="./analyticsDetails.js"></script>
<style src="./analyticsDetails.scss" lang="scss" scoped/>
