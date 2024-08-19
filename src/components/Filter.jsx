import React ,{useState}from 'react'

export default function Filter(props) {

    const [type, setType] = useState('');
    const [language, setLanguage] = useState('');
  
    const handleTypeChange = (event) => {
      setType(event.target.value);
      props.onFilterChange({ type: event.target.value, language });
    };
  
    const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
      props.onFilterChange({ type, language: event.target.value });
    };




    return (
        <div className="max-w-lg mx-auto bg-slate-900 p-6 rounded-lg shadow-lg text-whi">
          <h2 className="text-2xl font-semibold mb-4">Filter Songs</h2>
          <div className="space-y-4">
            {/* Song Type Filter */}
            <div>
              <label className="block text-white font-medium mb-2" htmlFor="type">Song Type</label>
              <select
                id="type"
                value={type}
                onChange={handleTypeChange}
                className="w-full p-2 border bg-black border-gray-300 rounded"
              >
                
                <option value="party">Party</option>
                <option value="rock">Rock</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
                <option value="moody">Moody</option>
                <option value="sad">Sad</option>
                <option value="romance">Romance</option>
                <option value="freshness">Freshness</option>
                <option value="melody">Melody</option>
                <option value="cheering">Cheering</option>
                <option value="happy">Happy</option>
                <option value="disco">Disco</option>
                <option value="hiphop">Hiphop</option>
                <option value="rap">Rap</option>
                <option value="bgm">BGM</option>
                <option value="story">Story</option>
              </select>
            </div>
            {/* Song Language Filter */}
            <div>
              <label className="block text-white font-medium mb-2" htmlFor="language">Song Language</label>
              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                className="w-full p-2 border  bg-black border-gray-300 rounded"
              >
               
                <option value="english">English</option>
                <option value="bengali">Bengali</option>
                <option value="hindi">Hindi</option>
                <option value="german">..</option>
              </select>
            </div>
            {/* Apply Button */}
            <div>
              <button
                onClick={() => props.onFilterChange({ type, language })}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      );
}
