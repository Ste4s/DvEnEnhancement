// DvEnEnhancement: browser extension to fix keyboard shortcuts for Evernote Dvorak users
// ------------------------------
// This is a keyboard event handler that clicks the button in the toolbar when you hit
// the keyboard shortcut to format text italic or underline.


// This function is the event handler for the keyboard shortcuts.
async function dvEnShortcutsHandler(event) {
    // Set this true to enable logging
    const debugMode = false;

    function debugLog(...messages) {
        if(debugMode) {
            console.log("DV-EN-Extension: ", ...messages);
        }
    }

    // Check if the user is on a Mac or Windows/Linux
    const isMac = navigator.userAgent.toLowerCase().includes('mac');
    debugLog("Operating System:", isMac ? "MacOS" : "Windows/Linux");
    const modifierPressed = isMac ? event.metaKey : event.ctrlKey;
    const buttonActions = { 'i': "italic", 'u': "underline" };

    // This function clicks the button in the toolbar to format text italic or underline.
    const performButtonAction = async function(buttonId, actionName) {
        let button = document.getElementById(buttonId);
        if (!button) {
            debugLog(`${actionName} button not found, looking for More button...`);
            const moreButton = document.getElementById("qa-OVERFLOW_BTN");

            moreButton.focus();
            const mouseUpEvent = new MouseEvent("mouseup", { bubbles: true });
            moreButton.dispatchEvent(mouseUpEvent);

            const dropdown = document.getElementById("qa-ACTIONS_MODAL");
            dropdown.style.opacity = '0';
            dropdown.style.pointerEvents = 'none';

            button = document.getElementById(actionName);
        }

        if (button) {
            debugLog(`${actionName} button found, clicking...`);
            button.click();
            event.preventDefault();
        } else {
            debugLog(`${actionName} button still not found after expanding More menu.`);
        }
    }

    // When activated, click toolbar italic button (id `qa-ITALIC_TEXT_BTN`) or underline button (id `qa-UNDERLINE_TEXT_BTN`).
    // If not visible, activate the More button (id `qa-OVERFLOW_BTN`) to expose the text formatting options,
    // then click italic button (id `italic`) or underline button (id `underline`). 
    if (modifierPressed && buttonActions[event.key.toLowerCase()]) {
        debugLog(`Detected shortcut: Cmd+${event.key.toUpperCase()} or Ctrl+${event.key.toUpperCase()} for ${buttonActions[event.key.toLowerCase()].charAt(0).toUpperCase() + buttonActions[event.key.toLowerCase()].slice(1)}`);
        await performButtonAction(`qa-${buttonActions[event.key.toLowerCase()].toUpperCase()}_TEXT_BTN`, buttonActions[event.key.toLowerCase()]);
    }
};

// To enable the keyboard shortcuts, run:
document.addEventListener('keydown', dvEnShortcutsHandler);

// To remove, run:
// document.removeEventListener('keydown', dvEnShortcutsHandler);