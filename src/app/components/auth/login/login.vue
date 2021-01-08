<template>
  <div class="login-page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 col-lg-6">
          <div class="login-form d-flex justify-content-center align-items-center">
            <div class="card shadow">
              <div class="card-body">
                <!-- logo component -->
                <app-logo></app-logo>
                <!-- login Admin template -->
                <template>
                  <div class="account-info" :class="{ 'd-none' : login }">
                    <h3 class="mb-3 fw-500">Login into your organization's account</h3>
                    <ValidationObserver ref="observer" v-slot="{ passes, invalid, validated }">
                      <b-form @submit.prevent="passes(loginAdmin)">
                        <ValidationProvider
                          rules="required|email"
                          name="email"
                          v-slot="{ valid, errors }"
                        >
                          <b-form-group label-for="exampleInput1">
                            <b-form-input
                              type="email"
                              v-model="email"
                              :state="errors[0] ? false : valid ? true : null"
                              placeholder="Email ID"
                            ></b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                            <p bg-variant="#f8d7da" text-variant="#721c24">{{ error }}</p>
                          </b-form-group>
                        </ValidationProvider>
                        <div class="d-flex justify-content-between align-items-center pt-20">
                          <b-button
                            type="submit"
                            variant="primary"
                            class="mr-3 btn-lg"
                            :disabled="invalid || !validated"
                          >Proceed</b-button>
                          <div v-if="!login">
                            <a
                              href="javascript:void(0)"
                              v-b-modal.modal-scrollable
                              class="text-primary text-underline"
                            >Terms of Use</a>
                          </div>
                        </div>
                      </b-form>
                    </ValidationObserver>
                  </div>
                </template>
                <!-- login accountinfo template -->
                <template v-if="accountinfo">
                  <div class="account-info">
                    <h3 class="mb-3 fw-500">Login into your account</h3>
                    <ValidationObserver ref="observer" v-slot="{ passes, invalid, validated }">
                      <b-form @submit.prevent="passes(loginUsers)">
                        <ValidationProvider
                          rules="required|email"
                          name="email"
                          v-slot="{ valid, errors }"
                        >
                          <b-form-group label-for="exampleInput3">
                            <b-form-input
                              type="email"
                              v-model="accountemail"
                              :state="errors[0] ? false : valid ? true : null"
                              placeholder="Email ID"
                            ></b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                            <p bg-variant="#f8d7da" text-variant="#721c24">{{ error }}</p>
                          </b-form-group>
                        </ValidationProvider>
                        <div class="d-flex justify-content-between align-items-center pt-20">
                          <b-button
                            type="submit"
                            variant="primary"
                            class="mr-3 btn-lg"
                            :disabled="invalid || !validated"
                          >Proceed</b-button>
                          <div>
                            <a
                              href="javascript:void(0)"
                              v-b-modal.modal-scrollable
                              class="text-primary text-underline"
                              @click="showTermsOfUse('customer')"
                            >Terms of Use</a>
                          </div>
                        </div>
                      </b-form>
                    </ValidationObserver>
                  </div>
                </template>
                <!-- new user form template -->
                <template v-if="newuser">
                  <div class="account-info">
                    <h3 class="mb-3 fw-500">Login into your account</h3>
                    <ValidationObserver ref="observer" v-slot="{ passes, invalid, validated }">
                      <b-form @submit.prevent="passes(createnewUser)">
                        <ValidationProvider
                          rules="required|email"
                          name="email"
                          v-slot="{ valid, errors }"
                        >
                          <b-form-group label-for="exampleInput3">
                            <b-form-input
                              type="email"
                              v-model="accountemail"
                              :state="errors[0] ? false : valid ? true : null"
                              placeholder="Email ID"
                            ></b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                        </ValidationProvider>

                        <ValidationProvider
                          tag="div"
                          rules="alpha|firstname|min:3"
                          name="first name"
                          v-slot="{ valid, errors }"
                        >
                          <b-form-group abel-for="exampleInput1">
                            <b-form-input
                              v-model="fname"
                              type="text"
                              :state="errors[0] ? false : valid ? true : null"
                              placeholder="First Name"
                            ></b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider
                          tag="div"
                          rules="lastname|alpha|min:3"
                          name="last name"
                          v-slot="{ valid, errors }"
                        >
                          <b-form-group abel-for="exampleInput1">
                            <b-form-input
                              v-model="lname"
                              type="text"
                              :state="errors[0] ? false : valid ? true : null"
                              placeholder="Last Name"
                            ></b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider
                          tag="div"
                          rules="required|numeric|min:10|max:10|mobile"
                          name="mobile"
                          v-slot="{ valid, errors }"
                        >
                          <b-form-group abel-for="exampleInput1">
                            <b-form-input
                              v-model="mobile"
                              type="text"
                              :state="errors[0] ? false : valid ? true : null"
                              placeholder="Phone Number"
                            ></b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                        </ValidationProvider>
                        <div class="pt-20">
                        <b-button
                          type="submit"
                          variant="primary"
                          class="mr-3 btn-lg"
                          :disabled="invalid || !validated"
                        >Submit</b-button>
                        </div>
                      </b-form>
                    </ValidationObserver>
                  </div>
                </template>
                <!-- otp verify template -->
                <template v-if="verify">
                  <div class="account-info">

                    <h3 class="mb-3 fw-500">Verify</h3>
                    <p>Enter the verification code sent to</p>
                    <p class="pb-25">{{ accountemail }}</p>
                    <!--<p v-if="getOTP">Your OTP is <strong>{{getOTP}}</strong></p>-->

                    <v-otp-input
                      ref="otpInput"
                      input-classes="otp-input"
                      separator
                      :num-inputs="4"
                      :should-auto-focus="true"
                      :is-input-num="true"
                      @on-change="handleOnChange"
                      @on-complete="handleOnComplete"
                    />
                    <div v-if="otperror">
                      <p class="text-danger small pt-10 fw-500">Invalid OTP</p>
                      <p class="small pt-10">
                        Email SLS team for support at
                        <span
                          class="text-secondary"
                        >escmsupprt@sailife.com</span>
                      </p>
                    </div>
                    <button
                    v-on:keyup="verifyOTP()"
                      @click="verifyOTP"
                      type="button"
                      class="btn btn-primary w-50 mr-3 mt-3 btn-lg"
                      :disabled="this.verifyButton"
                    >Verify</button>
                    <p class="small pt-2">
                      Didn't receive an OTP yet ?
                      <a :disabled="sending"
                        href="#"
                        class="text-primary"
                        @click.prevent="showAlert()"
                      >Resend OTP</a>
                    </p>
                    <!--<b-alert
                      :show="dismissCountDown"
                      variant="dark"
                      @dismissed="dismissCountDown=0"
                      @dismiss-count-down="countDownChanged"
                      class=" text-center small rounded otp-alert"
                    >An OTP has been sent to your mail. {{ accountemail }} <span v-if="getOTP">Your OTP is <strong>{{getOTP}}</strong></span>
                    </b-alert>-->
                    <div class="back-login">
                    <a href="javascript:void(0)" @click="backlogin()" class="text-primary">Back to login</a>
                  </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-6 d-none d-lg-block pr-0 ipad-pro">
          <!--login banner slides  -->
          <app-loginslider></app-loginslider>
        </div>
      </div>
    </div>
    <!-- Terms modal -->
    <div class="select-terms">
      <b-modal
        ref="my-modal"
        id="modal-scrollable"
        centered
        scrollable
        title="Scrollable Content"
        hide-footer
      >
        <template v-slot:modal-header>
          <h3 class="fw-400" v-if="acceptTerms">Accept Terms of Use</h3>
          <h3 class="fw-400" v-if="!acceptTerms">Terms of Use</h3>
          <div class>
            <a class="pr-20" href="/images/sls-terms-of-use.pdf" target="_blank" @click.prevent="downloadTermsOfUse">
              <em class="sls-icons sls-24 download"></em>
            </a>
            <a href="javascript:void(0)" @click="printWindow()">
              <em class="sls-icons sls-24 print"></em>
            </a>
            <a
              v-if="!acceptTerms"
              class="text-black"
              href="javascript:void(0)"
              @click="hideModal()"
            >
              <em class="sls-icons sls-24 cross"></em>
            </a>
          </div>
        </template>
        <template v-slot:default>
          <div v-html="terms"></div>
          <div>
            <div v-if="acceptTerms">
              <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" class="pb-30">
                <p
                  class=""
                >I have read and understood the terms mentioned here and agree to them</p>
              </b-form-checkbox>
              <b-button @click="userAccept()" variant="primary" :disabled="!status">Accept</b-button>
            </div>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>
<script src="./login.js"></script>
<style src="./login.scss" lang="scss" scoped/>
