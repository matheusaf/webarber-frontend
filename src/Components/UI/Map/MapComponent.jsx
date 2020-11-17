import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import axios from "axios";

const MapsAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;

const MapComponent = ({nomeBarbearia, endereco}) => {
    const [addressLatLng, setAddressLatLng ] = useState({lat: 0, lng: 0});
    const mapStyles = {        
      height: "93vh",
      width: "100%"};
    
    const findAddress = async () => {
      try{
        let results = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${MapsAPIKey}`)
          .then((r) => r.data);
        if(results.status === "OK"){
          let newLatLng = results.results[0].geometry.location;
          setAddressLatLng(newLatLng);
        }
      }
      catch(err){
        console.log(err)
      }
    };

    useEffect(() => {
      findAddress();
    }, []);

    return (
      <LoadScript
        googleMapsApiKey={MapsAPIKey}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={16}
            center={addressLatLng}
          >
            <Marker key={addressLatLng} position={addressLatLng}/>
            <InfoWindow  position={addressLatLng}>
              <div style={{fontWeight:"bold"}}>
                {nomeBarbearia}
              </div>
            </InfoWindow>
          </GoogleMap>
      </LoadScript>
  );
};

export default MapComponent;