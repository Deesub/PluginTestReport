#	Author : Dhruv Subramanian
# 	Date Created : 5/18/2016
# 	Purpose : To enhance readability and data available in DISDATT test results reported on Jenkins.
#	page2.py : creates the error table and presents the extended log of the html report

import xml.etree.ElementTree as ET
import HTML
import webbrowser
import sys

#infile = sys.argv[1]
#tree = ET.parse(infile)
tree = ET.parse('AutomatedTestResults.xml')
root = tree.getroot()
f = open('errorpage.html', 'w')
f.write('<a name="erring"></a>')
f.write('<a name="go"></a><h2> ENHANCED RESULTS ON ERROR SUBTESTS </h2>')
message0 = """<br><br>"""

message1 = """<script src="myscript.js"></script>
<script>
	mypagefunction();
</script>"""

message3 = """<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>"""

message4 = """<h2>Go back to the previous page <br>
</h2>
<a href="xml2html.html#leave">Go back</a>"""

message5 = """<a href="#bop">If you don't want to see extended logs,go to the bottom</a>"""

def msgcall(msg = []):
	for x in msg:
		f.write(x + message0)

def tablecreate(table):
	f.write(table)

def logreport(extended,extended2,messageBegin,messageEnd,linktotop):
	counter = 1
	for node in tree.iter('error'):
		str1 = node.text
		count = str1.count('-->')
		str2 = str1.split('-->',count)
		f.write(extended + '<p4>' + str(counter) + '</p4>' + extended2 +"<br>")
		f.write(messageBegin + str(counter) + messageEnd)
		f.write(linktotop + "<br>")
		counter += 1
		for word in str2:
			print >>f, '', word
			f.write("<br>")
		f.write(message0)

def addrows(table,msgbegin,msgmid,msgend):
	i = 0
	for node in tree.iter('error'):
		i+=1
		message = node.attrib.get('message')
		table.rows.append([i,message,msgbegin + str(i) + msgmid + str(i) + msgend])
		htmlcode = str(table)
	return htmlcode

t = HTML.Table(attribs = {'id':'pagetbl'},style = ['margin-left:50%;' ,'margin-right:50%;', 'margin-right:50%;'],  width = '60%' ,header_row=['Serial Number of failed test','Error Message','Shortcut Links'],col_styles = [None,'background-color:red;',None])
tablecreate(addrows(t,"<html><body><a href=\"#testshortcut","\">","</a></body></html>"))
f.write(message0 + message5)
msgarr = [message1,message3]
msgcall(msgarr)
logreport("<p4>THE EXTENDED LOG FOR ERROR TEST </p4>","<p4> IS : </p4>","<a name=\"testshortcut","\"></a>","<a href=\"#\">Go to top of page</a>")
f.write('<a name="bop"></a>')
msgcall([message4])
 
f.close()

