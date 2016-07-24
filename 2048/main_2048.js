/*!
 * define some global variables
 * 
 */
var table=[],
	score=0,
	hasConflicted=[];
/*!
 * define some global variables
 * 
 */

/*!
 * main process
 * 
 */
newGame();
/*!
 * main process
 * 
 */

/*!
 * define some functions
 * 
 */
function newGame(){
	init();
	generateOneNumber();
    generateOneNumber();
}
function init(){
	for(var i=0;i<4;i++){
		table[i]=[];
		hasConflicted[i]=[];
		for(var j=0;j<4;j++){
			table[i][j]=0;
			hasConflicted[i][j] = false;
			var gridCell=$('#grid-cell-'+i+'-'+j);
			gridCell.css({'top':getPosTop(i,j),'left':getPosLeft(i,j)});
		}
	}
	updateTableView();
	score=0;	
}
function generateOneNumber(){
	if(noSpace(table)){
		return false;
	}else{
		var times=0;
		var randx=parseInt(Math.floor(Math.random()*4));
    	var randy=parseInt(Math.floor(Math.random()*4));
		while(times<50){
        if( table[randx][randy]===0 )
            break;

        randx=parseInt(Math.floor(Math.random()*4));
        randy=parseInt(Math.floor(Math.random()*4));

        times++;
    	}
    	if(times==50){
        	for(var i=0;i<4;i++)
            	for( var j=0;j<4;j++){
                	if(table[i][j]===0){
                    	randx=i;
                    	randy=j;
                	}
            	}
    	}
    	//随机一个数字
    	var randNumber = Math.random() < 0.5 ? 2 : 4;

    	//在随机位置显示随机数字
    	table[randx][randy] = randNumber;
    	showNumberWithAnimation( randx , randy , randNumber );

    return true;

	}
}
function updateTableView(){
	$('.number-cell').remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$('#grid-container').append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var $currentCell=$('#number-cell-'+i+'-'+j);
			if(table[i][j]===0){
				$currentCell.css({
					"width":"0px",
					"height":"0px",
					"top":getPosTop(i,j)+50,
					"left":getPosLeft(i,j)+50
				});
			}else{
				$currentCell.css({
					"width":"100px",
					"height":"100px",
					"top":getPosTop(i,j),
					"left":getPosLeft(i,j),
					"backgroundColor":getNumberBackgroundColor(table[i][j]),
					"color":getNumberColor(table[i][j])
				}).text(table[i][j]);
			}
			hasConflicted[i][j]=false;
		}
		
	}
}
function moveLeft(){
	if(!canMoveLeft(table)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(table[i][j]!==0){
				for(var k=0;k<j;k++){
					if(table[i][k]===0&&noBlockHorizontal(i,k,j,table)){
						showMoveAnimate(i,j,i,k);
						table[i][k]=table[i][j];
						table[i][j]=0;
						continue;
					}else if(table[i][k]==table[i][j]&&noBlockHorizontal(i,k,j,table)&&!hasConflicted[i][k]){
						showMoveAnimate(i,j,i,k);
						table[i][k]+=table[i][j];
						table[i][j]=0;
						updateScore(score,table[i][k]);
						score+=table[i][k];
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
			
		}
	}

	setTimeout('updateTableView()',200);
    return true;
}
function moveRight(){
	if(!canMoveRight(table)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(table[i][j]!==0){
				for(var k=3;k>j;k--){
					if(table[i][k]===0&&noBlockHorizontal(i,j,k,table)){
						showMoveAnimate(i,j,i,k);
						table[i][k]=table[i][j];
						table[i][j]=0;
						continue;
					}else if(table[i][k]==table[i][j]&&noBlockHorizontal(i,j,k,table)&&!hasConflicted[i][k]){
						showMoveAnimate(i,j,i,k);
						table[i][k]+=table[i][j];
						table[i][j]=0;
						updateScore(score,table[i][k]);
						score+=table[i][k];
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
			
		}
	}

setTimeout('updateTableView()',200);
return true;
}
function moveTop(){
	if(!canMoveTop(table)){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(table[i][j]!==0){
				for(var k=0;k<i;k++){
					if(table[k][j]===0&&noBlockVertical(j,k,i,table)){
						showMoveAnimate(i,j,k,j);
						table[k][j]=table[i][j];
						table[i][j]=0;
						continue;
					}else if(table[k][j]==table[i][j]&&noBlockVertical(j,k,i,table)&&!hasConflicted[k][j]){
						showMoveAnimate(i,j,k,j);
						table[k][j]+=table[i][j];
						table[i][j]=0;
						updateScore(score,table[k][j]);
						score+=table[k][j];
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
			
		}
	}

	setTimeout('updateTableView()',200);
    return true;
}
function moveBottom(){
	if(!canMoveBottom(table)){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(table[i][j]!==0){
				for(var k=3;k>i;k--){
					if(table[k][j]===0&&noBlockVertical(j,i,k,table)&&!hasConflicted[k][j]){
						showMoveAnimate(i,j,k,j);
						table[k][j]=table[i][j];
						table[i][j]=0;
						continue;
					}else if(table[k][j]==table[i][j]&&noBlockVertical(j,i,k,table)){
						showMoveAnimate(i,j,k,j);
						table[k][j]+=table[i][j];
						table[i][j]=0;
						updateScore(score,table[k][j]);
						score+=table[k][j];
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
			
		}
	}
	
	setTimeout('updateTableView()',200);
    return true;
}
function isgameover(){
    if( noSpace(table) && nomove(table) ){
        gameover();
    }
}

function gameover(){
    alert('Game Over!');
}

/*!
 * event handler registration
 * 
 */
$(document).keydown( function( event ){
	if(event.preventDefault){
        	event.preventDefault();
    }else{
        		returnValue=false;
    }
    switch( event.keyCode ){
        case 37: //left
            if( moveLeft() ){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);
            }
            break;
        case 38: //up
            if( moveTop() ){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);
            }
            break;
        case 39: //right
            if( moveRight() ){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);
            }
            break;
        case 40: //down
            if( moveBottom() ){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);
            }
            break;
        default: //default
            break;
    }
});
/*!
 * event handler registration
 * 
 */