<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <p class="text-left"> {{name}} </p>
            </v-col>
            <v-col cols="12">
                <p class="text-left"> {{ researchername }} - 《{{journal}}》</p>
            </v-col>
            <v-col cols="12">
                <p class="text-left"> 被引量：{{quoted}} &nbsp; 发表时间：{{ptime}} </p>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: "PaperShow",
    data() {
        return {
            researchername: this.researchers
        }
    },
    props: {
        name: {type: String},
        researchers: {type: Array},
        quoted: {type: Number},
        journal: {type: String},
        ptime: {type: Number}
    },
    methods: {
        researcherslist: function() {
            let str = "";
            for (researcher in this.researchername) {
                str.concat(researcher).concat(",")
            }
            return str.substring(0, str.length - 2)
        }
    }
}
</script>
