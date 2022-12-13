<template>
  <div>
    正在搜索
  </div>
</template>

<script>
import {searchRequest} from "@/views/SearchResult/searchRequest";

export default {
  name: "Searching",
  mounted() {
    searchRequest(this.$store.getters.get_search_param).then(res=>{
      console.log(res.data)
      this.$store.commit('mod_page_info',res.data)
      console.log('Header完成搜索')
    }).then(()=>{
      console.log("进入 searchResult")
      this.$router.push('/searchResult')
    })
    setTimeout(3000,()=>{

    })
  }
}
</script>

<style scoped>

</style>