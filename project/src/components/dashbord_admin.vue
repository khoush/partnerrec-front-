<template>
  <div>
    <v-app>

      <v-app-bar app color="#add8e6">
        <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
 <v-btn text link to="/dashbord/home"> <h1 class="docteur"> Partner</h1></v-btn>
 
        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>
       
       
        

        <v-btn icon color="white" @click="logout">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" color="cyan" fixed buttom temporary>
        <v-list-item class="v-liste">

          <v-list-item class="pa-4">
            <v-list-item-avatar size="60" class="ma-n2 ">
              <v-img :src="user.image"></v-img>
            </v-list-item-avatar>

          </v-list-item>

        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title" link to="dashbord/profile">

              <v-card-title >
               Mr:
              </v-card-title>
              <v-card-subtitle>
                {{user.firstname}} {{user.lastname}}
              </v-card-subtitle>


            </v-list-item-title>

          </v-list-item-content>
        </v-list-item>


        <v-divider light></v-divider>

        <v-list nav dense>
          <v-list-item link :to="`/dashbord/profile/${user._id}`">
            <v-list-item-icon>
              <v-icon>assignment_ind</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/dashbord/all_projet">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>vos Projet</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/dashbord/condidat" >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Condidat</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/dashbord/calendrier">
            <v-list-item-icon>

              <v-icon>date_range</v-icon>

            </v-list-item-icon>
            <v-list-item-title class="item">calendrier</v-list-item-title>
          </v-list-item>
          <v-list-item @click="dialog1=true">
            <v-list-item-icon>
              


              <v-icon>date_range</v-icon>

            </v-list-item-icon>
            <v-list-item-title class="item">Report</v-list-item-title>
          </v-list-item>
         
          
         
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view></router-view>
      </v-main>

      <div>

<v-dialog v-model="dialog1" persistent max-width="400"   @keydown.esc="cancel">
  <v-card>
    <v-card-title  align="center">
        <span class="headline">Ajouter Une  Rapport</span>
        <v-spacer></v-spacer>
          
     <v-icon  right top @click="dialog1=false">mdi-close</v-icon>

     <v-text-field
      v-model="entreprise"
     class="mx-3"
    color="primary"  label="Entreprise *"
     :rules="rule" required
    ></v-text-field>
    <v-text-field
      v-model="email"
     class="mx-3"
    color="primary"  label="Email RH Entreprise  *"
     :rules="rule" required
    ></v-text-field>
    <v-text-field
      v-model="tlf"
     class="mx-3"
    color="primary"  label="Phone *"
     :rules="rule" required
    ></v-text-field>
    <v-text-field
      v-model="code"
     class="mx-3"
    color="primary"  label="Area Code *"
     :rules="rule" required
    ></v-text-field>
    <v-text-field
      v-model="phonenumber"
     class="mx-3"
    color="primary"  label="Phone Number *"
     :rules="rule" required
    ></v-text-field>
    <v-text-field
      v-model="nom"
     class="mx-3"
    color="primary"  label="Nom Candidat *"
     :rules="rule" required
    ></v-text-field>
    <v-select
          :items="items"
          label="Niveau de langue"
          solo
        ></v-select>
        <v-radio-group
      v-model="niveau"
      label="are you recruited ?"
      row
    >
      <v-radio
        label="Yes"
        value="Yes"
      ></v-radio>
      <v-radio
        label="No"
        value="No"
      ></v-radio>
    </v-radio-group>
    <v-textarea
      clearable
      v-model="observation"
      clear-icon="mdi-close-circle"
      label="Autres observations"
     
    ></v-textarea>
      </v-card-title>

      <v-btn
       
      color="blue darken-1"
          Right
          shaped
          class="mb-2 mx-16"
          @click="saverapport" 
          :loading="loading" :disabled="invalid"
          depressed
        >
          Ajouter
        </v-btn>

      </v-card>
  </v-dialog>

</div>
 
    </v-app>
  </div>
</template>

<script>
import Push from "push.js"
import { io } from "socket.io-client";
import  axios  from "axios";
import { mdiAccount } from "@mdi/js";
export default {
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
    dialog1:false,
    menuOpen: true,
    search: '',
    disabled: false,
    loading: false,
    


    items: ['Faible', 'Moyen', 'Excellent'],
    drawer: false,
    show: false,
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    medica: '',
    medicament: [],
    granted: false
  }),

  methods: {
    logout: function () {
      localStorage.clear()
      this.$router.push('/')
      console.log(localStorage);
    },
    async saverapport() {
       this.loading = true
       let object = {
entreprise: this.entreprise,
email: this.email,
tlf: this.tlf,
code: this.code,
phonenumber: this.phonenumber,
nom: this.nom,
niveau: this.niveau,
observation: this.observation,
        
        
       }
       try {
         let response = await axios.post('http://127.0.0.1:3000/admin/addrapport', object)
         console.log(response.status)
         if (response.status==200) {
          console.log("succes");
          this.$router.push("/dashbord/repport")
         } else {
           console.log("errror");
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
    socket.on('newevent', (data)=>{
    Push.create(" salut Mr  Maher!", {
    body: `vouz avez un evenement apré ${data} minute'!  `,
    timeout: 100000,
    onClick: function () {
        
    }
});


    })
    socket.on('newmeet', (data)=>{
    Push.create(" salut Mr  Maher!", {
    body: `vouz avez un Meeting apré ${data} minute'!  `,
    timeout: 100000,
    onClick: function () {
        
    }
});
    })

   

}

}
</script>
<style scoped>
.docteur{
  color: whitesmoke	
}
</style>