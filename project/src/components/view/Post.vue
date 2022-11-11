<template>
  <v-app class="patient v-application">
  








      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">

          <v-btn class="mx-12" v-bind="attrs" v-on="on" light color="#add8e6"  
            absolute @click="dialog1 = true"> ajouter post <v-icon>mdi-folder</v-icon>
          </v-btn>
        </template>
        <span>ajout post</span>

      </v-tooltip>
    <flex>
    <!-- <v-col  v-for="(tech, i) in  page_tech.fiche.seances" v-bind:key="i" > CCD5AE         -->
    <v-card class="ma-9   mt-16" shaped>
      
      <v-row >
       <v-col v-for="(tech,i) in post" :key="i">
   

      <v-card
 
    :loading="loading"
    
    class="mt-16  mx-16 mb-6"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="200"
      :src="tech.image"
    ></v-img>

    <v-card-title class="mx-12">{{tech.titre}}</v-card-title>

   
      
       

    

    <v-divider class="mx-4"></v-divider>

    <v-card-title>description de  Post:</v-card-title>

    <v-card-text> <div>{{tech.descripion}}</div></v-card-text>
    <v-card-text>
    
      date Debut:   <v-chip>{{tech.date_debut}}</v-chip>

       

       

       date fin: <v-chip>{{tech.date_fin}}</v-chip>
     
    </v-card-text>
    

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Archive
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
</v-row>
    </v-card>
  </flex>

    <v-dialog v-model="dialog1" persistent width="570px" @keydown.esc="cancel">
      
      <v-col>
        date



        <v-card ref="form">
          <v-card-title>
            <span justify="center">Ajouter un Post</span>
            <v-spacer></v-spacer>

            <v-icon right top @click="dialog1 = false">mdi-close</v-icon>
          </v-card-title>
          <v-card-text>
            <v-text-field ref="titre" v-model="titre" :rules="[() => !!titre || 'This field is required']"
              label="titre" required></v-text-field>
            <v-text-field ref="description" v-model="description" :rules="[
              () => !!description || 'This field is required',
              () => !!description || 'his field is required',
             
            ]" label="descripion" required></v-text-field>
           <v-menu
          v-model="menu1"
          :close-on-content-click="false"
         
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedMomentjs"
              clearable
              label="Date debut "
              readonly
             width="200px"
              v-bind="attrs"
              v-model="datedebut"
              v-on="on"
              @click:clear="date = null"
            prepend-icon="mdi-calendar"
             :rules="rule"
            ></v-text-field>
             
          </template>
          <v-date-picker
            v-model="datedebut"
            @change="menu1 = false"
            :rules="rule" required
          ></v-date-picker>
         
        </v-menu>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
         
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedMomentjs"
              clearable
              label="Date fin"
              readonly
             width="200px"
              v-bind="attrs"
              v-model="datefin"
              v-on="on"
              @click:clear="date = null"
            prepend-icon="mdi-calendar"
             :rules="rule"
            ></v-text-field>
             
          </template>
          <v-date-picker
            v-model="datefin"
            @change="menu = false"
            :rules="rule" required
          ></v-date-picker>
         
        </v-menu>
        <v-file-input
     accept="image/*"
      v-on:change="handleFileUpload"
      label="image Post"
       
    ></v-file-input>
          </v-card-text>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn text @click="dialog1 = false">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-slide-x-reverse-transition>
              <v-tooltip  left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon class="my-0" v-bind="attrs" @click="resetForm" v-on="on">
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </template>
                <span>Refresh form</span>
              </v-tooltip>
            </v-slide-x-reverse-transition>
            <v-btn color="primary" text :loading="loading" @click="save_post">
              ajouter
            </v-btn>
          </v-card-actions>
          <v-snackbar v-model="snackbar" shaped :timeout="timeout">
            <v-alert class="mt-5" text color="cyan">
             post a été ajouté avec succès
            </v-alert>
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs"
                @click="snackbar = false &&this.$refs.form.reset(); dialog1 = false">
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
        </v-card>
      </v-col>
    </v-dialog>   
  </v-app>
</template>


<script >


