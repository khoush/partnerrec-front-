<template>
    <v-app>
        <v-container class="forget" fill-height>

            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md8>
                    <v-form ref="form" lazy-validation @submit.prevent="submit">
                   
                            <v-card justify-center class=" ma-16 elevation-12" width="60%">
                                <v-toolbar dark color="cyan">
                                    <v-toolbar-title align-center>Changez votre mot de passe</v-toolbar-title>
                                </v-toolbar>
                                <v-alert color="success" :value="success" icon="close">
                                  Votre mot de passe a été changé avec succès
                                </v-alert>
                                
                              
                                <v-card-text>
                                  
                                 <v-text-field
                                        label=" nouveau mot de passe"
                                    required prepend-icon="lock"
                                    
                                    v-model="password" :rules=" passwordrules" 
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    
                                        :type="show1 ? 'text' : 'password'"
                                        @click:append="show1 = !show1"
                                        :error-messages="errors"
                                        ></v-text-field>
                                          <v-text-field
                                        label="confirmer mot de passe"
                                    required prepend-icon="lock"
                                    
                                    v-model="confirmpassword" :rules=" passwordrules" 
                                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                    
                                        :type="show2 ? 'text' : 'password'"
                                        @click:append="show2 = !show2"
                                        :error-messages="errors"
                                        ></v-text-field>
                                </v-card-text>


                                <v-divider light></v-divider>
                                <v-card-actions>
                                    <v-btn text  rounded depressed color="cyan" to='/login'>
                                        <v-icon>
                                            arrow_back_ios
                                        </v-icon> Retour(login)
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn text rounded depressed @click="changepassword" :loading="loading" color="cyan" :disabled="invalid"
                                        type="submit">
                                        Envoyer
                                        <v-icon>keyboard_arrow_right</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                    </v-form>

                </v-flex>
            </v-layout>

        </v-container>
    </v-app>
</template>
<script>

import  axios  from 'axios'



export default {
    name:'change_password',
     components: {
      
    },
  
    data: ()=>({
password : '',
confirmpassword : '',
loading : false,
 success: false,
 value : true,
 value1 : true,
 showerror : false,
 showreset : false,
 showinvalide : false,
 show1:false,
 show2:false
    }),
    methods:{
    
          async changepassword() {
            this.loading = true;
        let token = this.$route.params.token
        let obj = {
            password : this.password,
            token : token
        }
        try {
        let response = await axios.post(`http://127.0.0.1:3000/admin/changepassword`,obj);
        if(response.status == 200){
            this.success = true
            this.loading = false;
            this.password = null,
            this.confirmpassword = null
           this.$refs.observer.reset();
           this.showreset = false
            setTimeout(()=>{
                this.$router.push('/login');
            },3000)

        }
        } catch (e) {
            this.loading = false;
           
            this.showinvalide = true
       
       
        }
        }
    },
      
     
      
    async mounted () {

        let token = this.$route.params.token
        console.log(token)
        try {
        let response = await axios.post(`http://127.0.0.1:3000/admin/reset_pwd_verify/${token}`);
        if(response.status == 200){
            this.showreset = true
         
        }
        } catch (e) {
           
            this.showerror = true
       
       
        }
        


    },
    
}
</script>
<style scoped>
.forget{
    margin-left: 25%;
    margin-top: 7%;
}
</style>