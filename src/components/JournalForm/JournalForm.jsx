import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer, useRef, useContext } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit, data, onDelete }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const postRef = useRef();
    const { userId } = useContext(UserContext);

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
        if (!data) {
            dispatchForm({ type: "CLEAR" });
            dispatchForm({ type: "SET_VALUE", payload: { userId } });
        }
        dispatchForm({ type: "SET_VALUE", payload: { ...data } });
    }, [data]);

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
            dispatchForm({ type: "SET_VALUE", payload: { userId } });
        }
    }, [isFormReadyToSubmit, values, onSubmit, userId]);

    useEffect(() => {
        dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }, [userId]);

    const onChange = (e) => {
        dispatchForm({
            type: "SET_VALUE",
            payload: { [e.target.name]: e.target.value },
        });
    };

    const addJournalItem = (e) => {
        e.preventDefault();
        dispatchForm({ type: "SUBMIT" });
    };

    const deleteJournalItem = () => {
        onDelete(data.id);
        dispatchForm({ type: "CLEAR" });
        dispatchForm({ type: "SET_VALUE", payload: { userId } });
    };

    return (
        <form className={styles.form} onSubmit={addJournalItem}>
            <div className={styles.form_row}>
                <Input
                    type="text"
                    ref={titleRef}
                    isValid={isValid.title}
                    onChange={onChange}
                    value={values.title}
                    name="title"
                    appearance="title"
                />
                {data?.id && (
                    <button
                        className={styles.delete}
                        type="button"
                        onClick={deleteJournalItem}>
                        <img src="/public/archive.svg" alt="archive" />
                    </button>
                )}
            </div>

            <div className={styles.form_row}>
                <label htmlFor="date" className={styles.label}>
                    <img src="/calendar.svg" alt="calendar" />
                    <span>Дата</span>
                </label>
                <Input
                    type="date"
                    ref={dateRef}
                    isValid={isValid.date}
                    onChange={onChange}
                    value={
                        values.date
                            ? new Date(values.date).toISOString().slice(0, 10)
                            : ""
                    }
                    name="date"
                    id="date"
                />
            </div>

            <div className={styles.form_row}>
                <label htmlFor="tag" className={styles.label}>
                    <img src="/folder.svg" alt="folder" />
                    <span>Метки</span>
                </label>

                <Input
                    type="text"
                    onChange={onChange}
                    isValid={isValid.tag}
                    value={values.tag}
                    name="tag"
                    id="tag"
                />
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
                })}></textarea>
            <Button>Сохранить</Button>
        </form>
    );
}
export default JournalForm;
