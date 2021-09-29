<template @click="toggleMobileNav">
  <section class="wrapper_type_2">
    <SuspendedModal :statusInfo="statusInfo" :branch="true"></SuspendedModal>
    <WarningModal :statusInfo="statusInfo" :branch="true"></WarningModal>
    <b-navbar
      class="horizontal_nav_bar"
      :class="collapseNavbar ? 'opened' : ''"
    >
      <b-navbar-brand
        href="#"
        class="hamburger_container"
        :style="[
          statusInfo.status && statusInfo.status == 1
            ? { marginRight: '50px !important' }
            : null,
        ]"
      >
        <span class="hamburger_span_div" @click="toggleCollapsibleNavBar">
          <div class="span-toggler-bar bar1"></div>
          <div class="span-toggler-bar bar2"></div>
          <div class="span-toggler-bar bar3"></div>
        </span>
      </b-navbar-brand>

      <div
        style="margin: 0 auto; margin-left: 100px; margin-right: 50px"
        class="m-hide"
      >
        <p class="text-center branchName" style="margin-bottom: 0">
          {{ branch.name }}
        </p>
      </div>

      <b-collapse id="nav-collapse" is-nav>
        <b-nav-item
          href="#"
          v-if="statusInfo.status && statusInfo.status == 1"
          class="payment_due_text"
        >
          YOUR SUBSCRIPTION WILL EXPIRE in
          <span class="payment_due_date">{{
            timeSince(new Date(statusInfo.dateDue))
          }}</span
          >, PLEASE MAKE PAYMENT
        </b-nav-item>
        <b-nav-item
          href="#"
          v-if="statusInfo.status && statusInfo.status == 2"
          class="payment_due_text"
        >
          YOUR SUBSCRIPTION HAS EXPIRED, PLEASE MAKE PAYMENT
        </b-nav-item>
        <b-navbar-nav class="ml-auto desk-view">
          <b-nav-item
            href="#"
            class="bell_noti"
            style="position: relative"
            v-if="statusInfo.status && statusInfo.status !== 0"
            @click="showNotification"
          >
            <img src="@/assets/img/notification.svg" width="28" />
          </b-nav-item>
          <b-nav-item href="#"
            ><img v-if="companyIcon" :src="companyIcon" height="30px" />
            <img
              v-if="!companyIcon"
              src="@/assets/img/avatar.svg"
              height="30px"
            />
          </b-nav-item>
          <b-nav-item-dropdown>
            <template v-slot:button-content>
              <b class="user_profile_span"
                ><span>{{ userName }}</span> &#x25bc;</b
              >
            </template>
            <b-dropdown-item href="#" @click="changeRoute('branchProfile')"
              >Profile</b-dropdown-item
            >
            <b-dropdown-item href="#" @click="signOutUser"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="masterLayoutWrapper" :class="collapseNavbar ? 'opened' : ''">
      <section class="main_content">
        <transition name="moveInUp" mode="out-in" appear>
          <div class="slot_div inner_main_content" ref="inner_main_content">
            <slot>
              <router-view />
            </slot>
          </div>
        </transition>
      </section>
    </div>

    <section
      class="sidebar use-tiny-scroll"
      :class="collapseNavbar ? 'collapsed' : ''"
      @mouseover="toggleSidenavText"
      @mouseleave="hideTitles"
    >
      <div class="m-hide-icon text-right mt-3">
        <img
          src="@/assets/img/close_btn.png"
          width="35px"
          height="35px"
          @click="toggleCollapsibleNavBar"
          id="mySidenav"
        />
      </div>
      <div class="text-center">
        <div class="company-logo-wrapper">
          <img
            src="@/assets/img/ep-logo.svg"
            class="lg m-hide-icon company-logo"
            width="153"
          />
        </div>
        <div class="mobile-user-details">
          <div class="logo_section text-right mt-3">
            <img
              src="@/assets/img/close_btn.png"
              width="35px"
              height="35px"
              @click="toggleCollapsibleNavBar"
            />
          </div>
          <div class="dasboard_type_button_section mt-3 text-center">
            <div class="mobile_epump_logo">
              <img src="@/assets/img/mobieli_white_epump_logo.svg" width="35" />
            </div>
            <h6 class="mt-2 text-white">{{ userName }}</h6>
            <small class="mt-2 text-white">{{ userDetails.email }}</small>
          </div>
        </div>
      </div>
      <div class="dasboard_type_button_section mt-3"></div>

      <div class="menu-wrapper mt-4 mb-4">
        <ul class="list-group" style="">
          <li
            class="list-group-item"
            :class="
              activeRoute === 'companyDashboard' ? 'navbar_item_active' : ''
            "
            v-if="$route.query.branchId && (userDetails.role.includes('Company') || userDetails.role.includes('SupportAdmin'))"
          >
            <router-link
              :to="{ name: 'companyDashboard',  query: {companyId: $route.query.companyId} }"
              class="vue_router_link"
            >
              <span class="mr-2"
                ><i
                  class="fa fa-arrow-left text-white"
                  aria-hidden="true"
                  width="20px"
                ></i
              ></span>
              <span class="sidenav_list_title"> Company Dashboard </span>
            </router-link>
          </li>
          <li
            class="list-group-item"
            :class="
              activeRoute === 'branchDashboard' ? 'navbar_item_active' : ''
            "
            v-if="
              userDetails.role.includes('ManageOutlet') ||
              userDetails.role.includes('Branch') ||
              userDetails.role.includes('SupportAdmin')
            "
          >
            <router-link
              :to="{
                name: 'branchDashboard',
                query: this.$route.query.branchId
                  ? {
                      branchId: this.$route.query.branchId,
                      companyId: $route.query.companyId
                    }
                  : null,
              }"
              class="vue_router_link"
            >
              <span class="mr-2"
                ><img src="@/assets/img/dashboard (2).svg" width="20px"
              /></span>
              <span class="sidenav_list_title"> Dashboard </span>
            </router-link>
          </li>
          <li
            class="list-group-item"
            :class="activeRoute === 'manage_price' ? 'navbar_item_active' : ''"
            v-if="
              userDetails.role.includes('BranchPrice') ||
              userDetails.role.includes('ManageOutlet') ||
              userDetails.role.includes('SupportAdmin')
            "
          >
            <router-link
              :to="{
                name: 'manage_price',
                query: this.$route.query.branchId
                  ? {
                      branchId: this.$route.query.branchId,
                      companyId: $route.query.companyId
                    }
                  : null,
              }"
              class="vue_router_link"
            >
              <span class="mr-2"
                ><img src="@/assets/img/money-transfer.svg" width="20px"
              /></span>
              <span class="sidenav_list_title">
                {{ $t("text.bMasterLayout.updatePrice") }}
              </span>
            </router-link>
          </li>
          <li
            class="list-group-item treeview"
            v-if="
              userDetails.role.includes('BranchReport') ||
              userDetails.role.includes('ManageOutlet') ||
              userDetails.role.includes('ViewOutlet') ||
              userDetails.role.includes('SupportAdmin')
            "
            :class="
              activeRoute === 'tank_reports' ||
              activeRoute === 'shift_transactions' ||
              activeRoute === 'end_of_the_day_report' ||
              activeRoute === 'productSummary' ||
              activeRoute === 'salesTransactionSummary' ||
              activeRoute === 'BranchSalesTransactions' ||
              activeRoute === 'TanksFilledReport' ||
              activeRoute === 'VarianceReport' ||
              activeRoute === 'branch_POS' ||
              activeRoute === 'branch_cash_flow' ||
              activeRoute === 'branch_stock_valuation' ||
              activeRoute === 'branch_products_filled'
                ? 'navbar_item_active'
                : null
            "
          >
            <a href="#" class="vue_router_link has-submenu">
              <span class="mr-2 icon">
                <img src="@/assets/img/profit-report (1).svg" width="20" />
              </span>
              <span class="sidenav_list_title"> Reports </span>

              <i class="fa fa-angle-right sidenav_arrow"></i>
            </a>
            <div>
              <ul class="treeview-menu">
                <li>
                  <router-link
                    :to="{
                      name: 'BranchSalesTransactions',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                  >
                    {{ $t("text.bMasterLayout.salesTransactions") }}
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'VarianceReport',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                  >
                    {{ $t("text.bMasterLayout.varianceReport") }}
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'productSummary',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                  >
                    Product Summary
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'end_of_the_day_report',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                  >
                    {{ $t("text.bMasterLayout.endOfDayReport") }}
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'tank_reports',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                  >
                    {{ $t("text.bMasterLayout.tankReport") }}
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'branch_tanks_filled',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                  >
                    Tanks Filled
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'branch_POS',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                  >
                    {{ $t("text.bMasterLayout.posReport") }}
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'branch_cash_flow',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                  >
                    Cash Flow Report
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'tank_dippings',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                  >
                    Tank Dippings
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'branch_products_filled',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                  >
                    Products Filled
                  </router-link>
                </li>

                <li>
                  <router-link
                    :to="{
                      name: 'branch_stock_valuation',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                  >
                    Stock Valuation
                  </router-link>
                </li>
              </ul>
            </div>
          </li>

          <li
            class="list-group-item"
            :class="activeRoute === 'tanks' ? 'navbar_item_active' : ''"
            v-if="
              userDetails.role.includes('BranchTank') ||
              userDetails.role.includes('ManageOutlet') ||
              userDetails.role.includes('ViewOutlet') ||
              userDetails.role.includes('SupportAdmin')
            "
          >
            <router-link
              :to="{
                name: 'tanks',
                query: this.$route.query.branchId
                  ? {
                      branchId: this.$route.query.branchId,
                      companyId: $route.query.companyId

                    }
                  : null,
              }"
              class="vue_router_link"
            >
              <span class="mr-2"
                ><img alt="" src="@/assets/img/tanks_icon.png" width="20px"
              /></span>
              <span class="sidenav_list_title"> Tanks </span>
            </router-link>
          </li>

          <li
            class="list-group-item treeview"
            v-if="
              userDetails.role.includes('BranchPump') ||
              userDetails.role.includes('ManageOutlet') ||
              userDetails.role.includes('ViewOutlet') ||
              userDetails.role.includes('SupportAdmin')
            "
            :class="
              activeRoute === 'branch_pump_maintenance' ||
              activeRoute === 'pump_details' ||
              activeRoute === 'pump_transactions' ||
              activeRoute === 'pumps'
                ? 'navbar_item_active'
                : null
            "
          >
            <a href="#" class="vue_router_link has-submenu">
              <span class="mr-2 icon">
                <img src="@/assets/img/pump__icon.png" width="20" />
              </span>
              <span class="sidenav_list_title">
                {{ $t("text.bMasterLayout.pumps") }}
              </span>

              <i class="fa fa-angle-right sidenav_arrow"></i>
            </a>
            <div>
              <ul class="treeview-menu">
                <li>
                  <router-link
                    :to="{
                      name: 'pumps',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                    :class="activeRoute === 'pumps' ? 'active' : ''"
                  >
                    {{ $t("text.bMasterLayout.pumps") }}
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'pump_fault',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                    :class="activeRoute === 'pump_fault' ? 'active' : ''"
                  >
                    {{ $t("text.bMasterLayout.pumpFaults") }}
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'branch_pump_maintenance',
                      query: this.$route.query.branchId
                        ? {
                            branchId: this.$route.query.branchId,
                            companyId: $route.query.companyId

                          }
                        : null,
                    }"
                    class="vue_router_link"
                    :class="
                      activeRoute === 'branch_pump_maintenance' ? 'active' : ''
                    "
                  >
                    {{ $t("text.bMasterLayout.pumpMaintenance") }}
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li
            class="list-group-item treeview"
            v-if="
              userDetails.role.includes('ManageBranchPayments') ||
              userDetails.role.includes('ManageOutlet') ||
              userDetails.role.includes('ViewOutlet') ||
              userDetails.role.includes('SupportAdmin')
            "
            :class="
              activeRoute === 'branch_bank_deposits' ||
              activeRoute === 'bank_accounts'
                ? 'navbar_item_active'
                : null
            "
          >
            <a href="#" class="vue_router_link has-submenu">
              <span class="mr-2 icon">
                <img src="@/assets/img/wallet (6).svg" width="20px" />
              </span>
              <span class="sidenav_list_title"> Bank </span>

              <i class="fa fa-angle-right sidenav_arrow"></i>
            </a>
            <div>
              <ul class="treeview-menu">
                <li
                  v-if="
                    userDetails.role.includes('ManageBranchPayments') ||
                    userDetails.role.includes('ManageOutlet') ||
                    userDetails.role.includes('ViewOutlet') ||
                    userDetails.role.includes('SupportAdmin')
                  "
                >
                  <router-link
                    :to="{
                      name: 'branch_bank_deposits',
                      query: { branchId: this.$route.query.branchId, companyId: $route.query.companyId },
                    }"
                    class="vue_router_link"
                  >
                    Bank deposits
                  </router-link>
                </li>
                <li
                  v-if="
                    userDetails.role.includes('ManageBranchPayments') ||
                    userDetails.role.includes('ManageOutlet') ||
                    userDetails.role.includes('ViewOutlet') ||
                    userDetails.role.includes('SupportAdmin')
                  "
                >
                  <router-link
                    :to="{
                      name: 'bank_accounts',
                      query: { branchId: this.$route.query.branchId, companyId: $route.query.companyId },
                      
                    }"
                    class="vue_router_link"
                  >
                    Bank Accounts
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li
            class="list-group-item treeview"
            v-if="
              userDetails.role.includes('ManageBranchPayments') ||
              userDetails.role.includes('ManageOutlet') ||
              userDetails.role.includes('ViewOutlet') ||
              userDetails.role.includes('SupportAdmin')
            "
            :class="
              activeRoute === 'branch_wallet' ||
              activeRoute === 'settlement_account'
                ? 'navbar_item_active'
                : null
            "
          >
            <a href="#" class="vue_router_link has-submenu">
              <span class="mr-2 icon">
                <img src="@/assets/img/e-channel.png" width="20px" />
              </span>
              <span class="sidenav_list_title"> E-channels </span>

              <i class="fa fa-angle-right sidenav_arrow"></i>
            </a>
            <div>
              <ul class="treeview-menu">
                <li
                  v-if="
                    userDetails.role.includes('ManageBranchPayments') ||
                    userDetails.role.includes('ManageOutlet') ||
                    userDetails.role.includes('ViewOutlet') ||
                    userDetails.role.includes('SupportAdmin')
                  "
                >
                  <router-link
                    :to="{
                      name: 'branch_wallet',
                      query: { branchId: this.$route.query.branchId, companyId: $route.query.companyId },
                    }"
                    class="vue_router_link"
                  >
                    E-sales
                  </router-link>
                </li>
                <li
                  v-if="
                    userDetails.role.includes('ManageBranchPayments') ||
                    userDetails.role.includes('ManageOutlet') ||
                    userDetails.role.includes('ViewOutlet') ||
                    userDetails.role.includes('SupportAdmin')
                  "
                >
                  <router-link
                    :to="{
                      name: 'settlement_account',
                      query: { branchId: this.$route.query.branchId, companyId: $route.query.companyId },
                    }"
                    class="vue_router_link"
                  >
                    Settlement Account
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li
            class="list-group-item treeview"
            v-if="
              userDetails.role.includes('ManagePayments') ||
              userDetails.role.includes('ManageOutlet') ||
              userDetails.role.includes('ViewOutlet') ||
              userDetails.role.includes('ManageStaff') ||
              userDetails.role.includes('ManageShift') ||
              userDetails.role.includes('SupportAdmin')
            "
            :class="
              activeRoute === 'expenses' ||
              activeRoute === 'staff' ||
              activeRoute === 'shift' ||
              activeRoute === 'link-branch-bank' ||
              activeRoute === 'generate-bank-deposit'
                ? 'navbar_item_active' ||
                  activeRoute === 'add-bank-linked-deposit'
                : null
            "
          >
            <a href="#" class="vue_router_link has-submenu">
              <span class="mr-2 icon">
                <img src="@/assets/img/briefcase.svg" width="20px" />
              </span>
              <span class="sidenav_list_title"> Management </span>

              <i class="fa fa-angle-right sidenav_arrow"></i>
            </a>
            <div>
              <ul class="treeview-menu">
                <li
                  v-if="
                    userDetails.role.includes('ManagePayments') ||
                    userDetails.role.includes('ManageOutlet') ||
                    userDetails.role.includes('ViewOutlet') ||
                    userDetails.role.includes('SupportAdmin')
                  "
                >
                  <router-link
                    :to="{
                      name: 'generate-bank-deposit',
                      query: { branchId: this.$route.query.branchId, companyId: $route.query.companyId },
                    }"
                    class="vue_router_link"
                  >
                    Create deposit reference
                  </router-link>
                </li>

                <li
                  v-if="
                    userDetails.role.includes('ManagePayments') ||
                    userDetails.role.includes('ManageOutlet') ||
                    userDetails.role.includes('ViewOutlet') ||
                    userDetails.role.includes('SupportAdmin')
                  "
                >
                  <router-link
                    :to="{
                      name: 'expenses',
                      query: { branchId: this.$route.query.branchId, companyId: $route.query.companyId },
                    }"
                    class="vue_router_link"
                  >
                    Expenses
                  </router-link>
                </li>
                <li
                  v-if="
                    userDetails.role.includes('ManageStaff') ||
                    userDetails.role.includes('ManageOutlet') ||
                    userDetails.role.includes('ViewOutlet') ||
                    userDetails.role.includes('SupportAdmin')
                  "
                >
                  <router-link
                    :to="{
                      name: 'staff',
                      query: { branchId: this.$route.query.branchId, companyId: $route.query.companyId },
                    }"
                    class="vue_router_link"
                  >
                    Staff
                  </router-link>
                </li>
                <li
                  v-if="
                    userDetails.role.includes('ManageShift') ||
                    userDetails.role.includes('ManageOutlet') ||
                    userDetails.role.includes('ViewOutlet') ||
                    userDetails.role.includes('SupportAdmin')
                  "
                >
                  <router-link
                    :to="{
                      name: 'shift',
                      query: { branchId: this.$route.query.branchId, companyId: $route.query.companyId },
                    }"
                    class="vue_router_link"
                  >
                    Shift
                  </router-link>
                </li>
                <li
                  v-if="
                    userDetails.role.includes('ManageOutlet') ||
                    userDetails.role.includes('ViewOutlet') ||
                    userDetails.role.includes('SupportAdmin')
                  "
                >
                  <router-link
                    :to="{
                      name: 'BranchTerminals',
                      query: { branchId: this.$route.query.branchId, companyId: $route.query.companyId },
                    }"
                    class="vue_router_link"
                    :class="
                      activeRoute === 'BranchTerminals'
                        ? 'navbar_item_active'
                        : ''
                    "
                  >
                    POS Terminals
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li
            class="list-group-item"
            :class="
              activeRoute === 'branch_invoice' ? 'navbar_item_active' : ''
            "
            v-if="
              userDetails.role.includes('ViewInvoices') ||
              userDetails.role.includes('ManageOutlet') ||
              userDetails.role.includes('SupportAdmin')
            "
          >
            <router-link
              :to="{
                name: 'branch_invoice',
                query: this.$route.query.branchId
                  ? {
                      branchId: this.$route.query.branchId,
                      companyId: $route.query.companyId

                    }
                  : null,
              }"
              class="vue_router_link"
            >
              <span class="mr-2"
                ><img src="@/assets/img/invoice.png" width="20px"
              /></span>
              <span class="sidenav_list_title"> Invoices </span>
            </router-link>
          </li>
          <li
            class="list-group-item"
            :class="activeRoute === 'branch_assets' ? 'navbar_item_active' : ''"
            v-if="
              userDetails.role.includes('ViewAsset') ||
              userDetails.role.includes('ManageOutlet') ||
              userDetails.role.includes('SupportAdmin')
            "
          >
            <router-link
              :to="{
                name: 'branch_assets',
                query: this.$route.query.branchId
                  ? {
                      branchId: this.$route.query.branchId,
                      companyId: $route.query.companyId

                    }
                  : null,
              }"
              class="vue_router_link"
            >
              <span class="mr-2"
                ><img src="@/assets/img/Asset.png" width="20px"
              /></span>
              <span class="sidenav_list_title"> Assets </span>
            </router-link>
          </li>
          <li
            class="list-group-item"
            v-if="isIndustryManager"
            :class="
              activeRoute === 'IndustrialBranchDashboard'
                ? 'navbar_item_active'
                : ''
            "
          >
            <router-link
              :to="{
                name: 'IndustrialBranchDashboard',
                query: this.$route.query.branchId
                  ? { branchId: this.$route.query.branchId, companyId: $route.query.companyId }
                  : null,
              }"
              class="vue_router_link"
            >
              <span class=""
                ><i
                  class="mr-2 fa fa-cogs text-sm text-white"
                  aria-hidden="true"
                ></i
              ></span>
              <span class="sidenav_list_title"> Generator System </span>
            </router-link>
          </li>
          <li
            v-if="userDetails.role.includes('SupportAdmin')"
            class="list-group-item"
            :class="
              activeRoute === 'company_invoice' ? 'navbar_item_active' : ''
            "
          >
            <router-link
              :to="{
                name: 'supportCompanies',
              }"
              class="vue_router_link"
            >
              <span class="mr-2">
                <img src="https://test-admin.epump.ng/img/profile.c07aa991.svg" width="20px" />
              </span>
              <span class="sidenav_list_title"> Support Admin </span>
            </router-link>
          </li>
          <li
            class="list-group-item m-view vue_router_link"
            @click="signOutUser"
          >
            <a href="" class="vue_router_link">
              <span class="mr-2"
                ><i
                  class="fa fa-sign-out mr-3"
                  style="font-size: 20px; color: white"
                ></i
              ></span>
              <span class="sidenav_list_title"> Logout </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>


