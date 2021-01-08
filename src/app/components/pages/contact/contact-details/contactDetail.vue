<template>
  <div v-if="contact">
    <div class="container">
      <div class="card order-details-list">
        <div class="card-body">
          <div class="mobile-border">
            <p class="small text-order text-uppercase pb-15">Contact Detail</p>
            <div class="row no-gutters">
              <div class="col-12 col-sm-6 col-md-4">
                <p class="small text-black">
                  <span class="text-order">Name: </span>
                  <span>{{ contact.name }}</span>
                </p>
                <p class="small text-order2"></p>
              </div>
              <div class="col-6 col-sm-6 col-md-4">
                <p class="small text-black">
                  <span class="text-order">Email: </span>
                  <span>{{ contact.email }}</span>
                </p>
                <p class="small pb-10"></p>
              </div>
              <div class="col-6 col-sm-6 col-md-4">
                <p class="small text-black">
                  <span class="text-order">Company: </span>
                  <span>{{ contact.company }}</span>
                </p>
                <p class="small pb-10"></p>
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <p class="small text-black">
                  <span class="text-order">Phone: </span>
                  <span>{{ contact.phone }}</span>
                </p>
                <p class="small text-order2"></p>
              </div>
              <div class="col-6 col-sm-6 col-md-4">
                <p class="small text-black">
                  <span class="text-order">Message: </span>
                  <span>{{ contact.message }}</span>
                </p>
                <p class="small pb-10"></p>
              </div>
              <div class="col-6 col-sm-6 col-md-4">
                <p class="small text-black">
                  <span class="text-order">Updated At: </span>
                  <span>{{ contact.updated_at }}</span>
                </p>
                <p class="small pb-10"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./contactDetail.js"></script>
<style src="./contactDetail.scss" lang="scss" scoped />
