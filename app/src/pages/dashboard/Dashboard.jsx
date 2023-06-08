import React from 'react';

function Dashboard() {
  return (
    <div className="w-screen h-screen flex flex-row">
        <div className="flex flex-col bg-[#080957] h-full w-2/5 text-white">
          <div className="ml-2 mt-2">
          <h1 className="font-bold"> Med'IA </h1>
  
          <ul className="font-bold">Cardiology features</ul>
          <li>Pneumonia Detection</li>
          <ul className="font-bold">Dermatology features</ul>
          <li>Melanoma Detection</li>
          <li>Melanoma recurrence prediction </li>
          </div>
        </div>
        <div className="flex flex-col w-full h-full ">
          <h1 className="ml-10 font-bold">Welcome M. Johnsson</h1>
          <div className="bg-[#D9D9D9] w-2/3 h-1/4 rounded-md ml-10 mt-10">
            <h1 className="ml-2 mt-2 font-bold">History</h1>
          </div>
          <div className="flex flex-row">
            <div className="bg-[#D9D9D9] w-2/5 h-5/6 rounded-md ml-10 mt-10 justify-center items-center">
              <h1 className="ml-2 mt-2 font-bold">Last features used</h1>
              <button className="bg-[#4c4b4b] text-white rounded-lg justify-center items-center ">
                <p className="ml-2 mr-2">Pneumonia Detection</p>
              </button>
            </div>
            <div className="bg-[#D9D9D9] w-2/5 h-5/6 rounded-md ml-10 mt-10 justify-center items-center truncate">
              <div className="ml-5">
              <h1 className="mt-2 font-bold">Agenda</h1>
  
              <ul className="font-bold">Aujourd’hui Vendredi 12 mai</ul>
              <li>12h : RDV Madame Michu</li>
              <li>15h : RDV Monsieur Georges</li>
              <li>16h : RDV Madame Thomas</li>
              <ul className="font-bold">Demain Samedi 13 mai</ul>
              <li>Aucun événement à venir</li>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center"></div>
      </div>
  );
}

export default Dashboard;
