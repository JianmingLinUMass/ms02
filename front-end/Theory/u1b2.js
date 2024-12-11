async function loadTheory(queryParams = {}) {
    try {
        // Fetch theory from the server
        const response = await fetch('/blocks', {
            method: 'POST',  // Use POST instead of GET
            headers: {
                'Content-Type': 'application/json'  // Inform the server we're sending JSON
            },
            body: JSON.stringify(queryParams)  // Convert the queryParams object to a JSON string
        });

        console.log(response)
        const theory = await response.json();
        console.log(theory)

        if (theory.length > 0) {
            const text = theory[1];
            document.getElementById('txt').innerText = text.text;
        } else {
            document.getElementById('txt').innerText = 'No theory available.';
        }
    } catch (err) {
        console.error('Failed to load theory:', err);
    }
}

window.onload = loadTheory();