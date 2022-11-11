<template>
  <v-row justify="center">
   
    <v-dialog v-model="dialog" persistent width="570px"  @keydown.esc="cancel">
    <v-col
     
    >
    






      <v-card ref="form">
       <v-card-title>
         <h1> Ajouter un(e) condidat(e) </h1>
            <v-divider class="mt-16"></v-divider>
          <v-spacer></v-spacer>
           
       <v-icon  right top @click="dialog = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
         
          <v-text-field
            ref="name"
            v-model="name"
            :rules="[
              () => !!name || 'This field is required',
              () => !!name && name.length <= 25 || 'Address must be less than 25 characters',
             
            ]"
            label="Name"
         
            required
          ></v-text-field>
       
          <v-text-field
            ref="Email"
            v-model="Email"
            :rules="[() => !!Email || 'This field is required']"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            ref="position"
            v-model="position"
            :rules="[() => !!position || 'This field is required']"
            label="position"
            required
          ></v-text-field>
          <v-text-field
            ref="office"
            v-model="office"
            :rules="[() => !!office || 'This field is required']"
            label="office"
            required
          ></v-text-field>
          <v-text-field
            ref="Age"
            v-model="Age"
            :rules="[() => !!Age || 'This field is required']"
            label="Age"
            required
          ></v-text-field>
          <v-menu
          v-model="menu2"
          :close-on-content-click="false"
         
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedMomentjs"
              clearable
              label="Start  Date"
              readonly
             width="200px"
              v-bind="attrs"
              v-model="Start_date"
              v-on="on"
              @click:clear="date = null"
            prepend-icon="mdi-calendar"
             :rules="rule"
            ></v-text-field>
             
          </template>
          <v-date-picker
            v-model="Start_date"
            @change="menu2 = false"
            :rules="rule" required
          ></v-date-picker>
         
        </v-menu>
          <v-text-field 
            label="Salary"
           v-model="Salary" 
           :rules="[() => !!Salary || 'This field is required']"
 required
            
             ></v-text-field>
             <v-file-input
     accept="image/*"
      v-on:change="handleFileUpload"
      label="image projet"
       
    ></v-file-input>
    <v-file-input
     
      v-on:change="handleFileUpload1"
      label="CV"
       
    ></v-file-input>
         
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text  @click="dialog = false">
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
                  class="my-0"
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
            :loading="loading"
            @click="save_assistant"
            
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
      
    </v-col>
      <v-snackbar v-model="snackbar" shaped :timeout="timeout">
            <v-alert class="mt-5" text color="cyan">
              le compte de condidat  a été ajouté avec succès
            </v-alert>
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false &&this.$refs.form.reset(); dialog = false">
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from 'axios'

  export default {
       props:['ajout_assistant'],
    data: () => ({
      timeout: 10000,
       snackbar:false,
           gialog1:false,
      show1: false,
      errorMessages: '',
      name: '',
      password: '',
      email:'',
      lastname:'',
      city: null,
      state: null,
      loading: false,
       dialog: false,
     menuOpen:false,
      modal: false,
      zip: null,
      files: [],
      files1:[],
      country: null,
      formHasErrors: false,
      menu2:false
    }),

    computed: {
      form () {
        return {
          name: this.name,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.zip,
          country: this.country,
        }
      },
    },
 watch: {
      name () {
        this.errorMessages = ''
      },
ajout_assistant: function(newVal) { 
          
          this.dialog = newVal
        },
   dialog:function(newval){
          this.$emit('update:ajout_assistant', newval);
        }
    },

    methods: {
         cancel() {
      this.dialog = false
    },
    handleFileUpload(files) {

this.files[0] = files
},
handleFileUpload1(files1) {

this.files1[0] = files1
},







    async  save_assistant(){
      this.loading= true
      let formData = new FormData()
        formData.append('name', this.name)
        formData.append('Email', this.Email)
        formData.append('position', this.position)
        formData.append('office', this.office)
        formData.append('Age', this.Age)
        formData.append('Start_date', this.Start_date)
        formData.append('Salary', this.Salary)
        
        for (let file of this.files) {
            formData.append("image", file, file.name);
            console.log(file.name)
        }
        for (let file1 of this.files1) {
            formData.append("cv", file1, file1.name);
            console.log(file1.name)
            
        }
        try {
          let response = await axios.post('http://127.0.0.1:3000/admin/addcondidat',formData,
         { headers: {
           
           "Content-Type": "multipart/form-data" }
           })


          if(response.status == 200){
            this.snackbar=true
              setTimeout(location.reload(), 3000); 
            console.log(response)
          }
        } catch (error) {
          console.log(error)
        }
       this.loading= false   
      },

      addressCheck () {
        this.errorMessages = this.address && !this.name
          ? `Hey! I'm required`
          : ''

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      },
    },
  }
</script>