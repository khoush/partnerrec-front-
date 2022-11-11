
<template>
  <v-app class="calandar">
 <v-col  class="home" :style="image">
    
  </v-col>
  


    
  
      

      <h2>To Do list</h2>
      <v-divider></v-divider>

     
<v-card>
  <div  v-for="(tech,i) in liste" :key="i">
      <ul>
        <li>
          {{tech.titre}}
        </li>
      </ul>
    </div>
    </v-card>
    <v-btn
      depressed
      color="primary"
      @click="dialog  = true"
    >
      Add
    </v-btn>

<div>

  <v-dialog v-model="dialog" persistent max-width="400"   @keydown.esc="cancel">
    <v-card>
      <v-card-title  align="center">
          <span class="headline">Ajouter Une  réuinion</span>
          <v-spacer></v-spacer>
            
       <v-icon  right top @click="dialog=false">mdi-close</v-icon>

      
       <div>
        <v-text-field
      v-model="titre"
     class="mx-3"
    color="primary"  label="titre *"
     :rules="rule" required
    ></v-text-field>
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
         
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedMomentjs"
              clearable
              label="Date "
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
            @change="menu1 = false"
            :rules="rule" required
          ></v-date-picker>
         
        </v-menu>
        <v-col
      class="mx-1" col-lg="8" 
    >
      <v-menu   ref="menu3"   v-model="menu3" :close-on-content-click="false"  :nudge-right="60"  :return-value.sync="heuredebut"      transition="scale-transition" offset-y clearable  max-width="290px" min-width="290px"> 
       <template v-slot:activator="{ on, attrs }">
          <v-text-field   v-model="heuredebut"  label="heure début"    prepend-icon="mdi-clock-time-four-outline"  readonly
            v-bind="attrs"  v-on="on"  ></v-text-field>
        </template>
        <v-time-picker   v-if="menu3" min="09:00" max="18:00"    v-model="heuredebut"    full-width     @click:minute="$refs.menu3.save(heuredebut)"></v-time-picker>
      </v-menu>
    </v-col>
    <v-row  class="mx-2">
    <v-col >
    <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="heurefin"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="heurefin"
            label="heure fin"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="heurefin"
          min="09:00" max="18:00"
          full-width
          @click:minute="$refs.menu.save(heurefin)"
        ></v-time-picker>
      </v-menu>
    </v-col>
</v-row>
       </div>

        
        </v-card-title>

        <v-btn
         
        color="blue darken-1"
            Right
            shaped
            class="mb-2 mx-16"
            @click="save_meet" 
            :loading="loading" :disabled="invalid"
            depressed
          >
            Ajouter
          </v-btn>

        </v-card>
    </v-dialog>

</div>
   

 
</v-app>
</template>

<script>



import { io } from "socket.io-client";
import axios from "axios";
import {
   mdiAccount


 } from '@mdi/js'


export default {
  components: {
  
    
   },
  name: 'dashbord',
  created: function () {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    this.user = user
    console.log(user.image)

  },
  data: () => ({
    icons: {
      mdiAccount
    },
    user: {},
    image: {backgroundImage:'url('+require(`../../assets/cabbb.jpg`)  +')'},
    
  
    search: '',
    disabled: false,

    drawer: false,
    show: false,
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    medica: '',
    medicament: [],
    liste:[],
    granted: false,
    date: new Date().toISOString().substr(0, 10),
     heurefin: null,
     heuredebut: null,
      d : new Date(),
     menu2: false,
     modal2: false,
     modal3: false,
     snackbar: {
       show: false,
       color: '',
       text: '',
       timeout: 10000
     },

     timeout: 10000,
     loading: false,
     fullname: "",
     birthday: '',
     menu: false,
     dialog1: false,
     menu3: false,
     item: [],
     dialog: false,
     menuOpen: false,
     modal: false,
     errorMessages: '',
     name: null,
     state: null,
     formHasErrors: false,
     datefin:"",

    
  }),

  methods: {
    logout: function () {
      localStorage.clear()
      this.$router.push('/')
    },



   async save_meet(){
    
       this.loading = true
       let object = {
        
         titre: this.titre,
         date_debut: this.datefin +" "+this.heuredebut ,
         date_fin: this.datefin+ " "+this.heurefin,
        
       }
       try {
         let response = await axios.post('http://127.0.0.1:3000/admin/addmeetting', object)
         console.log(response.status)
         if (response.status==200) {
        
         
             setTimeout(location.reload(), 3000); 
          
         } 



       } catch (error) {
         console.log(error)
       }

       this.loading = false

     },
    },


  mounted() {
  
    const socket = io('http://127.0.0.1:3000');
    console.log(socket);
    socket.on('meet', (data)=>{
      if(this.liste.length<data.length){
       
            data.map(elem=>{
              this.liste.push(elem)
            })
    console.log(this.liste)
   

        }if(this.liste.length>data.length){
          this.liste=[]
            data.map(elem=>{
              this.liste.push(elem)
            })
        }
    
  
       console.log(this.liste.length)
       

    //Push.create('Hello World!')
    
        })

}

}
</script>
<style>
.total-project{
  height: 150px;
  width: 250px;
}

.home{
  margin-top:0.5%;
  
    width:1500%;
    height:60%;
  
}
 
 
 
 
</style>