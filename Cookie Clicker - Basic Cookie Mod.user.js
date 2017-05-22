// ==UserScript==
// @name         Cookie Clicker | Basic Cookie Mod
// @version      0.17
// @author       GorkyR
// @include      http://orteil.dashnet.org/cookieclicker/
// @grant        none
// ==/UserScript==

var GCOn = false;
var GCSound = new realAudio('http://freesound.org/data/previews/66/66717_931655-lq.mp3');
GCSound.volume = 1;
var goldenSound = function () {
    if (Game.shimmers.length > 0) {
        if (!GCOn) {
            GCSound.play();
            GCOn = true;
        }
    }
    else GCOn = false;
    setTimeout(goldenSound, 500);
};

var EasterEggsCommon  = ["Chicker egg", "Duck egg", "Turkey egg", "Quail egg", "Robin egg", "Ostrich egg", "Cassowary egg", "Salmon roe", "Frogspawn", "Shark egg", "Turtle egg", "Ant larva"];
var EasterEggsRare    = ["Golden goose egg", "Faberge egg", "Wrinklerspawn", "Cookie egg", "Omelette", "Chocolate egg", "Century egg", "egg"];
var HalloweenCookies  = ["Skull cookies", "Ghost cookies", "Bat cookies", "Slime cookies", "Pumpkin cookies", "Eyeball cookies", "Spider cookies"];
var ChristmasBiscuits = ["Christmas tree biscuits", "Snowflake biscuits", "Snowman biscuits", "Holly biscuits", "Candy cane biscuits", "Bell biscuits", "Present biscuits"];
var ValentineBiscuits = ["Pure heart biscuits", "Ardent heart biscuits", "Sour heart biscuits", "Weeping heart biscuits", "Golden heart biscuits", "Eternal heart biscuits"];

// -------------------------

function GetCurrentTimeString() {
    var cur_time = new Date();
    var h = cur_time.getHours().toString();
    var m = cur_time.getMinutes().toString();
    return h.padStart(2, "0") + ":" + m.padStart(2, "0");
}
var GetTimeString = function (timeInSecs) {
    var seconds = Math.floor(timeInSecs % 60);
    var minutes = Math.floor((timeInSecs -= seconds) / 60) % 60;
    var hours = Math.floor((timeInSecs -= minutes * 60) / 3600) % 24;
    var days = Math.floor((timeInSecs -= hours * 3600) / 86400) % 365;
    var years = Math.floor((timeInSecs -= days * 86400) / 31536000);

    return ((years ? '~' + years + 'y ' : '') +
        (days ? days + 'd ' : '') +
        (hours ? hours + 'h ' : '') +
        (minutes ? minutes + 'm ' : '') +
        (seconds || !(years || days || hours || minutes)? seconds + 's' : '')).trimRight();
}

function GetNumberOfWrinklers() {
    var n = 0;
    for (var i in Game.wrinklers)
        if (Game.wrinklers[i].phase == 2)
            n++;
    return n;
}
function GetWrinklerMultiplier() {
    var m = 1.1;
    if (Game.Has('Wrinklerspawn')) m *= 1.05;
    if (Game.Has('Sacrilegious corruption')) m *= 1.05;
    return m;
}
function GetEffectOfWrinklers() { return GetNumberOfWrinklers() ** 2 * 0.05 * GetWrinklerMultiplier() + (1 - GetNumberOfWrinklers() * 0.05); }
function GetWrinklersReward() {
    var s = 0;
    for (var i = 0; i < 12; i++)
        s += Game.wrinklers[i].sucked;
    return s * GetWrinklerMultiplier();
}

function GetCookiesPerSecond() { return Game.cookiesPs * (1 - Game.cpsSucked); }
function GetCookiesPerSecondWithWrinklers() { return Game.cookiesPs * GetEffectOfWrinklers(); }
function GetSecondsToMake(amount) { return amount / GetCookiesPerSecond(); }
function GetSecondsToHave(amount) { return (amount - Game.cookies) / GetCookiesPerSecond(); }
function GetSecondsToHaveWithWrinklers(amount) { return (amount - (Game.cookies + GetWrinklersReward())) / GetCookiesPerSecondWithWrinklers(); }

