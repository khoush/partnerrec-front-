<template>
  <v-app class="calandar">
    <v-container>
      <v-flex xs12 sm12 md12 max-height="700">
        <v-sheet>
          <v-row>

            <v-col align="center">

              <v-toolbar flat>
                <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                  Today
                </v-btn>


                <v-col align="center">
                  <v-btn fab text small color="grey darken-2" @click="$refs.calendar.prev()">
                    <v-icon small>
                      mdi-chevron-left
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col align="center">
                  <v-toolbar-title v-if="$refs.calendar" class="title-calandar">
                    {{ $refs.calendar.title }}
                  </v-toolbar-title>
                </v-col>
                <v-col align="center">
                  <v-btn fab text small color="grey darken-2" @click="$refs.calendar.next()">
                    <v-icon small>
                      mdi-chevron-right
                    </v-icon>
                  </v-btn>

                </v-col>

                <v-spacer></v-spacer>

                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right>
                        mdi-menu-down
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list class="liste">
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Day</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>

                  </v-list>
                </v-menu>
              </v-toolbar>

              <v-sheet height="500">
                <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
                  :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay"
                  @change="updateRange"></v-calendar>


                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">

                    <v-btn v-bind="attrs" v-on="on" color="cyan accent-2" right class="vapplication"
                      @click.stop="Calendrier = true"> ajouter Rendez-vous

                    </v-btn>

                  </template>
                  <span>ajout rdv</span>

                </v-tooltip>
                 <v-tooltip >
                  <template v-slot:activator="{ on, attrs }">

                    <v-btn  class="mt-14" v-bind="attrs" v-if="isdocteur" v-on="on" color="cyan accent-2" right absolute
                      @click.stop="evenement = true"> ajouter  évenemet fameliaux

                    </v-btn>

                  </template>
                  <span>ajout rdv</span>

                </v-tooltip>
                <evenement_docteur v-bind:evenement.sync="evenement"></evenement_docteur>
                <Rendezvous v-bind:Calendrier.sync="Calendrier"></Rendezvous>
                <modifier_rendezvous v-bind:modifier_rdv.sync="modifier_rdv" :rendez_vous="rendez_vous"></modifier_rendezvous>
                <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
                  <v-card color="white " min-width="350px" flat>
                    <v-toolbar :color="selectedEvent.color" dark>
                      <v-btn icon  @click.stop=" showmodifierrdv(selectedEvent)">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                      <v-spacer></v-spacer>

                      <v-btn icon @click=" confirmedeleterdv(selectedEvent.id)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text color="red">
                      <span v-html="selectedEvent.alert"></span>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn text color="white" @click="selectedOpen = false">
                        Cancel
                      </v-btn>
                    </v-card-actions>
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
                </v-menu>
              </v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
      </v-flex>
    </v-container>
     <confirm ref="confirm"></confirm>
  </v-app>
</template>
<script>

