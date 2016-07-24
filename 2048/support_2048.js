function getPosTop(i,j){
	return 20 + i*120;
}
function getPosLeft(i,j){
	return 20 + j*120;
}
function getNumberBackgroundColor(number){
	switch(number){
        case 2:return "#eee4da";
        case 4:return "#ede0c8";
        case 8:return "#f2b179";
        case 16:return "#f59563";
        case 32:return "#f67c5f";
        case 64:return "#f65e3b";
        case 128:return "#edcf72";
        case 256:return "#edcc61";
        case 512:return "#9c0";
        case 1024:return "#33b5e5";
        case 2048:return "#09c";
        case 4096:return "#a6c";
        case 8192:return "#93c";
        default: return "#000000";
    }
}
function getNumberColor(number){
    if(number<=4)
        return "#776e65";

    return "white";
}
function noSpace(table){

    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++)
            if(table[i][j]===0)
                return false;

    return true;
}
function canMoveLeft(table){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(table[i][j]!==0&&(table[i][j-1]===0||table[i][j]==table[i][j-1])){
				return true;
			}
		}
	}
	return false;
}
function canMoveRight(table){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(table[i][j]!==0&&(table[i][j+1]===0||table[i][j]==table[i][j+1])){
				return true;
			}
		}
	}
	return false;
}
function canMoveTop(table){
    for(var j=0;j<4;j++){
        for( var i = 1 ; i < 4 ; i ++ ){
			if(table[i][j]!==0&&(table[i-1][j]===0||table[i][j]==table[i-1][j])){
				return true;
			}
		}
	}
	return false;
}
function canMoveBottom(table){
	 for(var j=0;j<4;j++){
        for( var i = 2 ; i >= 0 ; i -- ){
			if(table[i][j]!==0&&(table[i+1][j]===0||table[i][j]==table[i+1][j])){
				return true;
			}
		}
	}
	return false;
}
function noBlockHorizontal(row,startCol,endCol,table){
	for(var i=startCol+1;i<endCol;i++){
		if(table[row][i]!==0){
			return false;
		}
	}
	return true;
}
function noBlockVertical(col,startRow,endRow,table){
	for(var i=startRow+1;i<endRow;i++){
		if(table[i][col]!==0){
			return false;
		}
	}
	return true;
}
function nomove(table){
    if( canMoveLeft(table) ||
        canMoveRight(table) ||
        canMoveTop(table) ||
        canMoveBottom(table) )
        return false;

    return true;
}