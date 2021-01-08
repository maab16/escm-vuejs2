<template>
  <div>
    <div class="advance-filter">
      <b-form @submit.prevent="advancedSearch(advancedOption, tags)" @reset="onReset">
        <div class="row">
          <div class="col-md-6">
            <b-form-group id="input-group-3" label="Supplier:" label-for="input-3">
             <v-select
              :searchable="false"
              v-model="advancedOption.supplier"
              placeholder="Select Supplier"
              :options="options.suppliers">
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                    <em class="sls-icons sls-16 arrow"></em>
                  </span>
                </template>
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group id="input-group-4" label="Warehouse location:" label-for="input-4">
             <v-select
              :searchable="false"
              v-model="advancedOption.warehouse"
              placeholder="Select warehouse"
              :options="options.warehouses">
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                    <em class="sls-icons sls-16 arrow"></em>
                  </span>
                </template>
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group id="input-group-5" label="Pack Size:" label-for="input-5">
             <v-select
              :searchable="false"
              v-model="advancedOption.packsize"
              placeholder="Select Pack"
              :options="options.packsizes">
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                    <em class="sls-icons sls-16 arrow"></em>
                  </span>
                </template>
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group id="input-group-6" label="Select Quantity:" label-for="input-6">
             <v-select
              :searchable="false"
              v-model="advancedOption.qty"
              placeholder="Select Quantity"
              :options="options.quantities">
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes"><em class="sls-icons sls-16 arrow"></em></span>
                </template>
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group id="input-group-7" label="Select Purity(%):" label-for="input-7">
             <v-select
              :searchable="false"
              v-model="advancedOption.purity"
              placeholder="Select Purity"
              :options="options.purities">
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes"><em class="sls-icons sls-16 arrow"></em></span>
                </template>
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group id="input-group-8" label="Expected Delivery Date:" label-for="input-8">
             <v-select :searchable="false"
                v-model="advancedOption.delivery"
                placeholder="Select Delivery Date"
                :options="options.deliveries">
              <template #open-indicator="{ attributes }">
                  <span v-bind="attributes"><em class="sls-icons sls-16 arrow"></em></span>
                </template>
              </v-select>
            </b-form-group>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <b-button variant="link text-primary fs-14" type="reset">Clear All</b-button>
          <button class="btn btn-primary fs-14" type="submit">Search</button>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script src="./searchFilter.js"></script>
