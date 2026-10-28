#!/usr/bin/env python3
"""Local Preview Server for CleanRit Website.

Serves the cloned & adapted Hone.gg-style CleanRit website locally on http://localhost:8080.
"""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser

WEBSITE_DIR = Path(__file__).resolve().parent

class CustomHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(WEBSITE_DIR), **kwargs)

def main():
    port = 8080
    server = ThreadingHTTPServer(("127.0.0.1", port), CustomHandler)
    url = f"http://localhost:{port}"
    print(f"\n[+] CleanRit Website live preview: {url}")
    print("[+] Opening preview in your web browser...")
    webbrowser.open(url)
    print("[!] Press Ctrl+C to stop the preview server.\n")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nPreview server stopped.")

if __name__ == "__main__":
    main()
