import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const districts = ['Личаківський', 'Шевченківський', 'Франківський', 'Залізничний', 'Галицький', 'Сихівський'].map(
  name => ({ name }),
);

const specializations = ['Психотерапевт', 'Психолог', 'Психіатр', 'Сексолог', 'Соціальний працівник'].map(name => ({
  name,
}));

const organizationTypes = ['Психологічний центр', 'Соціальна служба', 'Лікарня'].map(name => ({ name }));

const psychotherapyMethods = [
  {
    title: 'Арт-терапія',
    description:
      'Арт-терапія - використання творчості в психотерапії. Фокус на процесі, не на результаті. Допомагає виявити емоції та підвищити самосвідомість',
  },
  {
    title: 'Гештальт терапія',
    description:
      'Гештальт-терапія - це метод, де психолог фокусується на потребах клієнта. Вміє слухати, спостерігати, ділитися власними почуттями.',
  },
  {
    title: 'Десенсибілізація та репроцесуалізація рухом очей (EMDR)',
    description: 'EMDR - спеціальна травматерапія, що поєднує рухи очей зі спогадами про травму.',
  },
  {
    title: 'Діалектично-поведінкова терапія',
    description:
      'Діалектично-поведінкова терапія - комплексна система КПТ, що працює з важкими особистісними розладами.',
  },
  {
    title: 'Емоційно фокусована терапія',
    description:
      'Емоційно фокусована терапія - це метод, який допомагає розбиратися у власних почуттях та вміти краще розуміти, як вони впливають на наші стосунки та наше життя.',
  },
  {
    title: 'Інтерперсональна терапія (ІРТ)',
    description:
      'ІПТ - допомагає розбиратися у відносинах з іншими та поліпшувати якість спілкування. Цей підхід спрямований на розвиток навичок ефективної комунікації та вирішення конфліктів.',
  },
  {
    title: 'Когнітивно-поведінкова терапія',
    description:
      'Когнітивно-поведінкова терапія не тільки лікує психічні розлади, але й вчить керувати стресом. Вона ефективна і структурована, зазвичай потребує менше сеансів.',
  },
  {
    title: 'Клієнт-центрована терапія / особистісно-центрована терапія',
    description:
      'Клієнт-центрована терапія - ставить акцент на взаємовідносинах клієнта та психотерапевта, створюючи атмосферу довіри.',
  },
  {
    title: 'Логотерапія та екзистенційна терапія',
    description:
      'Екзистенційна терапія пропонує відмінну від позитивної психології перспективу, розглядаючи глибокі питання про сенс життя. Логотерапія, в свою чергу, ґрунтується на концепціях свободи, волі до сенсу та сенсі життя.',
  },
  {
    title: 'Майндфулнес-базований для підхід',
    description:
      'Майндфулнес-базований підхід поєднує когнітивно-поведінкову терапію з медитаційними практиками для зменшення стресу та профілактики депресії.',
  },
  {
    title: 'Мотиваційна терапія',
    description:
      'Мотиваційна терапія (MET) використовує стратегії для підвищення бажання клієнта змінювати свою поведінку, особливо для тих, хто виявляє амбівалентність або сумніви стосовно змін.',
  },
  {
    title: 'Наративна терапія',
    description:
      'Наративна терапія допомагає клієнтам розуміти, як їхні історії формують їхнє сприйняття себе і світу. Вона використовує записи та завдання, щоб допомогти клієнтам переписати свої життєві наративи та переосмислити їх.',
  },
  {
    title: 'Нейро-лінгвістична психотерапія',
    description:
      'Нейро-лінгвістична психотерапія використовує мову і сигнали тіла для зміни поведінки та досягнення особистісного розвитку',
  },
  {
    title: 'Позитивна психотерапія',
    description:
      'Позитивна психотерапія - фокус на ресурсах, цілісності особистості та реальності, вчить приймати як позитивні сторони, так і життєві виклики',
  },
  {
    title: 'Психодинамічний підхід',
    description:
      "Его, несвідоме, Фройд - це про психодинамічний підхід. Розв'язання внутрішніх конфліктів, виявлення несвідомих патернів поведінки та її мотивів для особистісного зростання",
  },
  {
    title: 'Психодраматична терапія (= Психодрама)',
    description:
      "Психодраматична терапія використовує театралізацію та рольову гру для для вираження та розв'язання психічних конфліктів та проблем.",
  },
  {
    title: 'Символдрама / Кататимно-імагінативна психотерапія',
    description:
      'Символдрама - чуттєве переживання образів за допомогою уяви. Образи допомагають представити внутрішній світ клієнта у всій його повноті та прожити неусвідомлені конфлікти та реакції.',
  },
  {
    title: 'Системна сімейна психотерапія',
    description:
      'Системна сімейна психотерапія фокусується на звʼязках та динаміці системи сімʼї для розвʼязання проблем та покращення спілкування. Зміна в 1 елементі призводить до змін у всій системі',
  },
  {
    title: 'Схема терапія',
    description: 'Схема терапія - модифікація КПТ, яка працює не лише на поведінковому, а й на особистісному рівні.',
  },
  {
    title: 'Танце-рухова терапія',
    description:
      'Танце-рухова терапія використовує рухи та музику для вираження та обробки емоційних та психологічних проблем. Це альтернативний шлях до розмови',
  },
  {
    title: 'Терапія базована на менталізації',
    description:
      'Терапія базована на менталізації сконцентрована на розвитку вміння розуміти причинно-наслідкові звʼязки та фізичну реальність довкола, а також співпереживати емоції та думки інших',
  },
  {
    title: 'Терапія прийняття та зобов’язання (ACT)',
    description:
      'АСТ - зосередження на цінностях, прийнятті емоцій та дійсності як вона є, а також відповідальності за зміни для покращення життя. Головна мета - оптимізувати внутрішній потенціал.',
  },
  {
    title: 'Транзакційний аналіз',
    description:
      'Транзакційний аналіз розглядає поведінку людини через взаємодію її Его-станів: Дитини, Батьків та Дорослого, тому мета - навчити свідомо керувати та утримувати баланс між ними.',
  },
  {
    title: 'Короткотермінова терапія зосереджена на рішенні (BSFT)',
    description:
      'BSFT - акцент на вирішенні конкретних проблем, актуалізації ресурсів. Фокус завжди спрямований на мету, а не на проблеми довкола',
  },
  {
    title: 'Інші',
  },
];

