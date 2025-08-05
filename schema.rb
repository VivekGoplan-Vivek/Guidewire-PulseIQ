digraph StarSchema {
    // Set graph attributes
    graph [bgcolor=white, splines=polyline, nodesep=1.2, ranksep=1.5, layout=circo];

    // Set node attributes
    node [shape=plaintext, fontname=Arial, fontsize=10];

    // Set edge attributes
    edge [color=black, fontname=Arial, fontsize=10, arrowsize=0.6, style=normal, arrowhead=vee];

  	dd_plcy_classcodebasis_trv [label=<
		<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
    <TR><TD bgcolor="lightblue" width="182"><b>dd_plcy_classcodebasis_trv</b></TD></TR>
    <TR>
        <TD align="left">CreateTime</TD>
    </TR>
    <TR>
        <TD align="left">Code</TD>
    </TR>
    <TR>
        <TD align="left">Description</TD>
    </TR>
    <TR>
        <TD align="left">UpdateUserID</TD>
    </TR>
    <TR>
        <TD align="left">BKEY</TD>
    </TR>
</TABLE>
	>];
	dd_plcy_glclasscode_trv [label=<
		<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
    <TR><TD bgcolor="lightgreen" width="161"><b>dd_plcy_glclasscode_trv</b></TD></TR>
    <TR>
        <TD align="left">CreateTime</TD>
    </TR>
    <TR>
        <TD align="left">Code</TD>
    </TR>
    <TR>
        <TD align="left">FK_BasisID_BKEY</TD>
    </TR>
    <TR>
        <TD align="left">UpdateUserID</TD>
    </TR>
    <TR>
        <TD align="left">Classification</TD>
    </TR>
</TABLE>
	>];
	
	
      	dd_plcy_classcodebasis_trv -> dd_plcy_glclasscode_trv [ tooltip = "FK_BasisID_BKEY = BKEY" ];
    
}






