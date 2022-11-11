<template>
     <v-app>
     <v-tooltip bottom >
      <template v-slot:activator="{ on, attrs }">
 
    <v-btn  class="ajout"  v-bind="attrs" v-on="on" color="cyan accent-2" buttom   right absolute @click.stop="ajout_assistant = true" > ajouter nouveau condidat <v-icon >mdi-folder</v-icon>  
       
    </v-btn>  
    
      </template>
    <span>ajout condidat</span>

           </v-tooltip>  
  
        
    

  <div  class="tablee">
       
  <v-data-table
    :headers="headers"
    :items="assistant"
    :items-per-page="5"
    class="elevation-1 mt-12 "
  >
  <template v-slot:item.show="{ item }">

<v-btn color="red accent-2" @click="opencv(item.cv)">
   show
</v-btn>
</template>
</v-data-table>
</div>
<v-snackbar v-model="snackbar" :timeout="timeout">
            <v-alert class="mt-5  tab  " text type="success">
            condidat suprimer avec succès
            </v-alert>
            <template v-slot:action="{ attrs }">
              <v-btn color="blue"  v-bind="attrs" @click="snackbar = false &&this.$refs.form.reset(); dialog = false">
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
 
          <Assistant v-bind:ajout_assistant.sync="ajout_assistant"></Assistant>
 <confirm ref="confirm"></confirm>

    </v-app>
</template>
<script>
import axios from "axios"
import  Assistant from "../modals/ajoutcondidat.vue"
import moment from 'moment';
import confirm from "../modals/confirm"
export default ({
   name:"assistant",
components:{
Assistant,
confirm
},
 data () {
      
      return {
          snackbar: false,
      timeout: 10000,
      loading: false,
          
     ajout_assistant:false,
           headers: [{
            text: 'name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Position', value: 'posiotion' },
          { text: 'office', value: 'office' },
          { text: 'Age', value: 'age' },
          { text: 'Start Date', value: 'start_date' },
          { text: 'Salary', value: 'salary' },
          { text: 'circulame  vitae', value: 'show' },
        ],
     assistant:[],
     
     }
 },
        mounted(){
          axios.get('http://127.0.0.1:3000/admin/getallcondidat')
          
         .then((response) => {
   
  
    




 
                var name = {}
                var posiotion = {}
                var office = {}
                var age = {}
                var start_date = {}
                var salary = {}
                var cv={}

                response.data.result.map(rv => {

                    name = rv.name
                    posiotion = rv.position
                    office = rv.office
                    age = rv.Age
                    salary = rv.Salary
                    cv=rv.cv
                    if(rv.Start_date){
                        start_date = moment(new Date(rv.Start_date)).format("YYYY-MM-DD") 
                    }else{
                        start_date=' '
                    }
                  
                 
                    this.assistant.push({
                      id : rv._id,
                      name: name,
                      posiotion:posiotion,
                      office:office,
                      age: age,
                      start_date: start_date,
                      salary: salary,
                      cv:cv,
                  
                        
                    })
                })
                console.log("assista:"+this.assistant.name);
  }).catch((error)=>{
      console.log(error);
    })
   
         
          
        },
        methods:{

   opencv(cv) {
        window.open(cv,'_blank')
    },

           delete_assistant:function(id){
                this.$refs.confirm.open(`suprimer`, 'Voulez-vous vraiment supprimer ce assistant ?', {
          color: 'primary'
        })
        .then(async () => {
            console.log(id);
          
                 let response=  axios.post(`http://127.0.0.1:5000/user/delete_assistant/${id}`)
                if(response.data==200){
                      setTimeout(location.reload(), 3000); 
                  this.snackbar=true
                    
                }

           
        }).catch((err)=>{
            console.log(err)
        })

        }
        }

})
</script>

<style lang="scss" scoped>
 table  .v-data-table-header{
  background-color: aquamarine;
 }

</style>