import React from 'react';
import WelcomeContainer from "./_components/WelcomeContainer";
import DashboardOptions from "../_components/DashboardOptions";
import LatestInterviewList from "../_components/LatestInterviewList";

const Dashboard = () => {

    return (
        <div>
            <h2 className='my-3 mx-1 font-bold text-2xl'>Dashboard</h2>
            <DashboardOptions />
            <LatestInterviewList />
        </div>
    );
};

export default Dashboard;
