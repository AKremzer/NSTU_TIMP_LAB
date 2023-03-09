import React from "react";
import {MainDivStyle, TextStyle, ButtonStyle} from "./calendar-title-styles"

/**
 * Функциональный компонент CalendarTitle, отвечающий за детальную отрисовку шапки календаря
 *
 * @param today - текущий день, используемый для расчета отображаемых на странице дней
 * @param prevPageHandler - функция для перелистывания календаря на месяц назад
 * @param todayPageHandler - функция для перелистывания календаря на текущий месяц
 * @param nextPageHandler - функция для перелистывания календаря на месяц вперед
 *
 * @returns
 * HTML-элемент CalendarTitle, содержащий шапку календаря
 */
const CalendarTitle = ({ today, prevPageHandler, todayPageHandler, nextPageHandler }) => {
    return(
        <MainDivStyle>
            <div>
                <TextStyle><b>{today.format('MMMM')}</b></TextStyle>
                <TextStyle> {today.format('YYYY')}</TextStyle>
            </div>
            <div>
                <ButtonStyle onClick={prevPageHandler}>&lt;</ButtonStyle>
                <ButtonStyle onClick={todayPageHandler}>Today</ButtonStyle>
                <ButtonStyle onClick={nextPageHandler}>&gt;</ButtonStyle>
            </div>
        </MainDivStyle>
    );
};

export { CalendarTitle };
