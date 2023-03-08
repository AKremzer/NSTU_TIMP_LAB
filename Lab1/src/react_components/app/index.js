import moment from 'moment'; // библиотека moment для работы с временем и датами
                             // для установки зайди в терминале в директорию со своим проектом и 
                             // npm install moment --save
import styled from "styled-components"; 
import {useState} from "react";
import {useEffect} from "react";
import {CalendarHeader} from "../calendar-header"; // см. файлы в react-components
import {CalendarTitle} from "../calendar-title";
import {CalendarGrid} from "../calendar-grid";

const CalendarStyle = styled.div`
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 20px #ccc;
`


function App() {
    moment.updateLocale("en", {week: {dow: 1}}); // локаль надо менять, потому что здесь неделя начинается с воскресенья
    let pageFirstDay = moment().startOf("month").startOf("week");
    //window.moment = moment;
    
    let temp_events = [
{id: 1, title: 'событие раз', description: 'fdsfs', date: 1678249398}, {id: 2, title: 'событие два', description: 'asdas', date: 1680902621}];
    // ниже CalendarStyle, CalendarHeader - это все React-элементы (компоненты)
    // на 22 строке компоненту CalendarGrid передаются props, в самом элементе к pageFirstDay потом можно будет
    // обратиться как к props.pageFirstDay
  return (
    <CalendarStyle>
      <CalendarHeader />
      <CalendarTitle />
      <CalendarGrid pageFirstDay = {pageFirstDay} grid_events = {temp_events}/> 
    </CalendarStyle>
  );
}

export default App;
