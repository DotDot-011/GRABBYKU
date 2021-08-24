import React from "react";
import './Driver.css'
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import Geocode from "react-geocode";
import { throwStatement } from "@babel/types";
import { Descriptions } from 'antd';
import AutoComplete from 'react-google-autocomplete'
import axios from 'axios'
import QueueDriver from "./component/QueueDriver";
import leaveQueue from "./component/LeaveQueue";
import UserInfo from "./component/userInfo";
import { Url } from '../LinkToBackend';
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
  }
  queueDriver = null;
  buttonAcceptCancel = null;
  buttonDone = null;
  userInfo = null;
  
  
  handleForUpdate(startLat,startLng,DestinationLat,DestinationLng ,queuePageStatus){
    this.setState({
      markerPosition: {
        lat: startLat,
        lng: startLng,
      },
      markerDestinationPosition:{
        lat: DestinationLat, 
        lng: DestinationLng,
      },
      queueDriverAppear:queuePageStatus,
      
    });
  
  }
  


  cancelIntervalId=0;
  cancelCase=()=>{
    this.cancelIntervalId=setInterval(()=>{
      fetch("http://localhost:1236/location")
      .then(response=> response.json())
      .then(data => {
          if(data[0].status ==='false'){
              clearInterval(this.cancelIntervalId);
              this.setState({
                queueDriverAppear:1,
                buttonAcceptCancelAppear:1,
              })
              // document.location.reload()
          }
        })
    }, 1500);
  }

  driverCancel = () =>{
    this.setState({
      queueDriverAppear:1,
    });
    leaveQueue(this.state.driverId);
    // document.location.reload();
  }
  driverAccept = () =>{
    // fetch("http://localhost:1237/driverDetail/1",{
    //         method: 'put',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //           "id":1,
    //           "status": "true",
    //           "name" : "xxxx xxxx",
    //           "area" : "ประตู 3",
    //           "plate": "abc 1234"
                
    //         })
    //     })
    //     .then(response=> console.log(response))
    //     .catch(err => console.log(err));
    //--------------------------------------
    axios.post(Url.LinkToBackend+"backend/api/userdriver2book",{
      driver_id: this.props.driverId,
      user_id: this.state.userId,
      lng_user: this.state.markerPosition.lng,
      lat_user: this.state.markerPosition.lat,
      lng_des: this.state.markerDestinationPosition.lng,
      lat_des: this.state.markerDestinationPosition.lat,
      
    })
    .then(res=>{
        console.log(res.data);
        // 2bookมาดูใหม่
    });

    this.setState({
      buttonAcceptCancelAppear: null,
    });
    leaveQueue(this.state.driverId);
  }
  
  componentDidMount(){
    axios.post(Url.LinkToBackend+"backend/api/postdriver",{
      username : this.props.username
    })
    .then(res=>{
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
          this.userInfo = <UserInfo/>;
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
        
        <div class ="detail-map"style={{ padding: '1rem', margin: '0 auto', maxWidth: 560 , maxHeight: 900 }}>
          <div className="driver-detail">
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
          <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrjHmzaE-oExXPRlnkij2Ko3svtUwy9p4&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div id="map" style={{ height: `400px`}} />}
                mapElement={<div style={{ height: `100%` }} />}
              /> 
          
        </div>
        {this.buttonAcceptCancel}
        {this.buttonDone}
      </section>

    );
  }
}

export default Driver;