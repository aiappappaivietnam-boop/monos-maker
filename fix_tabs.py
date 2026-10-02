# Let's inspect index.html and redesign the tab loading mechanism cleanly and robustly.
with open("index.html", "r", encoding="utf-8") as f:
    text = f.read()

print("File read successfully, length:", len(text))
