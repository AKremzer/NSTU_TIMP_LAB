import styled from "styled-components";

export const CalendarStyle = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px #ccc;
`

// положение формы, в которую записываются события
export const FormPosStyle = styled.div`
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
// стиль формы
export const FormStyle = styled(CalendarStyle)`
  width: 20vw;
  height:18vh;
  background-color: aliceblue;
  box-shadow: unset;
  min-width: 190px;
  min-height: 100px;
`
// записи в календаре
export const EventStyle = styled.input`
  padding: 5px 15px;
  font-size: 85%;
  width: 100%;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #c6c6cc;
  background-color: aliceblue;
  color: #8b8b8f;
`

export const ButtonsWrap = styled.div`
  margin-bottom: 5px;
  margin-left: 1px;
  margin-right: 1px;
  text-align: center;
`

// кнопки внутри формы
export const ButtonsStyle = styled.button`
  justify-items: center;
  outline: none;
  border: none;
  height: 25px;
  background-color: #e5e5eb;
  border-radius: 5px;
  margin-top: 10%;
  padding-right: 10px;
  padding-left: 10px;
  margin-left: 1px;
  margin-right: 1px;
  cursor: pointer;
`
