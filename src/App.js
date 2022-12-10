import QuoteContainer from './QuoteContainer';
import Corner from './Corner';
import Topnav from './Topnav';
import { Col, Container, Row, Button } from 'react-bootstrap';
import UseScreenOrientation from './UseScreenOrientation';
import { useEffect, useState } from 'react';
import { db } from './Firebase';
import { onSnapshot, collection } from 'firebase/firestore';

const quoteStyle = {
  margin: 0,
  position: "absolute",
  top: "50%",
  left: "50%",
  msTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)"
};

const dataChoice = {
  barz : ["barz", "song", "bar", "artist"],
  klem : ["klem", "naam", "quote"],
  sp : ["sp", "naam", "quote"]
};


const App = () => {
  console.log("App");
  const [dataBase, setDataBase] = useState(dataChoice.barz);
  const [barz, setbarz] = useState([{"bar" : "Loading...", "song" : " ", "artist" : " "}]);
  const [ranInt, setRanInt] = useState(0);
  
  const handleDataBase = e => setDataBase(dataChoice[e.target.value]);

  const genRanInt = (length) => {
    console.log(length);
    if (typeof length === 'object') {
        length = barz.length;
        console.log(length);
    }
    const newInt = Math.floor(Math.random() * length);
    setRanInt(newInt);
    console.log("db: " + dataBase[0] + " num: " + ranInt);
    console.log(barz[ranInt]);
  };

  useEffect(() => {
    onSnapshot(collection(db, dataBase[0]), (snapshot) =>  {
      const res = snapshot.docs.map((doc) => doc.data());
      console.log(res.length)
      genRanInt(res.length);
      setbarz(res);
    });    
  },[dataBase]);

  return (
    <Container fluid>
      <UseScreenOrientation/>
      <Row>
        <Col xs={2} lg={3} style={{padding : 0}}>
          <Corner rotation="0" />
        </Col>
        <Col>
          <Topnav setDataBase={handleDataBase}/>
        </Col>
        <Col xs={2} lg={3} style={{padding : 0}}>
          <Corner rotation="90" className="pull-right"/>
        </Col>
      </Row>

      <Row className=''>
        <QuoteContainer dataBase={dataBase} quote={barz[ranInt]} />
      </Row>

      <Row>
        <Col xs={2} lg={3} style={{padding : 0}} className="fixed-bottom">
          <Corner rotation="270"/>
        </Col>
        <Col className='text-center'>
          <Button onClick={genRanInt}>Refresh</Button>
        </Col>
        <Col xs={2} lg={3} style={{padding : 0, right: 0, position: "fixed", bottom : 0}} className="">
          <Corner rotation="180"/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
