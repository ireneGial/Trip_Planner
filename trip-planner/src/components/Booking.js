import React, { useState, useEffect } from 'react';
import HorizontalTimeline from './HorizontalTimeline';

const Booking = ({ searchObj }) => {

    useEffect(() => {
        console.log('Booking component received prop:', searchObj);
    }, []);

    return (
        <HorizontalTimeline searchObj={searchObj} style={{ height: '100%' }} />
    );
};

export default Booking;
