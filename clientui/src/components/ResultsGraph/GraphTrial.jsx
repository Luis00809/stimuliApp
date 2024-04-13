import * as d3 from 'd3';
import { getTrialsByDate } from '../../API/TrialApi';
import { useState, useEffect, useRef } from 'react';


const GraphTrials = ({date, clientId, setId}) => {
    const graphRef = useRef(null);
    const [trials, setTrials] = useState([]);

    const circleSymbol = d3.symbol().type(d3.symbolCircle).size(100); 
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTrialsByDate(date, clientId, setId);
                setTrials(data);
                
            } catch (error) {
                throw new error("error getting trials: ", error)
            }
        }
        fetchData();
    },[date, clientId, setId])


    useEffect(() => {
        if(trials.length === 0) return;

        const data = calculateDailyPercentage(trials);
        console.log(data);
        

        const svg = d3.select(graphRef.current);
        const width = 800;
        const height = 400;
        const margin = { top: 20, right: 20, bottom: 30, left: 50 }

        //  scales 
        const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => new Date(d.date))) 
        .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d =>  d.percentage)])
        .range([height - margin.bottom, margin.top]);

        // define axes
        const xAxis = d3.axisBottom(xScale)
        .tickFormat(d => new Date(d).toLocaleDateString());

        const yAxis = d3.axisLeft(yScale).tickFormat(d => `${d}%`);

        // append to svg
        svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(xAxis)

        svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxis);

        // append bars 
        svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => xScale(new Date(d.date))) 
        .attr("cy", d => yScale(d.percentage)) 
        .attr("r", 5) 
        .attr("fill", "blue"); 
    }, [trials])

    const calculateDailyPercentage = (trials) => {
        const dailyData = {};

        trials.forEach(trial => {
            
            const date = new Date(trial.date).toLocaleDateString();
            if (!dailyData[date]) {
              dailyData[date] = { totalCorrect: 0, totalTrials: 0 };
            }
            dailyData[date].totalCorrect += trial.totalCorrect;
            dailyData[date].totalTrials += trial.totalTrials;
         });

         return Object.entries(dailyData).map(([date, { totalCorrect, totalTrials }]) => ({
            date,
            percentage: (totalCorrect / totalTrials) * 100,
         }));
    }


    return <svg ref={graphRef} width="800" height="400"></svg>;
}

export default GraphTrials;