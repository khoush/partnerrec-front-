<template>

    <v-app>
        <v-container  class="forget" fill-height >

            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md8>
                    <v-form ref="form"  lazy-validation @submit.prevent="logi">
                        <validation-observer ref="observer" v-slot="{ invalid }">

                        <v-card class=" ma-16 elevation-12 card" width="60%">
                            <v-toolbar dark color="cyan">
                                <v-toolbar-title align-center>Réinitialiser votre mot de passe</v-toolbar-title>
                            </v-toolbar>
                            <v-alert color="#bef574" :value="success" icon="close">
                               Vous recevrez un email avec les instructions nécessaires pour récupérer votre mot de passe.
                            </v-alert>
                             <v-alert color="error" :value="notfound" icon="close">
                              votre email n'appartient à aucun utilisateur.
                            </v-alert>
                             <v-alert color="error" :value="error" icon="close">
                               Une erreur s'est produite, veuillez réessayer plus tard.
                            </v-alert>
                            <v-card-text>
                        <validation-provider v-slot="{ errors }" name="Addresse E-mail" rules="required|email">

                                <v-text-field prepend-icon="mail_outline" name="email" label="Addresse E-mail"
                                    type="text" v-model="email" :error-messages="errors"></v-text-field>
                           </validation-provider> 
                           </v-card-text>
                        

                            <v-divider light></v-divider>
                            <v-card-actions>
                 <v-btn rounded depressed  text  color="cyan" to='/'
                                   >
                                    <v-icon >
                                        arrow_back_ios
                                    </v-icon> Retour(Login)
                                </v-btn>
                                

                                <v-spacer></v-spacer>
                                <v-btn  text rounded depressed :loading="loading" color="cyan " :disabled="invalid"
                                    type="submit">
                                    Envoyer
                                    <v-icon>keyboard_arrow_right</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                         </validation-observer>
                    </v-form>

                </v-flex>
            </v-layout>

        </v-container>
    </v-app>
</template>
<script>
import {
    extend,
    ValidationObserver,
    ValidationProvider,
    setInteractionMode
} from 'vee-validate'
import {
    required,
    email
} from 'vee-validate/dist/rules'
import  axios  from 'axios'

setInteractionMode('eager')

extend('required', {
    ...required,
    message: '{_field_} ne peux pas être vide',
})


extend('email', {
    ...email,
    message: "L'email doit être valide",
})

export default {
    name:'Forget_pwd',
     components: {
        ValidationProvider,
        ValidationObserver,
    },
    data: ()=>({
email : '',
loading : false,
 success: false,
 notfound : false,
 error : false

    }),
    methods:{
     async logi() {
          console.log(this.email);
          this.loading = true
          let obj = {
              email: this.email
          }
          try {
              let response = await axios.post("http://127.0.0.1:3000/admin/forget_password", obj);
              if (response.status == 200) {
                  this.success = true
                  this.loading = false
              } else if (response.status == 404) {
                  this.loading = false
                  this.notfound = true
              } else {
                  this.error = true
                  this.loading = false
              }
          } catch (e) {
              this.error = true
              this.loading = false
          }

      }
      }
    
}
</script>
<style scoped>
.card{
margin-left: 40%;
}
.forget{
    margin-left: 25%;
    margin-top: 7%;
}
</style>