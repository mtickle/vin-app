import { useState } from 'react'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css'

function App() {

  //https://vingenerator.org/
  //JHMFA16586S014014
  const [vin, setVin] = useState('');
  const [vehicleData, setVehicleData] = useState(null);
  const [vehicleMake, setVehicleMake] = useState([]);
  const [vehicleModel, setVehicleModel] = useState([]);
  const [vehicleManufacturer, setVehicleManufacturer] = useState([]);
  const [vehicleModelYear, setVehicleModelYear] = useState([]);
  const [vehiclePlantCity, setVehiclePlantCity] = useState([]);
  const [vehiclePlantState, setVehiclePlantState] = useState([]);
  const [vehiclePlantCountry, setVehiclePlantCountry] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);


  const handleClick = () => {

    //--- Get VIN from input field.

    let dotURL = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/' + vin + '?format=json';
    console.log(dotURL);
    // Add your desired logic here
  };

  const handleDecode = async () => {
    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`);
      const data = await response.json();

      if (data.Results && data.Results.length > 0) {
        //setVehicleData(data.Results[0]);
        setVehicleMake(data.Results[0].Make);
        setVehicleModel(data.Results[0].Model);
        setVehicleManufacturer(data.Results[0].Manufacturer);
        setVehicleModelYear(data.Results[0].ModelYear);
        setVehiclePlantCity(data.Results[0].PlantCity);
        setVehiclePlantState(data.Results[0].PlantState);
        setVehiclePlantCountry(data.Results[0].PlantCountry);
        setVehicleType(data.Results[0].VehicleType);
        setVehicleBodyClass(data.Results[0].BodyClass);
        console.log(data.Results[0]);
      } else {
        setVehicleData(null);
      }
    } catch (error) {
      console.error('Error decoding VIN:', error);
      setVehicleData(null);
    }
  };

  return (
    <>

      <Container fluid>
        <Row>        
          <Col lg={true} >
            <Card>
              <Card.Header>Results</Card.Header>
              <Card.Body bg="Secondary" >
              <Form.Control value={vin} onChange={(e) => setVin(e.target.value)}
                    placeholder="Enter a VIN to get started."
                    aria-label="VIN"
                    aria-describedby="basic-addon1"
                  />
                  <Button variant="outline-secondary" id="button-addon2" onClick={handleDecode}>
                    Run It
                  </Button>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-50" id="basic-addon1">Make: </InputGroup.Text>
                  <Form.Control value={vehicleMake} onChange={setVehicleMake} readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-50" id="basic-addon1">Model: </InputGroup.Text>
                  <Form.Control value={vehicleModel} onChange={setVehicleModel} readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-50" id="basic-addon1">Model: </InputGroup.Text>
                  <Form.Control value={vehicleManufacturer} onChange={setVehicleManufacturer} readOnly
                  />
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>




    </>
  )
}

export default App
