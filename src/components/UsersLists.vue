<template lang="html">
  <div class="container">
    <div v-if="isLoading===true">
      <div class="loader"></div>
      <br>
      <br>
      <h4>Fetching git users...</h4>

    </div>
    <div v-else>
            <div class="container">

      <button id="nextPage" :class="gitNextPageClassBinder()" class="btn btn-primary ml-3 mb-2" type="button" v-on:click="nextGitPage()"> next Git Page <i class="fab fa-github ml-1"></i></button>
      <button id="nextPage" :class="gitPrevPageClassBinder()" type="button" class="btn btn-secondary mb-2" v-on:click="previousGitPage()">previous Git Page <i class="fab fa-github ml-1"></i></button>
      <br>
      <br>
      <br>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Login</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedData">
            <td>{{item.id}}</td>
            <td>  <a v-on:click="userDetails(item.login)" href="#">{{item.login}}</a></td>
          </tr>
        </tbody>
      </table>
</div>
      <br>
      <br>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li :class="bindPrevClass()"><a class="page-link" v-on:click="prevPage()" href="#">Previous</a></li>
          <li v-for="i in (1, totalPages)" :class="bindPageClass(i)"><a class="page-link" v-on:click="goToPage(i)" href="#">{{i}}</a></li>
          <li :class="bindNextClass()"><a class="page-link" v-on:click="nextPage()" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  mounted() {
    this.fetchGitUsers()
  },
  data() {
    return {
      data: [],
      isLoading: true,
      gitPageNumber: 1,
      pageNumber: 0,
      perPage: 8,
      totalPages: '',
      nextUrl: '',

    }
  },
  watch: {
    // gitPageNumber: function(val) {
    //   console.log(val);
    // }
  },
  methods: {
    fetchGitUsers() {
      var _this = this
      axios.get('http://localhost:8080/users?since='+_this.gitPageNumber, {
      }).then(function(response) {
        console.log(response.data);
        _this.data = response.data[0]
        _this.isLoading = false
        _this.totalPages = _this.pageCount()
        _this.nextUrl = response.data[1]
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
    gitPrevPageClassBinder() {
      if(this.gitPageNumber!==1) {
      return 'btn btn-dark'
      }else {
        return 'btn btn-dark disabled'
      }
    },
    gitNextPageClassBinder() {
      
    },
    nextGitPage() {
      var _this = this
      _this.gitPageNumber++;
      _this.fetchGitUsers()  
      
    },
    previousGitPage() {
          var _this = this
          if(_this.gitPageNumber>1) {
      _this.gitPageNumber--;
      _this.fetchGitUsers();
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

<style>
#nextPage {
  float:right;
}

.loader {
  margin: 0 auto;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
#rowsLimitHolder {
float: right;
padding-bottom:100px;
margin-bottom: 12px;
}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
