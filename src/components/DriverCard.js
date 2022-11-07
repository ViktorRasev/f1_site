import { useEffect, useState } from "react";
import { Row, Col, Button, Card, Container } from "react-bootstrap";
import styles from "../css/DriverCard.module.css";

export default function DriverCard() {
  const [driversData, setDriversData] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(`http://ergast.com/api/f1/2022/drivers.json?=myParser`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setDriversData({ state: "error", error: responseJson });
      } else {
        setDriversData({ state: "success", data: responseJson });
      }
    });
  }, []);

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const currentDate = parseInt(`${year}${month}${day}`);

  const getDriverList = () => {
    if (driversData.state === "success") {
      const driversList = driversData.data.MRData.DriverTable.Drivers;
      return driversList.map((singleDriver) => {

        const calculateCurrentAge = currentDate - parseInt(singleDriver.dateOfBirth.replace(/-/g, ""));
        const currentAge = calculateCurrentAge.toString().slice(0, 2);

        return (
          <Col sm={12} md={6} lg={4} xxl={3} key={singleDriver.driverId}>
            <Card className={styles.driverCard}>
              {/* <Card.Img variant="bottom" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/verstappen_%2851383514844%29_%28cropped%29.jpg/375px-Alex_albon_%2851383514844%29_%28cropped%29.jpg" /> */}
              <Card.Body>
                <Card.Title>{`${singleDriver.givenName} ${singleDriver.familyName}`}</Card.Title>
                <Card.Text>{`Nationality: ${singleDriver.nationality}`}</Card.Text>
                <Card.Text>{`Number: ${singleDriver.permanentNumber}`}</Card.Text>
                <Card.Text>{`age: ${currentAge}`}</Card.Text>
                <Button variant="primary">
                  <a href={singleDriver.url} className={styles.link}>
                    More info
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
// col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3
