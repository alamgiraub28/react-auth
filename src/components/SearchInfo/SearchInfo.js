import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import FakeData  from '../FakeData/FakeData.json';
import csss from './SearchInfo.css';


const SearchInfo = () => {
    const [location, setLocation] = useState({
        from: '',
        to: '',
        date: ''
    })

    const handleBlur = (event) => {
        if (event.target.name === 'from') {
            location.from = event.target.value;
        }
        if (event.target.name === 'to') {
            location.to = event.target.value;
        }

        if (event.target.name === 'date') {
            location.date = event.target.value;
        }
    };

    const [click, setClick] = useState(false);

    const searchHandler = (event) => {
        setClick(!click);
        event.preventDefault();
    };

    const { title } = useParams();

    const [transport, setTransportInfo] = useState({});

    useEffect(() => {
        const info = FakeData.filter(
            (type) => title == type.title
        );
        setTransportInfo(info[0]);
    }, [title]);
    return (
        <Container>
                <Row>
                    <Col lg={4} md={6} sm={12}>
                        {!click ? (
                            <div className="search-box border p-4 rounded bg-light mt-2">
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Pick From</Form.Label>
                                        <Form.Control onBlur={handleBlur} name="from" type="text" placeholder="From" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Pick To</Form.Label>
                                        <Form.Control onBlur={handleBlur} name="to" type="text" placeholder="To" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control onBlur={handleBlur} type="date" name="date" />
                                    </Form.Group>

                                    <Button onClick={searchHandler} variant="primary btn-block">Search</Button>
                                </Form>
                            </div>
                        ) : (

                            <div className="card p-2 mt-2">
                                <div>
                                    <h3 className="text-center">From: {location.from}</h3>
                                    <h3 className="text-center">To: {location.to}</h3>
                                    <h3 className="text-center">Date: {location.date}</h3>
                                </div>
                                <img src={transport.image} alt="" />
                                <h3 className="text-center">Transport: {transport.title}</h3>
                                <h3 className="text-center">Ticket Price: {transport.price}</h3>
                            </div>
                        )}
                    </Col>

                    <Col lg={8} md={6} sm={12}>
                        <iframe className="googleMap"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4297010.060309897!2d88.
                            85960296983332!3d24.44904505248154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c79ebfc24eab%3A0xea7dab563f12457a!
                            2sGulshan%201%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1600919589281!5m2!1sen!2sbd"
                            aria-hidden="false" tabIndex="0">
                        </iframe>
                    </Col>
                </Row>
            </Container>
    );
};

export default SearchInfo;