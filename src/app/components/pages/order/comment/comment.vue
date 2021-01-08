<template>
  <div>
    <div class="card order-comments">
      <div class="card-header small">
          <a href="javascript:void(0)" @click="routeBack()">
                  <span>
                    <em class="sls-icons sls-24 back-arrow"></em>
                  </span>
              </a>
              Comments</div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item">
            <div class="d-flex">
              <div class="circle bg-info"></div>
              <div class="commennt-info">
                <p class="small text-black fw-600">Sudhakar Reddy</p>
                <p class="small text-black">The product 4782-25-6 is not available sir</p>
                <p class="fs-12 text-order2">Mar 19, 2020 - 01:34 pm</p>
              </div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="d-flex">
              <div class="circle bg-info"></div>
              <div class="commennt-info">
                <p class="small text-black fw-600">Sachin pisharody</p>
                <p class="small text-black">ok</p>
                <p class="fs-12 text-order2">Mar 19, 2020 - 01:40 pm</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="card-footer">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button class="btn btn-link p-10" type="button">
              <img src="~@/assets/images/icons/send.svg" alt="Send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./comment.js"></script>
<style src="./comment.scss" lang="scss" scoped />
