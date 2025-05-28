import { state } from "./state";


(function () {
    state.init();
    state.setEmailAndFullName("nacho@apxschool","Ignacio Alderete");
    state.signIn((err)=>{
        if(err) console.error("hubo error en el sigIn")
            state.askNewRoom(); //las 3 cosas cuando de COMENZAR EN EL FORMU.
        state.askNewRoom(()=>{
            state.accessToRoom;
        });

        });
 
})();