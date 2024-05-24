import { useRouter } from 'next/router';
import Head from 'next/head';
import { eventsData } from '../../data/events'; // Импортируйте данные событий

export default function PurchasePage() {
    const router = useRouter();
    const { id } = router.query;

    // Найдите событие по ID
    const event = eventsData.find(event => event.id === parseInt(id));

    if (!event) {
        return <p>Событие не найдено</p>;
    }

    const handlePayment = () => {
        // Логика обработки оплаты
        alert(`Вы успешно приобрели билет на ${event.title}`);
        router.push('/');
    };

    return (
        <div>
            <Head>
                <title>Purchase {event.title}</title>
                <meta name="description" content={`Purchase ticket for ${event.title}`} />
            </Head>
            <main className="px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
                <h1 className="text-3xl font-semibold text-gray-900 mt-8 mb-4">Оплата за {event.title}</h1>
                <div className="bg-white shadow-md rounded-md p-6">
                    <p className="text-gray-600">{`${event.month} ${event.year}`}</p>
                    <h2 className="text-xl font-semibold text-gray-800 mt-2">{event.title}</h2>
                    <p className="text-gray-600 mt-1">{event.date}</p>
                    <p className="text-gray-600 mt-1">{event.topic}</p>
                    <p className="text-gray-600 mt-1">{`$${event.price}`}</p>
                    <button
                        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                        onClick={handlePayment}
                    >
                        Оплатить
                    </button>
                </div>
            </main>
        </div>
    );
}