import {mapState} from 'vuex'
import axios from 'axios';
import  moment from "moment"
export default {
  created: function () {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    this.user = user
    

  },
  name:"modifierfiche",

 components:{
  
 },
     data: () => ({
       fiche:{},
       seance:{},
       ordonance:{},
       files:[],
       menu1:false,
       name:'',
       menu:false,
       isdocteur : true,
       modfieseance:false,
       modifierfiche:false,
       mdofierordonance:false,
       snackbar: false,
      timeout: 10000,
      loading: false,
         numfiche:'',
        
      titre:'',
      description:'',
      datefin:'',
     

      selection: 1,

          direction: 'bottom',
        dialog: false,
        dialog1:false,
        dialog2:false,
        dialog3:false,
 workTimes: [1],
        top:true,
        right:true,
        show: false,
      page: 1,
      page1:1,
       rules: {
           dents: [val => (val || '').length > 0 || 'This field is required'],
          name: [val => (val || '').length > 0 || 'This field is required'],
          doit:[val => (val || '').length > 0 || 'This field is required'],
           reçue:[val => (val || '').length > 0 || 'This field is required'],
            médicament:[val => (val || '').length > 0 || 'This field is required']
        },
       projet:[],
       user:[],
    post:[]
      
     }),
    
       
    mounted(){
      
   
       axios.get(`http://127.0.0.1:3000/admin/getoneprojet/${this.$route.params.id}`,{
        
       })
    .then((response) => {
        this.projet=response.data;
        console.log(this.projet);
      
console.log(this.projet.result.post.map(elem=>{
      elem.date_debut=moment(new Date(elem.date_debut)).format("DD-MM-YYYY")
      elem.date_fin=moment(new Date(elem.date_fin)).format("DD-MM-YYYY")
  this.post.push(elem)
}))
 console.log(this.post);
    


 
    
    })
    .catch((error)=>{
      console.log(error);
    })
    
 
    },
      
    computed: {
      ...mapState([
            'project'
          ]),
       
       
           len() {
            return Math.ceil(this.passion.seance.length / 1)
        },
        page_tech() {
            return this.passion.seance.slice(this.page * 1- 1, this.page * 1)
        },
        
           len1() {
            return Math.ceil(this.passion.ordonance.length / 1)
        },
        page_tech1() {
            return this.passion.ordonance.slice(this.page1 * 1- 1, this.page1 * 1)
        },
  },
     
    methods:{
      showmodifierfiche(fiche){
        this.modifierfiche = true
        this.fiche = fiche
        
      },
      handleFileUpload(files) {

this.files[0] = files
},
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
       showmodifierseance(seance){
        this.modfieseance = true
        this.seance = seance
        console.log(this.seance)
      },
       showmodifierordonance(ordonance){
        this.mdofierordonance = true
        this.ordonance = ordonance
      },
       addWorkTime: function() {
      this.workTimes.push({});
    },
    removeWorkTime: function(index) {
      this.workTimes.length > 1 && this.workTimes.splice(index, 1);
    },

cancel1() {
     
      this.dialog3 = false
    },
cancel() {
     
      this.dialog1 = false
    },
    cancel2() {
     
      this.dialog2 = false
    },
     async  save_post(){
      


      this.loading= true
      let formData = new FormData()
        formData.append('titre', this.titre)
        formData.append('descripion', this.description)
        formData.append('date_debut', this.datedebut)
        formData.append('date_fin', this.datefin)
       
        
        for (let file of this.files) {
            formData.append("image", file, file.name);
        }
        try {
          let response = await axios.post(`http://127.0.0.1:3000/admin/addpost/${this.$route.params.id}`,formData)


          if(response.status == 200){
             setTimeout(location.reload(), 3000); 
              this.snackbar = true;
          }
        } catch (error) {
          console.log(error)
        }
       this.loading= false   
      },

    
        
     confirmdelete:function () {
    this.$refs.Confirm.open(`"suprimer ${this.passion.fiche[0].numfiche}"`, 'Voulez-vous vraiment supprimer cette fiche ?', {
          color: '#add8e6'
        })
        .then(async () => {
          let id = this.passion.fiche[0]._id
          console.log(id)
          let response = await axios.post(`http://127.0.0.1:5000/user/delete_fiche/${id}`, {}, {
           
          });
          if (response.status == 200) {
            this.$emit("listenerChild", true);
               setTimeout(location.reload(), 3000); 
           console.log(response)
          }
        })
    },
         confirmdelete_seance:function (id) {
    this.$refs.Confirm.open(`" confirmation suprission "`, 'Voulez-vous vraiment supprimer cette seance ?', {
          color: '#add8e6'
        })
        .then(async () => {
         
          let response = await axios.post(`http://127.0.0.1:5000/user/delete_seance/${id}`, {}, {
           
          });
          if (response.status == 200) {
            this.$emit("listenerChild", true);
              setTimeout(location.reload(), 3000); 
           console.log(response)
          }
        })
    },
      
       right () {
        this.left = true
      },
      left() {
        this.right = true
      },
    }
}
</script>
<style scoped>
 

.fiche{
  padding-left:30%;
  padding-bottom:5%
}
.bonjour{
  margin-right: -6%;
  margin-top: -8%;
}

.card_seance{
 margin-top: 9%;
 margin-right: -30%;
}

.spacing_list {
    margin-top: 80%;
    margin-left:80%;
}
.v-speed-dial--direction-bottom .v-speed-dial__list{
    align-items: flex-end;
      margin-top: -25%;

}
.list_button{
display: list-item;
margin-left:50%;

}

.butoon_fiche{
  margin-top: 32%;

z-index: 1;
margin-left: 87%;
}
.butoon_seances{
margin-top: 36%;
z-index: 1;
margin-left: 87%;
}
 .butoon_ordonance{
margin-top: 40%;
z-index: 1;
margin-left: 85%;

 }
 .tolbaar{
   margin-top: 10%;
   margin-left: -37%;
 }
 .card_title{
   margin-left: 40%;
 }
 .adresse{
   margin-top:-6%
 }
 .apbar{
    margin-top: 10%;
      margin-left: -20%;
 }
 .tolbaar_fiche{
margin-top: 10%;
margin-left: -40%;
 }
.apbar_fiche{
 margin-top: -7%;
margin-left: -20%;
}
.title{
  margin-top: -3%;
}
.title_fiche{
margin-top: -20%;
margin-left: 65%;
}
.devider{
  margin-top: 95%;
}
.sub{
  margin-top: -3%;
  margin-left: 75%;
}
.footer{
  margin-left:40%;
  margin-top: -5%;
}
.fiche_patient{
  margin-top: 2%;
  margin-left: 3%;
}
.tolbaar_ordonance{
  margin-top: 15%;
margin-left: -40%;

}
.apbar_ordonance{
margin-top: 10%;
margin-left: -20%;
}
.tolbaarr_ordonance{
  margin-left: 40%;
  margin-top: -12%;
}
.ordonance{
  margin-left:47%;
  margin-top:-62.6%
}
.top{
  margin-left:-5%
}
.top1{
  margin-left:-3%
}
.top2{
  margin-left:-9%
}
.top3{
  margin-left:-10%
}
.patient{
  margin-top: 3%;

}
.tollbaar{
  margin-left: 25%;
}
.bonjouur{
  margin-left: 100%;
  margin-top: -2%;
}
.v-application{
margin-bottom: 5%;}
</style>