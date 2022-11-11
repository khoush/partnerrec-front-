<template>

<v-app class="v-application">
 
        <div class="wrapper wrapper--w790">
            <div class="card card-5">
                <div class="card-heading">
                    <h2 class="title">Generate Reports</h2>
                </div>
                <div class="card-body">
                  
                      
                        <div class="form-row">
                            <div class="name">Entreprise</div>
                            <div class="value">
                                <div class="input-group">
                                    <input class="input--style-5" type="text" name="company">
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="name">Email RH Entreprise </div>
                            <div class="value">
                                <div class="input-group">
                                    <input class="input--style-5" type="email" name="email">
                                </div>
                            </div>
                        </div>

                        <div class="form-row m-b-55">
                            <div class="name">Phone</div>
                            <div class="value">
                                <div class="row row-refine">
                                    <div class="col-3">
                                        <div class="input-group-desc">
                                            <input class="input--style-5" type="text" name="area_code">
                                            <label class="label--desc">Area Code</label>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                        <div class="input-group-desc">
                                            <input class="input--style-5" type="text" name="phone">
                                            <label class="label--desc">Phone Number</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="form-row">
                            <div class="name">Nom Candidat</div>
                            <div class="value">
                                <div class="input-group">
                                    <input class="input--style-5" type="text" name="company">
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="name">Niveau de langue</div>
                            <div class="value">
                                <div class="input-group">
                                    <div class="rs-select2 js-select-simple select--no-search">
                                        <select name="subject">
                                            <option disabled="disabled" selected="selected">Choose option</option>
                                            <option>Faible</option>
                                            <option>Moyen</option>
                                            <option>Excellent</option>
                                        </select>
                                        <div class="select-dropdown"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row p-t-20">
                            <label class="label label--block">are you recruited ?</label>
                            <div class="p-t-15">
                                <label class="radio-container m-r-55">Yes
                                    <input type="radio" checked="checked" name="exist">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="radio-container">No
                                    <input type="radio" name="exist">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                   <label for="bio">Autres observations</label>
                   <textarea class="form-control" id="bio" rows="3"></textarea>
                 </div>
                        <div>
                        <a href="path_to_file" download="proposed_file_name">Download</a>
                               
                 
                                
                    </div>
                        </div>
                 
                </div>
            </div>
   
    

</v-app>

</template>
<script>
import  axios from "axios";
  export default {
    data () {
      return {
        headers: [
          {
            text: 'name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Position', value: 'calories' },
          { text: 'office', value: 'fat' },
          { text: 'Age', value: 'carbs' },
          { text: 'Start Date', value: 'protein' },
          { text: 'Salary', value: 'iron' },
          { text: 'circulame  vitae', value: 'show' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
    mounted(){
          axios.get(`http://127.0.0.1:3000/admin/getonecondidat/${this.router.id}`)
          
         .then((response) => {
    console.log(response.data);
  
    this.assistant=response.data



  }).catch((error)=>{
      console.log(error);
    })
   
         
          
        },
  }
</script>
<style scoped>

.border {
  border-right: 1px solid red
}
.small {
    max-width: 600px;
  }
  .box-dash {
    font-family: 'Poppins', sans-serif !important;
    height: 135px;
    padding: 8px 0;
    overflow: hidden;
    
  }
  .box-dash .box-icon {
    margin: -9px 0 2px 0 !important;
  }
  .total-project {
    background-color: #62a1d7 !important;
  }
  .total-project .btn-total-project {
    background-color: #7faedd !important;
  }
  .couts-project {
    background-color: #eb6e6d !important;
  }
  .couts-project .btn-couts-project {
    background-color: #ed7b75 !important;
  }
  .salary-project {
    background-color: #9066b1 !important;
    margin-top: -8%;
  }
  .salary-project .btn-salary-project {
    background-color: #c1acd4 !important;
  }
  .courbe-statistice {
    background-color: #fff;
    color: #fff !important;
   
    
  }
  .courbe-statistice .title-courbe {
    color: #8b5252 !important;
    font-size: 30px !important;
    font-weight: 800;
    font-family: 'Poppins', sans-serif !important;
  }
  .header-bar-list-emoloyer {
      background-color: #7faedd !important;
  }
  .header-bar-list-emoloyer .title-header-bar-list {
    color: #fff !important;
    font-size: 25px !important;
    font-weight: 600;
    font-family: 'Poppins', sans-serif !important;
  }
  .btn-event {
    background-color: #62a1d7 !important;
    background: #62a1d7 !important;
    color: #fff !important;
    border-color: #62a1d7 !important;
    font-size: 12px;
    padding: 10px 7px;
    border-radius: 4px !important;
  
  }
  .icon-info-dash {
    color: #ed7b75 !important;
  }
  .colomn-list-dash,
  .column-estim {
    padding: 0 !important
  }
  .card-project-estime {
    margin: 40px 0 !important;
  }
  .card-project-estime .row-project-estime {
    align-items: center !important;
  }
  .card-project-estime .title-project-estim {
    color: rgb(136, 72, 72) !important;
    font-size: 20px !important;
    font-weight: 500;
    font-family: 'Poppins', sans-serif !important;
  }
  .card-project-estime .progress-project-dash {
    color: #37aa8e !important;
    font-size: 35px !important;
    font-weight: 700 !important;
  }
  .card-project-estime .price-project-estim {
    font-size: 3rem !important;
    font-weight: 800;
    font-family: 'Poppins', sans-serif !important;
    color: #eb6e6d !important;
    letter-spacing: -2px !important;
  }
  .card-project-estime .text-desc {
    font-family: 'Poppins', sans-serif !important;
    font-size: 15px;
    letter-spacing: 0px;
  }
  .Doughnutchart{
  height: 300px;
  }
  .genre{
    margin-left: 12%;
    margin-right: 10%;
    margin-top: 6%;
    width: 20%;

  }
  .heightchart{
    width: 50%;
    height: 50%;
  }
  .titre{
    color:rgb(102, 100, 100);
    margin-top: -3%;
    
  }
  .v-application{
margin-bottom: 5%;}
</style>