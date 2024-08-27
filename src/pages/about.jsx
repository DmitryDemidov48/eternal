import { motion } from 'framer-motion';
import Image from 'next/future/image';
import Link from 'next/link';
import clsx from 'clsx';
import { Container } from '../components/Container';
import portraitImage from '../images/portrait.jpg';


export function SocialLink({ className, href, children, icon: Icon }) {
  return (
      <motion.li
          className={clsx(className, 'flex')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
            href={href}
            className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
        >
          <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
          <span className="ml-4">{children}</span>
        </Link>
      </motion.li>
  );
}

function MailIcon(props) {
  return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path
            fillRule="evenodd"
            d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
        />
      </svg>
  );
}

export default function About() {
  return (
      <Container className="mt-16 sm:mt-32">
        <motion.div
            className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                  src={portraitImage}
                  alt="portraitImage"
                  sizes="(min-width: 1024px) 32rem, 20rem"
                  className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                  priority
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1
                className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"

            >
              Я Павла Демидова живу в Москве и преподаю хатха-йогу
            </h1>
            <div
                className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400"

            >
              <p>
                Изучение йоги началось в 2012 году, буквально через пару месяцев регулярных занятий, я впервые отправилась в путешествие в Индию, и это был настолько яркий опыт, что казалось не я выбрала йогу, а она меня. К моменту начала увлечения йогой у меня уже был спортивный опыт и пройденное обучение на фитнес тренера, это позволило сразу начать попытки в преподавании классов по Хатха-йоге в фитнес клубах, в которых приходилось работать.
              </p>
              <p>
                Увлечение быстро переросло в страсть, благодаря которой я окунулась в мир йоги. Многочисленные семинары, фестивали, курсы для преподавателей – я отовсюду жадно черпала знания, ходила к разным инструкторам, экспериментировала с направлениями, читала книги индийских и западных учителей. В 2016 году поступила в аспирантуру РГКФКСМиТ, и успешно окончила её в 2019 году со специальностью преподаватель-исследователь, диссертация и исследование были посвящены хатха-йоге.
              </p>
              <p>
                Поворотным стал 2018 год, когда я с отличием окончила курс подготовки преподавателей Михаила Баранова и Ильи Журавлева, создателей проекта Йога 108 Они сразу же позвали меня работать в центр на Китай-городе, где под руководством старших преподавателей, ведение классов стало полноценной профессией. Всегда с теплотой вспоминаю это время. Первые попытки ведения семинаров по хатха-йоге начались ещё в 2018-2019 годах, но окончательно оформились в 2020 году в профессиональное преподавание мастер-классов и лекций.
              </p>
              <p>
                Примерно тогда же я начала организовывать йога-ретриты и выездные семинары. Начиная с 2020 года обучаю преподавателей йоги в проекте школы Йога 108, с 2022 года веду методологию на курсе подготовки преподавателей в Московской школе йоги. Помимо хатха-йоги увлекаюсь изучением психологии, системных семейных расстановок, шаманизма, ароматов и трав. Искренне люблю свою профессию, и делюсь полученными знаниями. Рада вам! Намасте!
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                  href="mailto:108pavlabykova@mail.ru"
                  icon={MailIcon}
                  className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                108pavlabykova@mail.ru
              </SocialLink>
            </ul>
          </div>
        </motion.div>
      </Container>
  );
}
