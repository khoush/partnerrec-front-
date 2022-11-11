<template>
     <v-app>   
     <v-avatar  class="photo "  size="90" elevation="10">
     
     <v-divider class="mt-16" light></v-divider>
                  <img :src="user.image" >
                  
                </v-avatar>
        
           <v-layout class="formu" >
<form  class="profile" >
    <v-file-input
     accept="image/*"
      v-on:change="handleFileUpload"
      label="image Profile"
       
    ></v-file-input>
         <v-text-field 
      v-model="user.firstname"     color="primary"  label="name"      :rules="rule" required     ></v-text-field>
     <v-text-field
      v-model="user.lastname"     color="primary"  label="LastName"      :rules="rule" required     ></v-text-field>
     <v-text-field
      v-model="user.email"     color="primary"  label="Email"      :rules="rule" required     ></v-text-field>
   
        <v-text-field           label="Password actuelle"      v-model="act_password" :rules=" rule"   :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"   :type="show1 ? 'text' : 'password'"     @click:append="show1 = !show1"     ></v-text-field>
   


       <v-card-actions>
             <v-btn color="blue darken-1" text >
            cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text  right class="save" @click="update"  >
            Save
          </v-btn>
       </v-card-actions>
      
</form>
 <v-snackbar v-model="snackbar"  shaped :timeout="timeout">
            <v-alert class="mt-5"  text color="cyan">
              Rendezvous a été ajouté avec succès
            </v-alert>
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false &&this.$refs.form.reset(); dialog = false">
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
</v-layout>


                </v-app>

  </template>
  <script>
  
  import axios from 'axios';
  export default ({
        data: () => ({
       loading:false,
    menu1: false,
       user:{},
       snackbar5: false,
     timeout: 10000,
     
    
      files: [],
 

     }),
    
    mounted(){
   
       axios.get(`http://127.0.0.1:3000/admin/getoneuser/${this.$route.params.id}`,{
        
       })
    .then((response) => {
        this.user=response.data;
      console.log(this.user)

    })
    .catch((error)=>{
      console.log(error);
    })
    
 
   
    },
    methods:{
      handleFileUpload(files) {

        this.files[0] = files
      },
    async update(){
        let formData = new FormData()
         formData.append('firstname', this.user.firstname)
        formData.append('lastname', this.user.lastname)
        formData.append('email', this.user.email)
        formData.append('password', this.act_password)
         for (let file of this.files) {
            formData.append("image", file, file.name);
        }
      try{
         let response = await axios.put(`http://127.0.0.1:3000/admin/updateuser/${this.$route.params.id}`,formData)
           
             if(response.status ==200){
                 setTimeout(location.reload(), 3000); 
               this.snackbar=true
    console.log(response)
             }
      }catch(error){
console.log(error)

      }
            
     }
    }
    
  })
  </script>
  <style>
.photo{
  margin-inline:45%;
  margin-top: 8%;
}

.formu{
 margin-left: 35%;
 margin-top: 2%;
 
 }
 .profile{
 max-width: 50%;
 }
 .layout {
    display: block;
    width: 780px;
}
.v-file-input {
  flex-direction: row-reverse;
  width :"hide-input"
}
  </style>
  