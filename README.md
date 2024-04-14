# Dvorak keyboard enhancement for Evernote

This is a Chrome browser extension to improve Dvorak keyboard shortcut support when editing notes on [Evernote.com](Evernote.com). 

It's a small improvement for a tiny subset of Evernote users: Dvorak keyboardists who want to format text as underline or italic using standard keyboard shortcuts, which currently does not work in Evernote:

- Press Ctrl+I (Windows/Linux) or Cmd+I (Mac): toggle italic text
- Press Ctrl+U (Windows/Linux) or Cmd+U (Mac): toggle underlined text

That's all this extension does, and only if the current tab shows a page from Evernote.com.

## Why should I care?

Almost certainly, you don't. No matter how large the number of Evernote users, those who use a Dvorak keyboard layout are a tiny fraction. Of that tiny fraction, the number that want to use keyboard shortcuts for underlining or italics is even smaller. Rounding up, there are probably only three people in the whole world who would want this extension. However, one of the three has enough experience with automation and is interested in building this extension.

Evernote has excellent keyboard shortcut support for text formatting, but unfortunately, the keyboard shortcuts to format italic or underline currently do not work on the Dvorak keyboard. The issue has been known for years but is unlikely to be resolved because the number of Evernote Dvorak users is very small. On modern software development teams, low-priority tasks can languish for years because there's always something more important for the development team to work on. Here are links to the Evernote forums on this issue:

