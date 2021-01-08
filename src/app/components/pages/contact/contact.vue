<template>
  <div class>
    <div class="contact-us">
      <p class="d-flex h-100 align-items-center justify-content-center fs-24 text-light">Contact Us</p>
    </div>
    <div class="container my-4">
      <div class="row">
        <div class="col-md-4 text-center">
         <router-link class="mr-3 btn btn-lg btn-primary text-uppercase mb-3" :to="{name: 'contact-list'}">View all contacts</router-link>
          <div class="card">
            <div class="card-body get-in-touch">
              <b-alert v-if="confirmationMessage" variant="success" show>
                {{ confirmationMessage }}
                <router-link class="dropdown-item" :to="{name: 'contact-detail', params: {id: contact.id}}">View</router-link>
              </b-alert>
              <ValidationObserver ref="observer" v-slot="{ passes, invalid, validated }">
                <b-form @submit.prevent="passes(send)">
                  <ValidationProvider
                    rules="required"
                    name="name"
                    v-slot="{ valid, errors }"
                  >
                    <b-form-group label-for="name">
                      <b-form-input
                        type="text"
                        v-model="form.name"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="Name*"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required|email"
                    name="email"
                    v-slot="{ valid, errors }"
                  >
                    <b-form-group label-for="email">
                      <b-form-input
                        type="email"
                        v-model="form.email"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="Email ID*"
                        :disabled="form.email !== null && !errors[0]"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required"
                    name="company"
                    v-slot="{ valid, errors }"
                  >
                    <b-form-group label-for="company">
                      <b-form-input
                        type="text"
                        v-model="form.company"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="Company*"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required|numeric|min:10|max:10"
                    name="phone"
                    v-slot="{ valid, errors }"
                  >
                    <b-form-group label-for="phone">
                      <b-form-input
                        type="text"
                        v-model="form.phone"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="Phone*"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required"
                    name="message"
                    v-slot="{ valid, errors }"
                  >
                    <b-form-group label-for="message">
                      <b-form-textarea
                        type="text"
                        v-model="form.message"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="Message*"
                      ></b-form-textarea>
                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <div class="pt-20">
                  <b-button
                    type="submit"
                    variant="primary"
                    class="mr-3 btn btn-lg btn-primary text-uppercase"
                    :disabled="invalid || !validated"
                  >Get in Touch</b-button>
                  </div>
                </b-form>
              </ValidationObserver>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3806.168417089029!2d78.3601065!3d17.4516514!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96d354866e29%3A0xa3bb6dd20b896ece!2sSai%20Life%20Sciences%20Ltd.!5e0!3m2!1sen!2sin!4v1590643385724!5m2!1sen!2sin"
              width="100%"
              height="250"
              style="border:0;"
              allowfullscreen
              aria-hidden="false"
              tabindex="0"
              title="Contact Map"
            ></iframe>
          </div>
          <div class="mt-3">
            <div class="bg-info w-100 p-15">
              <p class="text-uppercase fs-18 text-primary pb-15">Corporate office</p>
              <p class="text-light pb-10">Want to visit us in India? Here’s where you will find us:</p>
              <p class="text-light">Sai Life Sciences Limited L4,</p>
              <p class="text-light">SLN Terminus, Gachibowli,</p>
              <p class="text-light">Hyderabad 500032, Telangana, India</p>
              <p class="text-light pt-10">Tel: +91 40 3315 6000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./contact.js"></script>
<style src="./contact.scss" lang="scss" scoped />
