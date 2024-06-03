import Image from 'next/future/image'
import Head from 'next/head';
import clsx from 'clsx';
import telegram from '../images/telegram/telegram.png';
import { Card } from '../components/Card';
import { Container } from '../components/Container';
import {PiInstagramLogo, PiTelegramLogo, PiYoutubeLogo} from 'react-icons/pi';
import image1 from '../images/photos/image-1.jpg';
import image2 from '../images/photos/image-2.jpg';
import image5 from '../images/photos/image-5.jpg';
import image6 from '../images/photos/image-6.jpg';
import image8 from '../images/photos/image-8.jpg';
import { generateRssFeed } from '../lib/generateRssFeed';
import { getAllArticles } from '../lib/getAllArticles';
import { formatDate } from '../lib/formatDate';
import { motion } from 'framer-motion';
import {useEffect, useRef, useState} from "react";
import {SocialLink} from "./about";

function Article({ article }) {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
        >
            <Card as="article">
                <Card.Title href={`/article/${article.slug}`}>
                    {article.title}
                </Card.Title>
                {/*<Card.Eyebrow as="time" dateTime={article.date} decorate>
                    {formatDate(article.date)}
                </Card.Eyebrow>*/}
                <Card.Description>{article.description}</Card.Description>
                <Card.Cta>Читать...</Card.Cta>
            </Card>
        </motion.div>
    );
}


function Newsletter() {

    return (
        <form className="relative flex items-center justify-center">

            <div className="lg:pl-20">
                <ul role="list">
                    <SocialLink
                        href="https://www.instagram.com/eternal_blue_yoga/"
                        icon={PiInstagramLogo}
                        className="mt-8  border-zinc-100 pt-8 dark:border-zinc-700/40"
                    >
                        Подписаться в Instagram
                    </SocialLink>
                    <SocialLink
                        href="https://www.youtube.com/@eternal_blue_yoga"
                        icon={PiYoutubeLogo}
                        className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                    >
                        Посмотреть на YouTube
                    </SocialLink>
                    <SocialLink
                        href="https://t.me/eternal_blue_yoga"
                        icon={PiTelegramLogo}
                        className="mt-8 border-t border-b border-zinc-100 pt-8 pb-8 dark:border-zinc-700/40"
                    >
                        Написать в Телеграм
                    </SocialLink>

                </ul>
            </div>
        </form>
    );
}
function Photos() {
    const images = [image1, image2, image6, image8, image5];
    const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];
    const containerRef = useRef([]);

    useEffect(() => {
        if (containerRef.current.length > 0) {
            containerRef.current.forEach((img) => {
                img.loading = 'eager';
            });
        }
    }, []);

    return (
        <div className="mt-16 sm:mt-20">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {images.map((image, imageIndex) => {
                    const rotationClass = rotations[imageIndex % rotations.length];
                    return (
                        <div
                            key={image.src}
                            ref={(el) => containerRef.current[imageIndex] = el}
                            className={clsx(
                                'relative aspect-[8/10] w-28 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-64 sm:rounded-2xl',
                                rotationClass
                            )}
                        >
                            <picture>
                                <source media="(min-width: 640px)" srcSet={`${image.src} 18rem`} />
                                <img src={image.src} alt="" className="absolute inset-0 h-full w-full object-cover"/>
                            </picture>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default function Home({ articles,ret }) {
    return (
        <>
            <Head>
                <title>Eternal Blue Yoga</title>
                <meta
                    name="description"
                    content="Инструктор Хатха-йоги и путеводитель к глубинам самопознания через физическую практику."
                />
            </Head>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
            >
            <Container className="mt-9">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                        Инструктор Хатха-йоги и путеводитель к глубинам самопознания через физическую практику
                    </h1>
                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        Я Павла, инструктор Хатха-йоги из Москвы. Провожу мастер-классы, ретриты и индивидуальные тренировки, обучая людей искусству Хатха-йоги и подготавливая их к преподавательской деятельности.
                    </p>
                </div>
            </Container>
            <Photos />
            <Container className="mt-24 md:mt-28">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                    <div className="flex flex-col gap-16">
                        {articles.map((article) => (
                            <Article key={article.slug} article={article} />
                        ))}
                    </div>
                    <div className="space-y-10 lg:pl-16 xl:pl-24">
                        <Newsletter />
                    </div>
                </div>
            </Container>
                </motion.div>
        </>
    );
}
export async function getStaticProps() {
    // Генерация RSS-фида
    if (process.env.NODE_ENV === 'production') {
        await generateRssFeed();
    }

    return {
        props: {
            articles: (await getAllArticles()).slice(0, 2).map(({ component, ...meta }) => meta),
        },
    };
}
