<template>
    <v-app>
    
       
   

 <div  class="tablee">
      
 <v-data-table
   :headers="headers"
   :items="assistant"
   :items-per-page="5"
   class="elevation-1 mt-12 "
 >
 <template v-slot:item.show="{ item }">

<v-btn color="red accent-2" @click="opencv(item.rapport)">
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


import confirm from "../modals/confirm"
export default ({
  name:"assistant",
components:{

confirm
},
data () {
     
     return {
         snackbar: false,
     timeout: 10000,
     loading: false,
         
    ajout_assistant:false,
          headers: [{
           text: 'nom',
           align: 'start',
           sortable: false,
           value: 'nom',
         },
         { text: 'email', value: 'email' },
        
         { text: 'Rapport', value: 'show' },
       ],
    assistant:[],
    
    }
},
       mounted(){
         axios.get('http://127.0.0.1:3000/admin/getallrapport')
         
        .then((response) => {
  
 
   





               var email = {}
               var nom = {}
               var rapport = {}
              

               response.data.map(rv => {

                   email = rv.email
                   nom = rv.nom
                   rapport = rv.rapport
                  
                
                   this.assistant.push({
                     id : rv._id,
                     nom: nom,
                     email:email,
                     rapport:rapport,
                     
                 
                       
                   })
               })
               console.log("assista:"+this.assistant.name);
 }).catch((error)=>{
     console.log(error);
   })
  
        
         
       },
       methods:{

  opencv(rapport) {
       window.open(rapport,'_blank')
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