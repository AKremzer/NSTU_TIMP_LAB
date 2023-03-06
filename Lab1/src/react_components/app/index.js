import moment from 'moment'; // библиотека moment для работы с временем и датами
                             // для установки зайди в терминале в директорию со своим проектом и 
                             // npm install moment --save
import {CalendarHeader} from "../calendar-header"; // см. файлы в react-components
import {CalendarTitle} from "../calendar-title";
import {CalendarGrid} from "../calendar-grid";

function App() {
    //window.currentDay = moment; // сегодняшний день
    moment.updateLocale("en", {week: {dow: 1}}); // локаль надо менять, потому что здесь неделя начинается с воскресенья
    let pageFirstDay = moment().startOf("month").startOf("week"); // первый день недели, на которой начинается месяц
    let pageLastDay = moment().endOf("month").endOf("week");      // последний день недели, на которой кончается месяц
    
    let calendarSheet = [];
    let calendarDay = moment(pageFirstDay);
    while(!calendarDay.isAfter(pageLastDay)) {   // прибавляем дни к самому левому дню на странице календаря
        calendarSheet.push(moment(calendarDay)); // и заносим в массив, пока заносимый элемент не станет больше
        calendarDay.add(1, "day");               // самого правого дня на странице календаря
    }
    // везде, где используется moment с объектом moment в конструкторе, создается новый объект для того, чтобы не изменять старые объекты
    
  return (
    <div>
      <CalendarHeader />
      <CalendarTitle />
      <CalendarGrid pageFirstDay = {pageFirstDay}/>
    </div>
  );
}

export default App;
