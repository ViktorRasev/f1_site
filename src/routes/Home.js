import { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import styles from "../css/Home.module.css";

function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("en-US", {
    month: "short",
  });
}

//Current date
const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, "0");
const year = today.getFullYear();
const currentDate = year + month + day;

//UTC API response time to client time
const getClientTime = (date, time) => {
  const apiTime = new Date(date + "T" + time);
  const hours = String(apiTime.getHours()).padStart(2, "0");
  const minutes = String(apiTime.getMinutes()).padStart(2, "0");
  const timeResult = `${hours}:${minutes}`;
  return timeResult;
};

let thirdPracDay
let thirdPracMonth
let thirdPracTime
let SprintDay
let SprintMonth
let SprintTime

export default function Home() {
  const [allRacesData, setAllRacesData] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/current/races.json?=myParser`, { //switch back to `https://ergast.com/api/f1/current/races.json?=myParser` after api update
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setAllRacesData({ state: "error", error: responseJson });
      } else {
        setAllRacesData({ state: "success", data: responseJson });
      }
    });
  }, []);

  const getSchedule = () => {
    switch (allRacesData.state) {
      case "pending":
        return (
          <div className={styles.spinner} >
            <Spinner animation="border" variant="light"/>
          </div>
        );

      case "success":
        //Get current or following race from list of all races
        const roundsRemaining = allRacesData.data.MRData.RaceTable.Races.filter((singleRace) => {
          return parseInt(singleRace.date.replace(/-/g, "")) >= parseInt(currentDate);
        });
        const currentOrNextRound = roundsRemaining[0];
        const lastRaceofSeason = allRacesData.data.MRData.RaceTable.Races.slice(-1)

        //Race
        const raceDay = currentOrNextRound.date.slice(8);
        const raceMonth = toMonthName(currentOrNextRound.date.slice(5, -3)).toUpperCase();
        const raceTime = getClientTime(currentOrNextRound.date, currentOrNextRound.time);

        //Qualifying
        const qualiDay = currentOrNextRound.Qualifying.date.slice(8);
        const qualiMonth = toMonthName(currentOrNextRound.Qualifying.date.slice(5, -3)).toUpperCase();
        const qualiTime = getClientTime(currentOrNextRound.Qualifying.date, currentOrNextRound.Qualifying.time);

        //Third Practice
          if(currentOrNextRound.ThirdPractice){
             thirdPracDay = currentOrNextRound.ThirdPractice.date.slice(8);
             thirdPracMonth = toMonthName(currentOrNextRound.ThirdPractice.date.slice(5, -3)).toUpperCase();
             thirdPracTime = getClientTime(
                currentOrNextRound.ThirdPractice.date,
                currentOrNextRound.ThirdPractice.time
            );
             // Sprint
          } else if(currentOrNextRound.Sprint){
             SprintDay = currentOrNextRound.Sprint.date.slice(8);
             SprintMonth = toMonthName(currentOrNextRound.Sprint.date.slice(5, -3)).toUpperCase();
             SprintTime = getClientTime(
                currentOrNextRound.Sprint.date,
                currentOrNextRound.Sprint.time
            );
          }

        //Second Practice
        const secondPracDay = currentOrNextRound.SecondPractice.date.slice(8);
        const secondPracMonth = toMonthName(currentOrNextRound.SecondPractice.date.slice(5, -3)).toUpperCase();
        const secondPracTime = getClientTime(
          currentOrNextRound.SecondPractice.date,
          currentOrNextRound.SecondPractice.time
        );

        //First Practice
        const firstPracDay = currentOrNextRound.FirstPractice.date.slice(8);
        const firstPracMonth = toMonthName(currentOrNextRound.FirstPractice.date.slice(5, -3)).toUpperCase();
        const firstPracTime = getClientTime(
          currentOrNextRound.FirstPractice.date,
          currentOrNextRound.FirstPractice.time
        );

        return (
          <div className={styles.schedule}>
            <div className={styles.schedule_header}>
              <h1>{currentOrNextRound.raceName}</h1>
            </div>
            {/*-------------------- Race----------------------- */}
            <div className={styles.col}>
              <div className={styles.date}>
                <div>
                  <h5>{raceDay}</h5>
                </div>
                <div className={styles.month}>{raceMonth}</div>
              </div>
              <div className={styles.title_time}>
                <div>
                  <h2>Race</h2>
                </div>
                <div>{raceTime}</div>
              </div>
            </div>
            {/*--------------------- Qualifying --------------------*/}
            <div className={styles.col}>
              <div className={styles.date}>
                <div>
                  <h5>{qualiDay}</h5>
                </div>
                <div className={styles.month}>{qualiMonth}</div>
              </div>
              <div className={styles.title_time}>
                <div>
                  <h2>Qualifying</h2>
                </div>
                <div>{qualiTime}</div>
              </div>
            </div>
            {/*---------------------- Third Practice -----------------*/}
            {thirdPracDay ? <div className={styles.col}>
              <div className={styles.date}>
                <div>
                  <h5>{thirdPracDay}</h5>
                </div>
                <div className={styles.month}>{thirdPracMonth}</div>
              </div>
              <div className={styles.title_time}>
                <div>
                  <h2>Practice 3</h2>
                </div>
                <div>{thirdPracTime}</div>
              </div>
            </div> :
                // ------------------ Sprint (if there is one) -------------
                <div className={styles.col}>
                  <div className={styles.date}>
                    <div>
                      <h5>{SprintDay}</h5>
                    </div>
                    <div className={styles.month}>{SprintMonth}</div>
                  </div>
                  <div className={styles.title_time}>
                    <div>
                      <h2>Sprint</h2>
                    </div>
                    <div>{SprintTime}</div>
                  </div>
                </div>
            }
            {/*----------------- Second Practice --------------------------*/}
            <div className={styles.col}>
              <div className={styles.date}>
                <div>
                  <h5>{secondPracDay}</h5>
                </div>
                <div className={styles.month}>{secondPracMonth}</div>
              </div>
              <div className={styles.title_time}>
                <div>
                  <h2>Practice 2</h2>
                </div>
                <div>{secondPracTime}</div>
              </div>
            </div>
            {/*------------------- First Practice ------------------*/}
            <div className={styles.col}>
              <div className={styles.date}>
                <div>
                  <h5>{firstPracDay}</h5>
                </div>
                <div className={styles.month}>{firstPracMonth}</div>
              </div>
              <div className={styles.title_time}>
                <div>
                  <h2>Practice 1</h2>
                </div>
                <div>{firstPracTime}</div>
              </div>
            </div>
          </div>
        );
      case "error":
        return (
          <div>
            <h1>ERROR</h1>
          </div>
        );
      default:
        return null;
    }
  };
console.log(allRacesData)
  return (
    <>
      <div className={styles.container}>
        {getSchedule()}
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