- [Dvorak keyboards do not work at all](https://discussion.evernote.com/forums/topic/142275-dvorak-keyboard-text-shortcuts-do-not-all-work/)
- [Control + I does not work on Dvorak Keyboard layout](https://discussion.evernote.com/forums/topic/140930-ctrl-i-does-not-work-on-dvorak-keyboard-layout/)
- [Dvorak shortcuts unavailable with Dvorak keyboard layout](https://discussion.evernote.com/forums/topic/134735-keyboard-shortcuts-unavailable-with-dvorak-keyboard-layout/)
- [Keyboard shortcuts not working](https://discussion.evernote.com/forums/topic/147970-keyboard-shortcuts-not-working/)

We have no way of knowing how many requests have been received by Evernote Support. When the author of this extension reported the problem in a support ticket, the issue was acknowledged but marked as automatically resolved when the next version of Evernote releases, with the expectation that a new issue would be raised if the problem is not fixed. As you can read in the links above, it's been this way for years.

However, Evernote is a web application (even the desktop version, which runs in a lightweight browser named Electron), and web browsers are extensible, meaning you can customise some behaviour if you know how.

## How does this extension work?

This extension does not change Evernote or your notes. It is a browser automation that activates when you edit notes at Evernote.com only. If you're on a different site, your browser automatically deactivates the extension.

When you press Ctrl+I (Cmd+I) to make text italic or Ctrl+U (Cmd+U) to make text underlined, the automation clicks the underline or italic button on the Evernote toolbar for you. This automated workflow between the keyboard shortcut and the toolbar makes the keyboard shortcuts for underline and italic work as expected. You can underline and de-underline or italicise or un-italicise as expected.

It's a simple fix to address an inconvenient issue.

## Why should I trust you?

You should not. Before using this extension, review the code in [contentScript.js](contentScript.js) yourself, or have someone familiar with JavaScript (or an LLM like ChatGPT or Bing Copilot) walk you through how it works.

The gist of the code is as follows. The extension:

1. Creates a keyboard shortcut handler named `dvEnShortcutsHandler`.
2. On Mac, waits for the Command key modifier. On Windows or Linux, waits for the Control key modifier.
3. If the keyboard shortcut for underline or italic is pressed, locate the corresponding button on the toolbar. If not found (for example, if the window is not wide enough), automatically click the "More" button on the toolbar (opened behind the Evernote application, so it doesn't flash on the screen) and then locate the italic and underline buttons.
4. If the appropriate button is there, automatically click it. This switches the underline and italic modes on and off as you press the hotkey, like the other formatting hotkeys, as a user would expect.
5. If the button is not found, do nothing.

## Will this work in the Evernote app?

No: the Evernote app does not support extensions. However, as a workaround, you can manually add it to Evernote when the application starts. The fix will remain until the next time Evernote restarts. This could be better, but it may work for you. Or just use a web browser with this extension.

Here are the steps to manually add the code to the Evernote app itself. These steps must be performed every time Evernote launches. If these steps seem intimidating or too technical, this may not be a good solution for you. You should only do this if you understand what you're doing. In technical terms, you're adding a keyboard listener to automate the toolbar when you press the underline or italic keyboard shortcuts.

1. Start the Evernote application.
2. With the Evernote application focused, press the **F12** on your keyboard. Depending on your keyboard, you may need to hold down the **Fn** key before pressing F12.
3. The Electron developer tools panel appears. At the top of the panel, you should see a tab named **Console**. If you don't see it, click the **>>** tab and you may see a menu that includes **Console**. Click **Console**.
4. At the bottom of the **Console** tab, you should see a blank line with a **>** prompt. Click after the **>** prompt so the cursor shows up there.
5. Copy and paste the code from [contentScript.js](contentScript.js) into the console window and press **Enter**.
6. Close the developer tools by pressing **F12** (or **Fn**+**F12**) again.

If you want to remove the automation, just restart Evernote. You may need to terminate the Evernote app with Task Manager (Windows) or Activity Monitor (Mac) if you have Evernote set to stay running in the background.

## Can I install the extension manually, instead of from the Chrome Store?

Yes. Use the `git` command to check out this repo or download and extract the zip file from your local file system. Once you have the folder on your hard drive:

1. Open the extensions configuration in your browser.
2. Enable the **Developer Mode** switch.
3. Click the **Load Unpacked** button.
4. Select the folder where you extracted the zip file. You should see "Dvorak Evernote Extension" in the extension list.
5. Close the Extensions tab.
6. Reload any Evernote tabs to ensure the extension adds the automation to the tab.

## Usage

Once the extension is running, you can click the jigsaw icon in the toolbar to see the "DV" extension icon. The icon is green when the current tab is at Evernote.com. Green means the extension is active on the current tab. The icon is grey (disabled) when any other page is open. You can confirm the permissions for the extension by clicking the green "DV" extension icon. 

That's it. From now on, the Evernote underline and italic keyboard shortcuts should work as expected as long as the extension is installed and enabled.

## Disable or remove the extension

If you want to disable or remove the extension, go return to the browser Extensions page. You should see "Dvorak Evernote Extension" in the list of extensions. Disable or remove it.

## When does this extension activate, and what permissions does it use?

The permissions are defined in [manifest.json](manifest.json). When you read the manifest, you can see that this extension uses no permissions. If you're familiar with JSON syntax, you can see the list below is empty:

```json
"permissions": [],
```

Your browser activates the extension only under the following conditions:

1. The current page is at Evernote.com.
2. The current page is an editor for your notes. For example, if you go to the main page at Evernote.com, the extension will be disabled because it's not needed. 

The extension only activates when the URL includes `evernote.com/app/web`. Here is the part of [manifest.json](manifest.json) that defines the rule:

```json
"content_scripts": [
{
    "matches": ["*://*.evernote.com/client/web*"]
    ...
}
```

So you can see that this extension has a very narrowly defined audience (Evernote Dvorak keyboardists) and works only on very specific pages (editing notes on Evernote.com).

## How can I report issues with this extension?

Visit the GitHub project and click on the Issues tab. Enter your question or details and create a new issue. Be sure to mention which platform you're using (Mac, Windows, Linux), browser version, and a description of the issue you're seeing. Include a list of steps that can reproduce the problem if you can.

## Is there telemetry or tracking?

No. This extension adds a link between two keyboard shortcuts and the Evernote toolbar. It does not track anything, send information, or interact with anything else in the browser or your notes. Confirm this yourself by reviewing [manifest.json](manifest.json) (sets restrictions on what the extension can do) and [contentScript.js](contentScript.json) (some JavaScript to listen for the hotkeys and click the toolbar button).

## Is this extension available for non-Chromium browsers?

Currently, no.