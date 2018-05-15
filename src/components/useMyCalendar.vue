<template>
  <div id="useMyCalendar">
    <div class="title">
      <button :disabled="current == 'now'" @click="changeMonth('now')">本月</button>
      <button :disabled="current == 'next'" @click="changeMonth('next')">下个月</button>
    </div>
    
    <div class="calendar">
      <my-calendar 
        ref="myCalendar"
        :show-month-btn="showMonthBtn"
        :show-year-btn="showYearBtn"
        :events="eventList"
        @showDetails="showDetails"
        @updateEvents="updateEvents">
      </my-calendar>
      <div v-if="currentTitle" class="eventDetails">
        <div class="eventTitle">总欠款额度: {{currentTitle}}</div>
        <div class="eventCount">共有: {{currentCount}} 笔</div>
        <div class="eventlist" v-if="currentList.length > 0" v-for="(item, idx) in currentList" :key="idx">
          资金单编号 : {{item.id}}
          <br>
          公司名称 : {{item.company}}
          <br>
          欠款额度 : {{item.money}}
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMonthBtn: true,
      showYearBtn: true,
      current: 'now',
      currentDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
      eventList: [
        {
          day: 11,
          title: "￥ 9,000,000.00",
          count: 6,
          list: [
            {
              id: "001",
              company: "companyName001",
              money: "￥ 1,000,000.00"
            },
            {
              id: "002",
              company: "companyName002",
              money: "￥ 2,000,000.00"
            },
            {
              id: "003",
              company: "companyName003",
              money: "￥ 1,000,000.00"
            },
            {
              id: "006",
              company: "companyName006",
              money: "￥ 3,000,000.00"
            },
            {
              id: "007",
              company: "companyName007",
              money: "￥ 1,000,000.00"
            },
            {
              id: "008",
              company: "companyName008",
              money: "￥ 1,000,000.00"
            }
          ]
        },
        {
          day: 14,
          title: "￥ 2,000,000.00",
          count: 2,
          list: [
            {
              id: "004",
              company: "companyName004",
              money: "￥ 1,000,000.00"
            },
            {
              id: "005",
              company: "companyName005",
              money: "￥ 1,000,000.00"
            }
          ]
        }
      ],
      currentTitle: null,
      currentCount: null,
      currentList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      console.log('getdata',this.currentDate)
    },
    showDetails(value) {
      console.log(value)
      this.currentTitle = null;
      this.currentCount = null;
      this.currentList = [];
      if(value.title) {
        this.currentTitle = value.title;
        this.currentCount = value.event.count;
        this.currentList = value.event.list;
      }
      
    },
    changeMonth(type) {
      if(type == this.current) {
        return;
      }
      this.current = type;
      // console.log(this.$refs)
      this.$refs.myCalendar.changeMonth(type);
    },
    updateEvents(dateStr) {
      this.currentDate = dateStr;
      console.log('updateEvents', this.currentDate);
    }
  }
};
</script>

<style scoped>
#useMyCalendar {
  
}
#useMyCalendar .title {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 10px;
}
#useMyCalendar .calendar {
  width: 80%;
  min-width: 750px;
  height: 450px;
  margin: 0 auto;
}
#useMyCalendar .calendar .myCalendar {
  width: 70%;
  float: left;
}
#useMyCalendar .calendar .eventDetails {
  float: right;
  width: 28%;
  min-width: 200px;
  height: 451px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 4px;
  line-height: 24px;
}
#useMyCalendar .eventDetails .eventTitle {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#useMyCalendar .eventDetails .eventCount {
  padding-left: 20px;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#useMyCalendar .eventDetails .eventlist {
  padding-left: 20px;
  font-size: 14px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

