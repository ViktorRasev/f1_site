import { useEffect, useState } from "react";
import { Row, Col, Button, Card, Container, Spinner } from "react-bootstrap";
import styles from "../css/DriverCard.module.css";

// This takes nationality of the drivers from API response and return country code needed for flag images
// example: Dutch => nl, Italian => it
const getCountryCodeFromNationality = (nationality) => {
  let CountryQuery = require("country-query");
  let country = CountryQuery.findByDemonym(nationality);
  let result;
  if (country) {
    if (country.length >= 2) {
      country.forEach((singleCountry) => {
        if (singleCountry.independent) {
          result = singleCountry;
        }
      });
    } else {
      result = country;
    }
    return result.cca2.toLowerCase();
  }
};



export default function DriverCard(props) {
  const [driversData, setDriversData] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(
      `https://ergast.com/api/f1/${
        props.inputYear ? props.inputYear : new Date().getFullYear()
      }/drivers.json?=myParser`,
      {
        method: "GET",
      }
    ).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setDriversData({ state: "error", error: responseJson });
      } else {
        setDriversData({ state: "success", data: responseJson });
      }
    });
  }, [props.inputYear]);

  //Current date
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const currentDate = parseInt(`${year}${month}${day}`);

  const getDriverList = () => {
    if (driversData.state === "success") {
      const driversList = driversData.data.MRData.DriverTable.Drivers;
      return driversList.map((singleDriver) => {
        const calculateCurrentAge =
          currentDate - parseInt(singleDriver.dateOfBirth.replace(/-/g, ""));
        const currentAge = calculateCurrentAge.toString().slice(0, 2);

        return (
          <Col sm={12} md={6} lg={4} xxl={3} key={singleDriver.driverId}>
            <Card className={styles.driverCard}>
              <Card.Body>
                <Card.Title className={styles.card_title}>
                  <div className={styles.flag_name}>
                    {singleDriver.nationality !== "Rhodesian" && (
                      <img
                        className={styles.flag}
                        src={`https://flagcdn.com/${getCountryCodeFromNationality(
                          singleDriver.nationality
                        )}.svg`}
                        alt={`${singleDriver.nationality} flag`}
                      />
                    )}

                    {`${singleDriver.givenName} ${singleDriver.familyName}`}
                  </div>
                  <div className={styles.driver_number}>
                    {singleDriver.permanentNumber &&
                      `${singleDriver.permanentNumber}`}
                  </div>
                </Card.Title>

                <Card.Text>{`Nationality: ${singleDriver.nationality}`}</Card.Text>
                <Card.Text></Card.Text>
                <Card.Text>{`age: ${currentAge}`}</Card.Text>
                <Button variant="danger">
                  <a href={singleDriver.url} className={styles.link}>
                    Wiki
                  </a>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      });
    }else if(driversData.state === "pending"){ 
      return(  
      <div className={styles.spinner}>
          <Spinner animation="border" variant="light" />
      </div>
       )
    }
  };

  return (
    <Container>
      <Row>{getDriverList()}</Row>
    </Container>
  );
}
