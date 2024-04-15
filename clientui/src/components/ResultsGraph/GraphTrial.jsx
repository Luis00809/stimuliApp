import * as d3 from 'd3';
import { getTrialsByDate, getTrialsRange } from '../../API/TrialApi';
import { useState, useEffect, useRef } from 'react';


const GraphTrials = ({startDate, endDate, clientId, setId}) => {
    const graphRef = useRef(null);
    const [trials, setTrials] = useState([]);

    // const circleSymbol = d3.symbol().type(d3.symbolCircle).size(100); 
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTrialsRange(startDate, endDate, clientId, setId);
                setTrials(data);
                
            } catch (error) {
                console.log('error making graph: ', error);
            }
        }
        fetchData();
    },[startDate, endDate, clientId, setId])


    useEffect(() => {
        if(trials.length === 0) return;

        const data = calculateDailyPercentage(trials);
        
        const svg = d3.select(graphRef.current);
        const width = 800;
        const height = 380;
        const margin = { top: 20, right: 20, bottom: 30, left: 50 }

        // tooltip: 
        const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

        const stimSetTitle = trials[0].stimSet.title;

        //  scales 
        const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => new Date(d.date))) 
        .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d =>  d.percentage)])
        .range([height - margin.bottom, margin.top]);

        
        // define axes
        const xAxis = d3.axisBottom(xScale)
        .ticks(d3.timeDay.every(1))
        .tickFormat(d => new Date(d).toLocaleDateString());

        const yAxis = d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(d => `${d}%`);

        // append to svg
        svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(xAxis)

        svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxis);

        svg.append('text')
        .attr('transform', `translate(${width / 2}, ${height - margin.bottom + 45})`) 
        .style('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('fill', 'blue')
        .text(stimSetTitle);

        svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => xScale(new Date(d.date))) 
        .attr("cy", d => yScale(d.percentage)) 
        .attr("r", 6) 
        .attr("fill", "blue")
        .on("mouseover", function(event, d) {
            tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(`${d.percentage.toFixed(2)}%`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
            })
            .on('mouseout', function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
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