async function copyCode(element) {
    // Select code element within code block
    const codeElement = element.parentElement.parentElement.querySelector("code");

    // Get the text content of the code element
    const codeToCopy = codeElement.textContent.trim();

    let permissionGranted = true;

    try {
        var result = await navigator.permissions.query({ name: "clipboard-write" });
        if (result.state != "granted" && result.state != "prompt") {
            permissionGranted = false;
        }
    } catch (_) {
        // The clipboard-write permission name is not supported in Firefox, only Chromium browsers.
        // default to true in case of error for firefox
    }

    try {
        if (permissionGranted) {
            await navigator.clipboard.writeText(codeToCopy);
        } else {
            copyCodeBlockExecCommand(codeToCopy, codeElement.parentElement.parentElement);
        }
    } catch (_) {
        copyCodeBlockExecCommand(codeToCopy, codeElement.parentElement.parentElement);
    } finally {
        showCopyStatus(element, "fa-check");
    }
}

function showCopyStatus(element, status) {
    const icon = element.querySelector("i");

    icon.classList.remove("fa-files-o");
    icon.classList.add(status);

    // Remove the class after 2 seconds
    setTimeout(() => {
        icon.classList.add("fa-files-o");
        icon.classList.remove(status);
    }, 1000);
}

function copyCodeBlockExecCommand(codeToCopy, codeBlock) {
    const textArea = document.createElement("textArea");
    textArea.contentEditable = "true";
    textArea.readOnly = "false";
    textArea.className = "copyable-text-area";
    textArea.value = codeToCopy;
    codeBlock.insertBefore(textArea, codeBlock.firstChild);
    const range = document.createRange();
    range.selectNodeContents(textArea);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    textArea.setSelectionRange(0, 999999);
    document.execCommand("copy");
    codeBlock.removeChild(textArea);
}