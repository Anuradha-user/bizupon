import React from 'react';

const VIDEOS = [
  {
    id: 'gSMdls0k-lE',
    title: 'ОДИН ДЕНЬ В ОТАРУ | Наш новый порт и погрузка | BIZUPON',
  },
  {
    id: 'MTa2YzZnGJg',
    title: 'Как растаможить авто? Самые часто задаваемые вопросы | Интервью с брокером | BIZUPON',
  },
  {
    id: 'cVLVkrgY1L4',
    title: 'Как купить авто из Японии с BIZUPON? | Процесс покупки и наши акции 🚘',
  },
  {
    id: 'dAudv6dfhFg',
    title: 'ИНТЕРВЬЮ С КЛИЕНТОМ. Куда пропадают домкраты?! | BIZUPON',
  },
  {
    id: 'JujIJ0nSeJw',
    title: 'Интервью с логистом BIZUPON',
  },
  {
    id: 'aGBOCjbMwe8',
    title: 'FOB + ФРАХТ всего за 95 000¥ ⁉️🤩 Что такое FOB и ФРАХТ, рассказала наш менеджер Людмила | BIZUPON',
  },
  {
    id: 'xQ0CCbiCK4A',
    title: 'Bizupon х VLegay на WOWFest | Интервью с Виктором, Владивосток , JDM',
  },
  {
    id: '1l62AI2lPyU',
    title: 'Сколько стоит мотоцикл из Японии в 2026? Обзор и цены под ключ | BIZUPON',
  },
  {
    id: '2DdCJg2Ffog',
    title: '🏎️ Фестиваль Формулы 1 в Токио 🇯🇵Fan Festival F1 2026 | BIZUPON',
  },
  {
    id: 'mWQjHBDP_VU',
    title: 'Места в Токио, которые стоит посетить автолюбителю | Autobacs, Lexus кафе, Liberty Walk | BIZUPON',
  },
  {
    id: 'kaEGE2PwZFg',
    title: 'КАКОЙ МОТОЦИКЛ ВЕЗТИ ИЗ ЯПОНИИ? | обзор и цены. BIZUPON',
  },
  {
    id: 'nxcsVSQN5lQ',
    title: 'Секретная парковка в Йокогаме: редкие и дорогие авто?! BIZUPON',
  },
  {
    id: '5QUO1KBoxH8',
    title: 'Первая покупка автомобиля из Японии🇯🇵 BIZUPON',
  },
  {
    id: 'qXCMf1CivLk',
    title: '🚢 НОВЫЙ КОРАБЛЬ: показали новое судно и процесс погрузки автомобилей 🚗 BIZUPON',
  },
  {
    id: 'PzfZL5ubjZ0',
    title: 'Почему с BIZUPON выгоднее? Сравниваем наши тарифы со средним рынком! 🇯🇵🚘',
  },
  {
    id: 'J40zzt8beVU',
    title: 'Кто Возит Авто Из Японии? Разговор с клиентом',
  },
  {
    id: 'Qn7iFSSPpQ8',
    title: 'И СЮДА ЗАЕДЕТ 600 МАШИН❓АВТО ИЗ ЯПОНИ: Погрузка парохода',
  },
];

export default function Videos() {
  return (
    <div className="videos-page-wrapper">
      <div className="container">
        <h1 className="our-videos-heading">Our Videos</h1>

        <div className="videos-grid">
          {VIDEOS.map((video) => ( 
            <div key={video.id} className="video-card">
              <div className="video-responsive-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <h2 className="video-title">{video.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}