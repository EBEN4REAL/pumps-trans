<template>
  <div style='width: 95%; margin-top: 50px; margin: 0 auto'>
      <div class="fuel_consumption_row">
        <div class="card_container" style="flex: 0 0 20%;border: 1px solid #d3d3d35c;
    border-radius: 10px;}">
          <div class="row align-items-center fuel_consumption_buttons_row">
            <div class="col-md-12 fuel_consumption_btn_div mt-3">
              <div class="fuel_consumption_button active_tab" style="width: 100px; height: 100px">
                <h3 class="text-white">{{ transactionCount }}</h3>
              </div>
              <div class="text-center voucher_type mt-2">Total transactions</div>
            </div>
          </div>
        </div>
        <div
          class="fuel_consumption_row_right_section mr-3 pmp__bg" style="border-radius: 10px">
          <div class="row align-items-center" style="height: 100%">
            <div class="col-md-6">
              <div
                class="transaction_period_text text-center branch__sales__text"
                style="font-size: 22px;"
              >Pump transactions</div>
            </div>
            <div class="col-md-4 drop_down_input_group">
              <vue-ctk-date-time-picker
                    v-model="dateRange"
                    :max-date="maxDate"
                    :range="true"
                    :autoClose="true"
                    :custom-shortcuts="customShortcuts"
                    format="DDMMYYYY"
                    formatted="DD/MM/YYYY"
                    label="select date range"
                  />
            </div>
          </div>
        </div>
      </div>
      <section class="products_summary__wrapper mt-3 pb-3">
        <div class="row" style="margin-right: 0px;">
          <div class="col-md-4 pump_trans_mob" style="padding-right: 0px !important">
            <div class>
              <div class="pump__transaction__header_1 text-center">
                <p class>{{ totalVolume }} Ltrs</p>
                <div class="mt-4">
                  <span>
                    <img src="@/assets/img/measure.png" width class />
                  </span>
                </div>
                <p class="mt-3">Total volume</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 pump_trans_mob" style="padding-right: 0px !important">
            <div class>
              <div class="pump__transaction__header_3">
                <p class>{{ transactionCount }}</p>
                <div class="mt-3">
                  <span>
                    <img src="@/assets/img/to-do.png" width class />
                  </span>
                </div>
                <p class="mt-4">Total transactions</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 pump_trans_mob" style="padding-right: 0px !important">
            <div class>
              <div class="pump__transaction__header_2">
                <p class>{{ averageLitre.toFixed(2) }} ltrs</p>
                <div class="mt-3">
                  <span>
                    <img src="@/assets/img/analytics (1).png" width class />
                  </span>
                </div>
                <p class="mt-4">Average litres</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="section-2 mt-3">
        <section>
          <div class="dashboard__table__section mt-3">
            <div class="branch__sales__text_header">
              <div class="row">
                <div class="col-md-8">
                  <span class="sec_text_color">
                    <img src="@/assets/img/hand (1).png" class="mr-3" />
                    pump transactions between {{startDate}} and {{endDate}}
                    <!-- {{$t('text.pumpTransactions.branchSales')}} {{ $d(new Date(startDate), 'short', this.$root.$i18n.locale) }} {{$t('text.and.text')}}
                    {{ $d(new Date(endDate), 'short', this.$root.$i18n.locale) }} -->
                  </span>
                </div>
                <div class="col-md-4 text-right"></div>
              </div>
              <ejs-grid
                v-show="!showLoader"
                ref="dataGrid"
                :dataBound="dataBound"
                :created="refreshGrid"
                :allowPaging="true"
                :allowSorting="true"
                :pageSettings="pageSettings"
                :toolbar="toolbar"
                :searchSettings="search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
                :excelQueryCellInfo='excelQueryCellInfo'
              >
                <e-columns>
                  <e-column width="80" field="index" headerText="#"></e-column>
                  <e-column field="date" width="200" headerText="Date" ></e-column>
                  <e-column field="pump" width="200" headerText="Pump"></e-column>
                  <e-column field="volume" format='N2' width="200" headerText="Volume"></e-column>
                  <e-column field="price" format='N2' width="200" headerText="Price"></e-column>
                </e-columns>
              </ejs-grid>
              <TableLoader :showLoader="showLoader" />
            </div>
          </div>
        </section>
      </div>
  </div>
</template>

<script>
import backgroundUrl from "@/assets/img/MobileWallet.png";
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index";
import countryProducts from "@/products";
import {
  Page,
  Sort,
  Toolbar,
  Search,
  ExcelExport,
  PdfExport
} from "@syncfusion/ej2-vue-grids";

