<template>
<v-app class="ajout">

  <v-row justify="center"  >
  <v-dialog v-model="dialog" persistent max-width="400"   @keydown.esc="cancel">
    <v-card>
      <v-card-title  align="center">
          <span class="headline">Ajouter un Rendez-vous</span>
          <v-spacer></v-spacer>
            
       <v-icon  right top @click="reset()">mdi-close</v-icon>
        
        </v-card-title>
  
     <v-form ref="form"  lazy-validation>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-col cols="12">
            <validation-provider v-slot="{ errors }" name="fullname" rules="required">
          <v-text-field   prepend-icon="mdi-calendar"  v-model="fullname"   :error-messages="errors"     label="full name"    ></v-text-field>
           </validation-provider> 
        </v-col>
        <v-row  class="mx-2" >
       <v-menu
          v-model="menu1"  :close-on-content-click="false"              >
          <template v-slot:activator="{ on, attrs }">
               <validation-provider v-slot="{ errors }" name="date Rendz-vous" rules="required">
            <v-text-field
              :value="computedDateFormattedMomentjs"   :error-messages="errors" clearable  label="date de roundez-vous"  readonly     width="200px"  v-bind="attrs"    v-model="birthday" v-on="on"  @click:clear="date = null" prepend-icon="mdi-calendar" ></v-text-field>
             </validation-provider>
          </template>
          <v-date-picker v-model="birthday" @change="menu1 = false" ></v-date-picker>
         
        </v-menu>
 </v-row>
<v-row>


  <v-col
      class="mx-1" col-lg="8" 
    >
      <v-menu   ref="menu3"   v-model="menu3" :close-on-content-click="false"  :nudge-right="60"  :return-value.sync="heuredebut"      transition="scale-transition" offset-y clearable  max-width="290px" min-width="290px"> 
       <template v-slot:activator="{ on, attrs }">
          <v-text-field   v-model="heuredebut"  label="heure début"    prepend-icon="mdi-clock-time-four-outline"  readonly
            v-bind="attrs"  v-on="on"  ></v-text-field>
        </template>
        <v-time-picker   v-if="menu3"    v-model="heuredebut"    full-width     @click:minute="$refs.menu3.save(heuredebut)"></v-time-picker>
      </v-menu>
    </v-col>

 </v-row>
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

        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text @click="dialog = false">
            Cancel
          </v-btn>
                         <v-spacer></v-spacer>
      

          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                
                  <v-icon>mdi-refresh</v-icon>
              
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
         
            color="primary"
            text
            @click="saved" 
            :loading="loading" :disabled="invalid"
            depressed
          >
            Ajouter
          </v-btn>
        </v-card-actions>
         </validation-observer>
    </v-form>
    <v-snackbar v-model="snackbar.show"  shaped :timeout="snackbar.timeout">
            <v-alert class="mt-5"  text :color="snackbar.color">
            <h2 class="text">  {{snackbar.text}}  </h2>
            </v-alert>
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false &&this.$refs.form.reset(); dialog = false">
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
  </v-card>
    </v-dialog>
  </v-row>

 
  </v-app>
</template>


<script>
 import {
   mdiAccount


 } from '@mdi/js'
 import axios from 'axios';
 import {
   extend,
   ValidationObserver,
   ValidationProvider,
   setInteractionMode
 } from 'vee-validate'
 import {
   required,

 } from 'vee-validate/dist/rules'


 setInteractionMode('eager')

 extend('required', {
   ...required,
   message: '{_field_} ne peux pas être vide',
 })


 export default {
   props: ['Calendrier'],
   components: {
     ValidationProvider,
     ValidationObserver,
   },
   data: () => ({
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
     fullname: "younes manita",
     birthday: '',
     menu1: false,
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
     icons: {
       mdiAccount,
     },
     passion: []
   }),
   mounted() {
     console.log((new Date()).toLocaleDateString());
     axios.get('http://127.0.0.1:5000/user/affiche_passions')
       .then((response) => {
         console.log(response.data);
         this.passion = response.data;
         console.log(this.passion)
         this.passion.map(rv => {
           this.item.push(rv.name + " " + rv.lastname)
           console.log(this.item)

         })

       })
       .catch((error) => {
         console.log(error);
       })

   },
   computed: {
     form() {
       return {

       }
     },

   },



   methods: {
     
     formatDate() {
       var d = new Date(),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();
       if (month.length < 2) month = '0' + month;
       if (day.length < 2) day = '0' + day;
       return [year, month, day].join('-');
     },
     cancel() {
       this.dialog = false
     },
     async saved() {
       this.loading = true
       let object = {
         title: this.fullname,
         start: this.birthday +" "+this.heuredebut,
         end: this.birthday+ " "+ this.heurefin,
        
        
       }
       try {
         let response = await axios.post('http://127.0.0.1:3000/admin/addevent', object)
         console.log(response.status)
         if (!response.data.err) {
           this.snackbar.text = response.data.msg
           this.snackbar.color = 'primary'
             setTimeout(location.reload(), 3000); 
           this.snackbar.show = true
         } else {
           this.snackbar.text = response.data.msg
           this.snackbar.color = 'secondary'
           this.snackbar.show = true

         }




       } catch (error) {
         console.log(error)
       }

       this.loading = false

     },


     submit() {
       this.formHasErrors = false,


         Object.keys(this.form).forEach(f => {
           if (!this.form[f]) this.formHasErrors = true

           this.$refs[f].validate(true)
         })
     },
   },
   watch: {

     Calendrier: function (newval) {

       this.dialog = newval
     },
     dialog: function (newval) {
       this.$emit('update:Calendrier', newval);
     }
   },

 }
</script>
<style scoped>
.header{
background-color: rgb(63, 55, 182);
}
.text{
  color:rgb(30, 156, 156)
}
</style>