import axios from 'axios';
import confirm from "../modals/confirm.vue"
import Rendezvous from "../modals/ajout_events.vue";

 

  export default {
     created: function () {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    this.user = user
     this.isdocteur = user.role == 'docteur'

    console.log(user.role)

  },
    name:"Calendrier",
    components:{

    Rendezvous,
    
    confirm
        
    },
    data: () => ({
      isdocteur : true,
      rendez_vous:{},
        Calendrier:false,
        dialog: false,
        evenement:false,
        modifier_rdv:false,
         snackbar: {
       show: false,
       color: '',
       text: '',
       timeout: 10000
     },
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day'
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
   
      user:{},
     
      rendezvous:[]


    }),
   
     mounted(){

    axios.get('http://127.0.0.1:3000/admin/getallevent')
    .then((response) => {
        this.rendezvous=response.data;
        console.log(this.rendezvous);


        this.updateRange()
      
    })
   

  
      this.$refs.calendar.checkChange()
    },
    methods: {
        confirmedeleterdv: function (id) {
      this.$refs.confirm.open(`suprimer `, 'Voulez-vous vraiment supprimer ce Rendez-vous ?', {
          color: 'red'
        })
        .then(async () => {
  
        
          let response = await axios.post(`http://127.0.0.1:3000/user/delete_rendezvous/${id}`, {}, {
           
          });
         if (!response.data.err) {
           this.snackbar.text = response.data.msg
           this.snackbar.color = 'primary'
           this.snackbar.show = true
             setTimeout(location.reload(), 3000); 
         } else {
           this.snackbar.text = response.data.msg
           this.snackbar.color = 'secondary'
           this.snackbar.show = true
            

         }
        })
    },
      showmodifierrdv(rendzvous){
        this.modifier_rdv = true
       
         this.rendez_vous=rendzvous
         let start= this.rendez_vous.start.split(" ")
         let end= this.rendez_vous.end.split(" ")
       this.rendez_vous.start=start
          this.rendez_vous.end=end
          console.log(this.rendez_vous)
           console.log(start)
            console.log(end)
        
        
        
      },
      test(){
        console.log(this.selectedEvent);
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
     
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange() {
      let events = []
      this.rendezvous.forEach(rendezvou => {
        let couleur = ''
        let alert=''
        switch (rendezvou.description) {
          case 0:
            couleur= 'red '
            alert="consultaio terminer"
            break;
          case 1:
           couleur = 'orange'
           alert="en train de consulter"
            break;
          case 2:
           couleur = 'green'
           alert="pas en core "

            break;
            default:
            couleur="green"
             break;
         
        }
      if(rendezvou.length>0){
events.push({
          name: rendezvou.title,
          start: rendezvou.start,
          end: rendezvou.end,
          color: couleur,
          alert:alert,
          id:rendezvou._id
})
      }else{
        events.push({
          name: rendezvou.title,
          start: rendezvou.start,
          end: rendezvou.end,
          color: couleur,
          alert:alert,
          id:rendezvou._id
       

        })
        }
                this.$forceUpdate()

      });


      this.events = events
      console.log(events)
    },
   
   
    updatevent() {
      switch (this.selectedEvent.description) {
          case 0:
            this.selectedEvent.color = 'red'
            break;
          case 1:
            this.selectedEvent.color = 'orange'
            break;
          case 2:
            this.selectedEvent.color = 'blue'
            break;
            default:
           this.selectedEvent.color='red'
          break;
         
        }
        this.newtick = ''
        this.selectedOpen = false
    },
    changestate() {
      this.selectedEvent.color = 'blue'
    }
  },
 
    
  }
</script>
<style scoped>
.calandar.container {
  width: 90%;
  min-height: 100%;
}

.calandar i.v-icon.notranslate.mdi.mdi-chevron-left.theme--light,
.calandar i.v-icon.notranslate.mdi.mdi-chevron-right.theme--light {
    background-color: #EC6B6B;
    border-radius: 50%;
    padding: 17px;
    color: #fff;
    font-size: 30px;
}

.calandar .title-calandar {
    font-size: 2.5rem !important;
    font-weight: 700 !important;
    letter-spacing: -2px !important;
    font-family: 'Poppins', sans-serif !important;
}

.calandar .v-calendar-monthly.v-calendar-weekly.v-calendar.theme--light.v-calendar-events .v-calendar-weekly__day.v-present .v-event.v-event-start.v-event-end.white--text {
    height: 45px !important;
    border-radius: 0 !important;
    margin: 10px auto !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}

.calandar .v-calendar-weekly__day-label button.v-btn.v-btn--fab.v-btn--has-bg.v-btn--round.theme--light.v-size--small.primary {
  background-color: #62a1d7 !important;
}

.calandar .v-calendar-weekly__day-label {
  font-size: 20px !important;
  font-weight: 600 !important;
}
.vapplication {
    margin-right: 48px !important;
    margin-left: 80%;
}
</style>