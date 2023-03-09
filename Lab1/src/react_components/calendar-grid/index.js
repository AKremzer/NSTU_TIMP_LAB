import React from "react";
import moment from "moment";
import {GridStyle, DateStyle, ShowDateStyle, CellStyle,
        CellRowStyle, EventListStyle, EventItemStyle, CurrentDay} from "./calendar-grid-styles"

//функция что день реально сегодняшний, отображение корректной даты
const isCurrentDay = (day) => moment().isSame(day, 'day') ;

const CalendarGrid = ({pageFirstDay, grid_events, openForm}) => {
    let startDay = pageFirstDay.clone().subtract(1, "day");
    let daysArray = [...Array(42)].map(() => moment(startDay.add(1, "day"))); // в календарной сетке 6 недель и 42 ячейки, с помощью map в каждую ячейку
    // пишем день на 1 больший предыдущего


    return(
        //фрагмент рендерит пропсы
        <>
            <GridStyle isHeader>
                {[...Array(7)].map((_,i) =>  (
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
                        <CellStyle key={dayObject.format("DDMMYYYY")} isWeekend={dayObject.day() == 6 || dayObject.day() == 0}
                                   key = {dayObject.unix()}
                        >
                            <CellRowStyle>
                                <ShowDateStyle>
                                    <DateStyle onDoubleClick =  {() => openForm("Create", { title: "", description: "", date: dayObject.format('X')})}>
                                        {!isCurrentDay(dayObject) && dayObject.format('D')}
                                        {isCurrentDay(dayObject) && <CurrentDay> {dayObject.format('D')}</CurrentDay>}
                                    </DateStyle>
                                </ShowDateStyle>
                                <EventListStyle>
                                    {
                                        /* к строке ниже: в ячейке будут отображаться только те задачи, у которых время находится между началом и концом выбранного дня */
                                        grid_events.filter(event => event.date >= dayObject.format('X') && event.date <= moment(dayObject).endOf("day").format("X"))
                                            .map(event => (<li key = {event.id}>
                                                <EventItemStyle onDoubleClick = {() => openForm("Update", event)}>
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
        </>
    );
}

export { CalendarGrid };
