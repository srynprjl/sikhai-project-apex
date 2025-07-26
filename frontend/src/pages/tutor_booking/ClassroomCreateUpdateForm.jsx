import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import DashboardLayout from '../../components/layouts/DashboardLayout';

export default function ClassroomCreateUpdateForm(){
  return (
    <DashboardLayout>
    <div className="p-8 shadow-md">

      <form  className="space-y-4 text-white">
        <div className='flex justify-between items-center mb-6'>
            <h1 className="text-3xl font-bold text-white ">
        Create New Classroom
      </h1>
        <button
          type="submit"
          className="bg-accent text-white px-6 py-2  disabled:opacity-50 transition duration-300"
        >
        </button>
        </div>
        <div>
          <label htmlFor="name" className="block  text-sm font-bold mb-2">
            Classroom Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0 "
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0 "
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-bold mb-2">
            Price (NRs):
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0"
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0 "            
            required
          />
        </div>
        <div>
          <label htmlFor="subjects" className="blocktext-sm font-bold mb-2">
            Subjects:
          </label>
          <input
            type="text"
            id="subjects"
            name="subjects"
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0 "
            required
          />
        </div>
      </form>
    </div>
    </DashboardLayout>
    // <></>
  );
};
