/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var a=this||self,b=function(f,k){f=f.split(".");var e=a;f[0]in e||"undefined"==typeof e.execScript||e.execScript("var "+f[0]);for(var g;f.length&&(g=f.shift());)f.length||void 0===k?e=e[g]&&e[g]!==Object.prototype[g]?e[g]:e[g]={}:e[g]=k};var c={c:{1E3:{other:"0K"},1E4:{other:"00K"},1E5:{other:"000K"},1E6:{other:"0M"},1E7:{other:"00M"},1E8:{other:"000M"},1E9:{other:"0B"},1E10:{other:"00B"},1E11:{other:"000B"},1E12:{other:"0T"},1E13:{other:"00T"},1E14:{other:"000T"}},b:{1E3:{other:"0 thousand"},1E4:{other:"00 thousand"},1E5:{other:"000 thousand"},1E6:{other:"0 million"},1E7:{other:"00 million"},1E8:{other:"000 million"},1E9:{other:"0 billion"},1E10:{other:"00 billion"},1E11:{other:"000 billion"},1E12:{other:"0 trillion"},1E13:{other:"00 trillion"},
1E14:{other:"000 trillion"}}};
c={c:{1E3:{other:"0\u00a0t"},1E4:{other:"00\u00a0t"},1E5:{other:"000\u00a0t"},1E6:{other:"0\u00a0mio."},1E7:{other:"00\u00a0mio."},1E8:{other:"000\u00a0mio."},1E9:{other:"0\u00a0mia."},1E10:{other:"00\u00a0mia."},1E11:{other:"000\u00a0mia."},1E12:{other:"0\u00a0bio."},1E13:{other:"00\u00a0bio."},1E14:{other:"000\u00a0bio."}},b:{1E3:{other:"0 tusind"},1E4:{other:"00 tusind"},1E5:{other:"000 tusind"},1E6:{other:"0 millioner"},1E7:{other:"00 millioner"},1E8:{other:"000 millioner"},1E9:{other:"0 milliarder"},
1E10:{other:"00 milliarder"},1E11:{other:"000 milliarder"},1E12:{other:"0 billioner"},1E13:{other:"00 billioner"},1E14:{other:"000 billioner"}}};var d={ga:"y",na:"y G",ha:"MMM y",ia:"MMMM y",oa:"MM/y",G:"MMM d",H:"MMMM dd",J:"M/d",I:"MMMM d",la:"MMM d, y",ea:"EEE, MMM d",ma:"EEE, MMM d, y",i:"d",ka:"MMM d, h:mm a zzzz"};d={ga:"y",na:"y G",ha:"MMM y",ia:"MMMM y",oa:"MM.y",G:"d. MMM",H:"dd. MMMM",J:"d.M",I:"d. MMMM",la:"d. MMM y",ea:"EEE d. MMM",ma:"EEE d. MMM y",i:"d.",ka:"d. MMM HH.mm zzzz"};var h={s:["BC","AD"],o:["Before Christ","Anno Domini"],L:"JFMAMJJASOND".split(""),Y:"JFMAMJJASOND".split(""),F:"January February March April May June July August September October November December".split(" "),X:"January February March April May June July August September October November December".split(" "),U:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),$:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),da:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
ba:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),W:"Sun Mon Tue Wed Thu Fri Sat".split(" "),aa:"Sun Mon Tue Wed Thu Fri Sat".split(" "),M:"SMTWTFS".split(""),Z:"SMTWTFS".split(""),V:["Q1","Q2","Q3","Q4"],S:["1st quarter","2nd quarter","3rd quarter","4th quarter"],a:["AM","PM"],g:["EEEE, MMMM d, y","MMMM d, y","MMM d, y","M/d/yy"],ca:["h:mm:ss a zzzz","h:mm:ss a z","h:mm:ss a","h:mm a"],h:["{1} 'at' {0}","{1} 'at' {0}","{1}, {0}","{1}, {0}"],v:6,fa:[5,6],A:5};
h={s:["f.Kr.","e.Kr."],o:["f.Kr.","e.Kr."],L:"JFMAMJJASOND".split(""),Y:"JFMAMJJASOND".split(""),F:"januar februar marts april maj juni juli august september oktober november december".split(" "),X:"januar februar marts april maj juni juli august september oktober november december".split(" "),U:"jan. feb. mar. apr. maj jun. jul. aug. sep. okt. nov. dec.".split(" "),$:"jan. feb. mar. apr. maj jun. jul. aug. sep. okt. nov. dec.".split(" "),da:"s\u00f8ndag mandag tirsdag onsdag torsdag fredag l\u00f8rdag".split(" "),
ba:"s\u00f8ndag mandag tirsdag onsdag torsdag fredag l\u00f8rdag".split(" "),W:"s\u00f8n. man. tir. ons. tor. fre. l\u00f8r.".split(" "),aa:"s\u00f8n man tir ons tor fre l\u00f8r".split(" "),M:"SMTOTFL".split(""),Z:"SMTOTFL".split(""),V:["1. kvt.","2. kvt.","3. kvt.","4. kvt."],S:["1. kvartal","2. kvartal","3. kvartal","4. kvartal"],a:["AM","PM"],g:["EEEE 'den' d. MMMM y","d. MMMM y","d. MMM y","dd.MM.y"],ca:["HH.mm.ss zzzz","HH.mm.ss z","HH.mm.ss","HH.mm"],h:["{1} 'kl'. {0}","{1} 'kl'. {0}","{1} {0}",
"{1} {0}"],v:0,fa:[5,6],A:3};var l={l:".",B:",",N:"%",ja:"0",R:"+",D:"-",u:"E",P:"\u2030",C:"\u221e",K:"NaN",j:"#,##0.###",T:"#E0",O:"#,##0%",f:"\u00a4#,##0.00",m:"USD"};l={l:",",B:".",N:"%",ja:"0",R:"+",D:"-",u:"E",P:"\u2030",C:"\u221e",K:"NaN",j:"#,##0.###",T:"#E0",O:"#,##0\u00a0%",f:"#,##0.00\u00a0\u00a4",m:"DKK"};b("I18N_DATETIMESYMBOLS_ERAS",h.s);b("I18N_DATETIMESYMBOLS_ERANAMES",h.o);b("I18N_DATETIMESYMBOLS_NARROWMONTHS",h.L);b("I18N_DATETIMESYMBOLS_STANDALONENARROWMONTHS",h.Y);b("I18N_DATETIMESYMBOLS_MONTHS",h.F);b("I18N_DATETIMESYMBOLS_STANDALONEMONTHS",h.X);b("I18N_DATETIMESYMBOLS_SHORTMONTHS",h.U);b("I18N_DATETIMESYMBOLS_STANDALONESHORTMONTHS",h.$);b("I18N_DATETIMESYMBOLS_WEEKDAYS",h.da);b("I18N_DATETIMESYMBOLS_STANDALONEWEEKDAYS",h.ba);b("I18N_DATETIMESYMBOLS_SHORTWEEKDAYS",h.W);
b("I18N_DATETIMESYMBOLS_STANDALONESHORTWEEKDAYS",h.aa);b("I18N_DATETIMESYMBOLS_NARROWWEEKDAYS",h.M);b("I18N_DATETIMESYMBOLS_STANDALONENARROWWEEKDAYS",h.Z);b("I18N_DATETIMESYMBOLS_SHORTQUARTERS",h.V);b("I18N_DATETIMESYMBOLS_QUARTERS",h.S);b("I18N_DATETIMESYMBOLS_AMPMS",h.a);b("I18N_DATETIMESYMBOLS_DATEFORMATS",h.g);b("I18N_DATETIMESYMBOLS_TIMEFORMATS",h.ca);b("I18N_DATETIMESYMBOLS_DATETIMEFORMATS",h.h);b("I18N_DATETIMESYMBOLS_FIRSTDAYOFWEEK",h.v);b("I18N_DATETIMESYMBOLS_WEEKENDRANGE",h.fa);
b("I18N_DATETIMESYMBOLS_FIRSTWEEKCUTOFFDAY",h.A);b("I18N_DATETIMEPATTERNS_YEAR_FULL",d.ga);b("I18N_DATETIMEPATTERNS_YEAR_MONTH_ABBR",d.ha);b("I18N_DATETIMEPATTERNS_YEAR_MONTH_FULL",d.ia);b("I18N_DATETIMEPATTERNS_MONTH_DAY_ABBR",d.G);b("I18N_DATETIMEPATTERNS_MONTH_DAY_FULL",d.H);b("I18N_DATETIMEPATTERNS_MONTH_DAY_SHORT",d.J);b("I18N_DATETIMEPATTERNS_MONTH_DAY_MEDIUM",d.I);b("I18N_DATETIMEPATTERNS_WEEKDAY_MONTH_DAY_MEDIUM",d.ea);b("I18N_DATETIMEPATTERNS_DAY_ABBR",d.i);
void 0!==h.pa&&b("I18N_DATETIMESYMBOLS_ZERODIGIT",h.pa);b("I18N_NUMBERFORMATSYMBOLS_DECIMAL_SEP",l.l);b("I18N_NUMBERFORMATSYMBOLS_GROUP_SEP",l.B);b("I18N_NUMBERFORMATSYMBOLS_PERCENT",l.N);b("I18N_NUMBERFORMATSYMBOLS_ZERO_DIGIT",l.ja);b("I18N_NUMBERFORMATSYMBOLS_PLUS_SIGN",l.R);b("I18N_NUMBERFORMATSYMBOLS_MINUS_SIGN",l.D);b("I18N_NUMBERFORMATSYMBOLS_EXP_SYMBOL",l.u);b("I18N_NUMBERFORMATSYMBOLS_PERMILL",l.P);b("I18N_NUMBERFORMATSYMBOLS_INFINITY",l.C);b("I18N_NUMBERFORMATSYMBOLS_NAN",l.K);
b("I18N_NUMBERFORMATSYMBOLS_DECIMAL_PATTERN",l.j);b("I18N_NUMBERFORMATSYMBOLS_SCIENTIFIC_PATTERN",l.T);b("I18N_NUMBERFORMATSYMBOLS_PERCENT_PATTERN",l.O);b("I18N_NUMBERFORMATSYMBOLS_CURRENCY_PATTERN",l.f);b("I18N_NUMBERFORMATSYMBOLS_DEF_CURRENCY_CODE",l.m);b("I18N_COMPACT_DECIMAL_SHORT_PATTERN",c.c);b("I18N_COMPACT_DECIMAL_LONG_PATTERN",c.b);
