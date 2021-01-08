<template>
  <div>
    <div class="loader" v-if="isLoading">
      <spinner></spinner>
    </div>
    <div v-else>
      <b-list-group>
        <b-list-group-item href="javascript:void(0)" v-for="recent in updates" :key="recent.id" class="p-15">
          <div class="d-flex update-list">
            <div class="pr-10 update-icon">
              <em class="sls-icons sls-24 order" v-if="recent.type === 'order'"></em>
              <em class="sls-icons sls-24 comment" v-if="recent.type === 'comment'"></em>
            </div>
            <div class="update-test">
              <div>
                <P v-if="recent.type === 'order'">
                    Your order
                  <router-link :to="'/order/order-detail/' + recent.order_id">{{ recent.order_id }}</router-link>
                   has been <span v-if="recent.description == 'Order placed successfully'">placed</span> <span v-else>updated</span> successfuly.
                  
                </P>
                <P v-if="recent.type === 'comment'">
                  <span v-if="user && user.id === recent.user.id">You</span>
                  <span v-else>{{recent.user.fname}} {{recent.user.lname}}</span>
                  has commented on your order
                  <router-link :to="'/order/order-detail/' + recent.order_id">{{ recent.order_id }}</router-link>
                </P>
                <p>{{ recent.description }}</p>
              </div>
              <div class="update-date">
                <p>{{ format(recent.updated_at, 'MMM DD, YYYY - HH:mm a') }}</p>
              </div>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
      <div class v-if="updates.length < 1">
        <div class="no-updates d-flex justify-content-center align-items-center">
          <p class="fw-500">You have no Updates to display.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./recentUpdates.js"></script>
<style src="./recentUpdates.scss" lang="scss" scoped />
