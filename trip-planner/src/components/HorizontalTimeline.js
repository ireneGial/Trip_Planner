import React, { useState, useEffect } from "react";
import styled from '@emotion/styled'
import { CDBStepper, CDBStep, CDBInput, CDBBtn, CDBContainer } from "cdbreact";
import Flights from './Flights';
import Hotels from "./Hotels";
import Points from "./Points";
import Summary from "./Summary";
import { useNavigate } from 'react-router-dom';

const HorizontalTimeline = ({ searchObj }) => {
    const [active, setActive] = useState(1);

    useEffect(() => {
        console.log('horreceived prop:',);
    }, []);

    const handleNextPrevClick = a => {
        setActive(a);
        window.scrollTo(0, 0);
    }
    return (
        <StyledCDBStepper>
            <CDBStep
                id={1}
                icon="pencil-alt"
                name="Reserve a flight"
                handleClick={() => handleNextPrevClick(1)}
                active={active}
                component={<Step1 handleNextPrevClick={handleNextPrevClick} searchObj={searchObj} />}
            />
            <CDBStep
                id={2}
                icon="pencil-alt"
                name="Reserve hotel"
                handleClick={() => handleNextPrevClick(2)}
                active={active}
                component={<Step2 handleNextPrevClick={handleNextPrevClick} searchObj={searchObj} />}
            />
            <CDBStep
                id={3}
                icon="pencil-alt"
                name="Reserve points of interest"
                handleClick={() => handleNextPrevClick(3)}
                active={active}
                component={<Step3 handleNextPrevClick={handleNextPrevClick} searchObj={searchObj} />}
            />
            <CDBStep
                id={4}
                icon="pencil-alt"
                name="Reserve points of interest"
                handleClick={() => handleNextPrevClick(4)}
                active={active}
                component={<Step4 handleNextPrevClick={handleNextPrevClick} searchObj={searchObj} />}
            />
            <CDBStep
                id={5}
                icon="check"
                name="Confirm Summary"
                handleClick={() => handleNextPrevClick(5)}
                active={active}
                component={<Step5 handleNextPrevClick={handleNextPrevClick} searchObj={searchObj} />}
            />
        </StyledCDBStepper>
    );
};

export default HorizontalTimeline;

const Step5 = ({ handleNextPrevClick, searchObj }) => {

    const navigate = useNavigate();

    const sflight = localStorage.getItem("selectedFlight");
    const shotel = localStorage.getItem("selectedHotel");
    const spois = localStorage.getItem("pois");
    const simages = localStorage.getItem("images");

    const sendFinalObjToBackend = async (finalObj) => {
        try {
            const response = await fetch('http://localhost:5001/api/storeData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalObj),
            });

            if (response.ok) {
                console.log('Data sent successfully');
            } else {
                console.error('Failed to send data to the backend');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {

        // Set a timeout to navigate to the trips page after 3000 milliseconds (3 seconds)
        const timeoutId = setTimeout(() => {
            const user = localStorage.getItem("user");

            if (localStorage.getItem("selectedFlight") && localStorage.getItem("selectedHotel") && localStorage.getItem("pois")) {

                const finalObj = {
                    user: localStorage.getItem("user"),
                    flights: sflight,
                    hotels: shotel,
                    pois: spois,
                    setImages: simages,
                    searchObj: searchObj
                }

                sendFinalObjToBackend(finalObj)



                localStorage.clear();
                localStorage.setItem("user", user);
                window.location.reload();
            }
        }, 2000);

        // Clear the timeout when the component is unmounted or the user navigates away
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <StepContainer md="12">
            <div style={{ width: '100%', background: '#f9f9f9', padding: '30px 10px', height: '100%', borderRadius: "10px", boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)" }}>

                <FlexColumnContainer>
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '20px 0 10px 0',
                            color: '#939393',
                            fontSize: '30px',
                            fontWeight: 'bold',
                        }}
                    >
                        Step 5
                    </div>
                    <FlexColumnContainer width="100%">

                        {!localStorage.getItem("selectedFlight") || !localStorage.getItem("selectedHotel") || !localStorage.getItem("pois") ? (
                            <div style={{ fontSize: '25px', textAlign: 'center' }}>
                                Please select at least one flight/hotel/point of interest
                            </div>
                        ) : (
                            <div style={{ fontSize: '25px', textAlign: 'center' }}>
                                Congratulations! You have completed this process.
                                <p style={{ fontSize: '15px', textDecoration: 'underline' }}>Redirecting to homepage ... </p>
                                <span style={{ fontSize: '50px', display: 'block' }} role="img" aria-label="image">
                                    🎉
                                </span>
                            </div>
                        )}



                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
                            {/* <CDBBtn
                                flat
                                outline
                                circle={false}
                                color="secondary"
                                onClick={() => handleNextPrevClick(4)}
                            >
                                Previous
                            </CDBBtn> */}
                        </div>
                    </FlexColumnContainer>
                </FlexColumnContainer>
            </div>
        </StepContainer>
    );
};

const Step4 = ({ handleNextPrevClick, searchObj }) => {
    return (
        <StepContainer>
            <div style={{ width: '100%', background: '#f9f9f9', padding: '30px 10px', height: '100%', borderRadius: "10px", boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)" }}>

                <FlexColumnContainer>
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '20px 0 10px 0',
                            color: '#939393',
                            fontSize: '30px',
                            fontWeight: 'bold',
                        }}
                    >
                        Summary
                    </div>
                    <FlexColumnContainer width="100%">
                        <Summary searchObj={searchObj} />
                    </FlexColumnContainer>
                </FlexColumnContainer>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
                    <CDBBtn
                        color="secondary"
                        flat
                        className="float-start"
                        circle={false}
                        outline
                        onClick={() => handleNextPrevClick(3)}
                    >
                        Previous
                    </CDBBtn>
                    <CDBBtn
                        color="secondary"
                        circle={false}
                        flat
                        className="float-end"
                        onClick={() => handleNextPrevClick(5)}
                    >
                        Next
                    </CDBBtn>
                </div>
            </div>
        </StepContainer>
    );
};

