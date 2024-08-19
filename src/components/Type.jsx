import React, { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
export default function Type(props) {
  const typeArray = [
    { type: 'Motivational' }, { type: 'Sad' }, { type: 'Romance' },
    { type: 'Freshness' }, { type: 'Party' }, { type: 'Rock' },
    { type: 'Random' }, { type: 'Hiphop' }, { type: 'Disco' },
    { type: 'Moody' }, { type: 'Melody' }, { type: 'Happy' },
    { type: 'Cheering' }, { type: 'Jazz' }, { type: 'Classical' },
    , { type: 'Rap' }, { type: 'BGM' },{ type: 'Story' },{ type: 'All' },
    { type: 'Story' }
  ];

  const [typeSearch, setTypeSearch] = useState('');
  const [type, setType] = useState([]);

  function getBool(typeName, search) {
    if (!typeName || !search) {
      return false;
    }
    typeName = typeName.toLowerCase();
    search = search.toLowerCase();
    const pos = typeName.search(search);
    return pos >= 0 && search !== '';
  }

  const handleClick = (data) => {
    const newType = [...type, data.toLowerCase()];
    setType(newType);
    props.handleSetType(newType);
  };

  const handlePop=(data)=>{
    const updatedType =type.filter((item) => item !== data);
    setType(updatedType)
  }

  return (
    <div>
      <form action="" className="flex justify-center items-center gap-2 text-black">
        <input
          className="w-96 text-center shadow-md shadow-gray-100 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          onChange={(e) => setTypeSearch(e.target.value)}
          placeholder="Search here"
          value={typeSearch}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </form>

      {typeArray.map((data, index) => (
        <div key={index}>
          {getBool(data.type, typeSearch) ? (
            <div className="my-3 flex flex-row gap-2 justify-center items-center cursor-pointer">
              <h1 className="text-sm text-white" onClick={() => handleClick(data.type)}>{data.type}</h1>
            </div>
          ) : null}
        </div>
      ))}

      {type.map((data, index) => (
        <div key={index} className="flex gap-2">
          <p>{data.toUpperCase()}<CloseButton onClick={() => handlePop(data)}  variant="white"/></p>
        </div>
      ))}
    </div>
  );
}
