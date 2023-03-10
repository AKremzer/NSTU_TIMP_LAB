import React from "react";
import {MainDivStyle, TextStyle, ButtonStyle} from "./calendar-title-styles"

/**
 * Классовый компонент CalendarTitle, отвечающий за детальную отрисовку шапки календаря
 *
 * @param today - текущий день, используемый для расчета отображаемых на странице дней
 * @param prevPageHandler - функция для перелистывания календаря на месяц назад
 * @param todayPageHandler - функция для перелистывания календаря на текущий месяц
 * @param nextPageHandler - функция для перелистывания календаря на месяц вперед
 *
 * @returns
 * HTML-элемент CalendarTitle, содержащий шапку календаря
 */
class CalendarTitle extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            today: this.props.today,
            prevPageHandler: this.props.prevPageHandler,
            todayPageHandler: this.props.todayPageHandler,
            nextPageHandler: this.props.nextPageHandler
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.today !== prevState.today) {
            return ({ today: nextProps.today,
                      prevPageHandler: nextProps.prevPageHandler,
                      todayPageHandler: nextProps.todayPageHandler,
                      nextPageHandler: nextProps.nextPageHandler })
        }
        else return null
    }

    render() {
        return (
            <MainDivStyle>
                <div>
                    <TextStyle><b>{this.state.today.format('MMMM')}</b></TextStyle>
                    <TextStyle> {this.state.today.format('YYYY')}</TextStyle>
                </div>
                <div>
                    <ButtonStyle onClick={this.state.prevPageHandler}>&lt;</ButtonStyle>
                    <ButtonStyle onClick={this.state.todayPageHandler}>Today</ButtonStyle>
                    <ButtonStyle onClick={this.state.nextPageHandler}>&gt;</ButtonStyle>
                </div>
            </MainDivStyle>
        );
    }
}

export { CalendarTitle };
