import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { calcularFecha } from '../helpers/calcularFecha';
import { useLeap } from '../hooks/useLeap';

export const Form = () => {
    const [errors, setErrors] = useState({
        isValid: true,
        isFilled: true,
        isFuture: false,
    })
    const [isValid, setIsValid] = useState(false);
    const [dateSpent, setDateSpent] = useState({
        totalDays: '--',
        totalMonths: '--',
        totalYears: '--',
    });
    const {day, month, year, formState, onInputChange} = useForm({
        day: '',
        year: '',
        month: ''
    });

    const {isLeapYear} = useLeap(year);

    const monthsWith31Days = ['1', '3', '5', '7', '8', '10', '12'];
    const monthsWith30Days = ['4', '6', '9', '11'];
    const monthsWith28Days = '2';


    const onSubmit = (e) => {
        e.preventDefault();

        if(day === '' || month === '' || year === ''){
            setErrors({
                ...errors,
                isFilled: false,
            })
            return;
        }

        setErrors({
            ...errors,
            isFilled: true,
        })

        if(monthsWith31Days.includes(month) && day > 31 ||
        monthsWith30Days.includes(month) && day > 30 ||
        (month == monthsWith28Days) && (isLeapYear) && (day > 29) ||
        (month == monthsWith28Days) && (!isLeapYear) && (day > 28)) {
            setErrors({
                ...errors,
                isValid: false,
            })
            return;
        }

        setErrors({
            ...errors,
            isFilled: true,
            isValid: true,
        });

        const currentDate = new Date();

        if(year > currentDate.getFullYear() ||
            year >= currentDate.getFullYear() && month > (currentDate.getMonth() + 1) ||
            year >= currentDate.getFullYear() && month >= (currentDate.getMonth() + 1) && day > currentDate.getDate()) {
            setErrors({
                ...errors,
                isFuture: true,
            });
            return;
        }

        setErrors({
            isFilled: true,
            isValid: true,
            isFuture: false,
        });

        setDateSpent(calcularFecha(formState));
    }
    

  return (
    <>
        <form action="submit" className="form" onSubmit={onSubmit}>
            <div className="form__contenedor">
                <div className="header__day">
                    <label htmlFor="day">Day</label>
                    <input className={`${!errors.isFilled || !errors.isValid || errors.isFuture ? 'isError' : ''}`} placeholder='DD' onChange={onInputChange} type="number" id='day' name='day' min={1} max={32} />
                    <p>{!errors.isFilled && 'You must fill all the fields'}</p>
                    <p>{!errors.isValid && 'Date is not valid'}</p>
                    <p>{errors.isFuture && 'Date can not be in the future'}</p>
                </div>
                <div className="header__month">
                    <label htmlFor="month">Month</label>
                    <input className={`${!errors.isFilled || !errors.isValid || errors.isFuture ? 'isError' : ''}`} placeholder='MM' onChange={onInputChange} type="number" id='month' name='month' min={1} max={12} />
                </div>
                <div className="header__year">
                    <label htmlFor="year">Year</label>
                    <input className={`${!errors.isFilled || !errors.isValid || errors.isFuture ? 'isError' : ''}`} placeholder='YYYY' onChange={onInputChange} type="number" id='year' name='year' min={1900} max={2040} />
                </div>
            </div>

            <button type='submit' className="btn__submit"></button>
        </form>
        <hr />

        <div className="form__resultado">
            <h2 className="form__resultado"><span>{dateSpent.totalYears}</span> Years</h2>
            <h2 className="form__resultado"><span>{dateSpent.totalMonths}</span> Months</h2>
            <h2 className="form__resultado"><span>{dateSpent.totalDays}</span> Days</h2>
        </div>
    </>

  )
}
