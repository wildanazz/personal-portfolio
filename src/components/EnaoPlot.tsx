import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export default function EnaoPlot() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [svgDimensions, setSvgDimensions] = useState({ width: 640, height: 480 });
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await d3.csv('/data/enao-genres.csv');
      setData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = 640;
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

    const xPadding = 0.1;
    const yPadding = 0.1;

    const xScale = d3.scaleLinear()
      .domain([ 
        (d3.min(data, d => parseFloat(d.left_pixel)) || 0) - (xPadding * (d3.max(data, d => parseFloat(d.left_pixel)) || 0)),
        (d3.max(data, d => parseFloat(d.left_pixel)) || 0) + (xPadding * (d3.max(data, d => parseFloat(d.left_pixel)) || 0)),
      ])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([
        (d3.min(data, d => parseFloat(d.top_pixel)) || 0) - (yPadding * (d3.max(data, d => parseFloat(d.top_pixel)) || 0)),
        (d3.max(data, d => parseFloat(d.top_pixel)) || 0) + (yPadding * (d3.max(data, d => parseFloat(d.top_pixel)) || 0)),
      ])
      .range([height, 0]);

    svg.selectAll('circle').remove();
    svg.selectAll('.grid line').remove();
    svg.selectAll('.axis').remove();

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
      .attr('cx', d => xScale(d.left_pixel))
      .attr('cy', d => yScale(d.top_pixel))
      .attr('r', 5)
      .attr('fill', d => d.color || 'gray')
      .on('mouseover', function (event, d) {
        d3.select(this).attr('opacity', 1.0);
        svg.append('text')
          .attr('x', xScale(d.left_pixel) + 10)
          .attr('y', yScale(d.top_pixel) - 10)
          .text(d.genre_name)
          .attr('class', 'tooltip text-lg bg-black p-1 rounded dark:text-white text-black');
        svg.append('text')
          .attr('x', xScale(d.left_pixel) + 10)
          .attr('y', yScale(d.top_pixel) + 10)
          .text(`Track: ${d.preview_track}`)
          .attr('class', 'tooltip text-xs bg-black p-1 rounded dark:text-white text-black');
      })
      .on('mouseout', function () {
        d3.select(this).attr('opacity', 0.7);
        svg.selectAll('.tooltip').remove();
      })
      .on('click', (event: any, d) => {
        if (d.preview_url) {
          if (audio && audio.src === d.preview_url && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
          } else {
            if (audio) {
              audio.src = d.preview_url;
              audio.play();
            }
          }
        }
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

    setAudio(new Audio());

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('fill', '#000')
      .text('← Denser & Atmospheric, Spikier & Bouncier →');

    svg.append('text')
      .attr('transform', `rotate(-90)`)
      .attr('x', -height / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('fill', '#000')
      .text('← Organic, Mechanical & Electric →');

  }, [data, svgDimensions]);

  return (
    <div className="flex justify-center items-center border-2 border-white dark:border-[#eee] rounded-lg dark:bg-white dark:bg-opacity-25">
      <svg ref={svgRef} className="scatter" />
    </div>
  );
};
