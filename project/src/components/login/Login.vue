<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height mb-12" >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text " color="#80bbfd"
                        >Se Connecter Dans Partner</h1> 
                        
                        <v-form>
                          <v-text-field
                            label="Adresse Email"
                            name="Email"
                            prepend-icon="email"
                            v-model="email_login"
                            type="text"
                            :rules=" emailrules"
                            color="teal accent-3"
                          />

                          <v-text-field
                            id="password"
                            label="Mot De Passe"
                            name="password"
                             prepend-icon="lock"
                             :rules=" passwordrules"
                            v-model="password_login"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                           :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            color="teal accent-3"
                          />
                        </v-form>
                       
                      </v-card-text>
                      <div class="text-center mt-10 ">
                      <div class="col-sm-9">
                        <v-btn rounded @click="logi" :loading="loading" color="#80bbfd" dark>connecter</v-btn>
                       
                      </div>
                      <div class="col-sm-9 br-10">
                       <router-link class="auth espassement" justify="center" to="Forget_pwd" >Mot de passe oublié ?</router-link>
                        <v-alert widhth="800" color="error" :value="error" icon="close">
                                Le nom d'utilisateur ou le mot de passe sont incorrect.
                            </v-alert>
                     </div>
                      </div>
                         
                    </v-col>
                    <v-col cols="12" md="4" class="signup">
                      <v-card-text class="white--text mt-12">
                       
                       
                      </v-card-text>
                      
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="signup">
                      <v-card-text class="white--text mt-12">
                        
                      
                       <h3
                          class="text-center"
                        > Si vous avez un compte connecter ici 
                            </h3>
                            </v-card-text>
                      <div class="text-center mb-4">
                     
                        <v-btn rounded outlined dark @click="step--">connecter</v-btn>
                      </div>
                      
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text " color="#80bbfd">Inscrivez-Vous Dans Help Doctor</h1>
                       
                 
                        <v-form>
                          <v-text-field
                            label="Nom"
                            name="Name"
                             v-model="nom_inscri"
                            prepend-icon="person"
                            type="text"
                             :rules="rule"
                            color="teal accent-3"
                          />
                          <v-text-field
                            label="Prenom"
                            name="Name"
                             v-model="prenom_inscri"
                            prepend-icon="person"
                            type="text"
                             :rules="rule"
                            color="teal accent-3"
                          />
                          <v-text-field
                            label="Email"
                             :rules="rule"
                            name="Email"
                            v-model="email_inscri"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                          />
                           <v-text-field
                            label="Numero Telephone"
                            name="Name"
                             :rules="rule"
                             v-model="telephone_inscri"
                            prepend-icon="phone"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-row>
                          <i ></i>
                          <v-select
          v-model="select_inscri"
          :items="items"
          :error-messages="errors"
          label="Genre"
           prepend-icon="email"
          data-vv-name="Select"
         :rules="rule" required
        ></v-select>
        </v-row>
                            <v-menu
          v-model="menu1"
          :close-on-content-click="false"
         
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedMomentjs"
              clearable
              label="Date Naissance"
               name="Name"
              type="text"
              readonly
             width="200px"
              v-bind="attrs"
              v-model="birthday_inscri"
              v-on="on"
              @click:clear="date = null"
            prepend-icon="mdi-calendar"
             :rules="rule"
            ></v-text-field>
             
          </template>
          <v-date-picker
            v-model="birthday_inscri"
            @change="menu1 = false"
            :rules="rule" required
          ></v-date-picker>
         
        </v-menu>
    

                          <v-text-field
                            id="passwordInscri"
                            label="Password"
                            name="passwordInscri"
                             v-model="password_inscri"
                            prepend-icon="lock"
                             :rules="rule"
                           :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                           :type="show2 ? 'text' : 'password'"
                           @click:append="show2 = !show2"
                            color="teal accent-3"
                          />
                         
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5 mb-3">
                        <v-btn rounded @click="enregistrer" :loading="loading" color="#80bbfd" dark>creer compte</v-btn>
                      
                        <v-alert widhth="800" color="#bef574" :value="succes" icon="close">
                                compte creer avec succes
                            </v-alert>
                            <v-btn rounded @click="step--"  v-if="succes1" :loading="loading" color="#80bbfd" dark>retourne pour connecter </v-btn>
                             <v-alert color="error" :value="error" icon="close">
                               Une erreur s'est produite, veuillez réessayer plus tard.
                            </v-alert>
                            <v-alert color="error" :value="errorr" icon="close">
                               cette email déja existe
                            </v-alert>
                            </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    step: 1,
    show1: false,
    show2: false,
    show3: false,
    menu1: false,
     succes:false,
     succes1:false,
    loading : false,
    errorr:false,
 
      rule: [
         v => !!v ||"input can be not empty"
         ],
         
name:"",
lastname:"",
PhoneNumber:"",
DateNaissance:"",

genre:"",
     email: '',
                emailrules: [
                    v => !!v || "l'email est requis",
                    v => /.+@.+\..+/.test(v) || "l'email doit être valide",
                ],
                password: '',
                passwordrules: [
                    v => !!v || 'Mot de passe est requis',
                    v => (v && v.length >= 6) || 'le mot de passe doit contenir plus de 6 caractères',
                ],
                error: false,
                items: [
         'Male',
         'Female',
         'Autre'
       ]
            
  }),
  props: {
    source: String
  },
  methods:{
     async   logi() {
                this.loading = true    
                let obj = {
                    email : this.email_login,
                    password : this.password_login
                }
              
                try {
                    let response = await axios.post('http://127.0.0.1:3000/admin/login',obj,{
                   
                    });
                                            
                    if(response.status == 200){
                        
                       localStorage.setItem('authorization', response.data.user.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                         console.log(response.data.user.token)
                         console.log(response.data.user.role)
                         console.log(localStorage)
                       
                         
                          this.$router.push('/dashbord/home');
                        
                       
                        location.reload();
                    }else if(response.status==400){
                        this.error = true
                    }
                } catch (error) {
                    console.log(error)
                        this.error = true
                    
                }
              this.loading = false
            },
            
        
        

        
    async  enregistrer() {
                this.loading = true    
                let obj = {
                    name : this.prenom_inscri,
                    lastname : this.nom_inscri,
                     PhoneNumber : this.telephone_inscri,
                    DateNaissance : this.birthday_inscri,
                     email : this.email_inscri,
                     genre:this.select_inscri,
                    password : this.password_inscri
                }
              
                try {
                    let response = await axios.post('http://127.0.0.1:5000/user/register',obj,{
                   
                    });
                                            
                    if(response.status == 200){
                       this.succes=true
                       this.succes1=true
                      console.log(response)
                    }
                    else{
                        this.error=true
                    }
                } catch (error) {
                    console.log(error)
                        
                    
                }
              this.loading = false
            },
            
        },
    
 
  }

</script>
<style>
.auth{
  margin-bottom:1%;
}
.espassement{
  margin:0 50pt 50pt 0pt;
}
.signup{
  background-color:#add8e6 ;
}
</style>