import React from 'react';
import VehiclesRow from './VehiclesRow';

function VehiclesTable({vehicles}) {
  return <div className="container flex justify-center mx-auto mt-10 overflow-x-scroll h-100">
        {vehicles.length === 0 ? <h3 className='font-bold dark:text-gray-500'>No Records</h3> :
            <div className="flex flex-col">
                <div className="w-full">
                    <div className="border-b border-gray-200 shadow">
                        <table>
                        <thead className="bg-gray-200 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-2 text-xs text-gray-500">
                                    VIN
                                </th>
                                <th className="px-6 py-2 text-xs text-gray-500">
                                    Driver
                                </th>
                                <th className="px-6 py-2 text-xs text-gray-500">
                                    License Plate
                                </th>
                                <th className="px-6 py-2 text-xs text-gray-500">
                                    Office
                                </th>
                                <th className="px-6 py-2 text-xs text-gray-500">
                                    LAT
                                </th>
                                <th className="px-6 py-2 text-xs text-gray-500">
                                    LONG
                                </th>
                                <th className="px-6 py-2 text-xs text-gray-500">
                                    MMY
                                </th>
                                <th className="px-6 py-2 text-xs text-gray-500">
                                    Customer Name
                                </th>
                                <th className="px-6 py-2 text-xs text-gray-500">
                                    Ignition
                                </th>
                                <th className="px-6 py-2 text-xs text-gray-500">
                                    Speed
                                </th>
                                <th className="px-6 py-2 text-xs text-gray-500">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {vehicles.map(vehicle => {
                                return <VehiclesRow vehicle={vehicle} key={vehicle.Vin}/>
                            })}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        }
        </div>;
}

export default VehiclesTable;
