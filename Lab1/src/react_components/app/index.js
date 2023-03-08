import moment from 'moment'; // библиотека moment для работы с временем и датами
                             // для установки зайди в терминале в директорию со своим проектом и 
                             // npm install moment --save
import styled from "styled-components"; 
import {useState} from "react";
import {CalendarHeader} from "../calendar-header"; // см. файлы в react-components
import {CalendarTitle} from "../calendar-title";
import {CalendarGrid} from "../calendar-grid";

const CalendarStyle = styled.div`
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 20px #ccc;
`
const FormPosStyle = styled.div`
    position: absolute;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
`
const FormStyle = styled(CalendarStyle)`
    width: 20vw;
    background-color: aliceblue;
    box-shadow: unset;
`

const EventTitle = styled.input`
    padding: 5px 15px;
    font-size: 85%;
    width: 100%;
    border: 0;
    outline: 0;
    border-bottom: 1px solid #c6c6cc;
    background-color: aliceblue;
    color: #c6c6cc;
`

const EventBody = styled.input`
    padding: 5px 15px;
    font-size: 85%;
    width: 100%;
    border: 0;
    outline: 0;
    border-bottom: 1px solid #c6c6cc;
    background-color: aliceblue;
    color: #c6c6cc;
`

const ButtonsStyle = styled.div`
    padding: 8px 15px;
    display: flex;
    justify-content: flex-end;
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
    const [method, setMethod] = useState(null);
    const [event, setEvent] = useState(null);
    const [isFormShowing, setShowForm] = useState(false);
    const openForm = (methodName, eventToUpdate) => {
        console.log("fd", methodName);
        setShowForm(true);
        setEvent(eventToUpdate);
        setMethod(methodName);
    }

    const cancelButton = () => {
        setShowForm(false);
        setEvent(null);
    }

    // здесь при изменении значения в форме ввода соответсвующему полю события присваивается новое значение
    const changeEvent = (text, field) => {
        setEvent(previousState => ({...previousState, [field]:text}));
    }

    const eventHandler = () => {
        ////
    }
  return (
      <>
          {
              isFormShowing ? (
                  <FormPosStyle>
                      <FormStyle>
                          <EventTitle value = {event.title}
                                      onChange = {e => changeEvent(e.target.value, "title")}
                          />
                          <EventBody value = {event.description}
                                     onChange = {e => changeEvent(e.target.value, "description")}
                          />
                          <ButtonsStyle>
                              <button onClick={cancelButton}>Cancel</button>
                              <button onClick={eventHandler}>{method}</button>
                          </ButtonsStyle>
                      </FormStyle>
                  </FormPosStyle>
              ) : null
          }
          <CalendarStyle>
              <CalendarHeader />
              <CalendarTitle />
              <CalendarGrid pageFirstDay = {pageFirstDay} grid_events = {temp_events} openForm = {openForm}/>
          </CalendarStyle>
      </>
  );
}

export default App;
