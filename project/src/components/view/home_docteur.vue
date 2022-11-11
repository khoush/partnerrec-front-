
<template>
    <v-app class="calandar">
        <v-row   class="genre" >
        <h2 class="titre" >  totale De Patients</h2>
          <v-hover v-slot="{ hover }" open-delay="100">
            <v-card class=" mt-8 total-project box-dash" :elevation="hover ? 5 : 2">
              <v-row>
                <v-col >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="box-icon">
                        <v-btn fab class="btn-total-project" elevation="0" >
                          <v-icon color="white">group</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="headline mb-1 white--text">
                      mlsdkjflkdf
                      </v-list-item-title>
                      <v-list-item-subtitle class="white--text">Total des Patient</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col sm="1"><v-divider dark vertical></v-divider></v-col>
                <v-col cols="12" sm="5">
                    <v-list-item-title class="title mt-2 white--text">
               slfjglsjkf
                    </v-list-item-title>
                    <v-list-item-subtitle class="white--text">homme</v-list-item-subtitle>
                    <v-list-item-title class="title white--text">
                      mflkgmflkg
                    </v-list-item-title>
                    <v-list-item-subtitle class="white--text">Femme</v-list-item-subtitle>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </v-row>
</v-app>
</template>