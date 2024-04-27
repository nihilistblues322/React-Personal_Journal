import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";



function JournalForm({ onSubmit }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;

    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.post || !isValid.title) {
            setTimeout(() => {
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
        }
    }, [isFormReadyToSubmit]);

    const addJournalItem = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        dispatchForm({ type: "SUBMIT", payload: formProps });

    };

    return (
        <form className={styles.form} onSubmit={addJournalItem}>
            <div>
                <input
                    type="text"
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

                <input type="text" name="tag" id="tag" className={styles.input} />
            </div>

            <textarea
                name="post"
                id=""
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
