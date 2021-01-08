<template>
  <div v-if="order">
    <div class="container">
      <div>
        <div v-if="ordernum == order.id">
          <div class="row no-gutters">
            <div class="col-md-12 col-lg-8">
              <div class="text-left pt-30 pb-10 d-flex justify-content-between">
                <p class="text-black text-uppercase">
                  <a href="javascript:void(0)">
                    <router-link to="/order">
                      <span>
                        <em class="sls-icons sls-24 back-arrow"></em>
                      </span>
                    </router-link>
                  </a>
                  ORDER DETAILS
                </p>
                <div>
                  <a v-if="can('order.export')" class="pr-20" href="javascript:void(0)">
                    <em class="sls-icons sls-24 download"></em>
                  </a>
                  <a v-if="can('order.export')" href="javascript:void(0)" @click="printWindow()">
                    <em class="sls-icons sls-24 print"></em>
                  </a>
                  <a v-if="can('comment.create')" href="javascript:void(0)" class="pl-10 d-inline d-md-none d-lg-none">
                    <router-link to="/order/comment">
                      <em class="sls-icons sls-24 comment-dark"></em>
                    </router-link>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row no-gutters">
            <div class="col-md-12 col-lg-8">
              <div class="card order-details-list">
                <div class="card-body">
                  <div class="mobile-border">
                    <p class="small text-order text-uppercase pb-15">Overview</p>
                    <div class="row no-gutters">
                      <div class="col-12 col-sm-6 col-md-4">
                        <p class="small text-black">
                          <span class="text-order">Order No.:</span>
                          {{order.order_number}}
                        </p>
                        <p class="small">{{ format(order.updated_at, 'MMM DD, YYYY - HH:mm a') }}</p>
                        <p class="small text-order2">{{order.date}}</p>
                        <div class="d-flex align-items-center pb-10">
                          <div class="status-icons">
                            <p class="status-order">
                              <em class="portial bg-primary"></em>
                              <span class="status" :class="order.status === 'completed' ? 'bg-success' : order.status === 'sls' ? 'bg-primary' : 'bg-info'"></span>
                              <span class="fs-14">{{ order.status }}</span>
                              <a
                              v-if="order.status !== 'completed' && can('order.update')"
                              href="javascript:void(0)"
                              class="pl-10 text-primary fs-14"
                              v-b-modal.modal-prevent-closing
                            >Update Status</a>
                            </p>
                          </div>
                          <div v-if="statusProject == 'Completed'">
                            <em class="portial bg-success"></em>
                            <span class="fs-14">{{ statusProject }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-6 col-sm-6 col-md-4">
                        <p class="text-order small">No. of Online Products</p>
                        <p class="small pb-10">{{ order.products.length }}</p>
                      </div>
                      <div class="col-6 col-sm-6 col-md-4">
                        <p class="text-order small">No. of Requested Products</p>
                        <p class="small pb-10">{{ order.requests.length }}</p>
                      </div>
                      <div class="col-6 col-sm-6 col-md-4">
                        <div class>
                          <p class="text-order small">Order Total</p>
                          <p class="text-black small pb-10">
                            {{ currency.toUpperCase() }} {{ total }}
                            <span
                              v-b-tooltip.hover.right="'View Breackup'"
                            >
                              <a href="#notes">
                                <em class="sls-icons sls-24 i-icons"></em>
                              </a>
                            </span>
                          </p>
                        </div>
                      </div>
                      <div
                        v-if="isSupplierManager || isAdmin || isBuyingLead || isInternalBuyer || isManager"
                        class="col-6 col-sm-6 col-md-4">
                        <div class>
                          <p class="text-order small">Placed By</p>
                          <p
                            class="text-black small pb-10"
                          >{{ order.user.fname }} {{ order.user.lname }}</p>
                        </div>
                      </div>
                      <div
                        v-if="isSupplierManager || isAdmin || isBuyingLead || isInternalBuyer || isManager"
                        class="col-6 col-sm-6 col-md-4">
                        <div class>
                          <p class="text-order small">For Customer</p>
                          <p
                            class="text-black small pb-10"
                            v-if="order.user.organization"
                          >{{ order.user.organization.name }}</p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-8">
                        <div class="pt-10">
                          <p class="text-order small">Delivery Address:</p>
                          <p class="text-black small">{{ order.address.line1 }}</p>
                          <p class="text-order2 small">{{ order.address.line2 }}</p>
                        </div>
                      </div>
                    </div>
                    <!-- BL assign list  -->
                    <div class="pt-20 bl-assign">
                      <div class="bg-g100 rounded p-15">
                        <div class="row">
                          <div class="col-md-4 col-lg-4" v-if="can('order.update')">
                            <div class="bl-list p-0">
                              <p class="text-order small">Project Manager</p>
                              <p class="small">
                                <span
                                  v-if="order.manager"
                                >{{ order.manager.fname }} {{ order.manager.lname }}</span>
                                <a
                                  href="javascript:void(0)"
                                  class="pl-s5 text-primary fs-14"
                                  @click="openProjectManagerModal('project-manager-modal')"
                                >
                                <span v-if="order.manager">Change</span>
                                <span v-else>Assign</span>
                                </a>
                              </p>
                            </div>
                          </div>
                          <div class="col-md-4 col-lg-4" v-if="can('order.update')">
                            <div class="bl-list">
                              <p class="text-order small">Buying Lead</p>
                              <p class="small">
                                <span
                                  v-if="order.buying_lead"
                                >{{ order.buying_lead.fname }} {{ order.buying_lead.lname }}</span>
                                <span v-else>Unassigned</span>
                                <a
                                  href="javascript:void(0)"
                                  class="pl-s5 text-primary fs-14"
                                  @click="openBuyingLeadModal('buying-lead-modal')"
                                >
                                <span v-if="order.buying_lead">Change</span>
                                <span v-else>Assign</span>
                                </a>
                              </p>
                            </div>
                          </div>
                          <div class="col-md-4 col-lg-4" v-if="can('order.update')">
                            <div class="bl-list">
                              <p class="text-order small">Internal Buyer</p>
                              <p class="small">
                                <span
                                  v-if="order.internal_buyer"
                                >{{ order.internal_buyer.fname }} {{ order.internal_buyer.lname }}</span>
                                <span v-else>Unassigned</span>
                                <a
                                  href="javascript:void(0)"
                                  class="pl-s5 text-primary fs-14"
                                  @click="openBuyerModal('internal-buyer-modal')"
                                >
                                <span v-if="order.internal_buyer">Change</span>
                                <span v-else>Assign</span>
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- product Details -->
                  <div class="d-flex justify-content-between pt-20">
                    <p class="text-order small text-uppercase pb-10">Product details:</p>
                    <a
                      v-if="recentDelted && can('order.update')"
                      href="javascript:void(0)"
                      class="text-primary d-none d-lg-block d-md-block d-xl-block"
                      @click="showAllUpdateModal"
                    >Update Selected</a>
                  </div>
                  <table
                    class="table product-details d-none d-lg-block d-md-block d-xl-block"
                    aria-describedby="Order details"
                  >
                    <thead class="thead-light">
                      <tr>
                        <th
                          v-if="can('order.update')"
                          scope="col" class="pt-0 pb-0 pr-0">
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              @click="checkAll()"
                              v-model="ordercheck"
                              id="customCheck1"
                            />
                            <label
                              class="custom-control-label p-0 m-0 text-uppercase"
                              for="customCheck1"
                            ></label>
                          </div>
                        </th>
                        <th scope="col" style="width: 60px">Sr. No.</th>
                        <th scope="col">Product Details</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Supplier</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Sub Total</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(request, index) in requests"
                        :key="index"
                        >
                        <td v-if="can('order.update')">
                          <label class="custom-check">
                            <input
                              type="checkbox"
                              :value="request"
                              v-model="selectcheck"
                              @change="updateCheckall()"
                            />
                            <span class="checkmark"></span>
                          </label>
                        </td>
                        <td>{{request.slNo}}</td>
                        <td>
                          <p class="text-black fw-500">{{ request.description }}</p>
                          <p class="text-black">{{ request.cas }}</p>
                          <p class="text-black">{{ request.purity }} Pure</p>
                          <p class="text-black" v-if="request.packsize">Pack Size: {{ request.packsize }}</p>
                        </td>
                        <td>
                          <p v-for="(line, index) in request.lines" :key="index">{{ line.qty }}</p>
                          <p v-if="request.lines.length < 1">{{ request.qty }}</p>
                        </td>
                        <td>
                          <p v-for="(line, index) in request.lines" :key="index">{{ line.supplier ? line.supplier : '-' }}</p>
                        </td>
                        <td>
                          <div v-for="(line, index) in request.lines" :key="index">
                            <p class="text-right">{{ order.currency.toUpperCase() }} {{ line[order.currency] > 0 ? (line[order.currency]) : '-' }}</p>
                            <p class="fs-12 text-right" v-if="line[order.currency] > 0">INR {{ line.inr }}</p>
                          </div>
                        </td>
                        <td>
                          <div v-for="(line, index) in request.lines" :key="index">
                            <p
                              v-if="line[request.order.currency] > 0"
                              class="text-right"
                            > {{ order.currency.toUpperCase() }} {{ (line[order.currency] * line.qty) }}</p>
                            <p
                              v-if="line[order.currency] > 0"
                              class="fs-12 text-right"
                            >INR {{ (line.inr * line.qty) }}</p>
                            <p class="text-center" v-else>-</p>
                          </div>
                        </td>
                        <td>
                          <p v-if="request.lines.length < 1">Requested SLS to order</p>
                          <p v-if="request.lines.length > 0">Order placed</p>
                          <div v-for="(line, index) in request.lines" :key="index">
                            <p v-if="line.pono">PO No. {{ line.pono }}</p>
                            <p v-if="line.prno">PR No. {{ line.prno }}</p>
                          </div>
                          <a
                            v-if="can('order.update')"
                            href="javascript:void(0)"
                            class="text-primary"
                            @click="showUpdateModal(request)"
                          >
                          <span v-if="request.lines.length < 1">Update</span>
                          <span v-else>View/update</span>
                          </a>
                        </td>
                      </tr>
                      <tr v-for="(product) in products" :key="product.id">
                        <td v-if="can('order.update')">
                          <label class="custom-check">
                            <input
                              type="checkbox"
                              :value="product"
                              v-model="selectcheck"
                              @change="updateCheckall()"
                            />
                            <span class="checkmark"></span>
                          </label>
                        </td>
                        <td>{{product.slNo}}</td>
                        <td>
                          <p class="text-black fw-500">{{ product.name }}</p>
                          <p class="text-black">{{ product.cas }}</p>
                          <p class="text-black">{{ product.purity }} Pure</p>
                          <p class="text-black">Pack Size: {{ product.packsize }}</p>
                        </td>
                        <td>{{ product.pivot.qty }}</td>
                        <td>{{ product.supplier }}</td>
                        <td>
                          <p class="text-right">{{ (product[order.currency]) }}</p>
                          <p class="fs-12 text-right">{{ product.inr }}</p>
                        </td>
                        <td>
                          <p
                            class="text-right"
                          >{{ order.currency.toUpperCase() }} {{ (product[order.currency] * product.pivot.qty) }}</p>
                          <p
                            class="fs-12 text-right"
                          >INR {{ (product.inr * product.pivot.qty) }}</p>
                        </td>
                        <td>
                          <p>Order Placed</p>
                          <p v-if="product.pivot.pono">PO No. {{ product.pivot.pono }}</p>
                          <p v-if="product.pivot.prno">PR No. {{ product.pivot.prno }}</p>
                          <a
                            v-if="can('order.update')"
                            href="javascript:void(0)"
                            class="text-primary"
                            @click="showUpdateModal(product)"
                          >
                          <span v-if="!product.pivot.pono && !product.pivot.prno">Update</span>
                          <span v-else>View/update</span>
                          </a>
                        </td>
                      </tr>
                       <tr v-if="isCustomer">
                        <td></td>
                        <td colspan="4">
                          <p class="text-black fw-500">Total</p>
                        </td>
                        <td colspan="3" class="text-left">
                           <p
                            class="text-left"
                          > {{ order.currency.toUpperCase() }} {{ getTotal(order.currency) }}</p>
                          <p
                            class="fs-12 text-left"
                          >INR {{ getTotal('inr')}}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-block d-md-none d-lg-none">
                    <ul class="list-group product-details-orders">
                      <li
                        class="list-group-item pl-10 pr-10 d-flex align-items-center justify-content-between"
                      >
                        <div class="select-all d-flex align-items-center">
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              @click="checkAll()"
                              v-model="ordercheck"
                              id="customCheck1"
                            />
                            <label
                              class="custom-control-label p-0 m-0 text-uppercase"
                              for="customCheck1"
                            ></label>
                          </div>
                          <span class="text-order2 pt-1 fs-14">Select all</span>
                        </div>
                        <a
                          v-if="recentDelted"
                          href="javascript:void(0)"
                          class="text-primary"
                          @click="showAllUpdateModal"
                        >Update Selected</a>
                      </li>
                    </ul>
                  </div>
                  <!-- please note -->
                  <div class="bg-g200 rounded p-15" id="notes">
                    <p class="small fw-500">Please note:</p>
                    <p
                      class="pb-s5 small"
                    >The above total cart amount does not include the cost of the products requested to order.</p>
                    <p
                      class="pb-s5 small"
                    >The above costs are based on information provided by vendors and are subjected to change.</p>
                    <p
                      class="pb-s5 small"
                    >In case any product becomes unavailable by the time the order is placed, Sai Life Sciences team would order it for you.</p>
                  </div>
                  <!-- history -->
                  <ul class="history pt-20 list-group">
                    <p class="text-uppercase">history</p>
                    <li
                      v-for="(history, index) in order.histories"
                      :key="index"
                      class="list-group-item border-0 history-data pl-0"
                    >
                      <div class="d-flex">
                        <div class="history-icons">
                          <div class="circle"></div>
                          <div class="border-line"></div>
                        </div>
                        <div class="history-text">
                          <p class="text-black fw-500" v-html="history.message"></p>
                          <p
                            class="small text-order2"
                          >{{ format(history.updated_at, 'MMM DD, YYYY - HH:mm a') }}</p>
                          <p
                            class="text-black fw-500"
                            v-if="history.user"
                          >{{ history.user.fname }} {{ history.user.lname }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- comment card -->
            <div class="col-md-12 col-lg-4 d-none d-lg-block d-md-block d-xl-block">
              <div class="card order-comments sticky-top">
                <div class="card-header small">Comments</div>
                <div class="card-body">
                  <ul v-if="can('comment.list')" class="list-group">
                    <li
                      class="list-group-item"
                      v-for="(comment) in order.comments"
                      :key="comment.id"
                    >
                      <div class="d-flex">
                        <div class="circle bg-info"></div>
                        <div class="commennt-info">
                          <p
                            class="small text-black fw-600"
                          >{{ comment.user.fname }} {{ comment.user.lname }}</p>
                          <p class="small text-black">{{ comment.message }}</p>
                          <p
                            class="fs-12 text-order2"
                          >{{ format(comment.updated_at, 'MMM DD, YYYY - HH:mm a') }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div v-if="can('comment.create')" class="card-footer">
                  <div class="input-group">
                    <input
                      v-model="message"
                      type="text"
                      class="form-control"
                      placeholder="Add comment"
                      aria-label="Add comment"
                      aria-describedby="basic-addon2"
                      @keyup.enter="comment"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-link p-10" type="button" @click="comment">
                        <img src="~@/assets/images/icons/send.svg" alt="Send" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- update order-details modal -->
    <div class="update-modal">
      <b-modal
        id="modal-prevent-update"
        ref="cart-update-modal"
        title="Submit Your Name"
        size="lg"
        centered
        hide-header
        hide-footer
      >
        <div class="card-header pt-0 pl-0 pr-0 card-update-header">
          <div class="d-flex align-items-center justify-content-between">
            <p>Update Product Order Information (01)</p>
            <div class="d-flex">
              <button class="btn btn-link" @click="hideModal('cart-update-modal')">Cancel</button>
              <button
                class="btn btn-primary d-none d-lg-block d-md-block d-xl-block"
                @click="updateDetails"
              >Submit</button>
            </div>
          </div>
        </div>
        <div class="card-body pb-0 pl-0 pr-0 card-update-body">
          <div class="card border-0">
            <div class="card-header">
              <div class="d-none d-lg-block d-md-block d-xl-block">
                <div class="row no-gutters">
                  <div class="col-md-1">
                    <p class="fw-500">S.no</p>
                  </div>
                  <div class="col-md-2">
                    <p class="fw-500">Product Details</p>
                  </div>
                  <div class="col-md-9">
                    <div class="row">
                      <div class="col-md-2">
                        <p class="fw-500">Quantity</p>
                      </div>
                      <div class="col-md-2">
                        <p class="fw-500">Supplier</p>
                      </div>
                      <div class="col-md-2">
                        <p class="fw-500">Unit Price</p>
                      </div>
                      <div class="col-md-2">
                        <p class="fw-500">Sub Total</p>
                      </div>
                      <div class="col-md-2">
                        <p class="fw-500">PR No.</p>
                      </div>
                      <div class="col-md-2">
                        <p class="fw-500">PO No.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-block d-md-none d-lg-none">
                <div v-if="RequestList!== null">
                  <div v-for="(request, index) in RequestList" :key="index">
                    <div class="row no-gutters justify-content-between">
                      <div class="d-flex">
                        <p class="text-black fw-600">{{request.id}}</p>
                        <div class="pl-2"></div>
                      </div>
                      <div class="d-flex align-items-end flex-column">
                        <p class="text-black">{{request.purity}} Pure</p>
                        <p class="text-black">Pack Size: {{request.packsize}}</p>
                        <a class="text-primary" @click="hideRequestCard">
                          <span v-if="!hideCard">View Details</span>
                          <span v-if="hideCard">Hide Details</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="hideCard">
              <div class="card-body production-update p-0">
                <div v-if="RequestList!== null">
                  <div
                    class="row no-gutters border-bottom"
                    v-for="(request, index) in RequestList"
                    :key="index"
                  >
                    <div class="col-md-1">
                      <div class="d-none d-lg-block d-md-block d-xl-block">{{index + 1}}</div>
                    </div>
                    <div class="col-md-2">
                      <div class="d-none d-lg-block d-md-block d-xl-block">
                        <p class="text-black">{{request.purity}} Pure</p>
                        <p class="text-black">Pack Size: {{request.packsize}}</p>
                      </div>
                    </div>

                    <div class="col-md-9" v-if="request.lines">
                      <div class="row" v-for="(line, index) in request.lines" :key="index">
                        <div class="col-6 col-md-2">
                          <input
                            v-model="line.qty"
                            name="quantity"
                            type="text"
                            class="form-control input-sm"
                            @input="checkQtyAvailability(request)"
                            :class="request.invalidQty ? 'is-invalid' : ''"
                            :state="!request.invalidQty ? false : true"
                          />
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            v-model="line.supplier"
                            name="supplier"
                            type="text"
                            class="form-control input-sm"
                          />
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            v-model="line[order.currency]"
                            :name="order.currency"
                            type="text"
                            @input="updateInr(request)"
                            class="form-control input-sm"
                          />
                          <p
                            class="text-right tex-order1 fs-12"
                          >in INR : {{ line.inr }}</p>
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            :value="(line.qty * line[order.currency])"
                            name="subprice"
                            type="text"
                            class="form-control input-sm"
                            :disabled="true"
                          />
                          <p
                            class="text-right text-order1 fs-12"
                          >in INR : {{ (line.qty * line.inr) }}</p>
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            v-model="line.prno"
                            name="prno"
                            type="text"
                            class="form-control input-sm"
                          />
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            v-model="line.pono"
                            name="pono"
                            type="text"
                            class="form-control input-sm"
                          />
                          <a
                            @click="removeProductLine(request, index)"
                            href="javascript:void(0)"
                            class="text-primary fs-14"
                          ><b-icon icon="trash-fill" aria-hidden="true"></b-icon></a>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-6 offset-md-8 col-md-2">
                          <div class="form-group float-right m-0">
                            <a
                              @click="addProductLine(request)"
                              href="javascript:void(0)"
                              class="text-primary fs-14"
                            >Add PR</a>
                          </div>
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <div class="form-group float-right m-0">
                            <a
                              @click="addProductLine(request)"
                              href="javascript:void(0)"
                              class="text-primary fs-14"
                            >Add PO</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-9" v-if="!request.lines">
                      <div class="row">
                        <div class="col-6 col-md-2">
                          <input
                            v-model="request.pivot.qty"
                            name="quantity"
                            type="text"
                            class="form-control input-sm"
                            :disabled="true"
                            :min="1"
                            @input="checkQtyAvailability(request)"
                            :class="request.invalidQty ? 'is-invalid' : ''"
                            :state="!request.invalidQty ? false : true"
                          />
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            v-model="request.supplier"
                            name="supplier"
                            type="text"
                            class="form-control input-sm"
                            :disabled="true"
                          />
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            v-model="request[order.currency]"
                            :name="order.currency"
                            type="text"
                            @input="updateInr(request)"
                            class="form-control input-sm"
                            :disabled="true"
                          />
                          <p
                            class="text-right tex-order1 fs-12"
                          >in INR : {{ request.inr }}</p>
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            :value="(request.pivot.qty * request[order.currency])"
                            name="subprice"
                            type="text"
                            class="form-control input-sm"
                            :disabled="true"
                          />
                          <p
                            class="text-right text-order1 fs-12"
                          >in INR : {{ (request.pivot.qty * request.inr) }}</p>
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            v-model="request.pivot.prno"
                            name="prno"
                            type="text"
                            class="form-control input-sm"
                          />
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            v-model="request.pivot.pono"
                            name="pono"
                            type="text"
                            class="form-control input-sm"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer d-block d-md-none d-lg-none p-0 pt-2">
          <button class="btn btn-primary btn-block">Submit</button>
        </div>
      </b-modal>
    </div>

    <!-- bl assign modal view -->
    <div>
      <b-modal
        id="modal-prevent-closing"
        ref="update-order-status"
        title="Submit Your Name"
        size="sm"
        centered
        hide-header
        hide-footer
      >
        <b-form-group>
          <b-form-radio-group v-model="selected" :options="options" name="radios-stacked" stacked></b-form-radio-group>
        </b-form-group>
        <div class="float-right">
          <button class="btn btn-link" @click="hideModal('update-order-status')">Cancel</button>
          <button class="btn btn-primary" @click="updateStatus">Ok</button>
        </div>
      </b-modal>
    </div>
    <div>
      <b-modal
        id="modal-prevent-manage"
        ref="project-manager-modal"
        title="Submit Your Name"
        size="sm"
        centered
        hide-header
        hide-footer
      >
        <p class="pt-10 pb-10 fw-600">Assign Project manager</p>
        <b-form-select
          :searchable="true"
          v-model="order.manager_id"
          placeholder="Select Customer"
          class="assign-lead"
          :options="projectManagers"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <em class="sls-icons sls-16 arrow"></em>
            </span>
          </template>
        </b-form-select>
        <div class="float-right pt-20">
          <button
            class="btn btn-link"
            type="reset"
            @click="hideModal('project-manager-modal')"
          >Cancel</button>
          <button
            class="btn btn-primary"
            type="submit"
            @click="changeOrderDetails(order, 'project-manager', 'project-manager-modal')"
          >Ok</button>
        </div>
      </b-modal>
    </div>
    <div>
      <b-modal
        id="modal-prevent-buying"
        ref="buying-lead-modal"
        title="Submit Your Name"
        size="sm"
        centered
        hide-header
        hide-footer
      >
        <p class="fw-600 pt-10 pb-10">Assign Buying Lead</p>
        <b-form-select
          :searchable="true"
          v-model="order.buying_lead_id"
          placeholder="Select Customer"
          class="assign-lead"
          :options="buyingLeads"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <em class="sls-icons sls-16 arrow"></em>
            </span>
          </template>
        </b-form-select>
        <div class="float-right pt-20">
          <button class="btn btn-link" type="reset" @click="hideModal('buying-lead-modal')">Cancel</button>
          <button
            class="btn btn-primary"
            type="submit"
            @click="changeOrderDetails(order, 'buying-lead', 'buying-lead-modal')"
          >Ok</button>
        </div>
      </b-modal>
    </div>
    <div>
      <b-modal
        id="modal-prevent-assign"
        ref="internal-buyer-modal"
        title="Submit Your Name"
        size="sm"
        centered
        hide-header
        hide-footer
      >
        <p class="fw-600 pt-10 pb-10">Assign Internal Buyer</p>
        <b-form-select
          :searchable="true"
          v-model="order.internal_buyer_id"
          placeholder="Select Customer"
          class="assign-lead"
          :options="internalBuyers"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <em class="sls-icons sls-16 arrow"></em>
            </span>
          </template>
        </b-form-select>
        <div class="float-right pt-20">
          <button
            class="btn btn-link"
            type="reset"
            @click="hideModal('internal-buyer-modal')"
          >Cancel</button>
          <button
            class="btn btn-primary"
            type="submit"
            @click="changeOrderDetails(order, 'internal-buyer', 'internal-buyer-modal')"
          >Ok</button>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script src="./orderDetail.js"></script>
<style src="./orderDetail.scss" lang="scss" scoped />
