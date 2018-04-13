function sign(number){
    if(number!=undefined){
        if(number >= 0){
            return "+" + number;
        } else {
            return number;
        }
    }

    return null;
}

function challengeRating(c){
    if(c==0 || c>=1) return c;
    return "1/" + (1/c);
}

function passivePerception(m){
    if(m.perception || m.wisdom){
        var modifier = m.perception ? m.perception : statisticScore(m.wisdom);
        return 10 + modifier;
    }

    return null;
}

function filteredSenses(monster){
    var pp = passivePerception(monster);

    var senses;

    if(monster.senses){
        var senses = monster.senses.split(",").map((s)=>s.trim()).filter((s)=>s != "passive Perception " + pp).join(", ");
    }

    return (senses ? senses : "--");
}

function paginate(array, pageSize){
    var pages = [];
    var page = [];
    var count = 0;

    for(var index in array){
        var element = array[index];
        var element_size = (element.wide ? 2: 1);

        if(count + element_size <= pageSize){
            page.push(element);
            count += element_size;
        } else {
            pages.push(page);
            page = [element];
            count = element_size;
        }
    }

    pages.push(page);
    return pages;
}

function hasDefenses(m){
    return m.damage_vulnerabilities || m.damage_resistances || m.damage_immunities || m.condition_immunities || m.strength_save || m.dexterity_save || m.constitution_save || m.intelligence_save || m.wisdom_save || m.charisma_save;
}

function experiencePoints(cr){
    if(cr == undefined){
        return null;
    } else if(cr == 0){
        return 10;
    } else if(cr < 1) {
        return cr * 200;
    } else {
        return [0, 200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200, 8400, 10000, 11500, 13000, 15000, 18000, 20000, 22000, 25000, 33000, 41000, 50000, 62000, 75000, 90000, 105000, 120000, 135000, 155000][cr];
    }
}

function statisticScore(value){
    if(value!=undefined){
        return Math.floor((value - 10) / 2);
    }

    return null;
}

function health(dice, con){
    var m = /(\d+)d(\d+)/.exec(dice);

    if(m){
        var count = parseInt(m[1]);
        var sides = parseInt(m[2]);
        var bonus = parseInt(statisticScore(con));

        var average = [0, 0, 0, 0, 2.5, 0, 3.5, 0, 4.5, 0, 5.5, 0, 6.5, 0, 0, 0, 0, 0, 0, 0, 10.5];
        var total = Math.floor(count * (average[sides] + bonus));

        if(total){
            var result = total + " " + "(" + dice;
            if(bonus!=0){
                result += sign(bonus*count);
            }
            result += ")";
            return result;
        }
    }

    return null;
}