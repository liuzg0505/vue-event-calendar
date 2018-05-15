<template>
  <div>
    <vue-event-calendar :events="demoEvents" @monthChanged="monthChange" @dayChanged="dayChange"></vue-event-calendar>
    <br>
    <br>
    <!-- <vue-event-calendar :events="demoEvents2">
      <template slot-scope="props">
        <div v-for="(event, index) in props.showEvents" :key="index" class="event-item">
          {{event}}
        </div>
      </template>
    </vue-event-calendar> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        demoEvents: [{
          date: '2016/12/15',
          title: 'eat',
          desc: 'longlonglong description'
        },{
          date: '2016/11/12',
          title: 'this is a title'
        }],
        demoEvents2: [{
          date: '2018/12/15',
          title: 'sleep',
          desc: 'longlonglong description'
        },{
          date: '2018/11/12',
          title: 'title'
        }]
      }
    },
    methods: {
      monthChange (month) {
        console.log(month)
      },
      dayChange (day) {
        console.log(day)
      }
    }
  }
</script>

<style>

</style>
