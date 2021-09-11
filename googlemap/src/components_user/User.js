import React from "react";
import './User.css'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete'
import isPointInPolygon from "geolib/es/isPointInPolygon"
import Wait from "./Wait";
import DetailDriver from "./DetailDriver";
import axios from "axios";
import { socketUrl, Url } from '../LinkToBackend';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { stack as Menu } from 'react-burger-menu'
import CommentDriver from "./CommentDriver";
import distance from 'google_directions';
import mapStyle from "../mapStyle"
import ChatUser from "./ChatUser";
Geocode.setApiKey("AIzaSyDrjHmzaE-oExXPRlnkij2Ko3svtUwy9p4");
let conn = new WebSocket(`${socketUrl.LinkToWebSocket}`);
conn.onopen = function(e) {
  console.log("Connection established!");
}

class User extends React.Component {
    
    state = {
      address: '',
      city: '',
      area: '',
      state: '',
      zoom: 15,
      height: 400,
      mapPosition: {
        lat: 13.84839475068859,
        lng: 100.56908802639256,
      },
      markerPosition: {
          lat: 13.851130590990257,
          lng: 100.56620801275722,
      },
      markerDestinationPosition:{
          lat: 13.851130590990257,
          lng: 100.56743435031639,
      },
      showPlaceHolder:'เลือกตำแหน่งของคุณ',
      showPlaceHolderDestination:'เลือกจุดหมาย',

      waitingQueueAppear:null,
      detailDriverAppear:null,
      locationList:[],
      loadingState:0,
      travelDistance:0,
    }
    
    watingQueue=null;
    detailDriver=null;
    timeoutId = 0;
    driverId=null;
    userId=null;
    fetchUserIdInterval=null;
    chatUser=null;
    //------------------------functionสำหรับหาตำแหน่งปัจจุบันของ user----------
    findMylocation=()=>{
        navigator.geolocation.getCurrentPosition(position=>{
          this.setState({
            // mapPosition: {
            //   lat: position.coords.latitude,
            //   lng: position.coords.longitude
            // },
            markerPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          },()=>{
            Geocode.fromLatLng(position.coords.latitude,position.coords.longitude)
              .then(response=>{
                  const address = response.results[0].formatted_address,
                        addressArray = response.results[0].address_components,
                        city = this.getCity(addressArray),
                        area= this.getArea(addressArray),
                        state = this.getState(addressArray);
                  this.setState({
                    adress: (address) ? address : "",
                    area: (area) ? area : "",
                    city: (city) ? city : "",
                    state: (state) ? state : "",
            })
          })
          })
        })
    }

    //function getCountry getCity getArea getDistrict getStreet getState สำหรับหาเอาข้อมูลที่อยู่จาก latitude longtitude แต่ไม่ได้ใช้
    getCountry = (addressArray)=>{ 
      let Country='';
      for(let index = 0 ; index < addressArray.length ; index++){
        if(addressArray[index].types[0] && addressArray[index].types[0]==='country'){
          Country=addressArray[index].long_name;
          return Country;
        }

      }
    }
    getCity = (addressArray) =>{
      let city = '';
      for (let index = 0 ; index < addressArray.length ;index++){
        if(addressArray[index].types[0] && 'administrative_area_level_1'=== addressArray[index].types[0]){
          city = addressArray[index].long_name;
          return city;
        }
      }
    }
    //เขต/อำเภอ
    getArea = (addressArray) => {
      let area = '';
      for (let i = 0; i < addressArray.length; i++) {
          if (addressArray[i].types[0]) {
              for (let j = 0; j < addressArray[i].types.length; j++) {
                  if ('sublocality_level_1' === addressArray[i].types[j] ) {
                      area = addressArray[i].long_name;
                      return area;
                  }
              }
          }
      }
    };
    
