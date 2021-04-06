import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import riderFakeData from '../FakeData/FakeData.json';
import RiderName from '../RiderName/RiderName';

const Home = () => {
    const [ridersName, setRidersName] =useState([]);

    useEffect(() =>{
        setRidersName(riderFakeData)
    }, [])
    return (
        <Container>
            
            <Row>
                {
                    ridersName.map(riderName => <RiderName riderName={riderName}></RiderName>)
                }
            </Row>
        </Container>
    );
};

export default Home;