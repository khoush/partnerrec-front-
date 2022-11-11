<template>

  <v-app class="v-application">

<v-flex>
    <!-- <v-col  v-for="(tech, i) in  page_tech.fiche.seances" v-bind:key="i" > CCD5AE         -->
    <v-card class="ma-9   mt-16" shaped>
      <v-text-field label="Recherche projet" append-icon="search" @click:clear="clearSearch" clearable v-model="search"
        single-line outlined dense>
      </v-text-field>
      <v-row align="center" v-if="page_tech.length>0">
        <v-col v-for="(tech,i) in page_tech" :key="i">
          <v-hover v-slot="{ hover }" open-delay="0">
            <v-card  width="220" height="240" :elevation="hover ? 8 : 2" class=" ma-9  mt-16 pa-2 card-manager"
              :class="{ 'on-hover': hover }">
              <v-speed-dial class="bonjour v-speed-dial  " :top="top"  :right="right"
                :direction="direction">
                <template v-slot:activator>
                  <v-icon>mdi-dots-vertical</v-icon>



                </template>
                <div class="v-speed-dial__list">
                  <v-btn class="list_button" fab dark small color="#CCD5AE "  @click.stop="showmodifier(tech)">
                    <v-icon>mdi-pencil</v-icon>
                               </v-btn>
                               
       

                  <fiche v-bind:openfiche.sync="openfiche"></fiche>
                  <v-btn class="mt-6" fab dark small color="#CCD5AE " @click="confirmdelete(tech._id)">
                    <v-icon>delete_forever</v-icon>
                  </v-btn>

                </div>

              </v-speed-dial>
              
                <img  class="project" :src="tech.image">
             
              <v-divider></v-divider>
              <v-card-title width="100" class="  "> </v-card-title>
              <v-card-subtitle class="  mx-12 layout justify-center "></v-card-subtitle>




              <v-btn class="fiche" color="primary" text :to="`/dashbord/oneprojet/${tech._id}`">cosulter liste  de  poste...
              </v-btn>



            </v-card>
          </v-hover>

        </v-col>
      </v-row>


      <div class="text-center">
        <v-pagination v-model="page" :length="len" :total-visible=len circle></v-pagination>
      </div>
    </v-card>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">

        <v-btn fab v-bind="attrs" v-on="on" color="cyan accent-2" bottom right absolute
          @click.stop="ajoutpassion = true">
          <v-icon>mdi-plus</v-icon>

        </v-btn>

      </template>
      <span>ajout projet</span>

    </v-tooltip>
       </v-flex>
    <modifier v-bind:modifier.sync="modifier" :patient="patient" ></modifier>
    <Passion v-bind:ajoutpassion.sync="ajoutpassion"></Passion>
    <confirm ref="confirm"></confirm>
 
  </v-app>

</template>
<script>
import confirm from "../modals/confirm"
import axios from 'axios';



import Passion from "../modals/ajoutprojet.vue"
export default {
  name:"ajoutpassion",
  props: ["fiche", "listenerChild"],
 components:{
Passion,

confirm,

 },
     data () {
      
      return {
        patient : {},
        ajoutpassion:false,
        openfiche:false,
           direction: 'bottom',
        modifier: false,
        dialog3:false,
        top:true,
        right:true,
       search: '',
        page:1,
        projet:[],

     
      }
    },
    
       
    mounted(){
    axios.get('http://127.0.0.1:3000/admin/getallprojet',{
       headers: {
            "authorization":localStorage.getItem('authorization')
          }
    })
    .then((response) => {
console.log(response.data);
response.data.map(elem=>{
  this.projet.push(elem)
})

 console.log(this.projet);
 
    



   
    })
    .catch((error)=>{
      console.log(error);
    })
     
    },
     computed:{
       len() {
            return Math.ceil(this.projet.length / 12)
        },
        page_tech() {
            return this.filterByName(this.projet).slice(this.page * 12- 12, this.page * 12)
        },
     },
    methods:{
      showmodifier(patient){
        this.modifier = true
        this.patient = patient
      },
       async modfier_patient(){
          this.loading = true
        let formData = new FormData()
        formData.append('name', this.name)
        formData.append('lastname', this.lastname)
        formData.append('genre', this.select)
        formData.append('adresse', this.adresse)
        formData.append('telephone', this.telephone)
        formData.append('DateNaissance', this.birthday)
        for (let file of this.files) {
            formData.append("imagepassion", file, file.name);
        }
         try {
      let response=   await   axios.post('http://127.0.0.1:5000/user/ajout_passion',formData,{
            headers: {
           
              "Content-Type": "multipart/form-data" }
              })

            if(response.status==200){
              setTimeout(location.reload(), 3000); 
               this.snackbar = true;
               
            }

        } catch (error) {
          console.log(error)
        }
        
           this.loading = false
       },
       clearSearch(){
            this.search = ''
            console.log(111);
        },
         filterByName: function (techs) {
            if (this.search) {
                return techs.filter(tech => (tech.organisation).toLowerCase().includes(this.search.toLowerCase()))
            }
            return techs
        },
       confirmdelete: function (id) {
      this.$refs.confirm.open(`suprimer ${this.projet.organisation}`, 'Voulez-vous vraiment supprimer ce patient ?', {
          color: 'red'
        })
        .then(async () => {
  
        
          let response = await axios.post(`http://127.0.0.1:5000/user/delete_passion/${id}`, {}, {
           
          });
          if (response.status == 200) {
             location.reload();
          }
        })
    },
      
    }
}
</script>
<style scoped>
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
.image{
padding-right: 2%;
}
.marg{
margin-top: 10%;
margin-left: 5%;
}
.marging{
margin-top: 40%;
}
.design{
margin-left: -2px;
}
.bonjour{
padding-left: 90%;
padding-top: 3%;
} 
.pad{
margin-top: 38%;
margin-left: 50%;
}

.photo{
  margin-inline:30%;
  margin-top: -7%;
}
.boton{
margin-inline: 42%;
margin-top:15%;
}
.card{
margin-top: 8%;
}
.project{
  width: 100%;
  height: 70%;

}
.fully_card{
box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
.spacing_list {
    top: 80%;
}
.v-speed-dial--direction-bottom .v-speed-dial__list{
    align-items: flex-end;
      margin-top: -12%;

}
.list_button{
display: list-item;


}

.fiche{
margin-top: -20%;
margin-left: -8%;
}
.card-manager {
    -webkit-transition: all 0.3s ease-in !important;
    -moz-transition: all 0.3s ease-in !important;
    -o-transition: all 0.3s ease-in !important;
    transition: all 0.3s ease-in !important;
     z-index: 1;
    overflow: hidden;
}

.card-manager:hover {
    background-color:	#6495ED !important;
    color: #fff !important;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
}
.card-manager::after {
    content: "";
    position: absolute;
    height: 80px;
    width: 80px;
    top: 5%;
    right: -16%;
    transform: translateY(-50%);
   
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 0;
}
.v-application{
margin-bottom: 5%;}
</style>