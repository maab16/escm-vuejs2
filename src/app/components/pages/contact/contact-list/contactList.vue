<template>
  <div>
    <div class="loader" v-if="isLoading">
      <spinner></spinner>
    </div>
    <div v-else>
      <div class="container" v-if="contactList.length > 0">
        <p class="mt-3 mb-3">Total Contacts</p>
        <div>
          <div class="card p-0 order-filter-list mb-3">
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
                :items="contactList"
                :fields="fields"
              >
                <template v-slot:cell(id)="data">
                  <a class="d-none d-lg-block d-md-block d-xl-block fs-16" href="javascript:void(0)">
                    <router-link class="dropdown-item" :to="{name: 'contact-detail', params: {id: data.value}}">{{ data.value }}</router-link>
                  </a>
                </template>
                <template v-slot:cell(name)="data">
                  <div v-if="data.value" class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value }}</span>
                    <span class="tooltiptext">{{ data.value }}</span>
                  </div>
                </template>
                <template v-slot:cell(email)="data">
                  <div v-if="data.value" class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value}}</span>
                    <span class="tooltiptext">{{ data.value}}</span>
                  </div>
                </template>
                <template v-slot:cell(company)="data">
                  <div v-if="data.value" class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value }}</span>
                    <span class="tooltiptext">{{ data.value}}</span>
                  </div>
                </template>
                <template v-slot:cell(phone)="data">
                  <div v-if="data.value" class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                    <span class="tolltip-data">{{ data.value }}</span>
                    <span class="tooltiptext">{{ data.value }}</span>
                  </div>
                </template>
                <template v-slot:cell(message)="data">
                  <p class="d-none d-lg-block d-md-block d-xl-block">{{ data.value }}</p>
                </template>
                <template v-slot:cell(created_at)="data">
                  <p class="d-none d-lg-block d-md-block d-xl-block">{{ format(data.value, 'MMM DD, YYYY') }}</p>
                </template>
                <template v-slot:cell(updated_at)="data">
                  <p class="d-none d-lg-block d-md-block d-xl-block">{{ format(data.value, 'MMM DD, YYYY') }}</p>
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
                  :total-rows="contactList.length"
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
<script src="./contactList.js"></script>
<style src="./contactList.scss" lang="scss" scoped />
