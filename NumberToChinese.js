/*eslint-disable*/
/*
* 数字转汉字
* */
var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
var chnUnitSection = ["","万","亿","万亿","兆","亿兆"];
var chnUnitChar = ["","十","百","千"];
function SectionToChinese(section){ //节内算法
    var strIns = '', chnStr = '';
    var unitPos = 0;
    var zero = true;
    while(section > 0){
        var v = section % 10;
        if(v === 0){
            if(!zero){
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
            }
        }else{
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
    }
    return chnStr;
}

function NumberToChinese(num){  //主函数
    var unitPos = 0;
    var strIns = '', chnStr = '';
    var needZero = false;
    var oldNum = num;

    if(num === 0){
        return chnNumChar[0];
    }

    while(num > 0){
        var section = num % 10000;  //余数
        if(needZero){
            chnStr = chnNumChar[0] + chnStr;
        }
        strIns = SectionToChinese(section);
        strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
        chnStr = strIns + chnStr;
        needZero = (section < 1000) && (section > 0);
        num = Math.floor(num / 10000);
        unitPos++;
    }

    if(oldNum >=10 && oldNum <20)chnStr=chnStr.substring(1);

    return chnStr;
}
export default NumberToChinese
