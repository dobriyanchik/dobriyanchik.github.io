function copyCode(element) {
    // Select the parent element
    const parentElement = element.parentElement.parentElement.querySelector("code");

    // Get the text content of the parent element
    const textContent = parentElement.textContent.trim();

    // Check if the browser supports the Clipboard API
    if (navigator.clipboard) {
        // Ask for permission to access the clipboard
        navigator.permissions.query({ name: "clipboard-write" })
            .then(function (result) {
                if (result.state === "granted" || result.state === "prompt") {
                    // Copy the text to the clipboard
                    navigator.clipboard.writeText(textContent)
                        .then(function () {
                            console.log("Code copied to clipboard");
                            showCopyStatus(element, "fa-check")
                        })
                        .catch(function (err) {
                            console.error("Failed to copy code: ", err);
                            showCopyStatus(element, "fa-times")
                        });
                } else {
                    console.warn("Clipboard access denied");
                    showCopyStatus(element, "fa-times")
                }
            });
    } else {
        console.warn("Clipboard API not supported");
        showCopyStatus(element, "fa-times")
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