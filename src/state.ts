const API_BASE_URL ="http://localhost:3000";
import {rtdb} from "./rtdb";
import { getDatabase, ref , onValue} from 'firebase/database';
import map from "lodash/map";

const map = new Map();

const state = {
	data: {
		email:"",
		fullName: "",
		userId: "",
		roomId:"",
		messages: [],
		rtdbRoomId:"",

},
	listeners: [],
	init() {
		const lastStorageState = localStorage.getIten("state")
},
listenRoom(){
	const cs = this.getState();
	const chatroomsRef = ref(rtdb, "/rooms/"+ cs.rtdbRoomId);
	//	const currenState = this.getState();
	onValue(chatroomsRef, (snapshot) => {
		const data = snapshot.val();
		console.log("Datos del chatroom:", data);
	  });
	//	 const messagesList = map(messagesFromServer.messages);
	//	 currentState.messages = messagesList;
	//	 this.setState(currentState);
         

},
	getState() {
	 return this.data;
},
	setNombre(nombre: string) {
	 const currentState = this.getState();
	 currentState.nombre = nombre;
	 this.setState(currentState);
},
	pushMessage(message: string){
	 const nombreDelState = this.data.nombre;
	 fetch(API_BASE_URL + "/messages",{

	method: "post",
	headers: {
		"content-type": "application/json",
},
	body: JSON.stringify({
	 from: nombreDelState,
	 message: message,
	}),
	});

},
	setEmailAndFullName(email:string, fullName:string){
		const cs = this.getState(); 
		cs.fullName = fullName;
		cs.email = email;
		this.setState(cs);
	},
	setState(newState) {
	 this.data = newState;
	 for (const cb of this.listeners) {
		cb();
	}
	localStorage.setItem("state",JSON.stringify(newState))
	 console.log("Soy el state, he cambiado", this.data);
	},
	signIn(callback){
		const cs = this.getState();
		if(cs.email){
			fetch(API_BASE_URL +"./signup",{
				method:"post",
				headers:{
					"content-type":"application/json",

				},
				body:JSON.stringify({email: cs.email})
			}).then(res=>{
				return res.json()
			}).then(data=>{
				cs.userId =data.id;
				this.setState(cs);
				callback();
			})
		}else{
			console.error("nO HAY MAIL EN EL STATE");
			callback(true);
		}
	},
	askNewRoom(callback?){
		const cs = this.getState();
		if(cs.userId){
			fetch(API_BASE_URL +"./rooms",{
				method:"post",
				headers:{
					"content-type":"application/json",

				},
				body:JSON.stringify({userId: cs.userID })
			}).then(res=>{
				return res.json()
			})
			.then(data=>{
				cs.roomId =data.id;
				this.setState(cs);
				if(callback) {
				callback();
				}
			})
			console.log(cs.userId);
		}else{
			console.error("no hay user ID");
		}
	},
	accessToRoom( callback){
		const cs= this.getState();
		const roomId = cs.roomId;
		fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + cs.userId,{
		
		}).then(res=>{
			return res.json()
		})
		.then((data)=>{
			cs.rtdbRoomId =data.rtdbRoomId;
			this.setState(cs);
			this.listenRoom();
			if(callback)
			callback();
		})

	},
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
}, 

};
map.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});

	export {state};
