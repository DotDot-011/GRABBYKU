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
  
  // driverAcknowledge =()=>{
  //   this.setState({
  //     queueDriverAppear:1,
  //     buttonAcceptCancelAppear:1,
  //     userCancelAlert:null
  //   })
  // }
  

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

  driverCancel = () =>{
    console.log(parseInt(this.state.driverId));
    console.log(parseInt(this.state.userId));
    this.setState({
      queueDriverAppear:1,
    });
    // leaveQueue(this.state.driverId);
    // document.location.reload();
    axios.post(Url.LinkToBackend+"backend/api/driver_cancel",{
      driver_id: parseInt(this.state.driverId),
      user_id: parseInt(this.state.userId)
    })
    .then(res=>{
      console.log(res.data.message);
    });
  }
  driverAccept = () =>{
    
    
    axios.post(Url.LinkToBackend+"backend/api/driver_accept",{
      driver_id: parseInt(this.state.driverId),
      user_id: parseInt(this.state.userId)
    })
    .then(res=>{
      console.log(res.data.message);
    });

    this.setState({
      buttonAcceptCancelAppear: null,
    });
    leaveQueue(this.state.driverId);
  }
  
  componentDidMount(){
    axios.get( Url.LinkToBackend +"backend/api/bomb")
    axios.post(Url.LinkToBackend+"backend/api/postdriver",{
      username: localStorage.getItem("username")
      // username : this.props.username
    })
    .then((res)=>{
      console.log(res.data);
      this.setState({
        driverId: parseInt(res.data[0].driver_id),
      })
      
      console.log(typeof(this.state.driverId));
      
    })
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
        // if(!!this.state.userCancelAlert){
        //   this.errorAlert= <div >
        //   <button onClick={this.driverAcknowledge} >Testtttt</button> 
        // </div>
        // }
        // else{
        //   this.errorAlert=null;
        // }

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
          <GoogleMap

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
         
          {/* <Descriptions bordered>
            <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
          <Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
          <Descriptions.Item label="State">{this.state.state}</Descriptions.Item>
            <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
          </Descriptions> */}
          {/* <div class="error">{this.errorAlert}</div> */}
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
        
      </section>

    );
  }
}

export default Driver;