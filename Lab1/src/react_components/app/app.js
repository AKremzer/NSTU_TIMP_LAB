import moment from 'moment';
import 'moment/locale/ru';
import {useEffect, useState} from "react";
import {CalendarTitle} from "../calendar-title/calendar-title";
import {CalendarGrid} from "../calendar-grid/calendar-grid";
import {CalendarStyle, FormPosStyle, FormStyle, EventStyle, ButtonsWrap, ButtonsStyle} from './app-styles'

// расположение json-server
const jsonUrl = `http://localhost:3001`;

/**
 * Функциональный компонент App, отвечающий за отображение компонетов календаря
 *
 * @remarks
 * Из данного компонента также осуществляется вызов формы ввода событий и обращение к серверу за данными
 *
 * @returns
 * HTML-элемент App, содержащий все компоненты календаря и форму ввода
 */
function App() {
    // хуки функционального компонента
    const [method, setMethod] = useState(null);             // установка метода для открытия формы ввода
    const [event, setEvent] = useState(null);               // установка события, которое открывается в форме ввода
    const [isFormShowing, setShowForm] = useState(false);   // установка открытия/закрытия формы
    const [events, setEvents] = useState([]);               // установка списка событий на текущий месяц
    const [today, setToday] = useState(moment())                     // установка текущего дня для отсчета отображаемых дней

    moment.locale('ru');

    let pageFirstDay = today.clone().startOf("month").startOf("week"); // первый день, отображаемый на странице календаря
    const startDayFilter = moment(pageFirstDay).format('X');                        // левая граница для поиска событий, попадающих в этот месяц
    const endDayFilter = moment(pageFirstDay).add(42, "days");                 // правая граница для поиска событий, попадающих в этот месяц

    // хук, используемый для обращения к серверу для получения событий, попадающих в этот месяц, после загрузки компонента
    useEffect(() => {
        // запрос в fetch использует фильтр (дата события больше, чем у первого дня на странице, но меньше, чем у последнего)
        fetch(`${jsonUrl}/events?date_gte=${startDayFilter}&date_lte${endDayFilter}`)
            .then(res => res.json())
            .then(res => setEvents(res));
    },[today]);


    /**
     * Открывает форму ввода событий
     *
     * @remarks
     * В зависимости от того, существует ли событие в данной ячейке, в форме будет доступно редактирование
     * существующего события или создание нового
     *
     * @param methodName - метод формы, зависящий от наличия в ячейке события
     * @param eventToUpdate - событие, которое необходимо изменить
     */
    const openForm = (methodName, eventToUpdate) => {
        setShowForm(true);
        setEvent(eventToUpdate);
        setMethod(methodName);
    }

    /**
     * Обработка нажатия на кнопку "Отмена" формы
     */
    const cancelButton = () => {
        setShowForm(false);
        setEvent(null);
    }

    /**
     * Изменяет значение события по вводу в форму
     *
     * @remarks
     * В зависимости от выбранного поля будут изменены поля title или description события
     *
     * @param text - текст, полученный из формы
     * @param field - поле формы, в котором были произведены изменения
     */
    const changeEvent = (text, field) => {
        // оператор расширения ... обусловлен тем, что при его отсутствии новое значение будет не присвоено
        // старому состоянию, а будет записано в новое состояние, которое в свою очередь будет записано в поле event
        // старого состояния
        setEvent(previousState => ({...previousState, [field]:text}));
    }

    /**
     * Обработка нажатий кнопок внутри формы ввода
     *
     * @remarks
     * Изменение состояния компонента App идет после обращения к серверу данных
     * Обрабатываются добавление нового события/изменение старого/удаление события
     */

    const eventHandler = (e) => {
        const url = (method == "Изменить" || e.target.id == "Delete") ? // при обращении к существующему элементу ссылка должна содержать id,
              `${jsonUrl}/events/${event.id}` : `${jsonUrl}/events`;
        const httpMethod = e.target.id == "Delete" ?                  // выбор HTTP-метода для обращения к серверу
              'DELETE' : (method == "Изменить" ? 'PATCH' : 'POST');     // POST - создание события, PATCH - редактирование,DELETE - удаление
        let options = {
           method: httpMethod,
           headers: { 'Content-Type': 'application/json' },
        }
        if (e.target.id != "Delete") options.body = JSON.stringify(event);
        fetch(url, options).then(res => res.json()).then(res => {           // изменение состояния events в зависимости от совершенного действия
            if(e.target.id == "Delete")
                setEvents(state => state.filter(thisEvent => thisEvent.id != event.id));
            else if(method == "Создать")
                setEvents(state => [...state, res]);
            else setEvents(state => state.map(event => event.id == res.id ? res : event));
            cancelButton();
        });
    }

    /**
     * Перелистывание календаря на месяц назад
     *
     * @remarks
     * Изменяет состояние today для вычисления новых границ страницы календаря
     */
    const prevPageHandler = () => setToday(prev => prev.clone().subtract(1,'month'));
    /**
     * Перелистывание календаря на сегодняшний день
     *
     * @remarks
     * Изменяет состояние today для вычисления новых границ страницы календаря
     */
    const todayPageHandler = () => setToday(moment());
    /**
     * Перелистывание календаря на месяц вперед
     *
     * @remarks
     * Изменяет состояние today для вычисления новых границ страницы календаря
     */
    const nextPageHandler = () => setToday(prev => prev.clone().add(1,'month'))

    // отрисовка компонента App
    return (
        <>
            {
                isFormShowing ? (
                    <FormPosStyle>
                        <FormStyle>
                            <EventStyle value = {event.title}
                                        placeholder = "Название"
                                        onChange = {e => changeEvent(e.target.value, "title")}
                            />
                            <EventStyle value = {event.description}
                                        placeholder = "Описание"
                                        onChange = {e => changeEvent(e.target.value, "description")}
                            />
                            <ButtonsWrap>
                                <ButtonsStyle onClick={cancelButton}>Отмена</ButtonsStyle>
                                <ButtonsStyle id="Edit" onClick={eventHandler}>{method}</ButtonsStyle>
                                <ButtonsStyle id="Delete" onClick={eventHandler}>Удалить</ButtonsStyle>
                            </ButtonsWrap>
                        </FormStyle>
                    </FormPosStyle>
                ) : null
            }
            <CalendarStyle>
                <CalendarTitle
                    today ={today}
                    prevPageHandler ={prevPageHandler}
                    todayPageHandler ={todayPageHandler}
                    nextPageHandler ={nextPageHandler}
                />
                <CalendarGrid pageFirstDay = {pageFirstDay} grid_events = {events} openForm = {openForm}/>
            </CalendarStyle>
        </>
    );
}

export default App;
