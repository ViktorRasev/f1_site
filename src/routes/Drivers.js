import { useState, useCallback } from "react";
import DriverCard from "../components/DriverCard";
import Slider from "@mui/material/Slider";
import { Container, Card } from "react-bootstrap";
import styles from "../css/Drivers.module.css"


export default function Drivers() {
  const [inputYear, setInputYear] = useState(false);

  const date = new Date();
  const currentYear = date.getFullYear();

  // This takes care of mouseUp event even if mouse cursor is no longer hovering over element (Slider)
  const handleMouseUp = useCallback((e) => {
      document.addEventListener(
        "mouseup",
        () => {
          setInputYear(e.target.textContent);
        },
        { once: true }
      );
  }, []);

const handleOnTouchEnd = (e) => { 
    setInputYear(e.target.textContent)
}
  return (
    <>
      <Container>
        <Card className={styles.sliderCard}>
          <Card.Body className="text-center">
            <Card.Title>Select season</Card.Title>
         
          <Slider
            // className={styles.slider}              
            onMouseDown={handleMouseUp}
            onTouchEnd={handleOnTouchEnd}
            defaultValue={currentYear}
            valueLabelDisplay="auto"
            min={1950}
            max={currentYear}
          />
           </Card.Body>
        </Card>
        <DriverCard inputYear={inputYear} />
      </Container>
    </>
  );
}

