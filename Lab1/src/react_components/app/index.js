import moment from 'moment'; // библиотека moment для работы с временем и датами
                             // для установки зайди в терминале в директорию со своим проектом и 
                             // npm install moment --save
import styled from "styled-components"; 
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
    
  return (
    <CalendarStyle>
      <CalendarHeader />
      <CalendarTitle />
      <CalendarGrid pageFirstDay = {pageFirstDay}/>
    </CalendarStyle>
  );
}

export default App;
