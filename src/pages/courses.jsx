import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { eventsData } from '../data/events';
import icon from '../images/mandala.png';
import { Container } from "../components/Container";
import Image from "next/image";
import { motion } from 'framer-motion';

export default function EventsPage() {
    const [events, setEvents] = useState(eventsData);
    const [darkMode, setDarkMode] = useState(false);
    const [purchaseEnabled, setPurchaseEnabled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setDarkMode(mediaQuery.matches);
        const handler = (e) => setDarkMode(e.matches);
        mediaQuery.addListener(handler);
        return () => mediaQuery.removeListener(handler);
    }, []);

    const handlePurchase = (event) => {
        if (purchaseEnabled) {
            router.push(`/purchase/${event.id}`);
        }
    };

    return (
<>
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}>
        <Container className="mt-24 md:mt-28">

            <Head>
                <title>Events</title>
                <meta name="description" content="List of upcoming events" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">Куры по Йоге</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(event => (
                        <div key={event.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col justify-between h-80">
                            <div>
                                <h2 className="text-1xl text-center font-semibold text-gray-900 dark:text-gray-100 mt-5">{event.title}</h2>
                                <div className="flex justify-center items-center mt-8">
                                    <Image
                                        src={icon}
                                        alt={event.title}
                                        className='rounded-lg w-24 h-24 filter-none dark:filter invert'
                                    />
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mt-4">{event.description}</p>
                            </div>
                            <div className="flex justify-center mt-auto">
                                <button
                                    className={`mt-4 py-2 px-6 rounded-md transition duration-200 ${purchaseEnabled ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500' : 'bg-gray-400 text-gray-700 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed'}`}
                                    onClick={() => handlePurchase(event)}
                                    disabled={!purchaseEnabled}
                                >
                                    Приобрести
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

        </Container>
</motion.div>
</>
    );
}
