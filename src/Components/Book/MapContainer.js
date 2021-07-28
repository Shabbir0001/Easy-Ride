import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const style = {
    width: '100%',
    height: '100%'
  }
export class MapContainer extends Component {
    
    render() {
        return (
            <Map
                google={this.props.google}
                style={style}
                initialCenter={{
                    lat: 40.854885,
                    lng: -88.081807
                }}
                zoom={15}
                onClick={this.onMapClicked}
            >

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("YOUR_GOOGLE_API_KEY_GOES_HERE")
})(MapContainer)