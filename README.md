# Dvorak keyboard enhancement for Evernote

This is a Chrome browser extension to improve Dvorak keyboard support when editing notes on Evernote.com. 

It's a small improvement for a tiny subset of Evernote users: Dvorak keyboardists who want to be able to underline or italicise text using standard keyboard shortcuts that do not work in Evernote:

- Press Ctrl+I (Windows/Linux) or Cmd+I (Mac) to make text italic
- Press Ctrl+U (Windows/Linux) or Cmd+U (Mac) to make text underlined

That's all this extension does, and only when the current tab shows a page from Evernote.com.

## Why should I care?

Almost certainly, you don't. Nomatter how large the number of Evernote users is, the number of Evernote users who use a Dvorak keyboard layout represents a tiny fraction of Evernote users. Of that tiny fraction, the number that wants to use keyboard shortcuts is even smaller. Rounding up, there's probably about three people in the whole world who would want this extension. One of the three has enough experience with automation to build it.

Evernote has some of the best keyboard shortcut support for text formatting, unless you use Dvorak. The defect has been known for years, but is unlikely to be fixed because the number of Dvorak users is very small. On modern software development teams, low priority tasks can languish indefinitely because there's always something more important for the development team to work on.

But Evernote is a web application (even the desktop version, which runs in a lightweight browser named Electron), and web browser are extensible.

## How does it work?

This extension does not make changes to Evernote, or your notes. It is a browser automation that only activates when you are editing notes at Evernote.com. If you're on a different site, the extension is deactivated. 

When you to press Ctrl+I (Cmd+I) to make text italic or Ctrl+U (Cmd+U) to make text underlined, the automation detects it and clicks the underline or italic button on the Evernote toolbar for you. This new connection between the shortcut and the toolbar makes the keyboard shortcuts for underline and italic work normally.

It's a simple, trivial patch to address an inconveient but frustrating defect.

## Why should I trust you?

You should not. Before using this extension, review the code in [contentLicence.js](contentLicence.js) yourself, or have someone familiar with JavaScript (or an LLM like ChatGPT or Bing Copilot) explain it.

The gist of the code is:

> 1. Create a keyboard shortcut handler named `dvEnShortcutsHandler`.
> 2. On Mac, expect the Command key modifier. On Windows or Linux, expect the Control key modifier.
> 3. If the keyboard shortcut for underline or italic is pressed, try to find the button on the toolbar. If not found (for example, if the window is not wide enough) click the More button, open it behind the Evernote application -- so it doesn't flash on the screen -- and look for the italic and underline buttons.
> 4. If the right button is found, click it. This switches the underline and italic modes on and off as anyone would expect.
> 5. If the button is not found at all, do nothing.

## Will this work in the Evernote app?

No: the Evernote app does not support extensions. However, as a work-around, you can manually add it to Evernote when the application starts. The fix will remain until the next time Evernote restarts.

Here are the steps to manually add the code to the Evernote app itself (must be performed every time Evernote launches). If these steps seem intimidating or too technical, this may not be a good solution for you. You should really only be doing this if you understand what you're doing (you're adding a keyboard listener to automate clicking the toolbar when you type the underline or italic shortcut keys).

1. Open the Evernote window.
2. Press the F12 on your keyboard (depending on your keyboard, you may need to hold down the Fn key before pressing F12).
3. The Electron developer tool panel appears. At the top of the panel, you should see a tab named Console. If you don't see it, click the ">>" tab and you may see a menu that includes Console. Click Console.
4. At the bottom of the console tab, you should see a blank line with a ">" prompt. Click after the ">" prompt so the cursor shows up there.
5. Copy and paste the code from [contentScript.js](contentScript.js) into the console window and press Enter.
6. Close the developer tools by pressing F12 (or Fn+F12) again.

If you want to remove the automation, just restart Evernote. You may need to terminate the Evernote app with Task Manager (Windows) or Activity Monitor (Mac) if you have Evernote set to stay running in the background.

## Can I install the the extension manually, instead of from the Chrome Store?

Yes. Use the `git` command to check out this repo or download and extract the zip file on your local file systetm. Once you have the folder on your hard drive:

1. Open the extensions configuration in your browser.
2. Enable the "Developer Mode" switch.
3. Click the "Load Unpacked" button.
4. Select the folder where you extracted the zip file. You should see "Dvorak Evernote Extension" listed in the extension list.
5. Close the extensions window.
6. Reload any Evernote tabs to ensure the extension adds the automation to the tab.

## Usage

Once the extension is running, you can click the jigsaw icon in the toolbar to see the "DV" extension icon. The icon is green when the current tab is at Evernote.com. The icon is grey (disabled) when any other page is open. You can confirm the permissions for the extension by clicking the extension icon. 

Enjoy!

## Disable or remove the extension

If you want to disable or remove the extension, go return to the browser Extensions page. You should see "Dvorak Evernote Extension" in the list of extensions. Disable or remove it.

## How can I report issues related to this extension?

Visit the GitHub project and click on the Issues tab. Enter your question or details about your comment. Be sure to mention which platform you're using (Mac, Windows, Linux), browser version, and a description of the issue you're seeing. Include a list of steps that can reproduce the problem if you can.