const _ = {
  setTheme,
  keepTheme
}

function setTheme(themeName: string): void {
    localStorage.setItem("theme", themeName);
    document.body.className = themeName;
    const allChannelImgs = Array.from(document.getElementsByClassName("channelImg") as HTMLCollectionOf<HTMLElement>);
    for (let i = 0; i < allChannelImgs.length; i++) {
      if (themeName === 'theme-dark') {
        (allChannelImgs[i]).style.filter = "invert(1)";
      } else {
        (allChannelImgs[i]).style.filter = '';
      }
    }
}

function keepTheme() {
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
    } else if (localStorage.getItem('theme') === 'theme-light') {
      setTheme('theme-light')
    }
  } else {
    setTheme('theme-dark')
  }
}

export default _