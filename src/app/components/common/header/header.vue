<template>
  <div class="header">
    <div>
      <b-navbar toggleable="md" type="dark" variant="info">
        <!--navigation Logo  -->
        <b-navbar-brand href="javascript:void(0)">
          <div class="logo">
            <router-link to="/home">
              <img src="~@/assets/images/whitelogo.svg" alt="nav_logo" />
            </router-link>
          </div>
        </b-navbar-brand>
        <b-collapse is-nav>
          <b-navbar-nav>
            <b-nav-item to="/home">
              Home
              <span class="active-border"></span>
            </b-nav-item>
            <b-nav-item to="/order">
              Orders
              <span class="active-border"></span>
            </b-nav-item>
            <b-nav-item to="/request-product" v-if="can('request.list')">
              Requested Products
              <span class="active-border"></span>
            </b-nav-item>
            <b-nav-item v-if="can('analytics.list')" to="/analytics">
              Analytics & Reports
              <span class="active-border"></span>
            </b-nav-item>
          </b-navbar-nav>
          <div class="ml-auto">
            <b-navbar-nav class="nav-list">
              <span class="d-none d-md-flex d-lg-flex">
                <b-nav-item>
                  <router-link href="javascript:void(0)" to="/home/updates">
                    <em class="sls-icons sls-24 notifications"></em>
                  </router-link>
                </b-nav-item>
                <b-nav-item>
                  <router-link to="/cart">
                    <em class="sls-icons sls-24 cart"></em>
                    <em>{{ totalCart }}</em>
                  </router-link>
                </b-nav-item>
              </span>
              <b-nav-item-dropdown right class="profile-dropdown">
                <!-- Using 'button-content' slot -->
                <template v-if="user" v-slot:button-content>{{ user.fname }} {{ user.lname }}</template>
                <b-dropdown-item to="/contact">Contact us</b-dropdown-item>
                <b-dropdown-item to="/faq">FAQ's</b-dropdown-item>
                <b-dropdown-item @click.prevent="logout()">Logout</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item-dropdown right class="drop-rupee">
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>{{ currency.toUpperCase() }}</template>
                <b-dropdown-item :active="currency.toLowerCase() === 'inr'" @click="changeCurrency('inr')">INR</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item :active="currency.toLowerCase() === 'usd'" @click="changeCurrency('usd')">
                  <p>USD</p>
                  <p>1 USD = 75.71INR</p>
                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item :active="currency.toLowerCase() === 'eur'" @click="changeCurrency('eur')">
                  <p>EUR</p>
                  <p>1EUR = 82.81INR</p>
                </b-dropdown-item>
                <b-nav-item role="presentation" class="bg-g300 rounded-bottom">
                  <a
                    role="menuitem"
                    rel="noopener noreferrer"
                    href="https://economictimes.indiatimes.com/"
                    target="_blank"
                    class="dropdown-item"
                  >
                    Source:
                    <span class="text-blue">economictimes</span>
                  </a>
                </b-nav-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </div>
        </b-collapse>
        <!-- mobile navigation header -->
        <div class="ml-auto align-items-center header-mobile">
          <router-link href="javascript:void(0)" to="/home/updates">
            <em class="sls-icons sls-24 notifications"></em>
          </router-link>
          <router-link href="javascript:void(0)" class="pl-15" to="/cart">
            <em class="sls-icons sls-24 cart"></em>
            <em>{{ totalCart }}</em>
          </router-link>
          <a class="pl-15" @click="toggleBodyClass()">
            <em class="sls-icons sls-24 menu"></em>
          </a>
        </div>
        <!-- mobile navigation list -->
        <div class="d-sm-block d-md-none d-lg-none">
          <div class="nav-mobile-list" :class="{ 'show': mobileNav }">
            <div class="d-flex align-items-center justify-content-between">
              <p class="text-primary fw-600" @click="toggleBodyClass()">&#10005;</p>
              <b-dropdown size="sm" right text="USD" class="p-0 btn">
                <b-dropdown-item>INR</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item>
                  <p>USD</p>
                  <p>1 USD = 75.71INR</p>
                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item>
                  <p>EUR</p>
                  <p>1EUR = 82.81INR</p>
                </b-dropdown-item>
                <b-nav-item role="presentation" class="bg-g300 rounded-bottom">
                  <a
                    role="menuitem"
                    rel="noopener noreferrer"
                    href="https://economictimes.indiatimes.com/"
                    target="_blank"
                    class="dropdown-item"
                  >
                    Source:
                    <span class="text-blue">economictimes</span>
                  </a>
                </b-nav-item>
              </b-dropdown>
            </div>
            <div class="">
              <p class="pb-30 pt-30 fs-24 fw-500">Hi, Arun kumar</p>
            </div>
            <div class="d-flex align-items-start flex-column h-100 pb-20">
              <b-list-group class="mobile-list w-100">
                <b-list-group-item to="/home" >
                  <p>Home</p>
                  <em class="sls-icons sls-20 back-arrow r180"></em>
                </b-list-group-item>
                <b-list-group-item to="/order">
                  <p>Orders</p>
                  <em class="sls-icons sls-20 back-arrow r180"></em>
                </b-list-group-item>
                <b-list-group-item  to="/request-product">
                  <p>Requested Products</p>
                  <em class="sls-icons sls-20 back-arrow r180"></em>
                </b-list-group-item>
                <b-list-group-item to="/analytics">
                  <p>Analytics & Reports</p>
                  <em class="sls-icons sls-20 back-arrow r180"></em>
                </b-list-group-item>
                <b-list-group-item to="/contact">
                  <p>Contact Us</p>
                  <em class="sls-icons sls-20 back-arrow r180"></em>
                </b-list-group-item>
                <b-list-group-item to="/faq">
                  <p>FAQ</p>
                   <em class="sls-icons sls-20 back-arrow r180"></em>
                </b-list-group-item>
                <b-list-group-item @click.prevent="logout()">
                  <p >Logout</p>
                   <em class="sls-icons sls-20 back-arrow r180"></em>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
        </div>
      </b-navbar>
    </div>
  </div>
</template>
<script src="./header.js"></script>
<style src="./header.scss" lang="scss" scoped />