<script>
import LogoUrl from "@/assets/img/logo.svg";
import masterbackgroundUrl from "@/assets/img/retain.jpg";
import configObject from "@/config";
import countryProducts from "@/products";
import WarningModal from "@/components/modals/Dashboard/warningModal";
import SuspendedModal from "@/components/modals/Dashboard/suspendedModal";

export default {
  name: "MasterLayout",
  components: {
    WarningModal,
    SuspendedModal,
  },
  data() {
    return {
      statusInfo: {},
      LogoUrl,
      masterbackgroundUrl,
      branchIcon: "",
      companyIcon: null,
      showPumpsFaultDropdown: false,
      showReportsDropDownHover: false,
      branch: { name: "STATION" },
      // company: localStorage.getItem("companyDetails")
      //   ? JSON.parse(localStorage.getItem("companyDetails"))
      //   : { name: "STATION" },
      collapseNavbar: true,
      activeRoute: null,
      mobileNav: this.$store.getters.getMobileNavDrawer,
      userDetails: localStorage.getItem("userDetails")
        ? JSON.parse(localStorage.getItem("userDetails"))
        : null,
      isIndustryManager: false,
      companyId: ''
    };
  },
  watch: {
    collapseNavbar(value) {
      const allListTitles = Array.from(
        document.querySelectorAll(".sidenav_list_title")
      );
      if (value) {
        allListTitles.forEach((el) => {
          el.style.display = "none";
        });
      }
    },
  },
  computed: {
    userName: {
      get() {
        return `${this.userDetails.firstName}  ${this.userDetails.lastName}`;
      },
      set(value) {},
    },
  },
  created() {
    if (this.$route.query.companyId) {
      this.companyId = this.$route.query.companyId
      this.$eventHub.$emit('companyId', this.$route.query.companyId)
    }
    if (this.$route.query.branchId) {
      this.checkStatus();
      const useId = this.$route.query.companyId ?  this.$route.query.companyId : "";
      this.axios
        .get(
          `${configObject.apiBaseUrl}/Company/Branches/${useId}`,
          configObject.authConfig()
        )
        .then((response) => {
          const companyBranch = response.data.filter(
            (cur) => cur.id === this.$route.query.branchId
          );
          this.branch = companyBranch[0];
          this.$eventHub.$emit("branch", this.branch);
        })
        .catch((error) => {
          if (error.response && error.response.status == 401) {
            return;
          }
          if (error.message && error.message === "Network Error") {
            this.$toast.open({
              message: "Network Error, Please Check Your Internet Connection",
              type: "error",
              duration: 5000,
            });
          } else {
            this.$toast.open({
              message: "An Error Occured",
              type: "error",
              duration: 5000,
            });
          }
        });
    }
    if (!localStorage.getItem("userDetails")) {
      this.$router.push({ name: "login" });
    }
    if (localStorage.getItem("companyDetails")) {
      this.companyIcon = JSON.parse(localStorage.getItem("companyDetails")).url;
    } else {
      this.companyIcon = null;
    }
  },
  beforeMount() {
    this.activeRoute = this.$route.name;
  },
  mounted() {
    if (
      this.userDetails.role.includes("Branch") &&
      !this.$route.query.branchId
    ) {
      this.getBranch();
    }
    if (this.userDetails.role.includes("IndustryManager")) {
      this.isIndustryManager = true;
    }
    this.computeUserDetails();
    $(".treeview > a").on("click", function (e) {
      e.preventDefault();
      var me = $(this);

      if (me.parent("li").hasClass("open")) {
        //close me
        me.parent("li").removeClass("open");
      } else {
        // Open me & close others
        $(".treeview").removeClass("open");
        me.parent("li").addClass("open");
      }
    });
  },
  methods: {
    showNotification() {
      const status = this.statusInfo.status;
      if (status == 1) this.showWarningModal();
      if (status == 2) this.showSuspendedModal();
    },
    checkStatus() {
      const modalShown = this.$store.getters.getBranchModalShown;
      if (modalShown) {
        this.statusInfo = this.$store.getters.getBranchStatusInfo;
        return;
      }

      let compId;

      if (!this.$route.query.branchId) {
        const branches = localStorage.getItem("totalBranches")
          ? JSON.parse(localStorage.getItem("totalBranches"))
          : null;
        if (branches.length) {
          compId = branches[0].companyId;
        }
      }

      const endpoint = this.$route.query.branchId
        ? `${configObject.apiBaseUrl}/Invoices/status?companyId=${this.$route.query.companyId ? this.$route.query.companyId : this.$store.getters.getCompanyDetails.id}&branchId=${this.$route.query.branchId}`
        : `${configObject.apiBaseUrl}/Invoices/status?companyId=${this.$route.query.companyId ? this.$route.query.companyId : this.$store.getters.getCompanyDetails.id}&branchId=${this.branch.id}`;
      this.axios
        .get(endpoint, configObject.authConfig())
        .then((response) => {
          this.statusInfo = response.data;
          if (response.data.status == 1) {
            if (
              this.$route.name !== "branch_invoice" &&
              this.$route.name !== "branch_invoice_details" &&
              this.$route.name !== "branch_invoice_payments"
            ) {
              this.showWarningModal();
              this.$store.commit("setBranchModalShown", true);
            }
          }
          if (response.data.status == 2) {
            if (
              this.$route.name !== "branch_invoice" &&
              this.$route.name !== "branch_invoice_details" &&
              this.$route.name !== "branch_invoice_payments"
            ) {
              this.showSuspendedModal();
            }
          }
          this.$store.commit("setBranchStatusInfo", response.data);
        })
        .catch((error) => {});
    },
    showWarningModal() {
      this.$modal.show("warningModal");
    },
    showSuspendedModal() {
      this.$modal.show("suspendedModal");
    },
    changeCountry(e) {
      this.$store.commit("setCountry", e.target.value);
      const locale = `${this.$store.getters.getLanguage}-${this.$store.getters.getCountry}`;
      this.$root.$i18n.locale = locale;
      localStorage.setItem("locale", locale);

      localStorage.setItem(
        "countryProducts",
        JSON.stringify(countryProducts[e.target.value])
      );
      this.$store.commit("setCountryProducts", countryProducts[e.target.value]);
    },
    changeLanguage(e) {
      this.$store.commit("setLanguage", e.target.value);
      const locale = `${this.$store.getters.getLanguage}-${this.$store.getters.getCountry}`;
      this.$root.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    },

    signOutUser() {
      const answer = window.confirm(
        this.$t("text.bMasterLayout.confirmLogout")
      );
      if (answer) {
        if (localStorage.getItem("locale")) {
          const locale = localStorage.getItem("locale");
          this.$store.commit("setBaseLocale", locale);
        }
        this.$store.commit("setModalShown", false);
        this.$store.commit("setStatusInfo", {});
        this.$store.commit("setBranchModalShown", false);
        this.$store.commit("setBranchStatusInfo", {});

        localStorage.clear();
        this.$router.push({ name: "login" });
      }
    },
    changeRoute(routeName) {
      this.$router.push({
        name: routeName,
        query: this.$route.query.branchId
          ? {
              branchId: this.$route.query.branchId,
              companyId: $route.query.companyId

            }
          : null,
      });
    },
    computeUserDetails() {
      if (localStorage.getItem("userDetails")) {
        this.userDetails = JSON.parse(localStorage.getItem("userDetails"));

        this.userName =
          this.userDetails.firstName + "  " + this.userDetails.lastName;
      } else {
        this.userName = "Username";
      }
      if (this.userDetails.role.includes("Branch Manager")) {
        if (
          this.branch !== null &&
          this.branch.companyLogoUrl !== null &&
          this.branch.companyLogoUrl !== ""
        ) {
          this.branchIcon = this.branch.companyLogoUrl;
        } else {
          this.branchIcon = null;
        }
      } else {
        if (localStorage.getItem("companyDetails")) {
          this.company = JSON.parse(localStorage.getItem("companyDetails"));
          this.branchIcon = this.company.url;
        } else {
          this.branchIcon = null;
        }
      }
    },
    getBranch() {
      this.axios
        .get(
          `${configObject.apiBaseUrl}/Company/MyBranches`,
          configObject.authConfig()
        )
        .then((response) => {
          localStorage.setItem("totalBranches", JSON.stringify(response.data));
          if (response.data.length > 0) {
            this.branch = response.data[0];
            this.checkStatus();
            this.$eventHub.$emit("branch", response.data[0]);
            this.computeUserDetails();
          }
        })
        .catch((error) => {});
    },
    timeSince(date) {
      let seconds = Math.floor((new Date() - date) / 1000);
      seconds = Math.abs(seconds);

      var interval = seconds / 31536000;

      if (interval > 1) {
        return (
          Math.floor(interval) +
          (Math.floor(interval) == 1 ? " year " : " years ")
        );
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return (
          Math.floor(interval) +
          (Math.floor(interval) == 1 ? " month " : " months ")
        );
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return (
          Math.floor(interval) +
          (Math.floor(interval) == 1 ? " day " : " days ")
        );
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return (
          Math.floor(interval) +
          (Math.floor(interval) == 1 ? " hour " : " hours ")
        );
      }
      interval = seconds / 60;
      if (interval > 1) {
        return (
          Math.floor(interval) +
          (Math.floor(interval) == 1 ? " minute " : " minutes ")
        );
      }
      return (
        Math.floor(seconds) +
        (Math.floor(interval) == 1 ? " second " : " seconds ")
      );
    },
    toggleCollapsibleNavBar() {
      this.collapseNavbar = !this.collapseNavbar;
      const allListTitles = Array.from(
        document.querySelectorAll(".sidenav_list_title")
      );
      const treeviews = Array.from(document.querySelectorAll(".treeview"));

      if (!this.collapseNavbar) {
        const allListTitles = Array.from(
          document.querySelectorAll(".sidenav_list_title")
        );
        allListTitles.forEach((el) => {
          el.style.display = "inline";
        });
        treeviews.forEach((el) => {
          if (Array.from(el.classList).includes("list_open")) {
            el.classList.remove("list_open");
            el.classList.add("open");
          }
        });
      } else {
        if (
          document.querySelector(".sidebar").classList.contains("collapsed")
        ) {
          allListTitles.forEach((el) => {
            el.style.display = "none";
          });
        }

        treeviews.forEach((el) => {
          if (Array.from(el.classList).includes("open")) {
            el.classList.add("list_open");
            el.classList.remove("open");
          }
        });
      }
    },
    toggleSidenavText() {
      const allListTitles = Array.from(
        document.querySelectorAll(".sidenav_list_title")
      );
      const treeviews = Array.from(document.querySelectorAll(".treeview"));

      if (this.collapseNavbar) {
        allListTitles.forEach((el) => {
          el.style.display = "inline";
        });
        treeviews.forEach((el) => {
          const classList = Array.from(el.classList);
          if (classList.includes("open")) {
            el.classList.add("open");
            el.classList.remove("list_open");
          }
        });
      }
    },
    hideTitles() {
      const allListTitles = Array.from(
        document.querySelectorAll(".sidenav_list_title")
      );

      Array.from(document.querySelectorAll("li")).forEach((li) => {
        li.classList.remove("open");
      });

      if (this.collapseNavbar) {
        allListTitles.forEach((el) => {
          el.style.display = "none";
        });
      }
    },
    // logout() {
    //     localStorage.clear();
    //     this.$router.push({name: 'login'});
    // }
  },
};
</script>