function GetPrestigeExtra() {
    var n = Game.cookiesReset + Game.cookiesEarned + GetWrinklersReward();
    if (Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg'))
        n += (Game.cookies + GetWrinklersReward()) * 0.05;
    return Math.floor(Game.HowMuchPrestige(n) - Game.prestige);
}
function GetBonusIncomeFromPrestigePercentage() { return GetPrestigeExtra() / Game.prestige; }
function GetBonusIncomeFromPrestige() { return GetBonusIncomeFromPrestigePercentage() * Game.cookiesPs; }

function PopAllWrinklers() { for (var i in Game.wrinklers) Game.wrinklers[i].hp = 0; }

// -------------------------

var newTooltipFunc = function () {
    var me = this;
    var desc = me.desc;
    var name = me.name;
    if (Game.season == 'fools') {
        if (!Game.foolObjects[me.name]) {
            name = Game.foolObjects.Unknown.name;
            desc = Game.foolObjects.Unknown.desc;
        }
        else {
            name = Game.foolObjects[me.name].name;
            desc = Game.foolObjects[me.name].desc;
        }
    }
    var icon = [me.iconColumn, 0];
    if (me.locked) {
        name = '???';
        desc = '';
        icon = [0, 7];
    }
    var sleft = GetSecondsToHave(me.bulkPrice);
    var sleftw = GetSecondsToHaveWithWrinklers(me.bulkPrice);
    return '<div style="min-width:350px;"><div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;background-position:' + (-icon[0] * 48) + 'px ' + (-icon[1] * 48) + 'px;"></div><div style="float:right;"><span class="price">' + Beautify(Math.round(me.bulkPrice)) + '</span></div><div class="name">' + name + '</div>' + '<small>[owned : ' + me.amount + '</small>]' + (me.free > 0 ? ' <small>[free : ' + me.free + '</small>!]' : '') +
        '<div class="line"></div><div class="description">' + desc + '</div>' +
        (me.totalCookies > 0 ? (
            '<div class="line"></div><div class="data">' +
            (me.amount > 0 ? '&bull; each ' + me.single + ' produces <b>' + Beautify((me.storedTotalCps / me.amount) * Game.globalCpsMult, 1) + '</b> ' + ((me.storedTotalCps / me.amount) * Game.globalCpsMult == 1 ? 'cookie' : 'cookies') + ' per second<br>' : '') +
            '&bull; ' + me.amount + ' ' + (me.amount == 1 ? me.single : me.plural) + ' producing <b>' + Beautify(me.storedTotalCps * Game.globalCpsMult, 1) + '</b> ' + (me.storedTotalCps * Game.globalCpsMult == 1 ? 'cookie' : 'cookies') + ' per second (<b>' + Beautify((me.amount > 0 ? ((me.storedTotalCps * Game.globalCpsMult) / Game.cookiesPs) : 0) * 100, 1) + '%</b> of total)<br>' +
            '&bull; <b>' + Beautify(me.totalCookies) + '</b> ' + (Math.floor(me.totalCookies) == 1 ? 'cookie' : 'cookies') + ' ' + me.actionName + ' so far<br></div>'
        ) : '') +
        '<div class="line"></div><b>' + (sleft > 0 ? GetTimeString(sleft) : "Done") + (GetNumberOfWrinklers() > 0 ? '</b><br><b style="color: red;">' + (sleftw > 0 ? GetTimeString(sleftw) : 'Done') : '') + '</b></div>';
};

var newAscencionTooltip = function () {
    var chipsOwned = Game.HowMuchPrestige(Game.cookiesReset);
    var ascendNowToOwn = Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned));
    var ascendNowToGet = ascendNowToOwn - Math.floor(chipsOwned);
    var cookiesToNext = Game.HowManyCookiesReset(ascendNowToOwn + 1) - (Game.cookiesEarned + Game.cookiesReset);

    var date = new Date();
    date.setTime(Date.now() - Game.startDate);
    var timeInSeconds = date.getTime() / 1000;
    var startDate = Game.sayTime(timeInSeconds * Game.fps, 2);

    var str = '';
    str += 'You\'ve been on this run for <b>' + (startDate === '' ? 'not very long' : (startDate)) + '</b>.<br>';
    str += '<div class="line"></div>';
    if (Game.prestige > 0) {
        str += 'Your prestige level is currently <b>' + Beautify(Game.prestige) + '</b>.<br>(CpS +' + Beautify(Game.prestige) + '%)';
        str += '<div class="line"></div>';
    }
    if (ascendNowToGet < 1) str += 'Ascending now would grant you no prestige.';
    else if (ascendNowToGet < 2) str += 'Ascending now would grant you<br><b>1 prestige level</b> (+1% CpS)<br>and <b>1 heavenly chip</b> to spend.';
    else str += 'Ascending now would grant you<br><b>' + Beautify(ascendNowToGet) + ' prestige levels</b> (+' + Beautify(ascendNowToGet) + '% CpS)<br>and <b>' + Beautify(ascendNowToGet) + ' heavenly chips</b> to spend.';
    str += '<div class="line"></div>';
    str += 'You need <b>' + Beautify(cookiesToNext) + ' more cookies</b> for the next level. ';
    str += '(' + GetTimeString(GetSecondsToMake(cookiesToNext)) + ')<br>';
    Game.ascendTooltip.innerHTML = str;
}

