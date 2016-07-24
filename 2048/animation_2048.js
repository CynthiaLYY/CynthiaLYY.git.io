function showNumberWithAnimation(i,j,number){
	var numberCell = $('#number-cell-' + i + "-" + j );
    numberCell.css({'background-color':getNumberBackgroundColor(number),'color':getNumberColor(number)});
    numberCell.text(number);
    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);
}
function showMoveAnimate(startRow,startCol,endRow,endCol){
	var numberCell=$('#number-cell-'+startRow+'-'+startCol);
	numberCell.animate({
		'top':getPosTop(endRow,endCol),
		'left':getPosLeft(endRow,endCol)
	},200);
}
function updateScore(score,addNum){
	var newScore=score+addNum;
	if(!document.getElementById('addNum')){
		$('header p').append('<span id="addNum">+'+addNum+'</span>');
	}
	$('#addNum').css({'top':'150px','opacity':'0'}).animate({
		'opacity':1,
		'top':'110px'
	},300).animate({
		'opacity':0,
		'top':'70px'
	},300).css({'top':'150px','opacity':'0'});
	setTimeout(function(){
		if(newScore<100){
			$('#score').text(newScore);
		}
		if(newScore>=100&&newScore<1000){
			$('#score').css('color','#f2b179').text(newScore);
		}
	    if(newScore>=1000&&newScore<5000){
	    	$('#score').css('color','#f67c5f').text(newScore);
	    }
	    if(newScore>=5000&&newScore<=10000){
	    	$('#score').css('color','#edcf72').text(newScore);
	    }
	    if(newScore>10000){
	    	$('#score').css('color','#09c').text(newScore);
	    }
	},300);
	
}