const Step3 = ({ handleNextPrevClick, searchObj }) => {
    return (
        <StepContainer style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1) !important" }}>
            <div style={{ width: '100%', background: '#f9f9f9', padding: '30px 10px', height: '100%', borderRadius: "10px", boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)" }}>

                <FlexColumnContainer>
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '20px 0 10px 0',
                            color: '#939393',
                            fontSize: '30px',
                            fontWeight: 'bold',
                        }}
                    >
                        Choose points of interests
                    </div>
                    <FlexColumnContainer width="100%">
                        <Points searchObj={searchObj} />
                    </FlexColumnContainer>
                </FlexColumnContainer>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
                    <CDBBtn
                        color="secondary"
                        flat
                        className="float-start"
                        circle={false}
                        outline
                        onClick={() => handleNextPrevClick(2)}
                    >
                        Previous
                    </CDBBtn>
                    <CDBBtn
                        color="secondary"
                        circle={false}
                        flat
                        className="float-end"
                        onClick={() => handleNextPrevClick(4)}
                    >
                        Next
                    </CDBBtn>
                </div>
            </div>
        </StepContainer>
    );
};

const Step2 = ({ handleNextPrevClick, searchObj }) => {
    return (
        <StepContainer>
            <div style={{ width: '100%', background: '#f9f9f9', padding: '30px 10px', height: '100%', borderRadius: "10px", boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)" }}>

                <FlexColumnContainer>
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '20px 0 10px 0',
                            color: '#939393',
                            fontSize: '30px',
                            fontWeight: 'bold',
                        }}
                    >
                        Reserve your hotel
                    </div>
                    <FlexColumnContainer width="100%">
                        <Hotels searchObj={searchObj} />
                    </FlexColumnContainer>
                </FlexColumnContainer>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
                    <CDBBtn
                        color="secondary"
                        flat
                        className="float-start"
                        circle={false}
                        outline
                        onClick={() => handleNextPrevClick(1)}
                    >
                        Previous
                    </CDBBtn>
                    <CDBBtn
                        color="secondary"
                        circle={false}
                        flat
                        className="float-end"
                        onClick={() => handleNextPrevClick(3)}
                    >
                        Next
                    </CDBBtn>
                </div>
            </div>
        </StepContainer>
    );
};

const Step1 = ({ handleNextPrevClick, searchObj }) => {
    return (
        <StepContainer>
            <div style={{ width: '100%', background: '#f9f9f9', padding: '30px 10px', height: '100%', borderRadius: "10px", boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)" }}>

                <FlexColumnContainer>
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '20px 0 10px 0',
                            color: '#939393',
                            fontSize: '30px',
                            fontWeight: 'bold',
                        }}
                    >
                        Reserve your filght
                    </div>
                    <FlexColumnContainer width="100%">
                        <Flights searchObj={searchObj} />
                    </FlexColumnContainer>
                </FlexColumnContainer>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>

                    <CDBBtn
                        color="secondary"
                        circle={false}
                        flat
                        className="float-end"
                        onClick={() => handleNextPrevClick(2)}
                    >
                        Next
                    </CDBBtn>
                </div>
            </div>
        </StepContainer>
    );
};

const FlexColumnContainer = styled('div')`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'center')};
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  box-sizing: border-box;
`;

const StepContainer = styled('div')`
  width: 100%;
  height: 100%;
`;

const StyledCDBStepper = styled(CDBStepper)`
    // margin-top: 10px;
    width: 80% !important;
    height: 100% !important;
    overflow: scroll !important;
`;