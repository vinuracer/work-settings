# Path to your oh-my-zsh installation.
export ZSH="/home/vinay/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
ZSH_THEME="agnoster"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in ~/.oh-my-zsh/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

# Turn off the history sharing across terminals
setopt no_share_history
setopt nosharehistory

# Turn off double confirmation for files with * wildcard
setopt rm_star_silent

# force the color prompt for non-256 color emulators
force_color_prompt=yes

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
    alias rm="rm -i" # always ask before removing a file
    alias mv="mv -i" # always ask before moving a file onto another file
    alias cp="cp -i" # always ask before copying a file onto another file
    alias logout="exit" # make "logout" work
    alias vi="vim"

fi

# Alsiases -- ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Source the local shrc
if [ -f ~/.zshrc.local ]; then
    source ~/.zshrc.local
fi

# Which plugins would you like to load?
# Standard plugins can be found in ~/.oh-my-zsh/plugins/*
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
  # command-not-found
  # common-aliases
  # cd-gitroot
  dircycle
  dirhistory
  git
  git-extras
  # pip
  python
  pylint
  sbt
  scala
  tmux
  # unified-titles
  # vi-mode
  # vim-interaction
  web-search
  zsh-256color
  zsh-navigation-tools
  colored-man-pages
  # zsh-change-case
  # zsh-interactive-cd
  zsh-syntax-highlighting
  # zsh-syntax-highlighting-filetypes
  # zsh-titles
  # zsh-tmux-rename
  # zsh-tmux
  # git ssh-agent
  # zsh-bash
  )

# Add the ssh identities
# zstyle :omz:plugins:ssh-agent agent-forwarding on
# zstyle :omz:plugins:ssh-agent identities teak_auth_rsa

source $ZSH/oh-my-zsh.sh

# oh-my-zsh apth
export OMZ=$HOME/.oh-my-zsh/plugins

# Custom utility scripts
# zsh-bd
. $OMZ/zsh-bd/bd.zsh

# change-case
#. $OMZ/zsh-change-case/change-case.zsh

# zsh tmux
. $OMZ/zsh-tmux/tmux.plugin.zsh

# tmux session manager
export PATH=$PATH:$OMZ/tsm/dist/bin

# Avoid recursion of vim commands
vim() {
  [ -t 1 ] || { echo "Not starting vim without stdout to TTY!" >&2; return 1; }
  command vim "$@"
}

# Bind the home and end keys from kterm database
bindkey "${terminfo[khome]}" beginning-of-line
bindkey "${terminfo[kend]}" end-of-line

if [[ -n "$TMUX" ]]; then
  bindkey "${terminfo[khome]}" beginning-of-line
  bindkey "${terminfo[kend]}" end-of-line
fi

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# Monitor setup
dual () {
  xrandr --output DVI-D-0 --primary --left-of HDMI-0 --output HDMI-0 --auto
  # xrandr --output HDMI-0 --primary --left-of DVI-D-0 --output DVI-D-0 --auto
}

# set single monitor
single () {
  xrandr --output DVI-D-0 --off
}
