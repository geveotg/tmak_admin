import classes from './style/errorMessage.module.scss';

export default function ErrorMessage({message}) {

    return (
        <div className={classes[message.text ? 'message-open' : 'message-close']}>
            <span className={classes[message.type ? 'success-text' : 'error-text']}>{message.text}</span>
        </div>
    );
}