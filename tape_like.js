// Лента твиттов.
const ID_LIST_TWEETS = "stream-items-id";
// Название класса. Кнопка для показа новых твиттов.
const CLASS_BUTTON_NEW_TWEETS = "new-tweets-bar js-new-tweets-bar";
// Название класса. Твитт из ленты.
const CLASS_ITEM_TWEET = "js-stream-item stream-item stream-item";
// Название класса. Проверка контекста на шапке твитта (ретвит, лайк и т.п.).
const CLASS_HEAD_TWEET_CONTEXT = "context";
// Название класса. Кнопка не нажатого лайка.
const CLASS_BUTTON_LIKE = "ProfileTweet-actionButton js-actionButton js-actionFavorite";
// Твитт, <div> и там находится этот аргумент. Подписал ли на меня данный аккаунт или нет.
const ATTRIBUTE_FOLLOWS_ME = "data-follows-you";

// Ограничения для ленты.
const MIN_TWEETS = 5;  		// мин твиттов на ленте
const MAX_TWEETS = 100;		// Макс твиттов на ленте

// Сколько лайков и за какое время. 
const timeHour = 8;      		// Сколько часов будем это крутить?
const amountLikes = 500;   		// Сколько всего лайков нужно?

// Перевожу в часы и узнаю задержку в секундах;
var hostPause = ((timeHour * 60 * 60) / amountLikes) ^ 0;

// Просто паузы, чтобы успевало все подгрузится.
var loadTweetPause = 5000;
var handlerTweetPause = 5000;

// Счетчик твиттов. Помогает вычислить количество твиттов для MAX_TWEETS.
var countTweets;
// Счетчик лайков. Помогает вычислить количество лайков для amountLikes.
var countLikes = 0;

host();

// Избегаем рефлексию. :D
function host(){
	if (amountLikes > countLikes){
		setTimeout(
        	() => main(), 
        	hostPause
    	);
	}
}

// Нажимает на кнопку, для обновления твиттов и начинает их обрабатывать.
function main(){
	clickNewTweets();
    
    setTimeout(
        () => handlerTweets(), 
        loadTweetPause
    );
}

// Обработчик ленты Twitter.
function handlerTweets(){

    getArrayTweet(
        arr => {
            if (arr.length < MIN_TWEETS){
                reloadArrayTweet();
            } else {
            	clickLike(arr);
                host();
            }
        }
    );
}

// Повторить поиск твиттов.
function reloadArrayTweet(){
	clickNewTweets();
    window.scrollTo(0, window.scrollMaxY);
    window.scrollTo(0, 0);

    setTimeout(
        () => handlerTweets(), 
        handlerTweetPause
    );
}

// Удаляет не нужные твитты и скидывает callback с подходящими твиттами.
function getArrayTweet(callback){
    countTweets = 0;

    var root = document.getElementById(ID_LIST_TWEETS);
    var arrOld = Array.from(root.getElementsByClassName(CLASS_ITEM_TWEET));
    var arrFilter = arrOld.filter(checkContext);

    removeTweet(arrOld, arrFilter, root);
        
    callback(arrFilter);
}

// Найти собственные твитты пользователей и чтобы они меня читали.
function checkContext(li){
    if(li.getElementsByClassName(CLASS_HEAD_TWEET_CONTEXT)[0] == null ||
            li.getElementsByTagName("ol")[0] != null ||
            window.getComputedStyle(li.getElementsByClassName(CLASS_BUTTON_LIKE)[0], null).getPropertyValue("display") == "none"){
        return false;
    } else if (li.getElementsByClassName(CLASS_HEAD_TWEET_CONTEXT)[0].childElementCount == 0 &&
                    JSON.parse(li.childNodes[1].getAttribute(ATTRIBUTE_FOLLOWS_ME)) &&
                    countTweets < MAX_TWEETS) {
        countTweets++;
        return true;
    } else {
        return false;
    }
}

// Удаляет не нужные твитты.
function removeTweet(arrOne, arrTwo, root){
    arrOne.filter(element => !arrTwo.includes(element))
                .forEach(element => root.removeChild(element));
}


// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Поставить лайк счастливчику.
function clickLike(arr){
	countLikes++;
	arr[getRandomInt(0, arr.length)].getElementsByClassName(CLASS_BUTTON_LIKE)[0].click();
}

// Показать новые твитты.
function clickNewTweets(){
	if (document.getElementsByClassName(CLASS_BUTTON_NEW_TWEETS)[0] != null)
    	document.getElementsByClassName(CLASS_BUTTON_NEW_TWEETS)[0].click();
}
