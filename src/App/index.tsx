import React from 'react';
import Container from "../Container";

import styles from './App.module.scss'
import images from "./h-2.jpg";

const App = () => {
    return (
        <Container>
            <>
                <img className={styles.imgWrapper} src={images} alt=""/>
                <p>я сайт с живой перезагрузкой</p>
            </>

        </Container>
    );
};

export default App;