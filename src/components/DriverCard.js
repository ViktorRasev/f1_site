import { useEffect, useState } from "react";
import { Row, Col, Button, Card, Container } from "react-bootstrap";
import styles from "../css/DriverCard.module.css";


export default function DriverCard(props) {
  const [driversData, setDriversData] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(
      `https://ergast.com/api/f1/${props.inputYear ? props.inputYear: new Date().getFullYear()}/drivers.json?=myParser`,
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
              {/* <Card.Img variant="bottom" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/verstappen_%2851383514844%29_%28cropped%29.jpg/375px-Alex_albon_%2851383514844%29_%28cropped%29.jpg" /> */}
              <Card.Body>
                <Card.Title className={styles.cardTitle}>
                  <span>{`${singleDriver.givenName} ${singleDriver.familyName}`}</span>
                 <span className={styles.driverNumber}>{singleDriver.permanentNumber && `${singleDriver.permanentNumber}`}</span>
                 
                  
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
    }
  };

  return (
    <Container>
   <Row>{getDriverList()}</Row>
    </Container>
  );
}
