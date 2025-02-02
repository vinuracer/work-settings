-- xmobar config used by Vic Fryzel
-- Author: Vic Fryzel
-- https://github.com/vicfryzel/xmonad-config

-- This xmobar config is for a single 4k display (3840x2160) and meant to be
-- used with the stalonetrayrc-single config.
--
-- If you're using a single display with a different resolution, adjust the
-- position argument below using the given calculation.
Config {
    -- Position xmobar along the top, with a stalonetray in the top right.
    -- Add right padding to xmobar to ensure stalonetray and xmobar don't
    -- overlap. stalonetrayrc-single is configured for 12 icons, each 23px
    -- wide.
    -- right_padding = num_icons * icon_size
    -- right_padding = 12 * 23 = 276
    -- Example: position = TopP 0 276
    --position = Static { xpos = 0, ypos = 0, width = 1920, height = 22 },
    position = Top 0 0
    --font = "xft:monospace-12",
    font = "xft:monospace-10 Display:size=10,FontAwesome:size=15",
    bgColor = "#000000",
    fgColor = "#ffffff",

-- Generic behavior
    lowerOnStart = True,
    hideOnStart = False,
    overrideRedirect = False,
    allDesktops = True,
    persistent = True,

-- Commands
    commands = [
        Run Weather "KPAO" ["-t","<tempF>F <skyCondition>","-L","64","-H","77","-n","#CEFFAC","-h","#FFB6B0","-l","#96CBFE"] 36000,
        Run MultiCpu ["-t","Cpu: <autototal>","-L","30","-H","60","-h","#FFB6B0","-l","#CEFFAC","-n","#FFFFCC","-w","3"] 10,
        Run Memory ["-t","Mem: <usedratio>%","-H","8192","-L","4096","-h","#FFB6B0","-l","#CEFFAC","-n","#FFFFCC"] 10,
        Run Swap ["-t","Swap: <usedratio>%","-H","1024","-L","512","-h","#FFB6B0","-l","#CEFFAC","-n","#FFFFCC"] 10,
        Run Network "eth0" ["-t","Net: <rx>, <tx>","-H","200","-L","10","-h","#FFB6B0","-l","#CEFFAC","-n","#FFFFCC"] 10,
        Run DynNetwork [ "--template" , "<dev>: <tx>kB/s | <rx>kB/s"
                        , "--Low"      , "1000"       -- units: kB/s
                        , "--High"     , "5000"       -- units: kB/s
                        , "--low"      , "lightgreen"
                        , "--normal"   , "lightorange"
                        , "--high"     , "lightred"
                        ] 10,
        Run Date "%a %b %_d %l:%M" "date" 10,
        Run Com "getMasterVolume" [] "volumelevel" 10,
        Run StdinReader
    ],
    sepChar = "%",
    alignSep = "}{",
    template = "%StdinReader% }{ %multicpu% || %memory% || %dynnetwork% || Vol: <fc=#b2b2ff>%volumelevel%</fc> ||  <fc=#FFFFCC>%date%</fc>"
}
