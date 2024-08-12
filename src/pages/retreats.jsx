import Head from 'next/head';
import Image from 'next/future/image'
import { Card } from "../components/Card";
import { SimpleLayout } from "../components/SimpleLayout";
import { formatDate } from "../lib/formatDate";
import { generateRssFeed } from "../lib/generateRssFeed";
import { getAllRetreats } from "../lib/getAllRetreats";
import { Container } from "../components/Container";
import CountdownTimer from "../components/CountdownTimer";
import photo_2 from '../images/retreats/india/photo_2.jpg'
import photo_3 from '../images/retreats/india/photo_3.jpg'
import photo_4 from '../images/retreats/india/photo_4.jpg'
import photo_5 from '../images/retreats/india/photo_5.jpg'
import photo_6 from '../images/retreats/india/photo_6.jpg'
import photo_11 from '../images/retreats/india/photo_11.jpg'
import turkey from "../images/retreats/turkey.png";
import clsx from "clsx";
import { motion,AnimatePresence } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useEffect, useRef, useState} from "react";
function Photos() {
    const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];
    const imagesRef = useRef([]);

    useEffect(() => {
        imagesRef.current.forEach((image) => {
            if (image && image.complete) {
                return;
            }
            image.addEventListener('load', handleImageLoad);
        });

        return () => {
            imagesRef.current.forEach((image) => {
                if (image) {
                    image.removeEventListener('load', handleImageLoad);
                }
            });
        };
    }, []);

    const handleImageLoad = () => {
        // Здесь можно выполнить какие-либо дополнительные действия после загрузки изображения
    };

    return (
        <div className="mt-16 sm:mt-14 pb-12">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {[photo_2, photo_3, photo_4, photo_5, photo_6, photo_11].map((image, imageIndex) => (
                    <div
                        key={image.src}
                        className={clsx(
                            'relative aspect-[8/10] w-20 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-52 sm:rounded-2xl ',
                            rotations[imageIndex % rotations.length]
                        )}

                    >
                        <Image
                            src={image}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            priority
                            ref={(el) => (imagesRef.current[imageIndex] = el)}
                            loading="eager"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function Retreats({ article }) {
    return (
        <div className="flex ">
            <Card as="article" className="flex-1 mr-14">
                <Card.Title href={`/retreat/${article.slug}`}>
                    {article.title}
                </Card.Title>
                {/*<Card.Eyebrow as="time" dateTime={article.date} decorate>
                    {formatDate(article.date)}
                </Card.Eyebrow>*/}
                <Card.Description>{article.description}</Card.Description>
                <Card.Cta>Читать...</Card.Cta>
            </Card>

        </div>
    );
}




export function BlogPost({ title, date, description, content }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
        >
            <Card as="article">
                <Card.Title as="h3" onClick={toggleExpanded}>
                    {date} {title}
                </Card.Title>
                <Card.Description>{description}</Card.Description>
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            key="content"
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <Card.Description>{content}</Card.Description>
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.button
                    className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
                    onClick={toggleExpanded}
                    whileTap={{ scale: 0.95 }}
                    style={{ position: 'absolute', bottom: -40 }}
                >
                    {expanded ? 'Закрыть' : 'Читать...'}
                </motion.button>
            </Card>
        </motion.div>
    );
}
export default function Retreat({ articles }) {
    const targetDate = new Date('2024-10-15');
    return (
        <>
            <Head>
                <title>Ретрит </title>
            </Head>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}>
            <div className='flex flex-col items-center'>
            <SimpleLayout  title="Предстоящие ретриты " intro="" >
                <h1 className="text-3xl font-bold text-zinc-600  text-center dark:text-zinc-400 ">До завершения записи осталось</h1>
            </SimpleLayout>
               <CountdownTimer targetDate={targetDate} />
            </div>
            <Container className="mt-24 md:mt-28">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2 items-center  ">
                    <div className="flex flex-col gap-6 ml-4 ">
                        <motion.div
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                        {articles.map((article) => (
                            <Retreats key={article.slug} article={article} />
                        ))}
                            </motion.div>
                    </div>
                    <Image
                        src={turkey}
                        alt=""
                        sizes="(min-width: 640px) 32rem, 100vw"
                        className="aspect-square rounded-xl object-cover ml-auto h-72 w-100 mobile-width"
                        priority
                    />

                </div>
            </Container>
           <Photos/>
            <Container>
                    <BlogPost

                        title="Мы с радостью делимся впечатлениями о недавно завершившемся ретрите в прекрасном городе Ришикеш."
                        date=""
                        description="  Это было незабываемое путешествие к гармонии тела и ума в окружении великолепной природы.
                Участники ретрита наслаждались мирными утрами с медитацией и йогой на свежем воздухе, окруженные величественными горами и зелеными лесами. Днем нас ждали увлекательные практики йоги, вдохновляющие лекции о здоровом образе жизни и гармонии с собой и окружающим миром.
                Время проведенное в Решикеше наполнилось целебной энергией реки Ганга, которая протекает в этом священном месте."
                        cta="Читать..."
                        content="  Участники ретрита имели возможность окунуться в духовные практики и обогатиться знаниями о мудрости восточных учений.
                Вечером мы собирались вместе для обмена впечатлениями и наслаждения восхитительными блюдами местной кухни. Звуки природы и мантры создавали атмосферу спокойствия и внутреннего покоя, который так ценен в наше быстро меняющееся время.
                Каждый участник ретрита унес с собой не только новые знания и навыки, но и глубокие впечатления и дружеские связи, которые будут сопровождать их в их духовном пути.
                С нетерпением ждем следующего встречи в Решикеше, чтобы продолжить наше стремление к гармонии и внутреннему развитию."
            />

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
            articles: (await getAllRetreats()).slice(0, 4).map(({ component, ...meta }) => meta),
        },
    };
}
