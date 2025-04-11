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
  const [vehicleData, setVehicleData] = useState([]);
  const [vehicleMake, setVehicleMake] = useState([]);
  const [vehicleModel, setVehicleModel] = useState([]);
  const [vehicleManufacturer, setVehicleManufacturer] = useState([]);
  const [vehicleModelYear, setVehicleModelYear] = useState([]);
  const [vehiclePlantName, setVehiclePlantName] = useState([]);
  const [vehiclePlantCity, setVehiclePlantCity] = useState([]);
  const [vehiclePlantState, setVehiclePlantState] = useState([]);
  const [vehiclePlantCountry, setVehiclePlantCountry] = useState([]);
  const [vehicleBodyClass, setVehicleBodyClass] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);

  const handleDecode = async () => {
    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`);
      const data = await response.json();

      if (data.Results && data.Results.length > 0) {
        setVehicleData(data.Results[0]);
        setVehicleMake(data.Results[0].Make);
        setVehicleModel(data.Results[0].Model);
        setVehicleManufacturer(data.Results[0].Manufacturer);
        setVehicleModelYear(data.Results[0].ModelYear);
        setVehiclePlantName(data.Results[0].PlantCompanyName);
        setVehiclePlantCity(data.Results[0].PlantCity);
        setVehiclePlantState(data.Results[0].PlantState);
        setVehiclePlantCountry(data.Results[0].PlantCountry);
        setVehicleType(data.Results[0].VehicleType);
        setVehicleBodyClass(data.Results[0].BodyClass);
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

      <Container>
        <Row>
          <Col>
            <Card style={{ width: '30rem' }}>
              <Card.Header>Vehicle Identification Number Decoder</Card.Header>
              <Card.Body bg="Secondary" >
                
              <InputGroup className="mb-3">
              <InputGroup.Text className="w-25">VIN: </InputGroup.Text>
                <Form.Control value={vin} onChange={(e) => setVin(e.target.value)}
                  placeholder="Enter a VIN to get started."
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={handleDecode}>
                  Run It
                </Button>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-25">Make: </InputGroup.Text>
                  <Form.Control value={vehicleMake} onChange={setVehicleMake} readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-25">Model: </InputGroup.Text>
                  <Form.Control value={vehicleModel} onChange={setVehicleModel} readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-25">Model: </InputGroup.Text>
                  <Form.Control value={vehicleManufacturer} onChange={setVehicleManufacturer} readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-25">Year: </InputGroup.Text>
                  <Form.Control value={vehicleModelYear} onChange={setVehicleModelYear} readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-25">Body Class: </InputGroup.Text>
                  <Form.Control value={vehicleBodyClass} onChange={setVehicleBodyClass} readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-25">Vehicle Type: </InputGroup.Text>
                  <Form.Control value={vehicleType} onChange={setVehicleType} readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-25">Plant: </InputGroup.Text>
                  <Form.Control value={vehiclePlantName} onChange={setVehiclePlantName} readOnly />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-25">Location: </InputGroup.Text>
                  <Form.Control value={vehiclePlantCity} onChange={setVehiclePlantCity} readOnly />
                  <Form.Control value={vehiclePlantState} onChange={setVehiclePlantState} readOnly />
                  <Form.Control value={vehiclePlantCountry} onChange={setVehiclePlantCountry} readOnly />
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Card style={{ width: '30rem' }}>
              <Card.Header>Output</Card.Header>
              <Card.Body bg="Secondary" >
              <Form.Control as="textarea" rows={15} className='terminal-textarea'  value={JSON.stringify(vehicleData, null, 2)} onChange={JSON.stringify(setVehicleData, null, 2)} readOnly  />
                
                </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>




    </>
  )
}

export default App
