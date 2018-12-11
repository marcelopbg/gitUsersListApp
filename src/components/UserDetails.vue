<template lang="html">
<div class="container">
  <div v-if="isLoading===true">
    <div class="loader"></div>
    <br>
    <br>
    <h4>Fetching user details...</h4>

  </div>
  <div v-else>
<div id="rowStyle" class="row">
  <div class="col-sm-2">
  <b> User Id:</b> {{this.details.id}}

  </div>
  <div class="col-sm-5">
    <b> User profile:</b> {{this.details.html_url}}

  </div>
  <div class="col-sm-5">
  <b>Created at: </b> {{this.details.created_at}}
</div>
<br>
</div>
<br>
<br>
<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">link</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="item in paginatedData">
      <td>{{item.id}}</td>
      <td> {{item.name}}</td>
      <td>  <a :href="item.git_url">{{item.html_url}}</a></td>
    </tr>
  </tbody>
</table>


<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li :class="bindPrevClass()"><a class="page-link" v-on:click="prevPage()">Previous</a></li>
    <li v-for="i in (1, totalPages)" :class="bindPageClass(i)"><a class="page-link" v-on:click="goToPage(i)">{{i}}</a></li>
    <li :class="bindNextClass()"><a class="page-link" v-on:click="nextPage()">Next</a></li>
  </ul>
</nav>
</div>
</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat'

export default {
  mounted() {
    this.fetchDetails()
  },
  data() {
    return {
      details: [],
      data: [],
      isLoading: true,
      pageNumber: 0,
      perPage: 8,
      totalPages: '',
      nextUrl: '',
      user: ''


    }
  },
  methods: {
    fetchDetails() {
      var _this  = this
      if(!this.$route.query.user) {
        this.$router.push({ path: '/'})
      }else {
        var username = this.$route.query.user
        this.user = username
        axios.get('https://gitinfoapi.herokuapp.com/users/'+username+'/details', {
        }).then(function(response) {
          _this.details = response.data
          _this.details.created_at = dateFormat(_this.details.created_at)
          _this.fetchRepos()
        }).catch(function(error) {
          console.log(error);
        })
      }
    },
    fetchRepos() {
      var _this = this
      axios.get('https://gitinfoapi.herokuapp.com/users/'+_this.user+'/repos', {
      }).then(function(response) {
        _this.data = response.data
        _this.totalPages = _this.pageCount()
        _this.isLoading = false
      }).catch(function(error) {
        console.log(error);
      })
    },
    bindPrevClass() {
      var _this = this
      if(this.pageNumber===0) {
        return 'page-item disabled'
    }else {
      return 'page-item'
    }
    },
    bindNextClass() {
    var _this = this
    if(this.pageNumber === this.totalPages-1) {
      return 'page-item disabled'
    }else {
      return 'page-item'
    }
    },
    bindPageClass(index) {
    var _this = this
    if(index === _this.pageNumber+1) {
    return 'page-item active'
    }else {
      return 'page-item'
    }
    },
    nextPage(){
      this.pageNumber++;
    },
    prevPage(){
      this.pageNumber--;
    },
    goToPage(index) {
        this.pageNumber =  index-1
    },
    userDetails(user) {
      this.$router.push({ path: '/user/details', query: { user: user }})

    },
    pageCount(){
      var _this = this
      let l = _this.data.length,
      s = _this.perPage;
      return Math.ceil(l/s);
    }

  },
  computed: {
    paginatedData(){
      const start = this.pageNumber * this.perPage,
            end = start + this.perPage;
       return this.data.slice(start, end);
  }
  }
  }
</script>

<style lang="css">

.page-link{
  color: #007bff !important;
      text-decoration: none;
}
.page-item.active .page-link {
  color: #fff !important;
}
.page-item.disabled .page-link {
      color: #6c757d !important;
    pointer-events: none;
    cursor: auto;
    background-color: #fff;
    border-color: #dee2e6;
}
#rowStyle {
  border: 1px solid black;
  border-color: black;
}
</style>
