#!/usr/bin/env python3
"""Daemon server for FORMWORK Interior Project OS."""
import sys
import os
import signal
import http.server
import socketserver
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PORT = 4321

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)
    
    def log_message(self, format, *args):
        # Keep logs silent to prevent buffer filling
        pass

class ReusableServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

def run():
    # Ignore broken pipe signals
    signal.signal(signal.SIGPIPE, signal.SIG_DFL)
    server_address = ("0.0.0.0", PORT)
    with ReusableServer(server_address, QuietHandler) as httpd:
        print(f"FORMWORK server active at http://localhost:{PORT}", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass

if __name__ == '__main__':
    run()
