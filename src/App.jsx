import React from 'react'
import { useState } from 'react'

const App = () => {

const [medals, setMedals] = useState([]); 
const [countryData, setCounryData] = useState({country: '', gold: '', silver: '', bronze: ''}); 
const [editing, setEditing] = useState(false); 
const [edited, setEdited] = useState(null); 

// 입력값 핸들링 기능
const handleChange = (e) => {
  const {name, value} = e.target;
  setCounryData({...countryData, [name]: value})
}

// 메달 추가 기능 (create)
const handleAdd = (e) => {
  e.preventDefault();

  const newMedals = {
    id: Date.now(),
    counrty: countryData.country,
    gold: countryData.gold,
    silver: countryData.silver,
    bronze: countryData.bronze,
  }
  setMedals([...medals, newMedals])
  setCounryData({country: '', gold: '', silver: '', bronze: ''})
}

// 메달 정보 수정 기능 (update)
const handleEdit = (id) => {
  const medalEdit = medals.find((medal) => medal.id === id); 
  setCounryData(medalEdit);
  setEditing(true);
  setEdited(id);
}

// 메달 정보 수정 및 저장
const handleEditSave = (e) => {
  e.preventDefault();

  setMedals(
    medals.map((medal) => medal.id === edited.id ? {...medal, ...countryData, gold: countryData.gold, silver: countryData.silver, bronze: countryData.bronze} : medal)
  )
};

// 메달 정보 삭제 (delete)
const handleDelete = (id) => {
  setMedals(medals.filter((medal) => medal.id !== id));
}


  return (
    <div>
    <h1>2024 파리 올림픽 메달 집계 리스트</h1>

    <form onSubmit={editing ? handleEditSave : handleAdd}>

    <input type="text" 
    name="country"
    value={countryData.country} 
    onChange={handleChange}
    placeholder='나라를 입력하세요'
    />
        <input type="number" 
    name="gold"
    value={countryData.gold}
    onChange={handleChange}
    placeholder='금메달을 입력하세요'
    />
        <input type="number" 
    name="silver"
    value={countryData.silver}
    onChange={handleChange}
    placeholder='은메달을 입력하세요'
    />
        <input type="number" 
    name="bronze"
    value={countryData.bronze}
    onChange={handleChange}
    placeholder='동메달을 입력하세요'
    />
<button type='submit'>{editing ? " 수정완료" : "추가"}</button>

</form>

    <ul>
      {medals.map((medal) => 
      <li key = {medal.id}>
        나라이름: {medal.counrty}, 금: {medal.gold}, 은: {medal.silver}, 동: {medal.bronze}
        <button onClick={() => handleEdit(medal.id)}>수정</button>
        <button onClick={() => handleDelete(medal.id)}>삭제</button>
      </li>
      )}
    </ul>

    </div>
  )
}

export default App