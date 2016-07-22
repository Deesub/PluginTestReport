#	Author : Dhruv Subramanian
# 	Date Created : 5/18/2016
# 	Purpose : To enhance readability and data available in DISDATT test results reported on Jenkins.
#	xmlparser.py : parses the test results to generate the html report

import HTML
import webbrowser
import xml.etree.ElementTree as ET
import sys

#infile = sys.argv[1]
#tree = ET.parse(infile) 
tree = ET.parse('AutomatedTestResults.xml')
root = tree.getroot()
f = open('xml2html.html','w')
f.write('<a name="leave"></a><h2> ENHANCED TEST REPORT FOR DISDATT TEST RESULTS ON JENKINS</h2>')
f.write('<h2 style="color:black;">Contents of Report Page</h2>')
f.write("""<ol><li>Tabulated Results for Test Suite</li>
  				<ol><li><a href="#psf">Tabular overview of Passed,Skipped and Failed Tests</a></li>
  					<li><a href="#tesres">Percentage Distribution of test results</a></li></ol>
				<li><a href="#graphres">Graphical Representation of Test Results</a></li>
  				<li><a href="#skippy">Enhanced Linkable Results for the SKIPPED TESTS AND THEIR SKIPPED SUBTESTS</a></li>
  				<li><a href="errorpage.html#erring">Enhanced Results on Error Subtests (Next Page) </a></li></ol>""")

f.write("<h2>Tabular overview of Passed,Skipped and Failed Tests</h2>")
t = HTML.Table(attribs={'id':'maintbl'},header_row=['Testcase Class','name of testcase','Time Taken','Display Message'])
countp = counts = countf = 0.0
for testcase in root.iter('testcase'):
	name = testcase.attrib.get('name')
	time = testcase.attrib.get('time')
	testcaseclass = testcase.attrib.get('classname')
	em = "passed"
	countp += 1
	if testcase.find('error') is not None:
		em = "error"
		countf+=1
	elif testcase.find('skipped') is not None:
		em = "skipped"
		counts+=1
	t.rows.append([testcaseclass,name,time,em])
	htmlcode = str(t)

table_data = [
        [HTML.TableCell('Passed',bgcolor = 'green'),       HTML.TableCell(countp-(countf + counts),bgcolor = 'green'),   HTML.TableCell(100 * (countp - countf - counts)/countp,bgcolor = 'green')],
        [HTML.TableCell('Failed',bgcolor = 'red'),   	 HTML.TableCell(countf,bgcolor = 'red'),        	HTML.TableCell(100 * countf/countp,bgcolor = 'red')],
        [HTML.TableCell('Skipped',bgcolor = 'yellow'),    	HTML.TableCell(counts,bgcolor = 'yellow'),      HTML.TableCell(100 * counts/countp,bgcolor = 'yellow')],
    ]
htmlcod = HTML.table(table_data,header_row = ['Type','Number','Pass/fail/skip Percentage ( % )'],attribs={'bgcolor': 'silver'})

# ---- message and function definition begins here , for further information regarding functions and messages refer to the PluginProjectReport.md

message = """<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>"""

message0 = """<br><br>"""				

message1 = """<script src="myscript.js"></script>
<script>
	myfunction();
</script>"""

message2 = """<a name="graphres"></a>
<head><h2>Graphical Representation of Test Results</h2></head>
<canvas id="myChart" ></canvas>
<script src="Chart.min.js"></script> 
<script>
	createpiechart();
</script>"""

message3 = """<script src = "myscript.js"></script>
<a name="targetname"></a>
<a name="skippy"></a>
<h2>Enhanced Linkable Results for the <p3>SKIPPED TESTS AND THEIR SKIPPED SUBTESTS</p3></h2> 
<form>
<div id="myDiv"></div>
</form>
<script>
	createdropdowns();
</script>"""

message4 = """<h2>For Tabular and Log Results on failing <p2> ERROR SUBTESTS</p2> of a TEST SUITE, please go to the next page <br></h2>
<a href="errorpage.html#go">Go to the next page</a>"""

def msgcall(msg = []):
	for x in msg:
		f.write(x + message0)

def tablecreate(table):
	f.write(table + message0)

# ----  messages and function definition completed

f.write('<a name="psf"></a>')
tablecreate(htmlcode)
f.write('<a name="tesres"></a><h2> Percentage Distribution of test results</h2>')
tablecreate(htmlcod)
msgarr = [message,message1,message2,message3,message4]
msgcall(msgarr)
f.close()






	