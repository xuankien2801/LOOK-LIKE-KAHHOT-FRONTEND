import styles from "./MyButton.css"

function MyButton(props)
{
    let myClassName = `${styles.MyButton} ${props.className}`;

    //size detect
    switch(props.size){
        case 'small':
            myClassName += ` ${styles.small}`;
            break;
        case 'medium':
            myClassName += ` ${styles.medium}`;
            break;
        default:
            myClassName += ` ${styles.small}`;
            break;
    } 

    //color detect
    switch(props.color){
        case 'black':
            myClassName += ` ${styles.black}`;
            break;
        case 'green':
            myClassName += ` ${styles.green}`;
            break;
        case 'blue':
            myClassName += ` ${styles.blue}`;
            break;
        case 'red':
            myClassName += ` ${styles.red}`;
            break;
        case 'yellow':
            myClassName += ` ${styles.yellow}`;
            break;
        default:
            myClassName += ` ${styles.black}`;
    }
    return (
        <div className={myClassName}>
            <p>{props.text}</p>
        </div>
    )
}

export default MyButton