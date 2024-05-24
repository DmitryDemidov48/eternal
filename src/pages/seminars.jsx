import Link from 'next/link';
import { useState } from 'react';
import {Container} from "../components/Container";

const NoContentPage = () => {

    return (
        <Container className="mt-24 md:mt-28">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">Контент временно недоступен</h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">Мы работаем над добавлением контента. Пожалуйста, вернитесь позже.</p>
        </Container>
    );
};

export default NoContentPage;
