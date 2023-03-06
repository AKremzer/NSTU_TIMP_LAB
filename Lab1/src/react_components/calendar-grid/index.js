import React from "react";
import moment from "moment";
import styled from "styled-components";

/*
______________________
|  day/month/year  x | header
----------------------
| May, 18        <  >| title
----------------------
| 1| 2| 3| 4| 5| 6| 7| grid: сетка календаря (GridStyle)
----------------------
| 8| 9|10|11|12|13|14|
----------------------
|15|16|17|18|19|20|..|
----------------------

---------------------- <- клетка сетки (CellStyle)
|                  27| <- день месяца (DateStyle) 
|           task 1   | <- задачи                  } <- строки ячейки клетки, выделенные под задачи (CellRowStyle)
|           task 2   |                            }
----------------------
*/

// styled-components: https://tproger.ru/articles/styled-components-idealnaja-stilizacija-react-prilozhenija/ 
// обертка для сетки календаря
const GridStyle = styled.div` 
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 1.5px;
    background-color: #c6c6cc;
`

// клетка сетки
// ширина и высота клетки зависят от ширины и высоты окна (5 и 10%)
const CellStyle = styled.div`
    min-width: 5vw;
    min-height: 10vh;
    background-color: ${props => props.isWeekend ? '#dfdfe6' : '#F8F8FF'};
`
// надписи внутри сетки
const CellRowStyle = styled.div`
    display: flex;
    justify-content: flex-end;
`
// выделение текущего дня
const DateStyle = styled.div`
    height: 30%;
    width: 30%;
    display: flex;
    justify-content: center;
`

const CalendarGrid = ({pageFirstDay}) => {
    let startDay = moment(pageFirstDay).subtract(1, "day"); // из первого дня на странице нужно вычесть 1, так как потом в map к первому дню сразу же прибавится 1
    let daysArray = [...Array(42)].map(() => moment(startDay.add(1, "day"))); // в календарной сетке 6 недель и 42 ячейки, с помощью map в каждую ячейку пишем день
    return(                                                                   // на 1 больший предыдущего
        <GridStyle> 
        {
            daysArray.map((dayObject) => (                          
                <CellStyle key={dayObject.format("DDMMYYYY")} 
                           isWeekend={dayObject.day() == 6 || dayObject.day() == 0}>      
                    <CellRowStyle>
                        <DateStyle>
                            {dayObject.format('D')}                 
                        </DateStyle>
                    </CellRowStyle>
                </CellStyle>
            ))
        }
        </GridStyle>
    ); // с помощью map для каждого объекта массива дней вычисляется уникальный ключ для ячейки в виде полной даты, а день форматируется как число дня
};

export { CalendarGrid };