export default {
  name: "Pump Transactions",
  components: {
    TableLoader
  },
  provide: {
    grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
  },
  data() {
    return {
       formatOptions: { type: "date", format:  "dd/MM/yyyy hh:mm a"},
      branch: {},
      branchId: null,
      startDate: this.$route.date
        ? this.$moment(this.$route.date, "DD-MM-YYYY").format("MMMM D, YYYY")
        : this.$moment()
            .subtract(7, "days")
            .format("MMMM D, YYYY"),
      endDate: this.$route.date ? null : this.$moment().format("MMMM D, YYYY"),
      pluginStartDate: this.$moment()
        .subtract(7, "days")
        .format("D-M-YYYY"),
      pluginEndDate: this.$moment().format("D-M-YYYY"),
      dateRange: { start: this.pluginStartDate, end: this.pluginEndDate },
      customShortcuts: [
        { key: "Today", label: 'Today', value: "day" },
        { key: "yesterday", label: 'Yesterday', value: "-day" },
        { key: "last7Days", label: 'Last  7 days', value: 7 },
        { key: "lastWeek", label: 'Last week', value: "-isoWeek" },
        { key: "last30Days", label: "Last 30 Days", value: 30 },
        { key: "lastMonth", label: "Last Month", value: "-month" }
      ],
      maxDate: this.$moment(new Date()).format("YYYY-MM-DD"),
      backgroundUrl,
      pageSettings: { pageSizes: [10, 20, 50, 100, 200], pageCount: 4, pageSize: 10 },
      toolbar: ["ExcelExport", "PdfExport", "Search"],
      search: { operator: "contains", ignoreCase: true },
      showLoader: false,
      showAll: false,
      transactionCount: 0,
      totalVolume: 0,
      averageLitre: 0,
      pumpId: '',
      date: this.$route.query.date,
      pump: { displayName: "" }
    };
  },
  created() {
    document.title = "Pumps Transactions"
    this.showLoader = true;
  },
  computed: {
    countryProducts: function () {
      return this.$store.getters.getCountryProducts
    }
  },
  beforeDestroy() {
    
  },
  watch: {
    dateRange: function(newRange, oldRange) {
      if (newRange.start !== null && newRange.end !== null) {
        this.startDate = this.$moment(newRange.start, "DD-MM-YYYY").format(
          "MMMM D, YYYY"
        );
        this.endDate = this.$moment(newRange.end, "DD-MM-YYYY").format(
          "MMMM D, YYYY"
        );
        this.getPumpTransactions();
      }
    },
  },
  mounted() {
    this.getPumpTransactions()
  },
  methods: {
    excelQueryCellInfo(args) {
      if(args.column.field == 'date') {
        args.value = this.$moment(args.value).format('DD/MM/YYYY hh:mm A')
      }
    },
    activateTab(voucher_type) {
      this.activeTab = voucher_type;
    },
    dataBound: function() {
      this.$refs.dataGrid.autoFitColumns();
    },
    changeRoute(route) {
      this.$router.push({ name: route });
    },
    toolbarClick(args) {
      switch (args.item.text) {
        case "PDF Export":
          this.$refs.dataGrid.pdfExport();
          break;
        case "Excel Export":
          this.$refs.dataGrid.excelExport();
          break;
      }
    },
    refreshGrid() {
      this.$refs.dataGrid.refresh();
    },
    getPumpTransactions() {
      this.showLoader = false;

      const data = [
        {
          index: 1,
          date: "29-09-2021",
          pump: "P1",
          amount: 2.5,
          volume: 2.10,
          price: 120
        },
        {
          index: 2,
          date: "28-09-2021",
          pump: "P2",
          amount: 1.0,
          volume: 0.87,
          price: 120
        }
      ]

      this.transactionCount = data.length
      this.$refs.dataGrid.ej2Instances.setProperties({
        dataSource: data
      });
      this.refreshGrid();

      return
      this.axios
        .get(
          `${configObject.apiBaseUrl}/Branch/PumpTransactions?pumpId=${this.$route.query.id}&strtDate=${this.startDate}&endDate=${this.endDate}&branchId=${this.branchId}&esales=false`,
          configObject.authConfig()
        )
        .then(response => {
          this.showLoader = false;
          this.$refs.dataGrid.ej2Instances.setProperties({
            dataSource: response.data
          });
          this.refreshGrid();
        })
        .catch(error => {
          this.showLoader = false;
        });
    },
    convertThousand(req) {
      if (!isFinite(req)) {
        return "0.00";
      }
      return req
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>
