import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";

function JournalForm({ onSubmit }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const postRef = useRef();

    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.post:
                postRef.current.focus();
                break;
        }
    };

    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.post || !isValid.title) {
            focusError(isValid);
            timerId = setTimeout(() => {
                dispatchForm({ type: "RESET_VALIDITY" });
            }, 2000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isValid]);

    useEffect(() => {
        if (isFormReadyToSubmit) {
            onSubmit(values);
            dispatchForm({ type: "CLEAR" });
        }
    }, [isFormReadyToSubmit, values, onSubmit]);

    const onChange = (e) => {
        dispatchForm({
            type: 'SET_VALUE',
            payload: {
                [e.target.name]: e.target.value
            }
        });
    };

    const addJournalItem = (e) => {
        e.preventDefault();
        dispatchForm({ type: "SUBMIT" });
    };

    return (
        <form className={styles.form} onSubmit={addJournalItem}>
            <div>
                <input
                    type="text"
                    ref={titleRef}
                    onChange={onChange}
                    value={values.title}
                    name="title"
                    className={cn(styles.input_title, {
                        [styles.invalid]: !isValid.title,
                    })}
                />
            </div>

            <div className={styles.form_row}>
                <label htmlFor="date" className={styles.label}>
                    <img src="/calendar.svg" alt="calendar" />
                    <span>Дата</span>
                </label>
                <input
                    type="date"
                    ref={dateRef}
                    onChange={onChange}
                    value={values.date}
                    name="date"
                    id="date"
                    className={cn(styles.input, {
                        [styles.invalid]: !isValid.date,
                    })}
                />
            </div>

            <div className={styles.form_row}>
                <label htmlFor="tag" className={styles.label}>
                    <img src="/folder.svg" alt="folder" />
                    <span>Метки</span>
                </label>

                <input type="text" onChange={onChange} value={values.tag} name="tag" id="tag" className={styles.input} />
            </div>

            <textarea
                name="post"
                id=""
                ref={postRef}
                onChange={onChange}
                value={values.post}
                cols="30"
                rows="10"
                className={cn(styles.input, {
                    [styles.invalid]: !isValid.post,
                })}
            ></textarea>
            <Button text="Сохранить" />
        </form>
    );
}
export default JournalForm;
