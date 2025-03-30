# Front End Start-Up

To allow all features work properly when opening `index.html` locally, you can run the project in one of these ways:

## Launch Browser in Unsafe Mode

Open `index.html` directly in a browser launched with disabled CORS policy. This allows local resources (such as html, json, and scripts) to load correctly, which are normally blocked due to browser security restrictions.

To launch Chrome:
### Windows

```bash
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:/ChromeDevSession"
```

### macOS

```bash
open -na "Google Chrome" --args --disable-web-security --user-data-dir="/tmp/ChromeDevSession"
```

After launching, drag and drop `index.html` into the browser window, or open it via `Ctrl + O` / `Cmd + O`.

`!` Use this mode for development only. Do not browse the internet in this session - it disables security features.

## Use a Local Server

`Recommended` This is the classic and most reliable method for local development. Use this metod for better security and compatibility.

### Python

If you have Python installed, run the following command in the project directory:

```bash
python -m http.server 8080
```

Then normally open in your browser: `http://localhost:8080/index.html`

### Live Server (VS Code Extension)

If you're using Visual Studio Code:
1. Install the `Live Server` extension in VS Code
2. Open the project folder
3. Right-click `index.html` -> select `Open with Live Server`

Live Server will automatically open the page in your browser and reload it on file changes.

## Open Online Version
You can also open the project directly in your browser using the GitHub-hosted version:

https://admtrv.github.io/BookByte.github.io/

This is the easiest way to preview the live version of the site without any setup.