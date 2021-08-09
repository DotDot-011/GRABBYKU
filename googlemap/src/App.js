import React from "react";
import './App.css'
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete'
import Axios from 'axios'
import isPointInPolygon from "geolib/es/isPointInPolygon"
import Wait from "./components/Wait";
import DetailDriver from "./components/DetailDriver";
Geocode.setApiKey("AIzaSyDrjHmzaE-oExXPRlnkij2Ko3svtUwy9p4");


class App extends React.Component {

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
    }

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

    onMarkerDragEnd = (event)=>{
      let newLat = event.latLng.lat();
      let newLng= event.latLng.lng();
      console.log('newLat',newLat);
      console.log('newLng',newLng);
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

    onMarkerDestinationDragEnd = (event)=>{
      let newLat = event.latLng.lat();
      let newLng= event.latLng.lng();
      console.log('newLat',newLat);
      console.log('newLng',newLng);
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

    onPlaceSelected = (place)=>{
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
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
    
    onPlaceDestinationSelected = (place)=>{
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
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
    
    greenZonePath = [
      {latitude:13.855458118865057, longitude:100.56596600925597},
      {latitude:13.857277966250578, longitude:100.57639848267323},
      {latitude:13.857659300458918, longitude:100.58083861265405},
      {latitude:13.850487798245787, longitude:100.5815458679391},
      {latitude:13.836416483501072, longitude:100.57339372833995},
      {latitude:13.842558941191157, longitude:100.5590814720114},
      {latitude:13.855458118865057, longitude:100.56596600925597},
    ]

    redZonePath = [
        {latitude: 13.84680634471089,longitude: 100.56479688230758},
        {latitude: 13.848348039187117,longitude: 100.56569906630881},
        {latitude:13.850380257189924, longitude:100.56586145942902},
        {latitude:13.850240104794747, longitude:100.57237522791787},
        {latitude:13.844213471850779, longitude:100.57230305319777},
        {latitude:13.842952063786939, longitude:100.57158130599677},
        {latitude: 13.84680634471089,longitude: 100.56479688230758},
    ]

    //sent location to database
    timeoutId = 0;
    addLocation = () =>{
     if(!isPointInPolygon({latitude: this.state.markerPosition.lat, longitude: this.state.markerPosition.lng},this.redZonePath) && 
     !isPointInPolygon({latitude: this.state.markerDestinationPosition.lat, longitude: this.state.markerDestinationPosition.lng},this.redZonePath) &&
     
     isPointInPolygon({latitude: this.state.markerPosition.lat, longitude: this.state.markerPosition.lng},this.greenZonePath) &&
     isPointInPolygon({latitude: this.state.markerDestinationPosition.lat, longitude: this.state.markerDestinationPosition.lng},this.greenZonePath))
     {
        
        
        fetch("http://localhost:1236/location/1",{
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": 1,
                "status":"true",
                "latitudeStart": this.state.markerPosition.lat,
                "longtitudeStart": this.state.markerPosition.lng,
                "latitudeDestination": this.state.markerDestinationPosition.lat,
                "longtitudeDestination": this.state.markerDestinationPosition.lng
            })
        })
        .then(response=> console.log(response))
        .catch(err => console.log(err));

        this.setState({
          waitingQueueAppear:1,
        })

        this.timeoutId = setInterval(()=>{
         
          fetch("http://localhost:1237/driverDetail")
          .then(response=> response.json())
          .then(data=>{
            console.log(data[0]);
            if(data[0].status ==="true"){
                this.setState({
                    waitingQueueAppear:null,
                    detailDriverAppear:1,
                })
                fetch("http://localhost:1237/driverDetail/1",{
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      "id": 1,
                      "status": "false",
                      "name": "xxxx xxxx",
                      "area": "ประตู 3",
                      "plate": "abc 1234"
                    })
                })
                .catch(err => console.log(err));

            }
          });

          
        },1500)         
     }
     else{
      window.alert("Error");
     } 
    }
    
    
    
    
    cancelQueue = ()=>{
      clearInterval(this.timeoutId);
      fetch("http://localhost:1236/location/1",{
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": 1,
                "status":"false",
                "latitudeStart": 0,
                "longtitudeStart": 0,
                "latitudeDestination": 0,
                "longtitudeDestination": 0
            })
        })
        .then(response=> console.log(response))
        .catch(err => console.log(err));
      this.setState({
            waitingQueueAppear:null,
            detailDriverAppear:null,
      })
    //   Axios.get('http://localhost:3001/location').then((response) =>{
    //     console.log(response);
    //     this.setState(state=>{
    //       this.state.locationList = response.data;

    //     });
    //     let idLocation = this.state.locationList[this.state.locationList.length-1].id;
    //     console.log(idLocation);
    //     this.deleteLocation(idLocation);
    //     this.setState({
    //       markerPosition: {
    //         lat: 13.852409944222796,
    //         lng: 100.57689203927386,
    //     },
    //       markerDestinationPosition:{
    //         lat:13.852409944222796, 
    //         lng:100.57889203927386,
    //       },
    //   })
    //     this.addLocation();
    //     this.setState({
    //       waitingQueueAppear:null,
    //     })
        
    //   });
    // }
    }
    watingQueue=null;
    detailDriver=null;

    render(){
      
      if(!!this.state.waitingQueueAppear){
        this.watingQueue= <Wait cancelQueue={this.cancelQueue}/>
      }
      else{
        this.watingQueue=null;
        clearInterval(this.timeoutId);
      }
      if(!!this.state.detailDriverAppear){
        this.detailDriver = <DetailDriver cancelQueue={this.cancelQueue}/>
      }
      else{
        this.detailDriver=null;
      }

      
      const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        
        <GoogleMap div id="con"
          
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
           }}
        
        >
          
          <Marker 
            draggable={true}
            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
            onDragEnd={this.onMarkerDragEnd}
            icon={{
              url:"/pictures/markgreen.png",
              scaledSize:{height: 40 , width: 25},
            }}
            >  
          </Marker>

          <Marker 
            draggable={true}
            onDragEnd={this.onMarkerDestinationDragEnd}
            icon={{
              url:"/pictures/markred.png",
              scaledSize:{height: 40 , width: 25},
            }}
          
            position={{ lat: this.state.markerDestinationPosition.lat, lng: this.state.markerDestinationPosition.lng }}         
            >  
          </Marker>
          <div class="locationbox">
          <div id="inbutt">
          {/* here1 */}
          <Autocomplete id="input1"
            // style={{ paddingLeft: 16 , marginTop:10 , marginBottom:'1rem'}}
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
          {/* here2 */}
          <Autocomplete id="input2"
            // style={{  paddingLeft: 16 , marginTop:2 , marginBottom:'1rem'}}
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
                  strokeColor: "purple",
                  strokeOpacity: 0.8,
                  strokeWeight: 3,
                  fillColor: "purple",
                  fillOpacity: 0.35,
                }
              }
          />
        
        </GoogleMap>
      ));

      return(
        
        <div style={{ padding:'20px',marginLeft:'auto',marginRight:'auto', maxWidth: 600 }}>

        {/* <h1>User</h1> */}
          
        {/* <Descriptions bordered>
          <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
          <Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
          <Descriptions.Item label="State">{this.state.state}</Descriptions.Item>
          <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
        </Descriptions>         */}
        {this.watingQueue}
        {this.detailDriver}

        <MapWithAMarker 
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrjHmzaE-oExXPRlnkij2Ko3svtUwy9p4&v=3.exp&libraries=geometry,drawing,places"
          containerElement={<div id="map" style={{ height: `380px` }} />}
          loadingElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        
        </div>
        
        
      );
    }
}

export default App;