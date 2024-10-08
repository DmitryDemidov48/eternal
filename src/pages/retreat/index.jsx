
import { Card } from '../../components/Card';
import { SimpleLayout } from '../../components/SimpleLayout';
import { getAllRetreats } from '../../lib/getAllRetreats';
import { formatDate } from '../../lib/formatDate';


function Retreats({ article }) {
    return (
        <article className="md:grid md:grid-cols-4 md:items-baseline">
            <Card className="md:col-span-3">
                <Card.Title href={`/retreats/${article.slug}`}>{article.title}</Card.Title>
                <Card.Eyebrow as="time" dateTime={article.date} className="md:hidden" decorate>
                    {formatDate(article.date)}
                </Card.Eyebrow>
                <Card.Description>{article.description}</Card.Description>
                <Card.Cta>Читать...</Card.Cta>
            </Card>
            <Card.Eyebrow as="time" dateTime={article.date} className="mt-1 hidden md:block">
                {formatDate(article.date)}
            </Card.Eyebrow>
        </article>
    );
}
export default function RetreatsIndex({ articles }) {
    return (
        <>
            <SimpleLayout title="" intro="">
                <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                    <div className="flex max-w-3xl flex-col space-y-16">
                        {articles.map((article) => (
                            <Retreats key={article.slug} article={article} />
                        ))}
                    </div>
                </div>
            </SimpleLayout>
        </>
    );
}
export async function getStaticProps() {
    return {
        props: {
            articles: (await getAllRetreats()).map(({ component, ...meta }) => meta),
        },
    };
}
