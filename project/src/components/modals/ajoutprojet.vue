<template>
 <v-row justify="center">
 
    <v-dialog v-model="dialog" persistent max-width="500px"  @keydown.esc="cancel">
    
      <v-card >
        <v-card-title>
          <span justify="center" >Ajouter un projet</span>
           
          <v-spacer></v-spacer>
           
       <v-icon  right top @click="dialog = false">mdi-close</v-icon>
        </v-card-title>
         <v-divider class="mt-4"
    
      ></v-divider>
        <v-card-text>
     <v-container >
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="idprojet"
     
    color="primary"  label="id Project *"
     :rules="rule" required
    ></v-text-field>
     <v-text-field
      v-model="nomorganization"     color="primary"  label="Organization*"      :rules="rule" required     ></v-text-field>
<v-text-field
      v-model="email"     
    color="primary"  label="Email *"      :rules="rule"    ></v-text-field>
        

   <v-text-field
          v-model="description"
           color="primary" 
          :error-messages="errors"
          label="Project Description *"  
         :rules="rule"
        ></v-text-field>
      <v-file-input
     accept="image/*"
      v-on:change="handleFileUpload"
      label="image projet"
       
    ></v-file-input>
      <v-menu
          v-model="menu2"
          :close-on-content-click="false"
         
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedMomentjs"
              clearable
              label="Date début"
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
            @change="menu2 = false"
            :rules="rule" required
          ></v-date-picker>
         
        </v-menu>
        <v-menu
          v-model="menu1"
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
            @change="menu1 = false"
            :rules="rule" required
          ></v-date-picker>
         
        </v-menu>
        <v-select
          v-model="budget"
          :items="items"
          :error-messages="errors"
          label="budget"
          data-vv-name="Select"
         :rules="rule" required
        ></v-select>

    <v-btn
      color="error"
      class=" mt-16"
      @click="reset" >
      Reset Form
    </v-btn>

  
  </v-form>
  </v-container>
        
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red"  text  @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1"  @click="save_passion" :loading="loading" >
            Save
          </v-btn>
        </v-card-actions>
        <v-snackbar v-model="snackbar" :timeout="timeout">
            <v-alert class="mt-5" text type="success">
              Projet a été ajouté avec succès
            </v-alert>
            <template v-slot:action="{ attrs }">
              <v-btn color="blue"  v-bind="attrs" @click="snackbar = false && location.reload(); dialog = false">
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios";
  export default {
      props:['ajoutpassion'],
    data: () => ({
         dialog: false,
         menuOpen:false,
      modal: false,
      valid: true,
      menu1: false,
      menu2: false,
      snackbar: false,
      timeout: 10000,
      loading: false,
      passion:[],
      files: [],
      checkbox: false,
      rule: [
         v => !!v ||"input can be not empty"
         ],
       items: [
       "1000",
         '2,000 - 5,000',
         '5,000 - 15,000',
         '15,000 - 25,000',
         '25,000 '
       ]
    }),

    methods:{
        cancel() {
      this.dialog = false
    },
      
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      handleFileUpload(files) {

        this.files[0] = files
      },
       async save_passion(){
        



             
        









          this.loading = true
        let formData = new FormData()
        formData.append('id', this.idprojet)
        formData.append('organisation', this.nomorganization)
        formData.append('Email', this.email)
        formData.append('descripion', this.description)
        formData.append('date_deb', this.datedebut)
        formData.append('date_fin', this.datefin)
        formData.append('budget', this.budget)
        
        for (let file of this.files) {
            formData.append("image", file, file.name);
        }
         try {
      let response=   await   axios.post(`http://127.0.0.1:3000/admin/addprojet/${this.idprojet}`,formData,{
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
       }
      },
watch: { 
ajoutpassion: function(newVal) { 
          
          this.dialog = newVal
        },
   dialog:function(newval){
          this.$emit('update:ajoutpassion', newval);
        }
      }
  }
</script>