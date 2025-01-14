import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export default function LetterboxdPlot() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [svgDimensions, setSvgDimensions] = useState({ width: 500, height: 500 });

  useEffect(() => {
    const fetchData = async () => {
      const data = await d3.csv('/data/umap_data.csv');
      setData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = 500;
      const width = Math.min(window.innerWidth * 0.9, maxWidth);
      const height = width * 0.75;

      setSvgDimensions({
        width,
        height,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const { width, height } = svgDimensions;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Define padding factor for spreading the points
    const xPadding = 0.15; // 15% padding for x-axis
    const yPadding = 0.15; // 15% padding for y-axis

    // Update the xScale with padding
    const xScale = d3.scaleLinear()
      .domain([
        (d3.min(data, d => parseFloat(d.x)) || 0) - (xPadding * (d3.max(data, d => parseFloat(d.x)) || 0)),
        (d3.max(data, d => parseFloat(d.x)) || 0) + (xPadding * (d3.max(data, d => parseFloat(d.x)) || 0)),
      ])
      .range([0, width]);

    // Update the yScale with padding
    const yScale = d3.scaleLinear()
      .domain([
        (d3.min(data, d => parseFloat(d.y)) || 0) - (yPadding * (d3.max(data, d => parseFloat(d.y)) || 0)),
        (d3.max(data, d => parseFloat(d.y)) || 0) + (yPadding * (d3.max(data, d => parseFloat(d.y)) || 0)),
      ])
      .range([height, 0]);

    const colorScale = d3.scaleSequential(d3.interpolateViridis)
      .domain([d3.min(data, d => parseFloat(d.Average_rating)) || 0, d3.max(data, d => parseFloat(d.Average_rating)) || 0]);

    svg.selectAll('circle').remove();
    svg.selectAll('.grid line').remove(); // Clear previous grid lines

    // Add grid lines with padding
    svg.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(xScale.ticks(10))
      .enter().append('line')
      .attr('x1', d => xScale(d))
      .attr('x2', d => xScale(d))
      .attr('y1', 0)
      .attr('y2', height)
      .style('stroke', '#eee')
      .style('stroke-width', 1)
      .style('stroke-dasharray', '2,2');

    svg.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(yScale.ticks(10))
      .enter().append('line')
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d))
      .attr('x1', 0)
      .attr('x2', width)
      .style('stroke', '#eee')
      .style('stroke-width', 1)
      .style('stroke-dasharray', '2,2');

    const circles = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5)
      .attr('fill', d => colorScale(parseFloat(d.Average_rating)))
      .on('mouseover', function (event, d) {
        d3.select(this).attr('opacity', 1.0);
        svg.append('text')
          .attr('x', xScale(d.x) + 10)
          .attr('y', yScale(d.y) - 10)
          .text(d.Film_title)
          .attr('class', 'tooltip text-lg bg-black p-1 rounded dark:text-white text-black');
        svg.append('text')
          .attr('x', xScale(d.x) + 10)
          .attr('y', yScale(d.y) + 10)
          .text(`Director: ${d.Director}`)
          .attr('class', 'tooltip text-xs bg-black p-1 rounded dark:text-white text-black');
        svg.append('text')
          .attr('x', xScale(d.x) + 10)
          .attr('y', yScale(d.y) + 30)
          .text(`Avg Rating: ${parseFloat(d.Average_rating).toFixed(2)}`)
          .attr('class', 'tooltip text-xs bg-black p-1 rounded dark:text-white text-black');
      })
      .on('mouseout', function () {
        d3.select(this).attr('opacity', 0.7);
        svg.selectAll('.tooltip').remove();
      })
      .on('click', (event: any, d) => {
        window.open(d.Film_URL, '_blank');
      });

    const zoom = d3.zoom()
      .scaleExtent([1, 3]) // Limit zoom scale between 1x and 3x
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', (event: any) => {
        svg.selectAll('.grid line').attr('transform', event.transform);
        circles.attr('transform', event.transform);
      });

    if (svgRef.current) {
      svg.call(zoom as any);
    }
  }, [data, svgDimensions]);

  return (
    <div className="flex justify-center items-center border-2 border-white dark:border-[#eee] rounded-lg dark:bg-white dark:bg-opacity-25">
      <svg ref={svgRef} className="scatter" />
    </div>
  );
};
