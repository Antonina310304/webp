import React, {ReactElement} from 'react';
import styles from './Container.module.scss'

interface ContainerProps {
    children: ReactElement
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className={styles.container}>
            { children }
        </div>
    );
};

export default Container;