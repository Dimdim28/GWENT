# ♠️ Проєкт GWENT

**GWENT** — Веб версія Гвінту з всесвіту **The Witcher**. Також реалізовано PWA з кешуванням аудіо та зображень.

## 📖 Опис
Ми дуже любимо світ Відьмака 3. Кожен з нас провів чимало годин досліджуючи цей прекрасний світ і неймовірну історію, в тому числі граючи у міні-гру «Гвінт».
Гвінт — це карткова гра, створена в рамках всесвіту "Відьмака", що вперше з’явилася у грі The Witcher 3: Wild Hunt від CD Projekt RED. Гравці змагаються на полі бою, використовуючи колоди карт, що представляють різні фракції та персонажів: Королівства Півночі, Нільфгард, Чудовиська, Скоя’таелі та Синдикат. Основна мета — виграти два з трьох раундів, набравши більше очок сили, ніж суперник, завдяки тактиці, особливим здібностям карт і вдалим комбінаціям.
Ми вирішили написати свою більш просту реалізацію цієї гри, в яку можна грати не витрачаючи велику кількість часу на дослідження карт і їх здібностей.

## 💣 Геймплей
1. Гравець може вибрати одну із 5 фракцій: Королівства Півночі, Нільфгард, Чудовиська, Ельфи і Скеліге.
2. На столі знаходяться 2 гравці. Кожен отримує по 8 карт. Право першого ходу надається випадковим чином: той хто ходить першим отримує 10 монет, суперник – 15.
3. Кожна карта має 2 характеристики – атака/хп і ціна. Коли гравець атакує своєю картою карту противника, у другої знімається хп відповідно до кількості атаки першої. Перша карта при атаці шкоди не отримує. Друга карта тепер має атаку відповідно до кількості хп що залишилася. Якщо у карти закінчується хп, то вона руйнується.
4. Гравці ходять по черзі. На своєму ході гравець може ходити картами із руки використовуючи монети, а також атакувати картами які вже були на столі на початок даного раунду. Карти які були викинуті в даному раунді атакувати не можуть.
5. Виграє той, хто першим знищить усі карти суперника.

## 🛠️ Стек технологій

- **React 18** — бібліотека для створення інтерфейсів користувача
- **TypeScript** — для типізації та підвищення якості коду
- **Vite** — швидке збирання та дев-сервер
- **Zustand** — управління станом
- **Husky** — автоматизація pre-commit хуків
- **ESLint та Prettier** — для дотримання стандартів коду та форматування
- **Sass** — для стилізації компонентів, використовуються SCSS модулі

## 📦 Встановлення та запуск

### Клонування репозиторію
```bash
git clone https://github.com/Dimdim28/GWENT.git
cd gwent
```

### Встановлення залежностей
```bash
npm i
```

### Запуск додатку
```bash
npm run dev
```

### Запуск лінтингу
```bash
npm run lint
```

### Запуск виправлення помилок
```bash
npm run lint:js:fix
```

## 📚 Деплой

[Посилання на задеплоєний сайт](https://gwent-app.vercel.app/)

## 🔥 PWA
Коли відкриєте задеплоєний сайт, можете натиснути справа від пошукової стрічки на кнопку **Встановити як додаток**

![image](https://github.com/user-attachments/assets/18561f15-34e8-4087-92ee-2a80461f4ea4)

Після чого натискаєте кнопку **Підтвердити**

![image](https://github.com/user-attachments/assets/c1c0b108-8241-4a4c-8265-a49e45cc9cad)

І можете запускати додаток зі свого пристрою не відкриваючи браузер

![image](https://github.com/user-attachments/assets/c259a3dc-fa39-4df1-9ad0-5c50251b2b29)




