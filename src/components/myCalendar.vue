<template>
  <div class="myCalendar">
    <div class="title">
      <i v-if="showMonthBtn" class="iconLeft" @click.stop="changeMonth('prev')">&lt;</i>
      <i v-if="showMonthBtn" class="iconRight" @click.stop="changeMonth('next')">&gt;</i>
      <div class="titleDay">
        <i v-if="showYearBtn" @click.stop="changeYear('prev')" class="iconLeft">&lt;&nbsp;</i>
        {{currentYear}}
        <i v-if="showYearBtn" @click.stop="changeYear('next')" class="iconRight">&nbsp;&gt;&nbsp;</i>
        年 {{currentMonth + 1}} 月
      </div>
      
    </div>
    <div class="weeks">
      <ul>
        <li v-for="item in weeks">{{item}}</li>
      </ul>
    </div>
    <div class="days">
      <ul v-if="days.length > 0">
        <!-- 判断dateType确实是本月的日子，并且通过2018-5-6格式判断确实是今天 -->
        <li @click.stop="showDetails(item)" :class="{today: item.dateType == '0' && currentDate == item.date, active: item.dateType == '0' && selectedDay == item.date, otherMonth: item.dateType == '1'}" v-for="(item, idx) in days" :key="idx">
          <div class="day">{{item.day}}</div>
          <div class="content" v-if="item.title">{{item.title}}</div>
          <div class="todayTitle" v-if="item.dateType == '0' && currentDate == item.date">(今天)</div> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showMonthBtn: {
        type: Boolean,
        required: false,
        default: true
      },
      showYearBtn: {
        type: Boolean,
        required: false,
        default: true
      },
      events: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth(),
        currentDay: new Date().getDate(),
        currentDate: '',
        selectedDay: -1,
        currentWeek: new Date().getDay(),
        days: [],
        weeks: ['周日','周一','周二','周三','周四','周五','周六'],
        mockData: []
      }
    },
    created() {
      this.mockData = this.events;
      this.currentDate = this.currentYear + '-' + (this.currentMonth + 1) + '-' + this.currentDay;
      // this.selectedDay = this.currentDate;
      this.mockData.forEach((event) => {
        if(this.currentDay == event.day) {
          this.showDetails({
            date: this.currentDate,
            dateType: '0',
            day: this.currentDay,
            month: this.currentMonth,
            year: this.currentYear,
            title: event.title,
            event: event
          })
          return;
        }
      })
      this.initDate();
    },
    methods: {
      //刷新日历
      initDate() {
        this.days.length = 0;
        let firstDay = new Date(this.currentYear, this.currentMonth, 1); //本月的第一天，currentMonth这里不能加一，只有涉及到页面显示才+1
        // let nowDate = new Date(this.currentYear, this.currentMonth, 1)
        // nowDate.setDate(0);
        // let lastDay = nowDate.getDate();
        // let weekOfLastday = nowDate.getDay();

        let dayOfWeek = firstDay.getDay(); //获取这个月第一天周几 1-6,0

        let startDate = new Date(firstDay); //设置列表开始日期
        startDate.setDate(firstDay.getDate() - dayOfWeek); //设置列表开始日期，比如1号周二，setDate(0)是上个月最后一天，-1是倒数第二天

        let item, status, tempItem;
        for (let i = 0; i < 42; i++) { //6周，每周7天，42格
            item = new Date(startDate); //上个月第几天开始
            item.setDate(startDate.getDate() + i); //设置列表开始日期，这里的开始日期是指42格第一格开始的日期
            let date = item.getDate();
            // console.log('i:',i,'date:',date,'date-i:',date-i,item.getDay())
            let dateType = '0';//currentMonth
            if(Math.abs(date-i)>=7) {
              // date = '';
              dateType = '1'; //otherMonth
              
            }
            tempItem = {
              year: item.getFullYear(),
              month: item.getMonth()+1,
              day: date,
              date: item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + date,
              dateType: dateType,
            }
            this.mockData.forEach((event) => {
              if(tempItem.dateType == '0' && date == event.day) {
                tempItem.event = event;
                tempItem.title = event.title;
              }
            })
            
            this.days.push(tempItem)
            // if(date-i >= -7) {
            //   //本月和上月直接push
            //   this.days.push(tempItem)
            // }
        }
        //另一种思路：通过 var date = new Date(2018,5,0); date.getDate()来获取到5月有多少天，这里要获取哪个月，前面的date里面就传几，
        //然后拿到这个月第一天是周几，判断往前有几天空白，用7减，unshift空白格
        //然后拿到最后一天是周几，判断后面补满要push几个空白格
        // 计算最后一天周几，往后补空位
        // for(let k = 0; k < 6 - weekOfLastday; k++) {
        //   this.days.push({
        //     year: item.getFullYear(),
        //     month: item.getMonth()+1,
        //     day: date,
        //     date: item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + date,
        //     dateType: dateType,
        //     content: {
        //       count: 0,
        //       total: 0,
        //       list: []
        //     }
        //   })
        // }
        
      },
      //显示详情 - 这里是要触发父组件事件的
      showDetails(item) {
        if(item.dateType == '1'){return;}
        this.selectedDay = item.date;
        // console.log(this.selectedDay , item.date)
        this.$emit('showDetails', item)
      },
      //改变月份，更新事件数据，刷新日历
      changeMonth(type) {
        if(type == 'prev') {
          this.currentMonth -= 1;
          if(this.currentMonth < 0) {
            this.currentYear -= 1;
            this.currentMonth = 11;
          }
        }else if(type == 'next') {
          this.currentMonth += 1;
          if(this.currentMonth > 11) {
            this.currentYear += 1;
            this.currentMonth = 0;
          }
        }else {
          this.currentYear = new Date().getFullYear();
          this.currentMonth = new Date().getMonth();
        }
        let date = this.currentYear + '-' + (this.currentMonth + 1);
        this.$emit('updateEvents', date);
        this.initDate();
      },
      //改变年份，更新事件数据，刷新日历
      changeYear(type) {
        if(type == 'prev' && this.currentYear > 1990) {
          this.currentYear -= 1;
        }else if(type == 'next' && this.currentYear < 2100){
          this.currentYear += 1;
        }else {
          this.currentYear = new Date().getFullYear();
        }
        let date = this.currentYear + '-' + (this.currentMonth + 1);
        this.$emit('updateEvents', date);
        this.initDate();
      }
    }
  }
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.myCalendar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.myCalendar li {
  list-style: none;
  float: left;
  width: 14.28%;
  /* min-width: 40px; */
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-right: 1px solid #ccc;
}
.myCalendar i {
  font-style: normal;
  cursor: pointer;
}
.myCalendar{
  width: 100%;
  /* min-width: 350px; */
  border: 1px solid #ccc;
  /* overflow: hidden; */
}
.myCalendar .title,
.myCalendar .weeks,
.myCalendar .days {
  width: 100%;
  font-size: 14px;
}
.myCalendar .title {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
.myCalendar .title >.iconLeft,
.myCalendar .title >.iconRight {
  float: left;
  width: 40px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  /* cursor: pointer; */
}
.myCalendar .title >.iconLeft:hover,
.myCalendar .title >.iconRight:hover {
  background-color: rgba(0,0,0,.2);
}
.myCalendar .title >.iconRight {
  float: right;
}
.myCalendar .weeks {
  border-bottom: 1px solid #ccc;
}
.myCalendar .weeks ul {
  width: 100%;
  height: 40px;
}
.myCalendar .weeks li {
  /* float: left;
  width: 14.28%;
  min-width: 50px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-right: 1px solid #ccc; */
}
.myCalendar .weeks li:last-child {
  border-right: 0 none;
}
.myCalendar .days ul {
  width: 100%;
  /* height: 360px; */
}
.myCalendar .days li {
  position: relative;
  display: inline-block;
  float: none;
  vertical-align: middle;
  height: 60px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.myCalendar .days li.today {
  background-color: #3367d6;
  color: #fff;
  position: relative;
}
.myCalendar .days li.today .todayTitle {
  position: absolute;
  top: 22px;
  left: 0;
  width: 100%;
  height: 14px;
  line-height: 14px;
  text-align: center;
  font-size: 12px;
  color: #ff5555;
}
.myCalendar .days li.otherMonth {
  color: #ccc;
}
.myCalendar .days li.active {
  background-color: #4D79D3;
  color: #fff;
}
.myCalendar .days li:nth-child(7n) {
  border-right: 0 none;
}
.myCalendar .days li:nth-last-child(-n+7) {
  border-bottom: 0 none;
}
.myCalendar .days .content {
  position: relative;
  width: 100%;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.myCalendar .days .content:hover {
  /* position: absolute;
  top: 0;
  left: 0;
  height: 58px;
  line-height: 20px;
  word-break: break-all;
  overflow: inherit;
  color: #ff3333;
  font-weight: 700;
  font-size: 14px;
  background-color: #fff; */
}
</style>
