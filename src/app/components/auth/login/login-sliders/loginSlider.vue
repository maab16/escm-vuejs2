<template>
  <div>
    <div class="login-carousel d-flex align-items-center">
      <b-carousel id="carousel-fade" :interval="4000" fade indicators>
        <b-carousel-slide
          caption="A promise to ‘make it better together’"
          text="Sai Life Sciences is built on the firm bedrock of partnership. We are dedicated to working with our global partners to accelerate a healthier future."
        >
          <template v-slot:img>
            <picture>
              <source
                media="(max-width: 1024px)"
                srcset="~@/assets/images/loginbanners/loginbannersipad4.jpg"
              />
              <img src="~@/assets/images/loginbanners/loginbanner4.jpg" alt="banner-image" />
            </picture>
          </template>
        </b-carousel-slide>
        <b-carousel-slide
          caption="A promise to ‘make it better together’"
          text="Sai Life Sciences is built on the firm bedrock of partnership. We are dedicated to working with our global partners to accelerate a healthier future."
        >
          <template v-slot:img>
            <picture>
              <source
                media="(max-width: 1024px)"
                srcset="~@/assets/images/loginbanners/loginbannersipad5.jpg"
              />
              <img src="~@/assets/images/loginbanners/loginbanner5.jpg" alt="banner-image" />
            </picture>
          </template>
        </b-carousel-slide>
        <b-carousel-slide
          caption="A promise to ‘make it better together’"
          text="Sai Life Sciences is built on the firm bedrock of partnership. We are dedicated to working with our global partners to accelerate a healthier future."
          img-src="~@/assets/images/loginbanner2.jpg"
        >
          <template v-slot:img>
            <picture>
              <source
                media="(max-width: 1024px)"
                srcset="~@/assets/images/loginbanners/loginbannersipad6.jpg"
              />
              <img src="~@/assets/images/loginbanners/loginbanner6.jpg" alt="banner-image" />
            </picture>
          </template>
        </b-carousel-slide>
        <b-carousel-slide
          caption="A promise to ‘make it better together’"
          text="Sai Life Sciences is built on the firm bedrock of partnership. We are dedicated to working with our global partners to accelerate a healthier future."
        >
          <template v-slot:img>
            <picture>
              <source
                media="(max-width: 1024px)"
                srcset="~@/assets/images/loginbanners/loginbannersipad7.jpg"
              />
              <img src="~@/assets/images/loginbanners/loginbanner7.jpg" alt="banner-image" />
            </picture>
          </template>
        </b-carousel-slide>
        <b-carousel-slide
          caption="A promise to ‘make it better together’"
          text="Sai Life Sciences is built on the firm bedrock of partnership. We are dedicated to working with our global partners to accelerate a healthier future."
        >
          <template v-slot:img>
            <picture>
              <source
                media="(max-width: 1024px)"
                srcset="~@/assets/images/loginbanners/loginbannersipad8.jpg"
              />
              <img src="~@/assets/images/loginbanners/loginbanner8.jpg" alt="banner-image" />
            </picture>
          </template>
        </b-carousel-slide>
      </b-carousel>
    </div>
  </div>
</template>
<script src="./loginSlider.js"></script>
<style src="./loginSlider.scss" lang="scss" scoped />
