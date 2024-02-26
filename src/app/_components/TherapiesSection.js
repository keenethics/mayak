import { TopWave } from './TopWave';
import { BottomWave } from './BottomWave';
import { TherapyCard } from './TherapyCard';
import { Heading } from './Typography';

export function TherapiesSection() {
  return (
    <section className="relative bg-primary-200 bg-blend-multiply ">
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/assets/noise.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }}
      ></div>
      <TopWave className="h-3 bg-other-white lg:h-12" />
      <div className="flex flex-col gap-[20px] py-4 lg:gap-12 lg:p-20">
        <div className="flex flex-col items-center justify-center">
          <Heading className="text-center text-p2 font-bold text-primary-800 lg:text-h3">
            Ти заслуговуєш на гарне самопочуття
          </Heading>
          <Heading className="text-p4 font-bold text-primary-600 lg:text-h4">Який тип терапії ти потребуєш?</Heading>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { title: 'Індивідуальна', description: 'для тебе', type: 'individual' },
            { title: 'Для дітей і підлітків', description: 'для найрідніших', type: 'kids' },
            { title: 'Сімейна', description: 'для всієї родини', type: 'family' },
            { title: 'Групова', description: 'для людей з однаковими потребами', type: 'group' },
            { title: 'Для пар', description: 'для тебе і партнера', type: 'pair' },
            { title: 'Для бізнесу', description: 'для співробітників', type: 'business' },
          ].map(card => (
            <TherapyCard key={card.title} {...card} />
          ))}
        </div>
      </div>
      <BottomWave className="h-5 bg-other-white lg:h-12" />
    </section>
  );
}
