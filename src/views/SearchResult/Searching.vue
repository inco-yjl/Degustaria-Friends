<template>
  <div class="search-loading">
    <v-sheet
        :color="`grey 'lighten-4'}`"
        :elevation="12"
    >
      <v-skeleton-loader
          ref="skeleton"
          type='card'
      ></v-skeleton-loader>
      <v-skeleton-loader
          ref="skeleton"
          type='list-item-avatar-three-line'
          v-for="i in 7"
      ></v-skeleton-loader>
    </v-sheet>
  </div>
</template>

<script>
import {searchRequest} from "@/views/SearchResult/searchRequest";

export default {
  inject: ['theme'],
  name: "Searching",
  mounted() {
    let word=this.$store.getters.get_search_param.search_word
    if(word==undefined||word.length==0||word[0].length==0){
      this.$router.push('/home')
    }
    searchRequest(this.$store.getters.get_search_param).then(res=>{
      console.log(res.data)
      let data=res.data
      if(data===undefined&&data.res!==undefined){
        data.papers=data.res
      }
      this.$store.commit('mod_page_info',data)
      console.log('Header完成搜索')
    }).then(()=>{
      console.log("进入 searchResultPage")
      this.$router.push('/searchResult')

    })
  },
  data: () => ({
    boilerplate: false,
    tile: false,
    types: [],
  }),
}
</script>

<style scoped lang="scss">
.search-loading{
  padding-top: 4%;
  padding-left: 10%;
  padding-right: 10%;

}
</style>