const psychologyMethods = [
  {
    title: 'Клінічна психологія',
    description:
      'Фахівець з діагностики та корекції психічних порушень, працює з особами з соматичними (тілесними) хворобами, психічними розладами, а також зі здоровими людьми.',
  },
  {
    title: 'Психологія управління',
    description:
      'Фахівець з вирішення складних управлінських завдань. Розуміє закономірності людської взаємодії та застосовує психологічні знання у професійній управлінській діяльності.',
  },
  {
    title: 'Педагогічна психологія',
    description:
      'Фахівець з діагностики, корекції та розвитку якостей здобувачів освіти. Розуміє вікові особливості дітей, навчально-виховного процесу та педагогічного впливу.',
  },
  {
    title: 'Практична психологія',
    description:
      'Фахівець з психологічного супроводу особистості, психологічної допомоги, психодіагностики та психокорекції, володіють компетентностями для комплексного вирішення психологічних проблем.',
  },
  {
    title: 'Коуч',
    description:
      'Фахівець з розкриття внутрішнього потенціалу клієнта, що сприяє глибокому усвідомленню ситуації та досягненню поставлених цілей.',
  },
  {
    title: 'Військова психологія',
    description:
      "Фахівець з надання допомоги військовослужбовцям та їх сім'ям, вирішує психологічні проблеми, підвищує психологічну стійкість та адаптацію у військовому середовищі.",
  },
  {
    title: 'Сімейна психологія',
    description:
      "Фахівець з розв'язання конфліктів, покращення взаємин та комунікації в родині, надає підтримку у сімейних труднощах та кризах.",
  },
  {
    title: 'Шкільна психологія',
    description:
      'Фахівець з психологічної підтримки учням та педагогам, допомагає вирішувати проблеми навчання, адаптації та соціальної взаємодії в навчальному середовищі.',
  },
  {
    title: 'Соціальна психологія',
    description:
      'Фахівець, який досліджує вплив соціальних факторів на поведінку та сприяє розумінню групової динаміки, стереотипів та міжособистісних відносин тощо.',
  },
  {
    title: 'Юридична психологія',
    description:
      'Фахівець, який займається супроводом та підтримкою взаємовідносин учасників юридичних процесів, надає консультації щодо психологічних аспектів судових справ.',
  },
  {
    title: 'Медична психологія',
    description:
      'Лікар-психолог, який займається психодіагностикою, лікуванням осіб з соматичними та психічними захворюваннями, профілактикою серед груп ризику та психологічною реабілітацією.',
  },
  {
    title: 'Політична психологія',
    description:
      'Фахівець з дослідження психологічних аспектів політичної поведінки та процесів, включаючи вплив масових настроїв, переконань та лідерства на політичні рішення та події.',
  },
  {
    title: 'Корекційна психологія',
    description: 'Фахівець, який спеціалізується на виявленні та корекції психологічних недоліків.',
  },
  {
    title: 'Інше',
  },
];
// specializations.push(
//   {
//     name: 'Психолог',
//     methods: {
//       connectOrCreate: psychologyMethods.map(method => {
//         const { title, description } = method;
//         return {
//           where: { title },
//           create: { title, description },
//         };
//       }),
//     },
//   },
//   {
//     name: 'Психотерапевт',
//     methods: {
//       connectOrCreate: psychotherapyMethods.map(method => {
//         const { title, description } = method;
//         return {
//           where: { title },
//           create: { title, description },
//         };
//       }),
//     },
//   },
// );
const therapies = [
  {
    isActive: true,
    type: 'individual',
    title: 'Індивідуальна',
    description: 'для тебе',
    imagePath: '/assets/images/therapy_individual.svg',
    priority: 6,
  },
  {
    isActive: true,
    type: 'kids',
    title: 'Для дітей і підлітків',
    description: 'для найрідніших',
    imagePath: '/assets/images/therapy_kids.svg',
    priority: 5,
  },
  {
    isActive: true,
    type: 'family',
    title: 'Сімейна',
    description: 'для всієї родини',
    imagePath: '/assets/images/therapy_family.svg',
    priority: 4,
  },
  {
    isActive: true,
    type: 'group',
    title: 'Групова',
    description: 'для людей з однаковими потребами',
    imagePath: '/assets/images/therapy_group.svg',
    priority: 3,
  },
  {
    isActive: true,
    type: 'pair',
    title: 'Для пар',
    description: 'для тебе і партнера',
    imagePath: '/assets/images/therapy_pair.svg',
    priority: 2,
  },
  {
    isActive: true,
    type: 'business',
    title: 'Для бізнесу',
    description: 'для співробітників',
    imagePath: '/assets/images/therapy_business.svg',
    priority: 1,
  },
];

async function createIfNotExist(model, data, filter) {
  // eslint-disable-next-line no-restricted-syntax
  for (const it of data) {
    // eslint-disable-next-line no-await-in-loop
    await model.upsert({ where: filter(it), create: it, update: {} });
  }
}

async function main() {
  await createIfNotExist(prisma.therapy, therapies, therapy => ({ type: therapy.type }));
  await createIfNotExist(prisma.district, districts, district => ({ name: district.name }));
  await createIfNotExist(prisma.specialization, specializations, specialization => ({ name: specialization.name }));
  await createIfNotExist(prisma.organizationType, organizationTypes, organizationType => ({
    name: organizationType.name,
  }));
  await createIfNotExist(
    prisma.method,
    psychotherapyMethods
      .map(method => ({ ...method, specialization: { connect: { name: 'Психотерапевт' } } }))
      .concat(psychologyMethods.map(method => ({ ...method, specialization: { connect: { name: 'Психолог' } } }))),
    method => ({ title: method.title }),
  );
}

main().then(
  async () => {
    await prisma.$disconnect();
  },
  async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  },
);
