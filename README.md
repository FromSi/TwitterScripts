# О репозитории
![](https://img.shields.io/github/forks/FromSi/TwitterScripts.svg?style=social) ![](https://img.shields.io/github/repo-size/FromSi/TwitterScripts.svg?style=flat) ![](https://img.shields.io/github/languages/top/FromSi/TwitterScripts.svg?style=flat)

Когда-то я делал эксперименты над Twitter. Данные скрипты запускаются через консоль браузера.
## tape_like.js ![](https://img.shields.io/github/size/FromSi/TwitterScripts/tape_like.js.svg?style=flat)
Скрипт нужно запускать на главной странице Twitter'а (лента твиттов).
Скрипт ставит лайки пользователям которые:
* Подписанны на Вас;
* Еще не получили вашего лайка на твит;
* Создали свой твит, а не сделали ретвит.
В скрипте достаточно изменить четыре переменные. 
```javascript
...
// Ограничения для ленты.
const MIN_TWEETS = 5;  		// мин твиттов на ленте
const MAX_TWEETS = 100;	    // Макс твиттов на ленте

// Сколько лайков и за какое время. 
const timeHour = 8;      	// Сколько часов будем это крутить?
const countLike = 500;   	// Сколько всего лайков нужно?
...
```
