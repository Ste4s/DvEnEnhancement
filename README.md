# Dvorak keyboard enhancement for Evernote

This [Chrome web extension](https://chromewebstore.google.com/detail/dvorak-evernote-extension/logfaanhcndicfilipkclgchponfgiem) enhances Dvorak keyboard shortcut support when editing notes on [Evernote.com](Evernote.com). 

It's a small improvement for a tiny subset of Evernote users: Dvorak keyboardists who want to use standard underline or italic keyboard shortcuts, which currently do not work as expected in Evernote:

- Press Ctrl+I (Windows/Linux) or Cmd+I (Mac): toggle italic text
- Press Ctrl+U (Windows/Linux) or Cmd+U (Mac): toggle underlined text

This extension addresses a very specific Evernote issue in the unlikely event that you're editing notes on Evernote.com using a Dvorak keyboard and using shortcuts to toggle underline or italic formatting.

## Why should I care?

Almost certainly, you don't. No matter how large the number of Evernote users, those who use a Dvorak layout are just a tiny fraction. Of that tiny fraction, the number that want to use shortcuts for underlining or italics is even smaller. Rounding up, there are probably only three people in the whole world who would use this extension. However, one of the three has enough automation experience and interest in building it.

Evernote has excellent keyboard shortcut support for text formatting, but the italic and underline shortcuts have been broken on Dvorak layouts for years, and it seems unlikely to be fixed any time soon. That's because the number of Evernote users with Dvorak keyboard layouts is vanishingly small. Unfortunately, on modern software development teams, low-priority tasks can languish indefinitely because there's always something more important for the development team to work on. Here are links to discussions about the non-functional shortcuts on Dvorak layouts from the Evernote community forums:

- October, 2020: [Keyboard Shortcut Issues When Using Dvorak](https://discussion.evernote.com/forums/topic/130012-keyboard-shortcut-issues-when-using-dvorak/)
- March, 2021: [Dvorak shortcuts unavailable with Dvorak keyboard layout](https://discussion.evernote.com/forums/topic/134735-keyboard-shortcuts-unavailable-with-dvorak-keyboard-layout/)
- February, 2022: [Control + I does not work on Dvorak Keyboard layout](https://discussion.evernote.com/forums/topic/140930-ctrl-i-does-not-work-on-dvorak-keyboard-layout/)
- June, 2022: [Dvorak keyboards do not work at all](https://discussion.evernote.com/forums/topic/142275-dvorak-keyboard-text-shortcuts-do-not-all-work/)
- September, 2023: [Keyboard shortcuts not working](https://discussion.evernote.com/forums/topic/147970-keyboard-shortcuts-not-working/)

We have no way of knowing how many requests have been received by Evernote Support. When the author of this extension reported the problem to Evernote, the issue was acknowledged, but closed automatically when the next version of Evernote released, with the expectation that a new issue would be opened if the problem persisted. 

However, Evernote is a web application (even the desktop version, which is a lightweight web browser named [Electron](https://www.electronjs.org/) that only web shows pages from Evernote.com). Web browsers are extensible, which means you can change it if you know how.

## How does this extension work?

This extension does not change Evernote or your notes. It is a browser automation that activates when edit notes on Evernote.com and press `Ctrl+I` (`Cmd+I`) to make text italic or `Ctrl+U` (`Cmd+U`) to make text underlined. This extension simply clicks the underline or italic buttons on the Evernote toolbar for you when you press either keyboard shortcut.

This extra link between the keyboard shortcut is what makes the keyboard shortcuts for underline and italic funtion as expected.

It's a certainly a kludge, but a simple workaround that works.

## Why should I trust you?

You should not. Before using this extension, review the code in [contentScript.js](contentScript.js), or have someone familiar with JavaScript (or an LLM like ChatGPT or Bing Copilot) walk you through how it works.

The gist of the code is as follows. The extension:

1. Creates a keyboard shortcut handler named `dvEnShortcutsHandler`.
2. On Mac, waits for the Command key modifier. On Windows or Linux, waits for the Control key modifier.
3. If the keyboard shortcut for underline or italic is pressed, locate the corresponding button on the toolbar. If not found (for example, if the window is not wide enough to include the text formatting buttons), automatically click the "More" button on the toolbar, which is opened behind the Evernote application, so as not to create a visual disturbance on-screen) and then locate the italic and underline buttons.
4. If the appropriate button is there, automatically click it. This toggles underline and italic on and off as you press the hotkey, in effect restoring the shortcut functionality.
5. If the button is not found, do nothing.

## Usage

Once the extension is running, you can click the jigsaw icon in the toolbar to see the "DV" extension icon. The icon is green when the current tab is at Evernote.com. Green means the extension is active on the current tab. The icon is grey (disabled) when any other page is open. You can confirm the permissions for the extension by clicking the green "DV" extension icon and selecting "View web permissions". 

That's it. From now on, the Evernote underline and italic keyboard shortcuts should work as expected as long as the extension is installed and enabled, and you're editing notes on Evernote.com.

## Disable or remove the extension

If you want to disable or remove the extension, return to the browser Extensions page. You should see "Dvorak Evernote Extension" in the list of extensions. Disable or remove it.

## When does this extension activate, and what permissions does it use?

The permissions are defined in [manifest.json](manifest.json). When you read the manifest, you can see that this extension requests no permissions from the browser. If you're familiar with JSON syntax, you can see the permissions list below is empty:

```json
"permissions": [],
```

Your browser activates the extension only under the following conditions:

1. The current page is at Evernote.com.
2. The current page is viewing or editing your notes. For example, if you go to the main page at Evernote.com, the extension will be disabled because it's not needed. 

The extension only activates when the URL includes `evernote.com/client/web`. Here is the part of [manifest.json](manifest.json) that defines the rule:

```json
"content_scripts": [
{
    "matches": ["*://*.evernote.com/client/web*"]
    ...
}
```

So you can see that this extension has a very narrowly defined audience (Evernote Dvorak keyboardists) and scope for very specific pages (editing notes on Evernote.com).

## Does this extension include any tracking, ads, or other surprises?

No. This extension just adds a link between two keyboard shortcuts and the Evernote toolbar. It does not track anything, send information, load things, or interact with anything else in your browser or notes.

Confirm this yourself by reviewing [manifest.json](manifest.json) (sets restrictions on what the extension can do) and [contentScript.js](contentScript.js) (JavaScript to listen for the hotkeys and click the toolbar button).

## Which browsers are supported?

This extension is expected to work in Chromium-based browsers like Google Chrome, Microsoft Edge, Brave, Opera, Wavebox, etc. It's tested on Windows and Mac, and should work on Linux.

## Which browsers are currently not supported?

There is currently no extension for Firefox or Safari. It may be possible to add support in the future, but for now, manually inject the code directly into the Firefox or Safari using the steps outlined below for the [Evernote desktop app](#will-this-extension-work-in-the-evernote-desktop-app). 

This is ironic, because the issue with shortcuts in Evernote for Dvorak persists because this issue affects too few users to warrant the development team spending time on it.

## What if I have a physical Dvorak keyboard?

If you have a keyboard that supports the Dvorak layout, like the [Kinesis Advantage2](https://kinesis-ergo.com/shop/advantage2/), the Evernote keyboard shortcuts work as expected, and you don't need this extension.

The keyboard shortcuts work because when you have a Dvorak-specific keyboard, your operating system stays configured to accept input using the Qwerty layout, and the keyboard does the Dvorak translation for you. In other words, you press the 'I' key on the Dvorak keyboard, and keyboard sends the 'G' key.

The Kinesis Advantage2 can switch between Dvorak or Qwerty modes, so even if you have one of these keyboards, you may decide to configure your operating system to use the Dvorak keyboard layout because then all connected keyboards (e.g. a built-in keyboard plus an external USB keyboard) will use the same layout. So even if you have one of these keyboards, you may still want to use this extension.

## What happens if I use this extension with a Qwerty layout?

Nobody would do that intentionally, but it is possible to have this extension enabled while using a Qwerty layout. Everything would function normally, except the italic and underline shortcuts would toggle twice. For example, you hit Ctrl+I and see the highlighted text made italic, then straightaway revert to unitalic.

That's because the keyboard shortcuts in Evernote work fine for the Qwerty keymap, and this extension adds an automated click on the toolbar every time you press Ctrl+I or Ctrl+U, which effectively cancels out the formatting.

If you regularly switch between Dvorak and Qwerty layouts, you may encounter this scenario. When using a Qwerty layout, disable or remove this extension.

## Will this extension work in the Evernote desktop app?

The short answer is no.

While the Evernote app does not support extensions directly, it's built on the open-source [Electron](https://www.electronjs.org/) framework, which you can think of as a lightweight web browser restricted to Evernote.com.

There are ways to extend an Electron app locally that would not be endorsed or recommended by the Evernote developers, and you definitely should not go down this rabbit hole, especially not with some code you found on the internet, unless you knew exactly what you were doing and had reviewed the JavaScript. The best course of action is to wait until the Evernote developers fix the underlying issue.

However, if you were to proceed, the following steps must be performed every time Evernote starts. In technical terms, you're adding a keyboard listener to automate the toolbar when you press the underline or italic keyboard shortcuts.

1. Start the Evernote application.
2. With the Evernote application focused, press the **F12** on your keyboard. Depending on your keyboard, you may need to hold down the **Fn** key before pressing **F12**.
3. The Electron developer tools panel appears. At the top of the developer tools panel, you should see a tab named **Console**. If you don't see it, click the **>>** tab and you may see a menu that includes **Console**. Click **Console**.
4. At the bottom of the **Console** tab, you should see a blank line with a **>** prompt. Click after the **>** prompt so the cursor shows up there and you can type.
5. Copy and paste the code from [contentScript.js](https://raw.githubusercontent.com/Ste4s/DvEnEnhancement/main/contentScript.js) into the console window and press **Enter**.
6. Close the developer tools by pressing **F12** (or **Fn**+**F12**) again.

If you want to remove the automation, just restart Evernote. You may need to terminate the Evernote app with Task Manager (Windows) or Activity Monitor (Mac) if it stays running in the background after you close the window.

A very technical user or developer could configure Electron to inject the code directly using a tool like [electron-inject](https://github.com/tintinweb/electron-inject). However, there are privacy and security implications that must be understood and mitigated before using this approach.

## How can I report issues with this extension?

Visit the GitHub project **Issues** tab. Enter your question or details and create a new issue. Be sure to mention which platform you're using (Mac, Windows, Linux), browser version, and a description of the issue you're seeing. Include a list of steps that can reproduce the problem.