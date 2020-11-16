import React from 'react';
import './Input.css'
import InputMask from 'react-input-mask';
import { LoadScript} from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

const googleMapsAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;
const googleMapsAPILibraries = ["places"];

 const Input = ({elementType, elementConfig, label, value, handleOnChange, validation, valid, touched, style=null, setAddressValue=null}) => {

    const renderSelectOptions = ({optionValue, optionText}) =>{
        return (
            <option key={optionValue} className = "option" value={optionValue}>
                {optionText}
            </option>
        )
    }

    const handleAddressOnSelect = async (value) =>{
        const results = await geocodeByAddress(value);
        const { address_components } = results[0];
        setAddressValue(address_components)
    }

    const handleAddressOnClick = (event) =>{
        console.log(event.target.value)
        handleAddressOnSelect(event.target.value)
    }


    const renderLoading = (loadingMessage) =>{
        return (
            <div className="Loading">
                {loadingMessage}
            </div>

        )
    }

    const handleAddressSelectionState = (suggestionActive) =>{
        return `AddressSelection ${suggestionActive ? "active" :null}`
    }

    const renderInput = () =>{
        switch(elementType){
            case 'input':
                return (
                    <InputMask className="InputElement" {...elementConfig} value={value} onChange={handleOnChange} style={style}/>
                )

            case 'select':
                return (<div>
                            <select className="InputElement" {...elementConfig} value={value} onChange={handleOnChange} style={style}>
                                <option className="option" key="default" value="default" defaultValue>Selecione uma opção</option>
                                {elementConfig.options && elementConfig.options.map(option=>renderSelectOptions(option))}
                            </select>
                        </div>)

            case 'address':
                const updateAddress = (value) => {
                    handleOnChange({target :{name: elementConfig.name, value:value}});
                }
                return(
                    <div>
                        <LoadScript googleMapsApiKey={googleMapsAPIKey} libraries={googleMapsAPILibraries}>
                            <PlacesAutocomplete value={value} onChange={updateAddress} onSelect={handleAddressOnSelect}>
                                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => 
                                    <div>
                                        <input className="InputElement" {...getInputProps({...elementConfig})} style={style} />
                                        {loading && renderLoading("Carregando")}
                                        {suggestions.map((suggestion) => {
                                            return (<div className={handleAddressSelectionState(suggestion.active)}  onClick={handleAddressOnClick} {...getSuggestionItemProps(suggestion)} style={{width: style.width}}>
                                                        {suggestion.description}
                                                    </div>)
                                        })}
                                    </div>
                                }
                            </PlacesAutocomplete>
                        </LoadScript>
                    </div>
                )
            case 'textarea':
                return (
                    <textarea {...elementConfig} />
                )
            default:
                break;
        }
    }

    return (
        <div className="Input">
            {label && <label className="Label" htmlFor={elementConfig.name} style={style}>{label}</label>}
            {renderInput()}
        </div>
    )
}

export default Input;