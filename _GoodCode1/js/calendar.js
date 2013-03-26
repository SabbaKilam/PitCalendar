objectEventHandler(window, "load", function(){
    var currentRow = ""
    , currentCol = ""
    , previousRow = ""
    , previousCol = ""
    , rcXYs = [];
    
    var cols = ["col1","col2","col3","col4","col5","col6","col7"];
    forAll(cols, function(col){
        clickTogglesColor(col,true);
    });
    var rows = ["row1","row2","row3","row4","row5","row6"];
    forAll(rows, function(row){
        clickTogglesColor(row,false);
    });
    
    for(var i=0;i<rows.length;i++){
        for(var j = 0; j< cols.length; j++){
            rcXYs.push("rc"+(i+1)+(j+1));
        }
    }
//----------------------------------------------
function toggleColor(rc, column){
    previousRow = currentRow;
    previousCol = currentCol;
    if (!column){
        currentRow = rc;       
        forAll(rows,function(row){
            o(row).style.backgroundColor = "white";
            hiLightRow(previousRow,"white");
        });
        hiLightRow(rc,"yellow");
        o(rc).style.backgroundColor = "yellow";
    }
    else{
        currentCol = rc;
        forAll(cols,function(col){
            o(col).style.backgroundColor = "white";
            hiLightColumn(previousCol,"white");                      
        });
        hiLightColumn(rc,"yellow");                
        o(rc).style.backgroundColor = "yellow";            
    }
    fixHole("yellow");
    hiLightIntersection("pink")
}
//--------------------------------------------------
forAll(rcXYs, function(rcxy){
    objectEventHandler(o(rcxy), "mouseover", function(){
    //alert(rcxy);
        for(var i=0;i<rows.length;i++){
            for(var j = 0; j< cols.length; j++){
                if("rc"+(i+1)+(j+1) == rcxy){
                    var row = "row"+(i+1);
                    var col = "col"+(j+1);
                    toggleColor( row,false);
                    toggleColor( col,true ); 
                    break;
                }
            }
        }
    })
});
//-----------------------------------------------
    function clickTogglesColor(rc,column){
        o(rc).style.cursor="pointer";                
        objectEventHandler(o(rc), "mouseover", function(){
            toggleColor(rc,column);
        });        
    }
//-----------------------------------------------
function hiLightColumn(colx, bgColor) {
    for(var i=0; i<cols.length; i++){
        if(colx === cols[i]){
            for(var j=0; j< rows.length;j++){
                o("rc"+(j+1).toString()+(i+1).toString()).style.backgroundColor = bgColor;
            }
            break;
        }
    }
} 
//------------------------------------------------  
function hiLightRow(rowx, bgColor) {
    for(var i=0; i<rows.length; i++){
        if(rowx === rows[i]){
            for(var j=0; j< cols.length;j++){
                o("rc"+(i+1).toString()+(j+1).toString()).style.backgroundColor = bgColor;
            }
            break;
        }
    }
}
//-----------------------------------------------
function fixHole(color){
    var oldRow = 0, oldCol = 0, textRC = "", IdOfOldRC = "";
    if(previousRow == "" || previousCol == ""){
        return;
    }
    else{
        for(var r = 0; r< rows.length;r++){
            if(previousRow == rows[r]){
                oldRow = r+1;
                break;
            }            
        }
        for(var c = 0; c<cols.length;c++){
            if(previousCol == cols[c]){
                oldCol = c+1;
                break;
            }
        }
        textRC = oldRow.toString() + oldCol.toString();
        IdOfOldRC = "rc"+textRC;
        o(IdOfOldRC).style.backgroundColor = color;
    }
}
//-----------------------------------------------
function hiLightIntersection(color){
    var row = 0, col = 0, textRC = "", IdOfOldRC = "";
    if(currentRow == "" || currentCol == ""){
        return;
    }
    else{
        for(var r = 0; r< rows.length;r++){
            if(currentRow == rows[r]){
                row = r+1;
                break;
            }            
        }
        for(var c = 0; c<cols.length;c++){
            if(currentCol == cols[c]){
                col = c+1;
                break;
            }
        }
        textRC = row.toString() + col.toString();
        IdOfOldRC = "rc"+textRC;
        o(IdOfOldRC).style.backgroundColor = color;
    }
}
//-----------------------------------------------
//===============================================    
});//END OF WINDOW LOAD HANDLER    









