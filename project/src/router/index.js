
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/login/Login.vue";
import all_passion from "../components/view/ListeProjet.vue";

import  home from "../components/home/home.vue"
import dashbord_admin from "../components/dashbord_admin.vue";
import  one_passion  from "../components/view/Post.vue";
import calnedrier from "../components/view/calendrier.vue";
import report from "../components/view/Rapport.vue";
import chart from "../components/view/onecondidat.vue";
import  profile from "../components/view/profile.vue"
import  Forget_pwd from "../components/forgetpassword.vue"
import change_password from "../components/change_password.vue"
import assisatnt  from "../components/view/condidats.vue"


Vue.use(VueRouter);

const routes = [
   
    {
        path: "/",
        name:"login",
        component: Login,
    
          
    }, 
    {
        path: "/Forget_pwd",
        name:"Forget_pwd",
        component : Forget_pwd
      
      },
      {
        path: "/change_password/:token",
        name:"change_password",
        component : change_password
      
      },
       
        {
            path: "/dashbord",
            name: "dashbord",
            component: dashbord_admin,
            children:[
                 {
                    path:"home",
                    name:"home",
                    component:home
                 },
                
                    {
                        path: "all_projet",
                        name:"allpatinet",
                        component: all_passion
                    },
                  
                    
                    
                    {
                        path:"chart/:id",
                        name:"chart",
                        component:chart
                    },
                   
                   
                    {
                        path:"oneprojet/:id",
                        name:"oneprojet",
                        component:one_passion,
                    },
                   
                    {
                        path:"calendrier",
                        name:"calendrier",
                        component:calnedrier
                    },
                   
                   
                    {
                        path:"profile/:id",
                        component:profile
                    },
                    {
                        path:"condidat",
                        name:"assisatnt",
                        component:assisatnt
                    },
                    {
                      path:"repport",
                      name:"repport",
                      component:report
                  },
                    
                
            ]
        },
       
        
       
    ];
    const router = new VueRouter({
        mode: "history",
        routes,
        base: process.env.BASE_URL,
      });
      router.beforeEach((to, from, next) => {
        let isAuthenticated = false;
        let token =  localStorage.getItem('authorization');
        if (token)
           { isAuthenticated = true;}
            else 
          {  isAuthenticated = false;}
        let noAuth = [ "Forget_pwd", "change_password","login"];
        if(noAuth.includes(to.name)){
         next();
       }else{  
         if(to.name == 'login' && isAuthenticated) next({name : "home" })
          if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
         next()
       }})


    //   router.beforeEach((to, from, next) => {
    //     var isAuthenticated = false;
    //     let token =  localStorage.getItem('authorization')
    //  let noAuth = [ "Reset_pwd", "Forget_pwd"];
    // if(noAuth.includes(to.name)){
    //    next();}
    //     if (token)
    //    { isAuthenticated = true;}
    //     else 
    //   {  isAuthenticated = false;}
         
    //      if(isAuthenticated && to.name == 'login'){

    //       return  next({name : "calendrier" })}
    //      else if (!isAuthenticated && to.name !== 'login'){

    //     return  next({ name: 'login' })
    // }else{
    //     next()
    // } 
         
    //    })
     
    //   function getrole() {
    //     let user = JSON.parse(localStorage.getItem('user'))
    //     if (user) {
    //       return user.role
    //     }
    //     return null
    //   }
     
export default router;


