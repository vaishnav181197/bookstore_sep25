import React from 'react'

import { FaBook } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts'



import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSidebar from '../components/AdminSidebar'

function Dashboard() {

  const graphOptions={
    chart: {
        type: 'column'
    },
    title: {
        text: 'Books Added vs Books Sold'
    },
    xAxis: {
        categories: ['User1', 'User2', 'User3', 'User4'],
        crosshair: true,
        accessibility: {
            description: 'Users'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'year'
        }
    },
    tooltip: {
        valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Added',
            data: [387749, 280000, 129000, 64300, 54000, 34300]
        },
        {
            name: 'Sold',
            data: [45321, 140000, 10000, 140500, 19500, 113500]
        }
    ]
  }

  const pieOptions={
     chart: {
        type: 'pie',
        zooming: {
            type: 'xy'
        },
        panning: {
            enabled: true,
            type: 'xy'
        },
        panKey: 'shift'
    },
    title: {
        text: 'Egg Yolk Composition'
    },
    tooltip: {
        valueSuffix: '%'
    },
    subtitle: {
        text:
        'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Water',
                    y: 55.02
                },
                {
                    name: 'Fat',
                    sliced: true,
                    selected: true,
                    y: 26.71
                },
                {
                    name: 'Carbohydrates',
                    y: 1.09
                },
                {
                    name: 'Protein',
                    y: 15.5
                },
                {
                    name: 'Ash',
                    y: 1.68
                }
            ]
        }
    ]
  }


  return (
    <>
      <AdminHeader />
      <div className='min-h-[60vh] md:grid grid-cols-4'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>
        <div className='col-span-3'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
            
            <div className='w-full bg-violet-600 py-10 text-white rounded-xl shadow'>
              <h1 className="text-xl justify-center flex gap-3 items-center">
                <FaBook/>
                Total Number of Books
              </h1>
              <h1 className="text-center text-lg font-bold">100+</h1>
            </div>
            
            <div className='w-full bg-green-600 py-10 text-white rounded-xl shadow'>
              <h1 className="text-xl justify-center flex gap-3 items-center">
                <FaUsers/>
                Total Number of Users
              </h1>
              <h1 className="text-center text-lg font-bold">100+</h1>
            </div>
            
            <div className='w-full bg-yellow-600 py-10 text-white rounded-xl shadow'>
              <h1 className="text-xl justify-center flex gap-3 items-center">
                <GrUserWorker/>
                Total Number of Employees
              </h1>
              <h1 className="text-center text-lg font-bold">100+</h1>
            </div>

          </div>

          <div className='md:grid grid-cols-2'>
              <div>
                <HighchartsReact
                highcharts={Highcharts}
                options={graphOptions}
                />
              </div>
              <div>
                 <HighchartsReact
                highcharts={Highcharts}
                options={pieOptions}
                />
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard