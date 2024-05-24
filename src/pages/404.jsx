// pages/404.tsx
import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-8 animate-fadeIn">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-700">404 - Страница не найдена</h1>
                <p className="text-lg text-gray-600">Извините, такой страницы не существует.</p>
            </div>
            <Link href="/">
                <p className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Вернуться на главную
                </p>
            </Link>
        </div>
    );
};

export default Custom404;