var buyTimerInterval = setInterval(
    function () {
        if (typeof Game.ready != 'undefined' && Game.ready) {
            //goldenSound(); // Un-comment for golden cookie sound

            for (var i = 0; i < Game.ObjectsById.length; i++)
                Game.ObjectsById[i].tooltip = newTooltipFunc;

            var realCrate = Game.crate;
            var realGameLogic = Game.Logic;
            var realUpdateMenu = Game.UpdateMenu;
            Game.Logic = function () {
                realGameLogic();
                if ((Game.T - 1) % 15 === 0) newAscencionTooltip();
                if (Game.T % 9000 === 0) console.log("Last active:", GetCurrentTimeString());
            };
            Game.crate = function (me, context, forceClickStr, id, asFunction) {
                if (asFunction) {
                    var price = '<div style="float:right;"><span class="price' + (me.canBuy() ? '' : ' disabled') + '">' + Beautify(Math.round(me.getPrice())) + '</span></div>';
                    var sleft = GetSecondsToHave(me.getPrice());
                    var sleftw = GetSecondsToHaveWithWrinklers(me.getPrice());
                    return function () {
                        return '<div style="min-width:350px;">' +
                            '<div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;background-position:' + (-me.icon[0] * 48) + 'px ' + (-me.icon[1] * 48) + 'px;"></div>' + price +
                            '<div class="name">' + me.name + '</div>' +
                            '<div class="line"></div><div class="description">' + me.desc + '</div>' +
                            '<div class="line"></div><b>' + (sleft > 0 ? GetTimeString(sleft) : 'Done') + (GetNumberOfWrinklers() > 0 ? '</b><br><b style="color: red">' + (sleftw > 0 ? GetTimeString(sleftw) : 'Done') : '') + '</b></div>';
                    };
                }
                else
                    return realCrate(me, context, forceClickStr, id, asFunction);
            };
            Game.UpdateMenu = function (again = 0) {
                realUpdateMenu();

                try {
                    var menu = document.getElementById("menu");
                    if (menu.children[1].innerText == "Statistics") {
                        var n = -2;
                        var br = function () { return document.createElement('br'); };
                        var listing = function () {
                            var l = document.createElement('div');
                            l.classList = 'listing';
                            return l;
                        };

                        // ----- General -----

                            var generalStatistics = menu.children[2];
                            var gSc = function (n) { return generalStatistics.children[n >= 0 ? n : (generalStatistics.children.length + n)]; };

                            generalStatistics.insertBefore(br(), gSc(8));
                            generalStatistics.insertBefore(br(), gSc(10));

                            if (GetNumberOfWrinklers() > 0) {
                                var wrinklerInfo = listing();
                                wrinklerInfo.innerHTML = '<b>Wrinklers reward:</b> ' + Beautify(GetWrinklersReward()) + ' <a class="option">Pop all</a>';
                                wrinklerInfo.children[1].onclick = PopAllWrinklers;
                                generalStatistics.insertBefore(wrinklerInfo, gSc(n--));

                                var wrinklerIncomeInfo = listing();
                                wrinklerIncomeInfo.innerHTML = '<b>Cookies per second (including wrinklers):</b> ' + Beautify(GetCookiesPerSecondWithWrinklers()) + ' (x' + Math.floor(GetEffectOfWrinklers() * 1000) / 1000 + ')';
                                generalStatistics.insertBefore(wrinklerIncomeInfo, gSc(10));
                            }

                            if (GetPrestigeExtra() > 0) {
                                var prestigeInfo = listing();
                                prestigeInfo.innerHTML = '<b>Bonus income after reset:</b> ' + Beautify(GetBonusIncomeFromPrestige()) + ' (' + Math.floor(GetBonusIncomeFromPrestigePercentage() * 10000) / 100 + '%)';
                                generalStatistics.insertBefore(prestigeInfo, gSc(n--));
                            }

                            if (Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg'))
                            {
                                var chocoInfo = listing();
                                chocoInfo.innerHTML = '<b>Reward of "Chocolate egg":</b> ' + Beautify(Game.cookies * 0.05);
                                generalStatistics.insertBefore(chocoInfo, gSc(n--));
                            }

                            generalStatistics.insertBefore(br(), gSc(n--));

                        // ----- Special -----

                            var specialStatistics = menu.children[3];
                            var sSc = function (n) { return specialStatistics.children[n >= 0? n : (specialStatistics.children.length + n)]; }
                            var areUnlocked = function (array) {
                                var n = 0;
                                for (var i in array)
                                    if (Game.HasUnlocked(i))
                                        n++;
                                return n;
                            }

                            switch(Game.season)
                            {
                                case "easter":
                                    var seasonInfo1 = listing();
                                    var seasonInfo2 = listing();
                                    seasonInfo1.innerHTML = '<b>Common easter eggs unlocked:</b> ' + areUnlocked(EasterEggsCommon) + '/' + EasterEggsCommon.length;
                                    seasonInfo2.innerHTML = '<b>Rare easter eggs unlocked:</b> ' + areUnlocked(EasterEggsRare) + '/' + EasterEggsRare.length;

                                    specialStatistics.insertBefore(br(), sSc(2));
                                    specialStatistics.insertBefore(seasonInfo2, sSc(2));
                                    specialStatistics.insertBefore(seasonInfo1, seasonInfo2);
                                    break;
                                case "valentines":
                                    break;
                                default:
                                    break;
                            }
                        
                            specialStatistics.insertBefore(br(), sSc(2));

                        // ----- ------- -----

                        if (again < 4)
                            setTimeout(function () { Game.UpdateMenu(again + 1); }, 1000);
                    }
                }
                catch (e) { return; }
            };

            clearInterval(buyTimerInterval);
        }
    }, 1000);