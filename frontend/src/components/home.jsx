import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventoryData } from '../redux/inventorySlice';
import { Tab, Tabs, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';

const Home = () => {
    const dispatch = useDispatch();
    const inventoryData = useSelector(state => state.inventory.data);

    useEffect(() => {
        dispatch(fetchInventoryData());
    }, [dispatch]);

    const parseDataForChart = (condition) => {
        const filteredData = inventoryData.filter(item => item.condition === condition);

        const labels = filteredData.map(item => new Date(item.timestamp).toLocaleDateString());
        const data = filteredData.map(item => item.inventoryCount);

        return {
        labels,
        datasets: [{
            label: `${condition} Inventory Count`,
            data,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1
        }]
        };
    };

    const parseMSRPDataForChart = (condition) => {
        const filteredData = inventoryData.filter(item => item.condition === condition);

        const labels = filteredData.map(item => new Date(item.timestamp).toLocaleDateString());
        const data = filteredData.map(item => item.averageMsrp);

        return {
        labels,
        datasets: [{
            label: `${condition} Average MSRP`,
            data,
            fill: false,
            borderColor: 'rgba(153,102,255,1)',
            tension: 0.1
        }]
        };
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange}>
            <Tab label="New Inventory" />
            <Tab label="Used Inventory" />
            <Tab label="CPO Inventory" />
        </Tabs>

        <TabPanel value={value} index={0}>
            <Line data={parseDataForChart('new')} />
            <Line data={parseMSRPDataForChart('new')} />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Line data={parseDataForChart('used')} />
            <Line data={parseMSRPDataForChart('used')} />
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Line data={parseDataForChart('cpo')} />
            <Line data={parseMSRPDataForChart('cpo')} />
        </TabPanel>
        </Box>
    );
};

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                {children}
                </Box>
            )}
        </div>
    );
};

export default Home;