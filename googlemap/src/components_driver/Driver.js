import React from "react";
import './Driver.css'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import Geocode from "react-geocode";
import axios from 'axios'
import QueueDriver from "./component/QueueDriver";
import leaveQueue from "./component/LeaveQueue";
import UserInfo from "./component/userInfo";
import { Url } from '../LinkToBackend';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { stack as Menu } from 'react-burger-menu'
import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';
Geocode.setApiKey("AIzaSyDrjHmzaE-oExXPRlnkij2Ko3svtUwy9p4");


class Driver extends React.Component {
  
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
      lat: 0,
      lng: 0,
    },
    markerDestinationPosition:{
      lat:0, 
      lng:0,
    },
    locationList:[],
    queueDriverAppear:1,
    buttonAcceptCancelAppear:1,
    driverId:null,
    userId:null,
    userFname:null,
    userLname:null,
  }
  queueDriver = null;
  buttonAcceptCancel = null;
  buttonDone = null;
  userInfo = null;
  fetchDriverIdInterval=null;

  //--------------------------------------ทำหน้าที่ในการจัดการการอัพเดทเวลามีค่าต่างๆเปลี่ยนแปลง------
  handleForUpdate(startLat,startLng,DestinationLat,DestinationLng ,queuePageStatus, idUser, userFName, userLName){
    console.log(startLat,startLng)
    console.log(userFName,userLName)
    this.setState({
      markerPosition: {
        lat: startLat,
        lng: startLng,
      },
      markerDestinationPosition:{
        lat: DestinationLat, 
        lng: DestinationLng,
      },
      queueDriverAppear: queuePageStatus,
      userId: idUser,
      userFname: userFName,
      userLname: userLName,
    });
  
  }
  
  
  // ------------------ เช็คว่า user cancel หรือยัง ------------------
  cancelIntervalId=0;
  cancelCase=()=>{
    this.cancelIntervalId=setInterval(()=>{
      axios.post(Url.LinkToBackend + "backend/api/check_user_cancel",{
        user_id : this.state.userId
      })
      .then(res=>{
        console.log(res.data);
        console.log(res.data.message);
        if (!res.data.message){
          clearInterval(this.cancelIntervalId);
          leaveQueue(this.state.driverId);
          NotificationManager.error('คำขอบริการถูกยกเลิก','Alert',10000);
          
          this.setState({
            queueDriverAppear:1,
            buttonAcceptCancelAppear:1,
          })
        }
      })
    }, 1500);
  }

  // ------------------ driver กด ปฏิเสธไม่รับงาน ------------------
  driverCancel = () =>{
    console.log(parseInt(this.state.driverId));
    console.log(parseInt(this.state.userId));
    
    // leaveQueue(this.state.driverId);
    // document.location.reload();
    axios.post(Url.LinkToBackend+"backend/api/driver_cancel",{
      driver_id: parseInt(this.state.driverId),
      user_id: parseInt(this.state.userId)
    })
    .then(res=>{
      console.log(res.data.message);
      this.setState({
        queueDriverAppear:1,
      });
    })
    .catch(err=>{
      NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);
  })
  }

  // ------------------ driver กด ยอมรับงาน ------------------
  driverAccept = () =>{
    
    
    axios.post(Url.LinkToBackend+"backend/api/driver_accept",{
      driver_id: parseInt(this.state.driverId),
      user_id: parseInt(this.state.userId)
    })
    .then(res=>{
      console.log(res.data.message);
      this.setState({
        buttonAcceptCancelAppear: null,
      });
      leaveQueue(this.state.driverId);
    })
    .catch(err=>{
      NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);
  })

    
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  }
  
  // ------------------ เอา driver id ไปใช้ในที่อื่นๆ ------------------
  componentDidMount(){
    addResponseMessage("Welcome to this awesome chat!");
    axios.get( Url.LinkToBackend +"backend/api/bomb")
    this.fetchDriverIdInterval = setInterval(()=>{
      axios.post(Url.LinkToBackend+"backend/api/postdriver",{
        username: localStorage.getItem("username")
        // username : this.props.username
      })
      .then((res)=>{
        clearInterval(this.fetchDriverIdInterval);
        console.log(res.data);
        this.setState({
          driverId: parseInt(res.data[0].driver_id),
        })
        
      })
      .catch(err=>{
        NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);
        
        console.log(typeof(this.state.driverId));
        
      })
    },1500)
      
    
    
    
  }

  render() {
        
        if(!!this.state.queueDriverAppear){
          clearInterval(this.cancelIntervalId);
          this.queueDriver= <QueueDriver handleForUpdate = {this.handleForUpdate.bind(this)} driverId={this.state.driverId}/>
          this.userInfo = null;
        }
        else{
          this.queueDriver= null;
          clearInterval(this.cancelIntervalId)
          this.cancelCase();
          this.userInfo = <UserInfo userFname={this.state.userFname} userLname={this.state.userLname} />;
        }
        if(!!this.state.buttonAcceptCancelAppear){
          this.buttonAcceptCancel = <div className="button-accept-cancel-done">
                                      <button className="accept-button" onClick={this.driverAccept}> ยอมรับ </button>
                                      <button className="cancel-button" onClick={this.driverCancel}> ปฏิเสธ </button>
                                    </div>
          this.buttonDone=null;
        }
        else{
          this.buttonAcceptCancel=null;
          this.buttonDone = <div className="button-accept-cancel-done">
                              <button className="done-button"> เสร็จสิ้น </button>
                            </div>
        }
        
        //-----------------codeสำหรับสร้าง component ทุกอย่างที่เป็นของ googlemap ต้องเขียนใน tag Googlemap------------
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
          <GoogleMap
          // ------------------ set default map KA(ค่ะ) ------------------
          defaultZoom={15}
          defaultCenter={{ lat:this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          defaultOptions={{
            
            zoomControl:true,
            scrollwheel:true,
            streetViewControl: false,
            draggable:true,
            minZoom:15,
            // maxZoom:16,
            mapTypeControl:false,
            restriction:{
              latLngBounds:{
                north: this.state.mapPosition.lat+ 0.012,
                south: this.state.mapPosition.lat - 0.012,
                east: this.state.mapPosition.lng + 0.012,
                west: this.state.mapPosition.lng - 0.012,
              },
              strictBounds: false,
            },
          }}
          >
        {/* ----------componentของmarkerตำแหน่งที่ต้องไปรับ(สีเขียว) ----------*/}
        <Marker
          draggable={false}
          // onDragEnd={this.onMarkerDragEnd}
          position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
          icon={{
            url:"/pictures/markgreen.png",
            scaledSize:{height: 40 , width: 25},
          }}

        >
        </Marker>

        {/*--------- componentของmarkerตำแหน่งปลายทาง(สีแดง) -------*/}
        <Marker 
            icon={{
              url:"/pictures/markred.png",
              scaledSize:{height: 40 , width: 25},
            }}
            
            position={{ lat: this.state.markerDestinationPosition.lat, lng: this.state.markerDestinationPosition.lng }}
            
            >  
          </Marker>

      </GoogleMap>
    ));
    return (

      <section className="app-section">
        <Menu right>
          {/* <Menu customBurgerIcon={ <img src="" /> } right> */}
            <a id="home" className="menu-item" href="/">ข้อมูลผู้ใช้</a>
            <a id="contact" className="menu-item" href="/contact">ติดต่อ</a>
            <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
            <a id="contact" className="menu-item" onClick={()=>{ localStorage.clear() ; window.location.reload()}}>ออกจากระบบ</a>
        </Menu>  
        
        <div class ="detail-map"style={{ padding: '1rem', margin: '0 auto', maxWidth: 560 , maxHeight: 900 }}>
          <div key={this.state.driverId} className="driver-detail">
            {this.queueDriver}
            {/* <h1 className="head-detail">Driver</h1> */}
            <div className="detail">{this.userInfo}</div>
          </div>
         
          <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrjHmzaE-oExXPRlnkij2Ko3svtUwy9p4&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div id="map" style={{ height: `400px`}} />}
                mapElement={<div style={{ height: `100%` }} />}
                // key={this.state.mapPosition.lat}
              /> 
          
        </div>
        {this.buttonAcceptCancel}
        {this.buttonDone}
        <NotificationContainer />
        <Chat
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar="https://www.myskinrecipes.com/shop/1446-large/banana-flavor-%E0%B8%A3%E0%B8%AA%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%A2.jpg"
          title="Zeedzy"
          subtitle="And my cool subtitle"
        />
      </section>

    );
  }
}

export default Driver;