    getDistrict =(addressArray) => {
      let District = '';
      for (let i = 0; i < addressArray.length; i++) {
          if (addressArray[i].types[0]) {
              for (let j = 0; j < addressArray[i].types.length; j++) {
                  if ('sublocality_level_2' === addressArray[i].types[j]) {
                      District = addressArray[i].long_name;
                      return District;
                  }
              }
          }
      }
    };
    getStreet = (addressArray)=>{
      let Street='';
      for(let index = 0 ; index < addressArray.length ; index++){
        if(addressArray[index].types[0] && addressArray[index].types[0]==='route'){
          Street=addressArray[index].long_name;
          return Street;
        }

      }
    }
    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };   
    
    //--------------------------function ถูกเรียกตอนวางMarkerสีเขียวปักลงในแผนที่  ------------------
    onMarkerDragEnd = (event)=>{
      let newLat = event.latLng.lat();
      let newLng= event.latLng.lng();
      console.log('newLat',newLat);
      console.log('newLng',newLng);
      //api ของ googlemap สำหรับเอาข้อมูลlatitude longtitude ไปหา address
      Geocode.fromLatLng(newLat,newLng)
      .then(response=>{
        console.log(response)
        const address = response.results[0].formatted_address,
              addressArray = response.results[0].address_components,
              city = this.getCity(addressArray),
              area= this.getArea(addressArray),
              state = this.getState(addressArray);
        this.setState({
          address: (address) ? address : "",
          area: (area) ? area : "",
          city: (city) ? city : "",
          state: (state) ? state : "",
          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          showPlaceHolder: address ,
          
        })
      })
    }

    //-------------------function ถูกเรียกตอนวางMarkerสีแดงปักลงในแผนที่----------------
    onMarkerDestinationDragEnd = (event)=>{
      let newLat = event.latLng.lat();
      let newLng= event.latLng.lng();
      console.log('newLat',newLat);
      console.log('newLng',newLng);
      //api ของ googlemap สำหรับเอาข้อมูลlatitude longtitude ไปหา address
      Geocode.fromLatLng(newLat,newLng)
      .then(response=>{
        console.log(response)
        const address = response.results[0].formatted_address,
              addressArray = response.results[0].address_components,
              city = this.getCity(addressArray),
              area= this.getArea(addressArray),
              state = this.getState(addressArray);
        this.setState({
          address: (address) ? address : "",
          area: (area) ? area : "",
          city: (city) ? city : "",
          state: (state) ? state : "",
          markerDestinationPosition: {
            lat: newLat,
            lng: newLng
          },
          showPlaceHolderDestination: address,
          
        })
      })
    }

    //----------------------function ถูกเรียกเมื่อค้นหาสถานที่ในช่องค้นหาของmarker สีเขียว--------
    onPlaceSelected = (place)=>{
      //กรณีไม่เจอไม่เจอสถานที่
      if (!place.geometry) {                                                  
        NotificationManager.error("ไม่พบ :'" + place.name + "'",'Alert',3000);
        return;
      }
      console.log(place)
      const address = place.formatted_address,
        addressArray = place.address_components,
        city = this.getCity(addressArray),
        area = this.getArea(addressArray),
        state = this.getState(addressArray),
        newLat = place.geometry.location.lat(),
        newLng = place.geometry.location.lng();
      this.setState({
        adress: (address) ? address : "",
        area: (area) ? area : "",
        city: (city) ? city : "",
        state: (state) ? state : "",
        markerPosition: {
          lat: newLat,
          lng: newLng
        },
        showPlaceHolder:place.name+" "+address,
        // mapPosition: {
        //   lat: newLat,
        //   lng: newLng
        // },
      })
      
    }
    
    //function ถูกเรียกเมื่อค้นหาสถานที่ในช่องค้นหาของmarker สีแดง
    onPlaceDestinationSelected = (place)=>{
      if (!place.geometry) {
        //กรณีไม่เจอไม่เจอสถานที่
        NotificationManager.error("No details available for input: '" + place.name + "'",'Alert',3000);
        return;
      }
      const address = place.formatted_address,
        addressArray = place.address_components,
        city = this.getCity(addressArray),
        area = this.getArea(addressArray),
        state = this.getState(addressArray),
        newLat = place.geometry.location.lat(),
        newLng = place.geometry.location.lng();
      this.setState({
        adress: (address) ? address : "",
        area: (area) ? area : "",
        city: (city) ? city : "",
        state: (state) ? state : "",
        markerDestinationPosition: {
          lat: newLat,
          lng: newLng
        },
        showPlaceHolderDestination:place.name+" "+address,
      })
    }
    
    //---------------เก็บตำแหน่งPolygonของบริเวณพื้นที่ให้บริการ---------
    greenZonePath = [
      {latitude:13.855458118865057, longitude:100.56596600925597},
      {latitude:13.857277966250578, longitude:100.57639848267323},
      {latitude:13.857659300458918, longitude:100.58083861265405},
      {latitude:13.850487798245787, longitude:100.5815458679391},
      {latitude:13.836416483501072, longitude:100.57339372833995},
      {latitude:13.842558941191157, longitude:100.5590814720114},
      {latitude:13.855458118865057, longitude:100.56596600925597},
    ]

    //--------------เก็บตำแหน่งPolygonของบริเวณพื้นที่ห้ามวินผ่าน----------
    redZonePath = [
        {latitude: 13.84680634471089,longitude: 100.56479688230758},
        {latitude: 13.848348039187117,longitude: 100.56569906630881},
        {latitude:13.850380257189924, longitude:100.56586145942902},
        {latitude:13.850240104794747, longitude:100.57237522791787},
        {latitude:13.844213471850779, longitude:100.57230305319777},
        {latitude:13.842952063786939, longitude:100.57158130599677},
        {latitude: 13.84680634471089,longitude: 100.56479688230758},
    ]
   
    //--------------functionถูกเรียกเมื่อ user กดปุ่มเริ่มต้น-------------------- 
    getDistance = () => {
        var params = {
        // REQUIRED
        origin: `${this.state.markerPosition.lat},${this.state.markerPosition.lng}`,
        destination: `${this.state.markerDestinationPosition.lat} , ${this.state.markerDestinationPosition.lng}`,
        key: "AIzaSyDrjHmzaE-oExXPRlnkij2Ko3svtUwy9p4",
    
        // OPTIONAL
        mode: "walking",
        avoid: "",
        language: "",
        units: "",
        region: "",
      };
      distance.getDirections(params, (err,data)=> {
        this.setState ({
          travelDistance: data.routes[0].legs[0].distance.value
        })
      })
      
      
    }
    
    addLocation = () =>{
      //-----------------เช็คตำแหน่งของทั้งสองmarkerว่าอยู่ในพื้นที่ให้บริการและอยู่นอก redzone หรือไม่-------------------
     if(!isPointInPolygon({latitude: this.state.markerPosition.lat, longitude: this.state.markerPosition.lng},this.redZonePath) && 
     !isPointInPolygon({latitude: this.state.markerDestinationPosition.lat, longitude: this.state.markerDestinationPosition.lng},this.redZonePath) &&
     
     isPointInPolygon({latitude: this.state.markerPosition.lat, longitude: this.state.markerPosition.lng},this.greenZonePath) &&
     isPointInPolygon({latitude: this.state.markerDestinationPosition.lat, longitude: this.state.markerDestinationPosition.lng},this.greenZonePath))
     {
        this.getDistance()
        // ------------------ user เลือกตำแหน่งเสร็จแล้ว ส่งตำแหน่งที่เลือกไปให้ driver ที่ match ------------------
        axios.post(Url.LinkToBackend+"backend/api/line2",{
          user_id: this.userId,
          latitudeStart: this.state.markerPosition.lat,
          longtitudeStart: this.state.markerPosition.lng,
          latitudeDestination: this.state.markerDestinationPosition.lat,
          longtitudeDestination: this.state.markerDestinationPosition.lng
        })
        .then(res=>{
          console.log(res.data);
          this.setState({
            waitingQueueAppear:1,
          })
          this.timeoutId = setInterval(()=>{
            // ------------------ user match กับ driver แล้ว (ยังไม่กดยอมรับ หรือ ปฏิเสธ) ------------------
            axios.post(Url.LinkToBackend +"backend/api/homeuser_line3", 
            {id: this.userId})
            .then(res=>{
                                
              if(!!res.data.driver_id){                    
                console.log(res);
                console.log(res.data);   
                this.driverId=res.data.driver_id;
                this.setState({
                  waitingQueueAppear:null,
                  detailDriverAppear:1,
                })
              }else{
                
              }
            })
          },1500)
        })
        .catch(err=>{
          NotificationManager.error(err.message,'Alert',1000);
          
        })
        

                 
     }
     else{
      NotificationManager.error('ไม่อยู่ในพื้นที่บริการ','Alert',3000);
     } 
    }
    
    
    
    // ------------------ check user cancel ในทุกกรณี ------------------
    cancelQueue = ()=>{
      clearInterval(this.timeoutId);
      axios.post(Url.LinkToBackend +"backend/api/cancelation",{
        id: this.userId
      })
      .then( res=>{
        console.log(res.data);
        this.setState({
          waitingQueueAppear:null,
          detailDriverAppear:null,
          
      })
      window.location.reload()
      })
      .catch(err=>{
        NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);
        
      })
    }

    
    
    // ------------------ ส่ง user id ของ user ไปใช้ทำอย่างอื่น ------------------
    componentDidMount(){

      axios.get( Url.LinkToBackend +"backend/api/bomb")
      
      //--------------------------------
      this.fetchUserIdInterval=setInterval(()=>{
        
        axios.post(Url.LinkToBackend+"backend/api/line1",{
          username: localStorage.getItem("username")
        })
        .then(res=>{
          clearInterval(this.fetchUserIdInterval)
          this.userId=res.data[0].user_id;
          this.setState({
            loadingState:1,
          })
          console.log(res.data[0].fname, res.data[0].lname)
          conn.send(JSON.stringify({
            protocol: "in",
            arg1: `${res.data[0].fname} ${res.data[0].lname}`, // name
            arg2: "0",
            arg3: `${res.data[0].user_id}`,
          }));
        
        })
        .catch(err=>{
          NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);
        })
      },1500)
      
    }
    showSettings (event) {
      event.preventDefault();
      
    }

    handleForUpdate(stateCommentPage){
      
      this.setState({
        detailDriverAppear:stateCommentPage,
      });
    
    }
    
    
    render(){
      
      if(!!this.state.waitingQueueAppear){
        this.watingQueue= <Wait cancelQueue={this.cancelQueue} travelDistance={this.state.travelDistance}/>
      }
      else{
        this.watingQueue=null;
        clearInterval(this.timeoutId);
      }
      if(this.state.detailDriverAppear===1){
        this.n=this.n+'1'
        this.detailDriver = <DetailDriver driverId={this.driverId} cancelQueue={this.cancelQueue} travelDistance={this.state.travelDistance}/>
        this.chatUser= <ChatUser  conn={conn} driverId={this.driverId} />
        
      }
      else if(this.state.detailDriverAppear===2){
        this.detailDriver = <CommentDriver handleForUpdate = {this.handleForUpdate.bind(this)} conn={conn}/>
        
      }
      else{
        this.detailDriver=null;
        this.chatUser=null;
      } 
      
      //-----------------codeสำหรับสร้าง component ทุกอย่างที่เป็นของ googlemap ต้องเขียนใน tag Googlemap------------
      const MapWithAMarker = withScriptjs(withGoogleMap(props =>       
        <GoogleMap div id="con"
          //------------------setting ของตัวแผนที่--------------------------
          defaultZoom={15}
          defaultCenter={{ lat:this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          
          
          defaultOptions={{
            
            zoomControl:true,
            scrollwheel:true,
            streetViewControl: false,
            draggable:true,
            // minZoom:1,
            // maxZoom:16,
            mapTypeControl:false,
            restriction:{
              latLngBounds:{
                north: this.state.mapPosition.lat+ 0.010,
                south: this.state.mapPosition.lat - 0.0127,
                east: this.state.mapPosition.lng + 0.0134,
                west: this.state.mapPosition.lng - 0.0103,
              },
              strictBounds:true,
              
            },
            styles:mapStyle,
           }}
        >
          {/* ----------componentของmarkerตำแหน่งเริ่มต้น(สีเขียว) ----------*/}
          <Marker
            draggable={true}
            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
            onDragEnd={this.onMarkerDragEnd}
            icon={{
              url:"../pictures/markgreen.png",
              scaledSize:{height: 40 , width: 25},
            }}
            >  
          </Marker>
            {/*--------- componentของmarkerตำแหน่งปลายทาง(สีแดง) -------*/}
          <Marker 
            draggable={true}
            onDragEnd={this.onMarkerDestinationDragEnd}
            icon={{
              url:"../pictures/markred.png",
              scaledSize:{height: 40 , width: 25},
            }}
          
            position={{ lat: this.state.markerDestinationPosition.lat, lng: this.state.markerDestinationPosition.lng }}         
            >  
          </Marker>
          <div class="locationbox">
            <div id="inbutt">
          {/* ----------component กล่องค้นหาตำแหน่งเริ่มต้น--------- */}
          <Autocomplete id="input1"
            options={
              {
                bounds:{
                  north: this.state.mapPosition.lat+ 0.01,
                  south: this.state.mapPosition.lat - 0.01,
                  east: this.state.mapPosition.lng + 0.01,
                  west: this.state.mapPosition.lng - 0.01,
                },
                strictBounds: true,
                types: ["establishment"],
                componentRestrictions :{
                  country: "th",
                },
                fields: ["address_components","formatted_address", "geometry", "icon", "name"],
              }
            }

            onPlaceSelected={this.onPlaceSelected}
            placeholder={this.state.showPlaceHolder}
            />

          <button class="button-currentLocation" onClick={this.findMylocation}></button>
          </div>  
            {/* ----------component กล่องค้นหาตำแหน่งปลายทาง--------- */}
          <Autocomplete id="input2" 
            options={
              {
                bounds:{
                  north: this.state.mapPosition.lat+ 0.01,
                  south: this.state.mapPosition.lat - 0.01,
                  east: this.state.mapPosition.lng + 0.01,
                  west: this.state.mapPosition.lng - 0.01,
                },
                strictBounds: true,
                types: ["establishment"],
                componentRestrictions :{
                  country: "th",
                },
                fields: ["address_components","formatted_address", "geometry", "icon", "name"],
              }
            }
            onPlaceSelected={this.onPlaceDestinationSelected}
            placeholder={this.state.showPlaceHolderDestination}
            />
          </div>

          <Polygon 
            path={[
              {lat:13.855458118865057, lng:100.56596600925597},
              {lat:13.857277966250578, lng:100.57639848267323},
              {lat:13.857659300458918, lng:100.58083861265405},
              {lat:13.850487798245787, lng:100.5815458679391},
              {lat:13.836416483501072, lng:100.57339372833995},
              {lat:13.842558941191157, lng:100.5590814720114},
              {lat:13.855458118865057, lng:100.56596600925597},
            ]}
            
            options={
              {
                strokeColor: "green",
                strokeOpacity: 0,
                strokeWeight: 3,
                fillColor: "green",
                fillOpacity: 0,
              }
            }
          />

          {/* <button class="button-currentLocation" onClick={this.findMylocation}>your location</button> */}
          <div id="bottombutt">
          <button className="button-start" type="button" class="btn btn-primary" id="buttstart" onClick={this.addLocation}>เริ่มต้น</button>
            {/* <button class="btn btn-primary" type="submit">เริ่มต้น</button> */}
          </div>
          <Polygon 
              path={[
                {lat: 13.84680634471089,lng: 100.56479688230758},
                {lat: 13.848348039187117, lng: 100.56569906630881},
                {lat:13.850380257189924, lng:100.56586145942902},
                {lat:13.850240104794747, lng:100.57237522791787},
                {lat:13.844213471850779, lng:100.57230305319777},
                {lat:13.842952063786939, lng:100.57158130599677},
                {lat: 13.84680634471089,lng: 100.56479688230758},
              ]}
              
              options={
                {
                  strokeColor: "#d34052",
                  strokeOpacity: 0.5,
                  strokeWeight: 2,
                  fillColor: "#d34052",
                  fillOpacity: 0.3,
                }
              }
          />
        
        </GoogleMap>
      ));
      
      //loading screen
      if (this.state.loadingState===0){
        return <img id="loading" src="../pictures/load.gif"/>
      }else{
      return(
        <div>


          {/* ตรงนี้คือส่วนของHamberger Bar แต่ถ้าใช้คำสั่งล่างที่commentไว้ คือจะใส่รูปภาพแทนขีดhamberger*/}
          <Menu right>   
          {/* <Menu customBurgerIcon={ <img src="" /> } right> */}

            <a id="home" className="menu-item" href="/"><i class="far fa-user"></i> ข้อมูลผู้ใช้ </a>
            <a id="contact" className="menu-item" href="/contact"> <i class="fas fa-phone-alt"></i> ติดต่อ</a>
            <a onClick={ this.showSettings } className="menu-item--small" href=""><i class="fas fa-cog"></i> ตั้งค่า</a>
            <a id="contact" className="menu-item" onClick={()=>{ localStorage.clear() ; window.location.reload()}}> <i class="fas fa-sign-out-alt"></i> ออกจากระบบ</a>
              localStorage.clear() ; 
              window.location.reload();
              // conn.send(JSON.stringify({
              //   protocol: "out",
              // }));
            }}>ออกจากระบบ</a>
          </Menu>
            
          
        
        <div style={{ padding:'20px',marginLeft:'auto',marginRight:'auto', maxWidth: 600 }}>
          
        {this.watingQueue}
        {this.detailDriver}
    
        
        <MapWithAMarker  
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrjHmzaE-oExXPRlnkij2Ko3svtUwy9p4&v=3.exp&libraries=geometry,drawing,places"
          // containerElement={<div id="map" style={{ height: `380px`}} />}
          containerElement={<div id="mapbox" style={{ height: `342px`}} />}
          loadingElement={<div style={{ height: `100%` }} />}
          mapElement={<div id="here"style={{ height: `100%` }} />}
        />
        {this.chatUser }
        <NotificationContainer />
        
        </div>
          <button onClick={()=>{
            this.setState({detailDriverAppear:2})
          }} onDoubleClick={()=>{
            this.setState({detailDriverAppear:null})
          }}>sadasd</button>
        </div>
        
      );
      }
    }
}

export default User;