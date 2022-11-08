import DriverCard from "../components/DriverCard"
import Slider from '@mui/material/Slider';
import { Container } from "react-bootstrap";


// todo Slider or select input for seassos (years)

export default function Drivers() { 
    return (
        <>
        <Container>
       <Slider
  aria-label="Temperature"
//   defaultValue={30}
//   getAriaValueText={valuetext}
  valueLabelDisplay="auto"
//   step={10}
  marks
  min={1950}
  max={2022}
/>
        <DriverCard />
        </Container>
        </>
    )
}