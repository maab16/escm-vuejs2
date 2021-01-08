<template>
  <div style="position: relative">
    <b-jumbotron class="bg-info rounded-0" :class="{ 'top-searchbar': topSearchbar }">
      <div class="container">
        <div class="form-searh-tags">
          <!-- Search Option -->
          <template>
            <!-- <b-form-group class="text-white"> -->
              <b-form-radio v-model="searchType" value="cas" class="text-white">Search by CAS#</b-form-radio>
              <b-form-radio v-model="searchType" value="text" class="text-white">Search by text</b-form-radio>
            <!-- </b-form-group> -->
          </template>
          <b-form-tags v-model="value" add-on-change no-outer-focus class="tagchange">
            <template v-slot="{ tags, addTag, removeTag }">
              <div>
                <!-- error message on tags-validations-->
                <p
                  v-if="tags.length > maxSearchItem"
                  class="text-danger tag-validation"
                >You can only search for a maximum of {{ maxSearchItem }} CAS Nos./Product Names at a time</p>
                <p
                  v-if="!isCasNumberValid"
                  class="text-danger tag-validation"
                >Please Enter valid CAS number</p>
                <!-- search form input-->
                <div>
                <!-- tags list -->
                <ul v-if="tags.length > 0  " class="tag-list">
                  <li v-for="tag in tags" :key="tag" class="list-inline-item mb-0">
                    <b-form-tag @remove="removeTagItem(removeTag, tag)" :title="tag" variant="info">{{ tag }}</b-form-tag>
                  </li>
                </ul>
                <b-form @submit.stop.prevent="() => {}" class="d-flex w-100">
                  <b-form-group
                    label-for="tag-search-input"
                    class="mb-0 w-100 d-flex"
                    label-size="sm"
                    :disabled="disabled"
                  >
                    <b-form-input
                      v-model="search"
                      placeholder="Search by CAS No./Product Name"
                      id="tag-search-input"
                      type="search"
                      size="sm"
                      autocomplete="off"
                      class="form-control"
                      @click="listView()"
                      @keyup="searchOnkeyup($event, addTag)"
                      ref="search"
                    ></b-form-input>
                    <b-input-group-append v-if="!tags.length < 1 && tags.length < 6">
                      <b-button @click="searchResult(tags)" :disabled="disabled" variant="primary">
                        <em class="sls-icons sls-24 search"></em>
                      </b-button>
                    </b-input-group-append>
                  </b-form-group>
                </b-form>
              </div>
              </div>
              <!-- dropdown tags list -->
              <div
                v-show="search.length > 0"
                v-on-clickaway="away"
                class="dropdown-tag-list shadow-sm"
              >
                <b-list-group
                  v-for="(option, index) in availableOptions"
                  :key="index"
                  @click="onOptionClick({ option, addTag, tags })"
                >
                  <b-list-group-item>{{ option.name + ' ( ' + option.cas + ' ) ' }}</b-list-group-item>
                </b-list-group>
                <b-list-group class="dropdown-tag-list shadow-sm">
                  <b-list-group-item
                    v-if="availableOptions.length === 0"
                  > Result unavailable. Please check the CAS No./Product Name</b-list-group-item>
                </b-list-group>
              </div>
            </template>
          </b-form-tags>
          <!-- advanced search -->
          <div class="pt-10 d-flex justify-content-between advance-option" v-if="isAdvancedSearch">
            <p class="text-light">You can search for 5 CAS No.(s)/Product Names at a time</p>
            <a
              href="javascript:void(0)"
              @click="advanceSearhfilter()"
              class="text-primary"
            >Advanced Options</a>
          </div>
          <div class="pt-10 d-flex justify-content-between" v-if="!isAdvancedSearch">
            <p class="text-light"></p>
            <a href="javascript:void(0)" @click="recentupdates()" class="text-primary">Clear Search</a>
          </div>
          <!-- advance search form -->
          <div class="serach-form shadow-sm" v-if="advanceFilter" v-on-clickaway="filterform">
            <div class="card">
              <div class="card-body">
                <app-filter
                  :advanced-option="advancedOption"
                  :advanced-search="advancedSearch"
                  :tags="tags"
                  :filter-options="searchOptions"
                  @reset-tags="resetTags"></app-filter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-jumbotron>
    <div class="loader" v-if="isLoading">
      <spinner></spinner>
    </div>
    <div class="container" v-else>
      <div class v-if="recentPage">
        <app-recentpage></app-recentpage>
      </div>
      <div v-else>
        <div v-if="searchItems.length > 0">
          <app-listcard
          :search-items="searchItems"
          :advanced-search="advancedSearch"
          :advanced-option="advancedOption"
          :tags="value"></app-listcard>
        <app-formcard
          :request-list="searchItems"
          :advanced-search="advancedSearch"
          :advanced-option="advancedOption"
          :tags="value"></app-formcard>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./searchItem.js"></script>
<style src="./searchItem.scss" lang="scss"/>
