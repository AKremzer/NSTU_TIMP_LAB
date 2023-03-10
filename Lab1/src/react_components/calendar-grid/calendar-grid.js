import React from "react";
import moment from "moment";
import {GridStyle, DateStyle, ShowDateStyle, CellStyle,
        CellRowStyle, EventListStyle, EventItemStyle, CurrentDay} from "./calendar-grid-styles"

/**
 * Определение того, является ли выбранный день сегодняшним днем
 *
 * @param day - выбранный день в виде объекта moment
 *
 * @returns
 * true, если выбранный день соответствует сегодяшней дате, иначе false
 */
const isCurrentDay = (day) => moment().isSame(day, 'day') ;

/**
 * Классовый компонент CalendarGrid, отвечающий за детальную отрисовку сетки календаря
 *
 * @param pageFirstDay - первый день на странице календаря
 * @param grid_events - события, попадающие на страницу календаря
 * @param openForm - функция для открытия формы
 *
 * @returns
 * HTML-элемент CalendarGrid, содержащий сетку календаря
 */
class CalendarGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageFirstDay: this.props.pageFirstDay, // первый день на странице календаря
            grid_events: this.props.grid_events,   // события, попадающие на страницу календаря
            openForm: this.props.openForm          // функция для открытия формы
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.pageFirstDay !== prevState.pageFirstDay) {
            return ({ pageFirstDay: nextProps.pageFirstDay,
                      grid_events: nextProps.grid_events,
                      openForm: nextProps.openForm })
        }
        else return null
    }

    render() {
        let startDay = this.state.pageFirstDay.clone().subtract(1, "day");                  // -1 день из первого, так как map добавит к нему день
        let daysArray = [...Array(42)].map(() => moment(startDay.add(1, "day"))); // в каждой ячейке календаря находится день на 1 больше предыдущего
        return(
            <div>
                <GridStyle isHeader>
                    {
                        /* заполнение шапки календаря названиями дней недели */
                        [...Array(7)].map((_,i) =>  (
                        <CellStyle isHeader>
                            <CellRowStyle>
                                {moment().day(i+1).format('ddd')}
                            </CellRowStyle>
                        </CellStyle>
                    ))}
                </GridStyle>
                <GridStyle>
                    {
                        daysArray.map((dayObject) => (
                            <CellStyle key={dayObject.format("DDMMYYYY")} isWeekend={dayObject.day() == 6 || dayObject.day() == 0}>
                                {/* isWeekend определяет цвет ячейки */}
                                <CellRowStyle>
                                    <ShowDateStyle>
                                        {/* создание события при двойном клике по дате */}
                                        <DateStyle onDoubleClick =  {() => this.state.openForm("Create", { title: "", description: "", date: dayObject.format('X')})}>
                                            {
                                                /* подсветка сегодняшнего дня */
                                                isCurrentDay(dayObject) ? (<CurrentDay> {dayObject.format('D')}</CurrentDay>) : dayObject.format('D')
                                            }
                                        </DateStyle>
                                    </ShowDateStyle>
                                    <EventListStyle>
                                        {
                                            /* в ячейке будут отображаться только те задачи, у которых время находится между началом и концом выбранного дня */
                                            this.state.grid_events.filter(event => event.date >= dayObject.format('X') && event.date <= moment(dayObject).endOf("day").format("X"))
                                                .map(event => (<li key = {event.id}>
                                                    {/* редактирование события при двойном клике по событию */}
                                                    <EventItemStyle onDoubleClick = {() => this.state.openForm("Update", event)}>
                                                        {event.title}
                                                    </EventItemStyle>
                                                </li>))
                                        }
                                    </EventListStyle>
                                </CellRowStyle>
                            </CellStyle>
                        ))
                    }
                </GridStyle>
            </div>
        );
    }

}

export { CalendarGrid };
