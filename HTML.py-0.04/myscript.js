/*	Author : Dhruv Subramanian
 	Date Created : 5/18/2016
	Purpose : To enhance readability and data available in DISDATT test results reported on Jenkins.
	myscript.js : this file specifically defines functions i use to manipulate the tabular data 
	contained within the HTML tables
*/

/*---- global variable initialization ----*/
var count1 = 0.0; 
var count2 = 0.0;
var count3 = 0.0;
var skiptbl;
/*---- completion of global variable declaration ----*/

/*---- the unique() function removes duplication from an array ----*/
var unique = function(origArr) {
    var newArr = [],
    origLen = origArr.length,
    found,
    x, y;
    for ( x = 0; x < origLen; x++ ) {
        found = undefined;
        for ( y = 0; y < newArr.length; y++ ) {
            if ( origArr[x] === newArr[y] ) { 
           		found = true;
            	break;
            }
        }
        if (!found) 
        	newArr.push( origArr[x] );    
    }
    return newArr;
}
/*---- completion of the unique() function ----*/

/*---- definition of myfunction() : colors the rows ofthe main table based on the pass,failed and skipped criteria ----*/
function myfunction(){	
	var tbl = document.getElementById("maintbl");
        if (tbl != null) {
            if (tbl.rows[0] != null) {
                tbl.rows[0].style.backgroundColor = "black";
                tbl.rows[0].style.color = "white";
            }
            for (var i = 1; i < tbl.rows.length; i++) {
                if (tbl.rows[i].cells[3].innerHTML === "error"){
					tbl.rows[i].style.backgroundColor = "red";
					count1++;
				}
				else if (tbl.rows[i].cells[3].innerHTML === "skipped"){
					tbl.rows[i].style.backgroundColor = "yellow";
					count2++;
				}
				else{
					tbl.rows[i].style.backgroundColor = "green";
					count3++;
				}
       		}   		 
        }
}
/*---- completion of myfunction() ----*/

/*---- definition of mypagefunction() : styles the error table on page2 ----*/	
function mypagefunction(){
	var tbl2 = document.getElementById("pagetbl");
    if (tbl2 != null) {
        if (tbl2.rows[0] != null) {
            tbl2.rows[0].style.backgroundColor = "black";
            tbl2.rows[0].style.color = "white";
        }
        for (var i = 1; i < tbl2.rows.length; i++) {
            tbl2.rows[i].style.backgroundColor = "red";
        }
    }
}
/*---- completion of mypagefunction() ----*/

/*---- definition of the mycreateskiptbl() : creates the table of skipped results ----*/
function mycreateskiptbl(){
	var body = document.body,
    skiptbl  = document.createElement('table');
    skiptbl.style.width  = '1200px';
    skiptbl.style.border = '1px solid black';
	var skipcount = 0;
	var j = 1;
	
	var tbl = document.getElementById("maintbl");
	for (var i = 1; i < tbl.rows.length; i++) {
		if (tbl.rows[i].cells[3].innerHTML === "skipped"){
			skipcount++;
		}
	}
	var tr = skiptbl.insertRow();
	insertheader(tr,tbl,0,'1px solid black',"white","black");	
	for(var i = 1; i < tbl.rows.length; i++){
	    if (tbl.rows[i].cells[3].innerHTML === "skipped"){
        	while(j <= skipcount){
				if (tbl.rows[i].cells[3].innerHTML === "skipped"){
					tr = skiptbl.insertRow();
					insertheader(tr,tbl,i,'1px solid black',"black","yellow");		
				}
				j++;
				break;
			}
		}
	}			
   	body.appendChild(skiptbl);		
}
/*---- completion of the mycreateskiptbl() ----*/

