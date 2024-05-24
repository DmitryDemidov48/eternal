import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { formatDate } from '../lib/formatDate';
import React from 'react';
import { Container } from '../components/Container';
import { generateRssFeed } from '../lib/generateRssFeed';
import { getAllArticles } from '../lib/getAllArticles';

function Article({ article }) {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
        >
            <Card as="article" >
                <Card.Title href={`/article/${article.slug}`}>
                    {article.title}
                </Card.Title>
                <Card.Eyebrow as="time" dateTime={article.date} decorate>
                    {formatDate(article.date)}
                </Card.Eyebrow>
                <Card.Description>{article.description}</Card.Description>
                <Card.Cta>Читать...</Card.Cta>
            </Card>
        </motion.div>
    );
}

const Articles = ({ articles }) => {
    return (
        <>
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}>
            <Container className="mt-24 md:mt-28 ">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 ">
                    <div className="flex flex-col gap-16">
                        {articles.map((article) => (
                            <Article key={article.slug} article={article} />
                        ))}
                    </div>
                </div>
            </Container>
            </motion.div>
        </>
    );
};

export default Articles;

export async function getStaticProps() {
    if (process.env.NODE_ENV === 'production') {
        await generateRssFeed();
    }
    return {
        props: {
            articles: (await getAllArticles())
                .slice(0, 4)
                .map(({ component, ...meta }) => meta),
        },
    };
}
