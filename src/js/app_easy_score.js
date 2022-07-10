let paths = document.querySelectorAll('path');

let hitScore;
let scoreArray = [];


paths.forEach(function(path) {
    path.addEventListener('click', function(e) {
            hitScore = hitHandler(e);
            noMathScore(hitScore);
            console.log(e.target.id);
        }
    );
});

function noMathScore(hitScore) {
    if(scoreArray.length === 3) {
        scoreArray = []
        document.querySelector('#nm-score2').innerHTML = "--";
        document.querySelector('#nm-score3').innerHTML = "--";
    }
    scoreArray.push(hitScore);
    console.log(scoreArray);

    (typeof scoreArray[0] === 'undefined') ? null : document.querySelector('#nm-score1').innerHTML = scoreArray[0];
    (typeof scoreArray[1] === 'undefined') ? null : document.querySelector('#nm-score2').innerHTML = scoreArray[1];
    (typeof scoreArray[2] === 'undefined') ? null : document.querySelector('#nm-score3').innerHTML = scoreArray[2];

    // if(scoreArray.length === 3) {
    //     let score = scoreArray[0] + scoreArray[1] + scoreArray[2];
    //     document.querySelector('#nm-submit').innerHTML = "Submit " + score;
    // }
    let score = 0;

    for(let i = 0; i < scoreArray.length; i++) {
        score += scoreArray[i];
    }

    document.querySelector('#nm-submit').innerHTML = score;
}


function hitHandler(e) {
    let mapScore;

    switch (e.target.id) {
        // 20
        case 'svg_2': mapScore = 40; break;
        case 'svg_23': mapScore = 20; break;
        case 'svg_47': mapScore = 60; break;
        case 'svg_68': mapScore = 20; break;

        // 1
        case 'svg_6': mapScore = 2; break;
        case 'svg_29': mapScore = 1; break;
        case 'svg_50': mapScore = 3; break;
        case 'svg_67': mapScore = 1; break;

        //18
        case 'svg_7': mapScore = 36; break;
        case 'svg_30': mapScore = 18; break;
        case 'svg_49': mapScore = 54; break;
        case 'svg_66': mapScore = 18; break;

        // 4
        case 'svg_10': mapScore = 8; break;
        case 'svg_28': mapScore = 4; break;
        case 'svg_48': mapScore = 12; break;
        case 'svg_75': mapScore = 4; break;

        //13
        case 'svg_8': mapScore = 26; break;
        case 'svg_27': mapScore = 13; break;
        case 'svg_54': mapScore = 39; break;
        case 'svg_73': mapScore = 13; break;

        // 6
        case 'svg_9': mapScore = 12; break;
        case 'svg_34': mapScore = 6; break;
        case 'svg_51': mapScore = 18; break;
        case 'svg_72': mapScore = 6; break;

        //10
        case 'svg_15': mapScore = 20; break;
        case 'svg_35': mapScore = 10; break;
        case 'svg_53': mapScore = 30; break;
        case 'svg_71': mapScore = 10; break;

        //15
        case 'svg_16': mapScore = 30; break;
        case 'svg_31': mapScore = 15; break;
        case 'svg_52': mapScore = 45; break;
        case 'svg_77': mapScore = 15; break;

        //2
        case 'svg_12': mapScore = 4; break;
        case 'svg_33': mapScore = 2; break;
        case 'svg_55': mapScore = 6; break;
        case 'svg_80': mapScore = 2; break;

        //17
        case 'svg_13': mapScore = 34; break;
        case 'svg_32': mapScore = 17; break;
        case 'svg_56': mapScore = 51; break;
        case 'svg_76': mapScore = 17; break;

        //3
        case 'svg_14': mapScore = 6; break;
        case 'svg_39': mapScore = 3; break;
        case 'svg_60': mapScore = 9; break;
        case 'svg_79': mapScore = 3; break;

        //19
        case 'svg_17': mapScore = 38; break;
        case 'svg_40': mapScore = 19; break;
        case 'svg_58': mapScore = 57; break;
        case 'svg_78': mapScore = 19; break;

        //7
        case 'svg_11': mapScore = 14; break;
        case 'svg_38': mapScore = 7; break;
        case 'svg_57': mapScore = 21; break;
        case 'svg_74': mapScore = 7; break;

        //16
        case 'svg_19': mapScore = 32; break;
        case 'svg_37': mapScore = 16; break;
        case 'svg_59': mapScore = 48; break;
        case 'svg_69': mapScore = 16; break;

        //8
        case 'svg_18': mapScore = 16; break;
        case 'svg_36': mapScore = 8; break;
        case 'svg_42': mapScore = 24; break;
        case 'svg_64': mapScore = 8; break;

        //11
        case 'svg_20': mapScore = 22; break;
        case 'svg_24': mapScore = 11; break;
        case 'svg_44': mapScore = 33; break;
        case 'svg_63': mapScore = 11; break;

        //14
        case 'svg_3': mapScore = 28; break;
        case 'svg_25': mapScore = 14; break;
        case 'svg_45': mapScore = 42; break;
        case 'svg_61': mapScore = 14; break;

        //9
        case 'svg_4': mapScore = 18; break;
        case 'svg_26': mapScore = 9; break;
        case 'svg_43': mapScore = 27; break;
        case 'svg_62': mapScore = 9; break;

        //12
        case 'svg_5': mapScore = 24; break;
        case 'svg_21': mapScore = 12; break;
        case 'svg_41': mapScore = 36; break;
        case 'svg_65': mapScore = 12; break;

        //5
        case 'svg_1': mapScore = 12; break;
        case 'svg_22': mapScore = 5; break;
        case 'svg_46': mapScore = 15; break;
        case 'svg_70': mapScore = 5; break;

        //bullseye
        case 'svg_81': mapScore = 25; break;
        case 'svg_118': mapScore = 50; break;


        //numbers
        case 'svg_121': mapScore = 20; break;
        case 'svg_120': mapScore = 20; break;
        case 'svg_123': mapScore = 1; break;
        case 'svg_126': mapScore = 18; break;
        case 'svg_125': mapScore = 18; break;
        case 'svg_128': mapScore = 4; break;
        case 'svg_130': mapScore = 13; break;
        case 'svg_131': mapScore = 13; break;
        case 'svg_133': mapScore = 6; break;
        case 'svg_135': mapScore = 10; break;
        case 'svg_136': mapScore = 10; break;
        case 'svg_138': mapScore = 15; break;
        case 'svg_139': mapScore = 15; break;
        case 'svg_141': mapScore = 2; break;
        case 'svg_143': mapScore = 17; break;
        case 'svg_144': mapScore = 17; break;
        case 'svg_146': mapScore = 3; break;
        case 'svg_148': mapScore = 19; break;
        case 'svg_149': mapScore = 19; break;
        case 'svg_151': mapScore = 7; break;
        case 'svg_153': mapScore = 16; break;
        case 'svg_154': mapScore = 16; break;
        case 'svg_156': mapScore = 8; break;
        case 'svg_158': mapScore = 11; break;
        case 'svg_159': mapScore = 11; break;
        case 'svg_161': mapScore = 14; break;
        case 'svg_162': mapScore = 14; break;
        case 'svg_164': mapScore = 9; break;
        case 'svg_166': mapScore = 12; break;
        case 'svg_167': mapScore = 12; break;
        case 'svg_169': mapScore = 5; break;


    }

    return mapScore;
}