/*---- definition of the createdropdowns() : used to create the skipped test dropdown menus ----*/
function createdropdowns(){
	var tbl = document.getElementById("maintbl");
	var skiparr = []
	var skiphead = [];
	var uniquearr = [];
	var uniquehead = [];
	var subtestarr = [];
	var y = 0;
	var p = 0;

	for (var i = 1; i < tbl.rows.length; i++) {
		if(tbl.rows[i].cells[3].innerHTML === "skipped"){
			skiphead.push(tbl.rows[i].cells[0].innerHTML);
			skiparr.push(tbl.rows[i].cells[1].innerHTML);
		}
	}
	
	uniquearr = unique(skiparr);
	uniquehead = unique(skiphead);

	for(var k = 0;k < uniquehead.length;k++){
		var mydiv = document.getElementById("myDiv");
		var aTag = document.createElement('a');
		var str = "<html><body><a href=\"#skipped" + (k+1) + "\">" + uniquehead[k] + "<br></a></body></html>";
		mydiv.appendChild(aTag);
		document.write(str);
	}
	document.write("<br>");
	for(var z = 0; z < uniquehead.length; z++){
		while(y < uniquearr.length){
			subtestarr.push(uniquearr[y]);
			y++;
			if(skiphead[y] === skiphead[y-1])
				p++;	
			else
				break;
		}
		document.write("<br>");
		var res = "<a name=\"skipped" + (z+1) + "\"></a>";
		document.write(res);
		document.write("<option style=\"background-color:yellow;\">" + uniquehead[z] + "</option>" );
		document.write("<br>");
		for(var a = 0; a < subtestarr.length;a++){
			document.write(subtestarr[a] + "<br>");
		}
		document.write("<br>" + "<p4>These subtests were skipped due to the failure of a previous critical step.</p4>");
		document.write("<br>" + "<a href=\"#targetname\">Go back to the top level skipped test list</a>" + "<br><br>");
		subtestarr = [];
	}
	
}
/*---- completion of the createdropdowns() ----*/

/*---- definition of the errordrop() : creates the drop down menus for error tests and their erring subtests ----*/
function errordrop(){
	var tbl = document.getElementById("maintbl");
	var errorskip = [];
	var errorsubtest = [];
	var uniqueerr = [];

	for (var i = 1; i < tbl.rows.length; i++) {
		if(tbl.rows[i].cells[3].innerHTML === "error"){
			errorskip.push(tbl.rows[i].cells[0].innerHTML);
			errorsubtest.push(tbl.rows[i].cells[1].innerHTML);
		}
	}
	uniqueerr = unique(errorskip);
	var errmain = document.getElementById("mainerr");
	for(var k = 0;k < uniqueerr.length;k++){
		var option = document.createElement("option");
		option.text = uniqueerr[k];
		option.style.backgroundColor = "red";
		errmain.add(option);
	}

	var errtestsub = document.getElementById("suberr");
	for(var k = 0;k < errorsubtest.length;k++){
		var option = document.createElement("option");
		option.text = errorsubtest[k];
		option.style.backgroundColor = "red";
		errtestsub.add(option);
	}
}
/*---- completion of the errordrop() ----*/

/*---- definition of insertheader() : called with params to manipulate the skip table ----*/
function insertheader(tr,tbl,j,border,color,bgcolor){
	for(var k = 0;k <= 3;k++){
		var td = tr.insertCell(k);
		if(k == 2)
			continue;	
		td.appendChild(document.createTextNode(tbl.rows[j].cells[k].innerHTML));
		td.style.border = border ;
		td.style.color = color;
		td.style.backgroundColor = bgcolor;	
	}
}
/*---- completion of the insertheader() ----*/

/*---- definition of createbarchart() : used to create the pie chart that shows distribution of skipped,passed and error tests ----*/
function createpiechart(){
var ctx = document.getElementById("myChart").getContext("2d");
	var myChart = new Chart(ctx, {
    	type: 'pie',
    	data: {
        	labels: ["Errors","Skipped","Passed"],
       	 	datasets: [{
            	label: 'Number of tests',
	    		backgroundColor: ['red','yellow','green'],
            	data: [count1,count2,count3],
        	}]
    	}   
	});
}
/*---- completion of the createpiechart() ----*/

// the code segement below may or may not be used in the xmlparser to display dropdown for errors
/*
#	message6 : Creating dropdown menus for the error tests
message6 = """<script src = "myscript.js"></script>
<h2>Enhanced Dropdown Results for the <p2>TOP LEVEL ERROR TESTS</p2></h2> 
<form><select id="mainerr">
	<option style="background-color:red;">Error Tests</option>
</select>
<br><br>
<h2>Enhanced Dropdown Results for the <p2>ERRING SUBTESTS</p2></h2> 
<select id="suberr">
    <option style="background-color:red;">Error Subtests</option>
</select></form>
<script>
	errordrop();
</script>"""
#	completion of message6 def
*/