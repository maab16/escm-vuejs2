<template>
  <div>
    <b-jumbotron class="bg-info rounded-0 top-searchbar">
      <div class="container">
        <b-form-group class="mb-0 order-search-filter">
          <b-input-group size="md">
            <b-form-input
              v-model="search"
              type="search"
              id="filterInput"
              placeholder="Search"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </div>
    </b-jumbotron>
      <div class="container pt-30">
        <app-Updates type="all" :filter="search"></app-Updates>
      </div>
  </div>
</template>
<script src="./recentUpdatesdetails.js"></script>
