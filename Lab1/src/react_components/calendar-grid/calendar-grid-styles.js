import styled from "styled-components";

export const GridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  //grid-template-rows: repeat(6, 1fr);
  grid-gap: 1.5px;
  background-color: ${props => props.isHeader ? 'F8F8FF' : '#c6c6cc' };
  ${props => props.isHeader && 'border-bottom: 1px solid #c6c6cc'}
`

// клетка сетки
// ширина и высота клетки зависят от ширины и высоты окна (12 и 11%)
export const CellStyle = styled.div`
  min-width: 12vw;
  min-height: ${props => props.isHeader ? 2 : 11 }vh;
  background-color: ${props => props.isWeekend ? '#dfdfe6' : '#F8F8FF'};
`
// надписи внутри сетки
export const CellRowStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
// выделение текущего дня
export const DateStyle = styled.div`
  height: 30%;
  width: 30%;
  display: flex;
  cursor: pointer;
  justify-content: center;
  matgin: 2px;
`

// отображение дня в правом углу
export const ShowDateStyle = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: flex-end;
`

// отображение списка задач (ul - неупорядоченный список)
export const EventListStyle = styled.ul`
  margin: 0;
  list-style-position: inside;
  padding-left: 5%;
`

// отображение отдельных задач (button, т.к. при нажатии на задачу нужно ее редактировать)
export const EventItemStyle = styled.button`
  position: relative;
  left: -10px;
  overflow: hidden;
  border: 0;
  background: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
  text-align: left;
`
//отображение текущего дня
export const CurrentDay = styled.div`
  border-radius: 50%;
  background: cadetblue;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 5vh;
  width: 5vh;
`